let draggedShelterSlotIndex = null;

function createShelter() {
  playerShelter = {
    type: "Tent",
    regionId: getCurrentRegionId(),
    storageSlots: 16,
    maxWeight: 50,
    storageItems: Array(16).fill(null)
  };

  updateShelterScreen();
  autoSave();
}

function getShelterCurrentWeight() {
  if (!playerShelter) {
    return 0;
  }

  return playerShelter.storageItems.reduce(function (total, item) {
    if (item === null) {
      return total;
    }

    return total + (item.weight || 0) * (item.quantity || 1);
  }, 0);
}

function getItemTotalWeight(item) {
  if (item === null) {
    return 0;
  }

  return (item.weight || 0) * (item.quantity || 1);
}

function canAddItemToShelter(item) {
  if (!playerShelter || item === null) {
    return false;
  }

  const itemWeight = (item.weight || 0) * (item.quantity || 1);

  return getShelterCurrentWeight() + itemWeight <= playerShelter.maxWeight;
}

function canMoveInventoryItemToShelter(inventoryItem, shelterItem) {
  const currentShelterWeight = getShelterCurrentWeight();
  const incomingWeight = getItemTotalWeight(inventoryItem);
  const outgoingWeight = getItemTotalWeight(shelterItem);

  return currentShelterWeight - outgoingWeight + incomingWeight <= playerShelter.maxWeight;
}

function moveInventoryItemToShelterSlot(inventorySlotIndex, shelterSlotIndex) {
  if (!playerShelter) {
    return;
  }

  const inventoryItem = inventory.items[inventorySlotIndex];
  const shelterItem = playerShelter.storageItems[shelterSlotIndex];

  if (inventoryItem === null) {
    return;
  }

  if (canStackStorageItems(shelterItem, inventoryItem)) {
    const sourceWillBeEmpty = stackStorageItems(shelterItem, inventoryItem);

    if (sourceWillBeEmpty) {
      inventory.items[inventorySlotIndex] = null;
    }

    updateInventoryScreen();
    updateShelterScreen();
    autoSave();
    return;
  }

  if (!canMoveInventoryItemToShelter(inventoryItem, shelterItem)) {
    showMessage(t("shelterTooHeavy"));
    return;
  }

  playerShelter.storageItems[shelterSlotIndex] = inventoryItem;
  inventory.items[inventorySlotIndex] = shelterItem;

  updateInventoryScreen();
  updateShelterScreen();
  autoSave();
}

function moveShelterItemToInventorySlot(shelterSlotIndex, inventorySlotIndex) {
  if (!playerShelter) {
    return;
  }

  const shelterItem = playerShelter.storageItems[shelterSlotIndex];
  const inventoryItem = inventory.items[inventorySlotIndex];

  if (shelterItem === null) {
    return;
  }

  if (canStackStorageItems(inventoryItem, shelterItem)) {
    const sourceWillBeEmpty = stackStorageItems(inventoryItem, shelterItem);

    if (sourceWillBeEmpty) {
      playerShelter.storageItems[shelterSlotIndex] = null;
    }

    updateInventoryScreen();
    updateShelterScreen();
    autoSave();
    return;
  }

  const inventoryWeightAfterMove =
    getCurrentWeight() - getItemTotalWeight(inventoryItem) + getItemTotalWeight(shelterItem);

  if (inventoryWeightAfterMove > inventory.maxWeight) {
    showMessage(t("inventoryTooHeavy"));
    return;
  }

  inventory.items[inventorySlotIndex] = shelterItem;
  playerShelter.storageItems[shelterSlotIndex] = inventoryItem;

  updateInventoryScreen();
  updateShelterScreen();
  autoSave();
}

function moveShelterItem(fromShelterSlotIndex, toShelterSlotIndex) {
  if (!playerShelter || fromShelterSlotIndex === toShelterSlotIndex) {
    return;
  }

  const fromItem = playerShelter.storageItems[fromShelterSlotIndex];
  const toItem = playerShelter.storageItems[toShelterSlotIndex];

  if (fromItem === null) {
    return;
  }

  if (canStackStorageItems(toItem, fromItem)) {
    const sourceWillBeEmpty = stackStorageItems(toItem, fromItem);

    if (sourceWillBeEmpty) {
      playerShelter.storageItems[fromShelterSlotIndex] = null;
    }

    updateShelterScreen();
    autoSave();
    return;
  }

  playerShelter.storageItems[toShelterSlotIndex] = fromItem;
  playerShelter.storageItems[fromShelterSlotIndex] = toItem;

  updateShelterScreen();
  autoSave();
}

function canStackStorageItems(targetItem, sourceItem) {
  if (targetItem === null || sourceItem === null) {
    return false;
  }

  return (
    targetItem.id === sourceItem.id &&
    targetItem.quantity < targetItem.maxStack
  );
}

function stackStorageItems(targetItem, sourceItem) {
  const availableSpace = targetItem.maxStack - targetItem.quantity;
  const moveAmount = Math.min(availableSpace, sourceItem.quantity);

  targetItem.quantity += moveAmount;
  sourceItem.quantity -= moveAmount;

  return sourceItem.quantity <= 0;
}

function isShelterEmpty() {
  if (!playerShelter) {
    return true;
  }

  return playerShelter.storageItems.every(function (item) {
    return item === null;
  });
}

function destroyShelter() {
  if (!playerShelter) {
    return;
  }

  if (!isShelterEmpty()) {
    showMessage(t("emptyShelterFirst"));
    return;
  }

  addItem({
    ...itemsDatabase.tent,
    quantity: 1
  });

  playerShelter = null;

  updateInventoryScreen();
  updateShelterScreen();

  const message = t("shelterRemoved");

  showMessage(message, "success");
  addLog(message, "success");

  autoSave();
}

const destroyShelterButton = document.getElementById("destroyShelterButton");

if (destroyShelterButton) {
  destroyShelterButton.addEventListener("click", function () {
    destroyShelter();
  });
}