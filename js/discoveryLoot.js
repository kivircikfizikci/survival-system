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

  if (tileData.isBlocked || !tileData.resource) {
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

function getPendingLootItems() {
  const pendingLoot = discoveryState.pendingLoot;

  if (!pendingLoot) {
    return [];
  }

  if (Array.isArray(pendingLoot)) {
    return pendingLoot;
  }

  if (Array.isArray(pendingLoot.items)) {
    return pendingLoot.items;
  }

  if (pendingLoot.itemId) {
    return [pendingLoot];
  }

  return [];
}

function getLootText(lootItems) {
  return lootItems
    .map(function (lootItem) {
      const item = itemsDatabase[lootItem.itemId];

      if (!item) {
        return lootItem.itemId + " x" + lootItem.quantity;
      }

      return getDiscoveryItemName(item) + " x" + lootItem.quantity;
    })
    .join(", ");
}

function simulateAddLootItemsToInventory(saveData, lootItems) {
  if (!saveData || !saveData.inventory) {
    return null;
  }

  const inventoryItems = JSON.parse(
    JSON.stringify(saveData.inventory.items || [])
  );

  const maxWeight = saveData.inventory.maxWeight || 0;

  const currentWeight = getSaveInventoryWeight(inventoryItems);

  const addedWeight = lootItems.reduce(function (total, lootItem) {
    const databaseItem = itemsDatabase[lootItem.itemId];

    if (!databaseItem) {
      return total;
    }

    return total + (databaseItem.weight || 0) * (lootItem.quantity || 1);
  }, 0);

  if (currentWeight + addedWeight > maxWeight) {
    return null;
  }

  for (let lootItem of lootItems) {
    const databaseItem = itemsDatabase[lootItem.itemId];

    if (!databaseItem) {
      return null;
    }

    let quantity = lootItem.quantity || 1;
    const maxStack = databaseItem.maxStack || 1;

    for (let item of inventoryItems) {
      if (
        item !== null &&
        item.id === lootItem.itemId &&
        item.quantity < maxStack
      ) {
        const availableSpace = maxStack - item.quantity;
        const moveAmount = Math.min(availableSpace, quantity);

        item.quantity += moveAmount;
        quantity -= moveAmount;

        if (quantity <= 0) {
          break;
        }
      }
    }

    while (quantity > 0) {
      const emptySlotIndex = inventoryItems.findIndex(function (item) {
        return item === null;
      });

      if (emptySlotIndex === -1) {
        return null;
      }

      const moveAmount = Math.min(maxStack, quantity);

      inventoryItems[emptySlotIndex] = {
        ...databaseItem,
        quantity: moveAmount
      };

      quantity -= moveAmount;
    }
  }

  return inventoryItems;
}

function isRecipeDiscoveryConditionMetForSave(recipe, saveData) {
  const discoveredItemList = Array.isArray(saveData.discoveredItems)
    ? saveData.discoveredItems
    : [];

  const anyList = Array.isArray(recipe.discoverByAny)
    ? recipe.discoverByAny
    : [];

  const allList = Array.isArray(recipe.discoverByAll)
    ? recipe.discoverByAll
    : [];

  const hasAnyCondition = anyList.length > 0;
  const hasAllCondition = allList.length > 0;

  if (!hasAnyCondition && !hasAllCondition) {
    return false;
  }

  const anyPassed =
    !hasAnyCondition ||
    anyList.some(function (itemId) {
      return discoveredItemList.includes(itemId);
    });

  const allPassed =
    !hasAllCondition ||
    allList.every(function (itemId) {
      return discoveredItemList.includes(itemId);
    });

  return anyPassed && allPassed;
}

function unlockRecipesFromLoot(saveData, lootItems) {
  if (!saveData) {
    return;
  }

  if (!Array.isArray(saveData.discoveredItems)) {
    saveData.discoveredItems = [];
  }

  if (!Array.isArray(saveData.discoveredRecipes)) {
    saveData.discoveredRecipes = [];
  }

  lootItems.forEach(function (lootItem) {
    if (!saveData.discoveredItems.includes(lootItem.itemId)) {
      saveData.discoveredItems.push(lootItem.itemId);
    }
  });

  for (let recipeId in recipesDatabase) {
    const recipe = recipesDatabase[recipeId];

    if (!recipe || recipe.isPublic) {
      continue;
    }

    if (saveData.discoveredRecipes.includes(recipe.id)) {
      continue;
    }

    if (isRecipeDiscoveryConditionMetForSave(recipe, saveData)) {
      saveData.discoveredRecipes.push(recipe.id);
    }
  }
}

function addPendingLootItemsToMainInventory(lootItems) {
  const saveData = getMainSaveData();

  if (!saveData || !saveData.inventory) {
    return false;
  }

  const newInventoryItems = simulateAddLootItemsToInventory(
    saveData,
    lootItems
  );

  if (!newInventoryItems) {
    return false;
  }

  saveData.inventory.items = newInventoryItems;

  unlockRecipesFromLoot(saveData, lootItems);
  saveMainSaveData(saveData);

  return true;
}

function takePendingLoot() {
  const pendingLootItems = getPendingLootItems();

  if (pendingLootItems.length === 0) {
    return;
  }

  const added = addPendingLootItemsToMainInventory(pendingLootItems);

  if (!added) {
    addDiscoveryLog(t("inventoryFullOrTooHeavy"));
    return;
  }

  if (pendingLootItems.length === 1) {
    const lootItem = pendingLootItems[0];
    const item = itemsDatabase[lootItem.itemId];

    addDiscoveryLog(
      t("pickedUpDiscoveryLoot", {
        item: getDiscoveryItemName(item),
        quantity: lootItem.quantity
      })
    );
  } else {
    addDiscoveryLog(
      t("pickedUpDiscoveryLootList", {
        items: getLootText(pendingLootItems)
      })
    );
  }

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