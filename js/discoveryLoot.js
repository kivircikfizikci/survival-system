function rollLootFromTable(lootTableId) {
  const map = getCurrentMap();

  if (!map.lootTables || !map.lootTables[lootTableId]) {
    return null;
  }

  const lootTable = map.lootTables[lootTableId];

  let roll = Math.random() * 100;
  let cumulativeChance = 0;

  for (let lootEntry of lootTable) {
    cumulativeChance += lootEntry.chance;

    if (roll <= cumulativeChance) {
      return {
        itemId: lootEntry.itemId,
        quantity: lootEntry.quantity || 1
      };
    }
  }

  return null;
}

function rollCurrentTileLoot() {
  const currentTileId = getTileId(discoveryState.x, discoveryState.y);
  const tileData = getTileSpecialData(currentTileId);

  discoveryState.pendingLoot = null;

  if (!tileData.resource) {
    return;
  }

  const lootResult = rollLootFromTable(tileData.resource.lootTable);

  if (!lootResult) {
    return;
  }

  discoveryState.pendingLoot = {
    tileId: currentTileId,
    itemId: lootResult.itemId,
    quantity: lootResult.quantity
  };
}

function getMainSaveData() {
  const savedData = localStorage.getItem("survivalSystemSave");

  if (!savedData) {
    return null;
  }

  try {
    return JSON.parse(savedData);
  } catch (error) {
    console.error("Main save could not be loaded:", error);
    return null;
  }
}

function saveMainSaveData(saveData) {
  localStorage.setItem("survivalSystemSave", JSON.stringify(saveData));
}

function getSaveInventoryWeight(inventoryItems) {
  return inventoryItems.reduce(function (total, item) {
    if (item === null) {
      return total;
    }

    return total + (item.weight || 0) * (item.quantity || 1);
  }, 0);
}

function addLootToMainInventory(itemId, quantity) {
  const saveData = getMainSaveData();

  if (!saveData || !saveData.inventory) {
    return false;
  }

  const databaseItem = itemsDatabase[itemId];

  if (!databaseItem) {
    return false;
  }

  const inventory = saveData.inventory;
  const itemWeight = (databaseItem.weight || 0) * quantity;
  const currentWeight = getSaveInventoryWeight(inventory.items || []);

  if (currentWeight + itemWeight > inventory.maxWeight) {
    return false;
  }

  inventory.items = inventory.items || [];

  for (let item of inventory.items) {
    if (
      item !== null &&
      item.id === itemId &&
      item.quantity < item.maxStack
    ) {
      const availableSpace = item.maxStack - item.quantity;
      const moveAmount = Math.min(availableSpace, quantity);

      item.quantity += moveAmount;
      quantity -= moveAmount;

      if (quantity <= 0) {
        saveMainSaveData(saveData);
        return true;
      }
    }
  }

  for (let i = 0; i < inventory.items.length; i++) {
    if (inventory.items[i] === null) {
      inventory.items[i] = {
        ...databaseItem,
        quantity: quantity
      };

      saveMainSaveData(saveData);
      return true;
    }
  }

  return false;
}

function takePendingLoot() {
  if (!discoveryState.pendingLoot) {
    return;
  }

  const pendingLoot = discoveryState.pendingLoot;
  const item = itemsDatabase[pendingLoot.itemId];

  if (!item) {
    discoveryState.pendingLoot = null;
    updateTileActionPanel();
    return;
  }

  const added = addLootToMainInventory(
    pendingLoot.itemId,
    pendingLoot.quantity
  );

  if (!added) {
    addDiscoveryLog("Inventory is full or too heavy.");
    return;
  }

  addDiscoveryLog(
    "Picked up " +
    getDiscoveryItemName(item) +
    " x" +
    pendingLoot.quantity +
    "."
  );

  discoveryState.pendingLoot = null;

  saveDiscoveryState();
  updateTileActionPanel();
}

function leavePendingLoot() {
  discoveryState.pendingLoot = null;

  saveDiscoveryState();
  updateTileActionPanel();
}

function getDiscoveryItemName(item) {
  if (!item) {
    return "";
  }

  if (item.nameKey && typeof t === "function") {
    return t(item.nameKey);
  }

  return item.nameKey || item.id;
}