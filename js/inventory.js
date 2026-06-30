let inventory = {
  baseMaxWeight: 15,
  baseSlots: 10,
  maxWeight: 15,
  items: [null, null, null, null, null, null, null, null, null, null]
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

function getItemTotalWeight(item) {
  if (!item) {
    return 0;
  }

  const quantity = Math.max(
    1,
    Number(item.quantity || 1)
  );

  const baseWeight =
    Number(item.weight || 0) * quantity;

  if (
    item.category !== "container" ||
    !item.containerData ||
    !item.contents ||
    !item.contents.itemId
  ) {
    return baseWeight;
  }

  const contentAmount = Math.max(
    0,
    Number(item.contents.amount || 0)
  );

  const unitWeight = Math.max(
    0,
    Number(item.containerData.unitWeight || 0.1)
  );

  const liquidWeight =
    contentAmount * unitWeight;

  return baseWeight + liquidWeight;
}

function getCurrentWeight() {
  return inventory.items.reduce(function (total, item) {
    return total + getItemTotalWeight(item);
  }, 0);
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

function isContainerItem(item) {
  return Boolean(
    item &&
    item.category === "container" &&
    item.containerData
  );
}

function getContainerContentAmount(item) {
  if (
    !isContainerItem(item) ||
    !item.contents
  ) {
    return 0;
  }

  return Number(item.contents.amount || 0);
}

function isContainerEmpty(item) {
  return (
    isContainerItem(item) &&
    getContainerContentAmount(item) <= 0
  );
}

function canInventoryItemsStack(existingItem, newItem) {
  if (!existingItem || !newItem) {
    return false;
  }

  if (existingItem.id !== newItem.id) {
    return false;
  }

  const maxStack = Number(
    existingItem.maxStack || newItem.maxStack || 1
  );

  if (Number(existingItem.quantity || 1) >= maxStack) {
    return false;
  }

  if (
    isContainerItem(existingItem) ||
    isContainerItem(newItem)
  ) {
    return (
      isContainerEmpty(existingItem) &&
      isContainerEmpty(newItem)
    );
  }

  return true;
}

function findContainerSafeStackableSlot(item) {
  for (
    let slotIndex = 0;
    slotIndex < inventory.items.length;
    slotIndex++
  ) {
    const existingItem = inventory.items[slotIndex];

    if (
      canInventoryItemsStack(
        existingItem,
        item
      )
    ) {
      return slotIndex;
    }
  }

  return -1;
}

function addItem(item) {
  refreshBaseSleepState();

  if (isSleeping) {
    showMessage(t("cannotUseSleeping"));
    return false;
  }

  const quantityToAdd = Number(item.quantity || 1);

  const addedWeight =
    Number(item.weight || 0) * quantityToAdd;

  if (
    getCurrentWeight() + addedWeight >
    inventory.maxWeight
  ) {
    showMessage(t("tooHeavy"));
    return false;
  }

  let remainingQuantity = quantityToAdd;

  while (remainingQuantity > 0) {
    const stackableSlot =
      findContainerSafeStackableSlot(item);

    if (stackableSlot !== -1) {
      const existingItem =
        inventory.items[stackableSlot];

      const maxStack = Number(
        existingItem.maxStack || 1
      );

      const availableSpace =
        maxStack -
        Number(existingItem.quantity || 1);

      const movedQuantity = Math.min(
        availableSpace,
        remainingQuantity
      );

      existingItem.quantity =
        Number(existingItem.quantity || 1) +
        movedQuantity;

      remainingQuantity -= movedQuantity;
      continue;
    }

    const emptySlot = findEmptySlot();

    if (emptySlot === -1) {
      showMessage(t("noEmptySlot"));
      return false;
    }

    const maxStack = Number(
      item.maxStack || 1
    );

    const movedQuantity = Math.min(
      maxStack,
      remainingQuantity
    );

    inventory.items[emptySlot] = {
      ...item,
      quantity: movedQuantity
    };

    if (isContainerItem(inventory.items[emptySlot])) {
      inventory.items[emptySlot].contents =
        item.contents
          ? {
              itemId: item.contents.itemId,
              amount: Number(
                item.contents.amount || 0
              )
            }
          : null;
    }

    remainingQuantity -= movedQuantity;
  }

  discoverItem(item.id);
  updateInventoryScreen();
  autoSave();

  return true;
}

function removeOneItem(slotIndex) {
    refreshBaseSleepState();

  if (isSleeping) {
    showMessage(t("cannotUseSleeping"));
    return;
  }

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
    refreshBaseSleepState();

  if (isSleeping) {
    showMessage(t("cannotUseSleeping"));
    return;
  }
  inventory.items[slotIndex] = null;
  updateInventoryScreen();
  autoSave();
}

function dropInventoryItem(slotIndex) {
   refreshBaseSleepState();
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
    refreshBaseSleepState();

  if (isSleeping) {
    showMessage(t("cannotUseSleeping"));
    return;
  }

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

function syncSleepStateFromSave() {
  const savedData = localStorage.getItem("survivalSystemSave");

  if (!savedData) {
    return;
  }

  try {
    const saveData = JSON.parse(savedData);

    isSleeping = saveData.isSleeping === true;

    activeSleepSlotIndex =
      typeof saveData.activeSleepSlotIndex === "number"
        ? saveData.activeSleepSlotIndex
        : null;

    sleepSession = saveData.sleepSession || null;
  } catch (error) {
    console.error("Sleep state could not be synced:", error);
  }
}

function stopSleeping(reasonKey) {
  if (sleepIntervalId !== null) {
    clearInterval(sleepIntervalId);
    sleepIntervalId = null;
  }

  isSleeping = false;
  activeSleepSlotIndex = null;
  sleepSession = null;

  updateScreen();
  updateInventoryScreen();

  if (reasonKey) {
    const message = t(reasonKey);
    showMessage(message, "success");
    addLog(message, "success");
  }

  autoSave();
}

function applySleepItemDurabilityCost(slotIndex) {
  const sleepItem = inventory.items[slotIndex];

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

    inventory.items[slotIndex] = null;

    const message = t("sleepItemBroke", {
      item: itemName
    });

    showMessage(message);
    addLog(message);
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

  if (hunger <= (sleepData.hungerCostPerTick || 1)) {
    showMessage(t("tooHungryToSleep"));
    return;
  }

  if (energy >= 100) {
    showMessage(t("wokeUpRested"));
    return;
  }

  isSleeping = true;
  activeSleepSlotIndex = slotIndex;

  sleepSession = {
    active: true,
    slotIndex: slotIndex,
    itemId: item.id,
    startedAt: Date.now(),
    lastTickAt: Date.now()
  };

  const message = t("sleepStarted", {
    item: getItemName(item)
  });

  showMessage(message, "success");
  addLog(message, "success");

  updateScreen();
  updateInventoryScreen();
  autoSave();

  startSleepTimer();
}

function processSleepProgress() {
  if (!sleepSession || !sleepSession.active) {
    return;
  }

  const slotIndex = sleepSession.slotIndex;
  const sleepItem = inventory.items[slotIndex];

  if (!sleepItem || sleepItem.id !== sleepSession.itemId) {
    stopSleeping();
    return;
  }

  if (!sleepItem.sleepData) {
    stopSleeping();
    return;
  }

  const sleepData = sleepItem.sleepData;
  const now = Date.now();
  const tickMs = gameConfig.sleepTickMs || 30000;

  const elapsedMs = now - sleepSession.lastTickAt;
  const elapsedTicks = Math.floor(elapsedMs / tickMs);

  if (elapsedTicks <= 0) {
    return;
  }

  for (let i = 0; i < elapsedTicks; i++) {
    if (energy >= 100) {
      applySleepItemDurabilityCost(slotIndex);
      stopSleeping("wokeUpRested");
      return;
    }

    if (hunger <= (sleepData.hungerCostPerTick || 1)) {
      stopSleeping("wokeUpHungry");
      return;
    }

    changeEnergy(sleepData.energyPerTick || 1);
    changeHealth(sleepData.healthPerTick || 0);
    changeHunger(-(sleepData.hungerCostPerTick || 1));

    sleepSession.lastTickAt += tickMs;

    if (energy >= 100) {
      applySleepItemDurabilityCost(slotIndex);
      stopSleeping("wokeUpRested");
      return;
    }
  }

  updateScreen();
  updateInventoryScreen();
  if (!isSavingGame) {
    autoSave();
  }
}

function startSleepTimer() {
  if (sleepIntervalId !== null) {
    clearInterval(sleepIntervalId);
  }

  sleepIntervalId = setInterval(function () {
    processSleepProgress();

    const statusElement =
      document.getElementById("statusText");

    if (statusElement) {
      statusElement.textContent =
        getPlayerStatusText();
    }
  }, 1000);
}

function refreshBaseSleepState() {
  if (typeof processSleepProgress === "function") {
    processSleepProgress();
  }

  if (typeof syncSleepStateFromSave === "function") {
    syncSleepStateFromSave();
  }

  updateScreen();
}

function useInventoryItem(slotIndex) {
  refreshBaseSleepState();
  const item = inventory.items[slotIndex];

  if (item === null) {
    return;
  }

  if (item.id === "buriedStashMap") {
    if (buriedStash !== null) {
      showMessage(t("buriedStashAlreadyRevealed"));
      return;
    }

    buriedStash = {
      regionId: "trail",
      x: null,
      y: null,
      items: null,
      revealed: true
    };

    removeOneItem(slotIndex);

    updateInventoryScreen();

    const message = t("buriedStashMapUsed");

    showMessage(message, "success");
    addLog(message, "success");

    autoSave();
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

  if (item.id === "wovenCrate") {
  const placed = placeWovenCrate();

  if (!placed) {
    return;
  }

  item.quantity -= 1;

  if (item.quantity <= 0) {
    inventory.items[slotIndex] = null;
  }

  updateInventoryScreen();
  updateStorageContainerScreen();
  autoSave();

  return;
}

  if (
    item.id === "campfire" ||
    item.id === "choppingBlock" ||
    item.id === "tanningRack" ||
    item.id === "loom"

  ) {
    const placed = placeWorkstation(item.id, item);

    if (!placed) {
      return;
    }

    removeOneItem(slotIndex);

    const currentPosition = getCurrentDiscoveryPosition();
    const currentRegionId = currentPosition.regionId || getCurrentRegionId();
    const regionLabel = currentRegionId.charAt(0).toUpperCase() + currentRegionId.slice(1);

    const message = t("workstationPlaced", {
      item: getItemName(item),
      regionLabel: regionLabel
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
