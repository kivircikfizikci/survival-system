let equipment = {
  head: null,
  neck: null,
  torso: null,
  hands: null,
  legs: null,
  feet: null,
  bag: null,
  vest: null
};

function isEquipableItem(item) {
  return item.type === "clothing" || item.type === "bag";
}

function updateInventoryCapacityFromEquipment() {
  let extraSlots = 0;
  let extraWeight = 0;

  for (let slotName in equipment) {
    const equippedItem = equipment[slotName];

    if (equippedItem !== null) {
      extraSlots += equippedItem.extraSlots || 0;
      extraWeight += equippedItem.extraWeight || 0;
    }
  }

  const totalSlots = inventory.baseSlots + extraSlots;
  const totalWeight = inventory.baseMaxWeight + extraWeight;

  setInventoryCapacity(totalSlots, totalWeight);
}

function wearInventoryItem(slotIndex) {
  const item = inventory.items[slotIndex];

  if (item === null) {
    return;
  }

  if (isSleeping) {
    showMessage(t("cannotWearSleeping"));
    return;
  }

  if (!isEquipableItem(item)) {
    showMessage(t("cannotWearItem"));
    return;
  }

  const equipSlot = item.equipSlot;

  if (!equipment.hasOwnProperty(equipSlot)) {
    showMessage(t("invalidEquipSlot"));
    return;
  }

  if (equipment[equipSlot] !== null) {
    showMessage(t("equipSlotFull"));
    return;
  }

  equipment[equipSlot] = item;
  inventory.items[slotIndex] = null;
  updateInventoryCapacityFromEquipment();

  updateInventoryScreen();
  updateEquipmentScreen();
  saveGame();

  const message = t("equipped", { item: getItemName(item) });

  showMessage(message, "success");
  addLog(message, "success");

  autoSave();
}

function wearInventoryItemToSlot(slotIndex, targetEquipSlot) {
  const newItem = inventory.items[slotIndex];

  if (newItem === null) {
    return;
  }

  if (isSleeping) {
    showMessage(t("cannotWearSleeping"));
    return;
  }

  if (!isEquipableItem(newItem)) {
    showMessage(t("cannotWearItem"));
    return;
  }

  if (newItem.equipSlot !== targetEquipSlot) {
    showMessage(t("wrongEquipSlot"));
    return;
  }

  const oldItem = equipment[targetEquipSlot];

  if (oldItem !== null) {
    inventory.items[slotIndex] = oldItem;
  } else {
    inventory.items[slotIndex] = null;
  }

  equipment[targetEquipSlot] = newItem;

  updateInventoryCapacityFromEquipment();
  updateInventoryScreen();
  updateEquipmentScreen();
  saveGame();

  showMessage(t("equipped", { item: getItemName(newItem) }));
  autoSave();
}

function unequipItem(equipSlot) {
  const item = equipment[equipSlot];

  if (item === null) {
    return;
  }

    if (isSleeping) {
    showMessage(t("cannotUnequipSleeping"));
    return;
  }

  const targetSlotCount = inventory.items.length - (item.extraSlots || 0);

  if (!canReduceInventoryTo(targetSlotCount)) {
    showMessage(t("cannotUnequipWithItems"));
    return;
  }

  const emptySlot = findEmptySlot();

  if (emptySlot === -1) {
    showMessage(t("noEmptySlot"));
    return;
  }

  inventory.items[emptySlot] = item;
  equipment[equipSlot] = null;

  updateInventoryCapacityFromEquipment();

  updateInventoryScreen();
  updateEquipmentScreen();
  saveGame();

  const message = t("unequipped", { item: getItemName(item) });

  showMessage(message, "success");
  addLog(message, "info");

  autoSave();
}

function canReduceInventoryTo(targetSlotCount) {
  for (let i = targetSlotCount; i < inventory.items.length; i++) {
    if (inventory.items[i] !== null) {
      return false;
    }
  }

  return true;
}