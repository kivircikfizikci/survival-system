let craftSlots = [
  null, null, null,
  null, null, null,
  null, null, null
];

let draggedCraftSlotIndex = null;

function moveInventoryItemToCraftSlot(inventorySlotIndex, craftSlotIndex) {
  const item = inventory.items[inventorySlotIndex];

  if (item === null) {
    return;
  }

  if (craftSlots[craftSlotIndex] !== null) {
    showMessage(t("craftSlotFull"));
    return;
  }

  craftSlots[craftSlotIndex] = item;
  inventory.items[inventorySlotIndex] = null;

  updateInventoryScreen();
  updateCraftingScreen();
}

function moveCraftItemToInventorySlot(craftSlotIndex, inventorySlotIndex) {
  const item = craftSlots[craftSlotIndex];

  if (item === null) {
    return;
  }

  if (inventory.items[inventorySlotIndex] !== null) {
    showMessage(t("inventorySlotFull"));
    return;
  }

  inventory.items[inventorySlotIndex] = item;
  craftSlots[craftSlotIndex] = null;

  updateInventoryScreen();
  updateCraftingScreen();
}

function moveCraftItem(craftFromSlot, craftToSlot) {
  if (craftFromSlot === craftToSlot) {
    return;
  }

  const fromItem = craftSlots[craftFromSlot];
  const toItem = craftSlots[craftToSlot];

  craftSlots[craftFromSlot] = toItem;
  craftSlots[craftToSlot] = fromItem;

  updateCraftingScreen();

  if (typeof saveGame === "function") {
    saveGame();
  }
}