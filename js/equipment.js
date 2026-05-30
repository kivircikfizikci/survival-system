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

  setInventoryCapacity(
    inventory.baseSlots + extraSlots,
    inventory.baseMaxWeight + extraWeight
  );
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

  showMessage(t("equipped", { item: getItemName(item) }));
}

function unequipItem(equipSlot) {
  const item = equipment[equipSlot];

  if (item === null) {
    return;
  }

  const emptySlot = findEmptySlot();

  if (emptySlot === -1) {
    showMessage(t("noEmptySlot"));
    return;
  }

  if (getCurrentWeight() + item.weight > inventory.maxWeight) {
    showMessage(t("tooHeavy"));
    return;
  }

  inventory.items[emptySlot] = item;
  equipment[equipSlot] = null;

  updateInventoryScreen();
  updateEquipmentScreen();

  showMessage(t("unequipped", { item: getItemName(item) }));
}
