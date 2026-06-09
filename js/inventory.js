let inventory = {
  baseMaxWeight: 5,
  baseSlots: 4,
  maxWeight: 5,
  items: [null, null, null, null]
};

function setInventoryCapacity(totalSlots, totalWeight, showWarning = true) {
  inventory.maxWeight = totalWeight;

  while (inventory.items.length < totalSlots) {
    inventory.items.push(null);
  }

  while (inventory.items.length > totalSlots) {
    const lastItem = inventory.items[inventory.items.length - 1];

    if (lastItem !== null) {
      if (showWarning) {
        showMessage(t("cannotReduceInventorySlots"));
      }

      break;
    }

    inventory.items.pop();
  }
}

function findEmptySlot() {
  for (let i = 0; i < inventory.items.length; i++) {
    if (inventory.items[i] === null) {
      return i;
    }
  }

  return -1;
}

function findStackableSlot(item) {
  for (let i = 0; i < inventory.items.length; i++) {
    const slotItem = inventory.items[i];

    if (
      slotItem !== null &&
      slotItem.id === item.id &&
      slotItem.quantity < slotItem.maxStack
    ) {
      return i;
    }
  }

  return -1;
}

function getCurrentWeight() {
  let total = 0;

  for (let item of inventory.items) {
    if (item !== null) {
      total += item.weight * item.quantity;
    }
  }

  return total;
}

function getUsedSlots() {
  let usedSlots = 0;

  for (let item of inventory.items) {
    if (item !== null) {
      usedSlots++;
    }
  }

  return usedSlots;
}


function addItem(item) {
  if (getCurrentWeight() + item.weight > inventory.maxWeight) {
    showMessage(t("tooHeavy"));
    return false;
  }

  const stackableSlot = findStackableSlot(item);

  if (stackableSlot !== -1) {
    inventory.items[stackableSlot].quantity++;
    updateInventoryScreen();
    saveGame();
    return true;
  }

  const emptySlot = findEmptySlot();

  if (emptySlot === -1) {
    showMessage(t("noEmptySlot"));
    return false;
  }

  inventory.items[emptySlot] = {
    ...item,
    quantity: item.quantity || 1
  };

  updateInventoryScreen();
  autoSave();
  return true;
}

function removeOneItem(slotIndex) {
  const item = inventory.items[slotIndex];

  if (item === null) {
    return;
  }

  item.quantity--;

  if (item.quantity <= 0) {
    inventory.items[slotIndex] = null;
  }

  updateInventoryScreen();
  saveGame();
}

function removeItem(slotIndex) {
  inventory.items[slotIndex] = null;
  updateInventoryScreen();
  autoSave();
}

function dropInventoryItem(slotIndex) {
  const item = inventory.items[slotIndex];

  if (item === null) {
    return;
  }
  

  if (isSleeping) {
    showMessage(t("cannotDropSleeping"));
    return;
  }

  removeItem(slotIndex);
  showMessage(t("dropped", { item: getItemName(item) }));
  autoSave();
}

function moveInventoryItem(fromSlot, toSlot) {
  if (fromSlot === toSlot) {
    return;
  }

  const fromItem = inventory.items[fromSlot];
  const toItem = inventory.items[toSlot];

  inventory.items[fromSlot] = toItem;
  inventory.items[toSlot] = fromItem;

  updateInventoryScreen();
  autoSave();
}

function stopSleeping(reasonKey) {
  if (sleepIntervalId !== null) {
    clearInterval(sleepIntervalId);
    sleepIntervalId = null;
  }

  isSleeping = false;
  activeSleepSlotIndex = null;

  updateScreen();
  updateInventoryScreen();

  if (reasonKey) {
    const message = t(reasonKey);
    showMessage(message, "success");
    addLog(message, "success");
  }

  autoSave();
}

function applySleepItemDurabilityCost() {
  if (activeSleepSlotIndex === null) {
    return;
  }

  const sleepItem = inventory.items[activeSleepSlotIndex];

  if (!sleepItem || sleepItem.category !== "sleep" || !sleepItem.sleepData) {
    return;
  }

  if (typeof sleepItem.durability !== "number") {
    return;
  }

  const durabilityCost =
    sleepItem.sleepData.durabilityCostOnSleepEnd || 1;

  sleepItem.durability -= durabilityCost;

  if (sleepItem.durability <= 0) {
    const itemName = getItemName(sleepItem);

    inventory.items[activeSleepSlotIndex] = null;

    const message = t("sleepItemBroke", {
      item: itemName
    });

    showMessage(message);
    addLog(message);
  }
}

function applySleepTick() {
  if (activeSleepSlotIndex === null) {
    stopSleeping();
    return;
  }

  const sleepItem = inventory.items[activeSleepSlotIndex];

  if (!sleepItem || sleepItem.category !== "sleep" || !sleepItem.sleepData) {
    stopSleeping();
    return;
  }

  const sleepData = sleepItem.sleepData;

  if (hunger <= sleepData.hungerCostPerTick) {
    stopSleeping("wokeUpHungry");
    return;
  }

  changeEnergy(sleepData.energyPerTick || 1);
  changeHealth(sleepData.healthPerTick || 0);
  changeHunger(-(sleepData.hungerCostPerTick || 1));

  updateScreen();
  updateInventoryScreen();
  autoSave();

  if (energy >= 100) {
    applySleepItemDurabilityCost();
    stopSleeping("wokeUpRested");
  }
}

function startSleeping(slotIndex) {
  const item = inventory.items[slotIndex];

  if (!item || item.category !== "sleep" || !item.sleepData) {
    showMessage(t("cannotUseItem"));
    return;
  }

  if (isSleeping) {
    showMessage(t("alreadySleeping"));
    return;
  }

  const sleepData = item.sleepData;

  if (hunger <= sleepData.hungerCostPerTick) {
    showMessage(t("tooHungryToSleep"));
    return;
  }

  if (energy >= 100) {
    showMessage(t("wokeUpRested"));
    return;
  }

  isSleeping = true;
  activeSleepSlotIndex = slotIndex;

  const message = t("sleepStarted", {
    item: getItemName(item)
  });

  showMessage(message, "success");
  addLog(message, "success");

  updateScreen();
  updateInventoryScreen();
  autoSave();

  sleepIntervalId = setInterval(function () {
    applySleepTick();
  }, gameConfig.sleepTickMs);
}

function useInventoryItem(slotIndex) {
  const item = inventory.items[slotIndex];

  if (item === null) {
    return;
  }

  if (item.id === "tent") {
    if (playerShelter !== null) {
      showMessage(t("alreadyHaveShelter"));
      return;
    }

    removeOneItem(slotIndex);

    createShelter();

    updateInventoryScreen();
    updateShelterScreen();

    const message = t("shelterCreated");
    showMessage(message, "success");
    addLog(message, "success");

    autoSave();
    return;
  }

  if (
    item.id === "campfire" ||
    item.id === "choppingBlock" ||
    item.id === "tanningRack"
  ) {
    const placed = placeWorkstation(item.id, item);

    if (!placed) {
      return;
    }

    removeOneItem(slotIndex);

    const message = t("workstationPlaced", {
      regionLabel: getCurrentRegionName()
    });

    showMessage(message, "success");
    addLog(message, "success");

    updateInventoryScreen();
    updateWorkstationScreen();
    autoSave();

    return;
  }

  if (item.type !== "usable") {
    showMessage(t("cannotUseItem"));
    return;
  }

  if (item.category === "food") {
    changeHunger(item.hungerRestore || 0);

    removeOneItem(slotIndex);
    updateScreen();
    updateInventoryScreen();

    const message = t("used", { item: getItemName(item) });
    showMessage(message, "success");
    addLog(message, "success");

    autoSave();
    return;
  }

  if (item.category === "medical") {
    changeHealth(item.healAmount || 0);

    removeOneItem(slotIndex);
    updateScreen();
    updateInventoryScreen();

    const message = t("used", { item: getItemName(item) });
    showMessage(message, "success");
    addLog(message, "success");

    autoSave();
    return;
  }

  if (item.category === "sleep") {
    startSleeping(slotIndex);
    return;
  }

  if (isSleeping) {
    showMessage(t("cannotUseSleeping"));
    return;
  }

  showMessage(t("cannotUseItem"));
}
