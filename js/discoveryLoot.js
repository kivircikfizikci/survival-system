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

  if (!tileData || tileData.isBlocked || !tileData.resource) {
    return;
  }

  if (isMiningVeinTile(tileData)) {
    discoveryState.pendingLoot = null;
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

function getSavedItemTotalWeight(item) {
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

  return (
    baseWeight +
    contentAmount * unitWeight
  );
}

function getSaveInventoryWeight(inventoryItems) {
  if (!Array.isArray(inventoryItems)) {
    return 0;
  }

  return inventoryItems.reduce(function (total, item) {
    return total + getSavedItemTotalWeight(item);
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

function ensureTileLootState() {
  if (
    !discoveryState.tileLoot ||
    typeof discoveryState.tileLoot !== "object"
  ) {
    discoveryState.tileLoot = {};
  }

  if (!Array.isArray(discoveryState.recentTileHistory)) {
    discoveryState.recentTileHistory = [];
  }
}

function getTileLootByPosition(
  mapId,
  tileId
) {
  ensureTileLootState();

  if (
    !discoveryState.tileLoot[mapId] ||
    !discoveryState.tileLoot[mapId][tileId]
  ) {
    return null;
  }

  return discoveryState.tileLoot[mapId][tileId];
}

function getCurrentTileLoot() {
  const mapId =
    discoveryState.currentMapId;

  const tileId = getTileId(
    discoveryState.x,
    discoveryState.y
  );

  return getTileLootByPosition(
    mapId,
    tileId
  );
}

function mergeTileLootItems(
  currentItems,
  newItems
) {
  const mergedItems = [];

  const allItems = [
    ...(Array.isArray(currentItems)
      ? currentItems
      : []),

    ...(Array.isArray(newItems)
      ? newItems
      : [])
  ];

  for (const lootItem of allItems) {
    if (
      !lootItem ||
      !lootItem.itemId
    ) {
      continue;
    }

    const existingItem =
      mergedItems.find(function (item) {
        return (
          item.itemId ===
          lootItem.itemId
        );
      });

    if (existingItem) {
      existingItem.quantity +=
        Number(
          lootItem.quantity || 1
        );

      continue;
    }

    mergedItems.push({
      itemId: lootItem.itemId,
      quantity: Number(
        lootItem.quantity || 1
      )
    });
  }

  return mergedItems;
}

function setCurrentTileLoot(
  lootItems,
  source = "unknown"
) {
  if (
    !Array.isArray(lootItems) ||
    lootItems.length === 0
  ) {
    return false;
  }

  ensureTileLootState();

  const mapId =
    discoveryState.currentMapId;

  const tileId = getTileId(
    discoveryState.x,
    discoveryState.y
  );

  const tileData =
    getTileSpecialData(
      tileId
    );

  if (
    source === "tileSearch" &&
    isMiningVeinTile(tileData)
  ) {
    return false;
  }

  if (
    !discoveryState.tileLoot[mapId]
  ) {
    discoveryState.tileLoot[mapId] = {};
  }

  const currentTileLoot =
    discoveryState.tileLoot[mapId][tileId];

  const mergedItems =
    mergeTileLootItems(
      currentTileLoot
        ? currentTileLoot.items
        : [],
      lootItems
    );

  const tileLootData = {
    mapId: mapId,
    tileId: tileId,
    source: source,
    items: mergedItems
  };

  discoveryState.tileLoot[mapId][tileId] =
    tileLootData;

  discoveryState.pendingLoot =
    tileLootData;

  return true;
}

function clearCurrentTileLoot() {
  ensureTileLootState();

  const mapId =
    discoveryState.currentMapId;

  const tileId = getTileId(
    discoveryState.x,
    discoveryState.y
  );

  if (
    discoveryState.tileLoot[mapId]
  ) {
    delete discoveryState.tileLoot[
      mapId
    ][tileId];
  }

  discoveryState.pendingLoot = null;
}

function restoreCurrentTileLoot() {
  const currentTileLoot =
    getCurrentTileLoot();

  if (
    currentTileLoot &&
    Array.isArray(
      currentTileLoot.items
    ) &&
    currentTileLoot.items.length > 0
  ) {
    discoveryState.pendingLoot =
      currentTileLoot;

    return true;
  }

  discoveryState.pendingLoot = null;

  return false;
}

function markRecentTileVisit() {
  ensureTileLootState();

  const historyEntry = {
    mapId:
      discoveryState.currentMapId,

    tileId: getTileId(
      discoveryState.x,
      discoveryState.y
    )
  };

  discoveryState.recentTileHistory.push(
    historyEntry
  );

  while (
    discoveryState.recentTileHistory.length >
    10
  ) {
    const removedEntry =
      discoveryState.recentTileHistory.shift();

    const stillInHistory =
      discoveryState.recentTileHistory.some(
        function (entry) {
          return (
            entry.mapId ===
              removedEntry.mapId &&
            entry.tileId ===
              removedEntry.tileId
          );
        }
      );

    if (stillInHistory) {
      continue;
    }

    if (
      discoveryState.tileLoot[
        removedEntry.mapId
      ]
    ) {
      delete discoveryState.tileLoot[
        removedEntry.mapId
      ][removedEntry.tileId];
    }
  }
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

function isSavedContainerItem(item) {
  return Boolean(
    item &&
    item.category === "container" &&
    item.containerData
  );
}

function isSavedContainerEmpty(item) {
  if (!isSavedContainerItem(item)) {
    return false;
  }

  return (
    !item.contents ||
    Number(item.contents.amount || 0) <= 0
  );
}

function canSavedInventoryItemsStack(
  existingItem,
  newItem
) {
  if (!existingItem || !newItem) {
    return false;
  }

  if (existingItem.id !== newItem.id) {
    return false;
  }

  const maxStack = Number(
    existingItem.maxStack ||
    newItem.maxStack ||
    1
  );

  if (
    Number(existingItem.quantity || 1) >=
    maxStack
  ) {
    return false;
  }

  if (
    isSavedContainerItem(existingItem) ||
    isSavedContainerItem(newItem)
  ) {
    return (
      isSavedContainerEmpty(existingItem) &&
      isSavedContainerEmpty(newItem)
    );
  }

  return true;
}

function simulateAddLootItemsToInventory(
  saveData,
  lootItems
) {
  if (!saveData || !saveData.inventory) {
    return null;
  }

  const inventoryItems = JSON.parse(
    JSON.stringify(
      saveData.inventory.items || []
    )
  );

  const maxWeight =
    saveData.inventory.maxWeight || 0;

  const currentWeight =
    getSaveInventoryWeight(inventoryItems);

  const addedWeight = lootItems.reduce(
    function (total, lootItem) {
      const databaseItem =
        itemsDatabase[lootItem.itemId];

      if (!databaseItem) {
        return total;
      }

      return (
        total +
        Number(databaseItem.weight || 0) *
          Number(lootItem.quantity || 1)
      );
    },
    0
  );

  if (
    currentWeight + addedWeight >
    maxWeight
  ) {
    return null;
  }

  for (let lootItem of lootItems) {
    const databaseItem =
      itemsDatabase[lootItem.itemId];

    if (!databaseItem) {
      return null;
    }

    let quantity =
      Number(lootItem.quantity || 1);

    const maxStack =
      Number(databaseItem.maxStack || 1);

    for (let item of inventoryItems) {
      if (
        item !== null &&
        canSavedInventoryItemsStack(
          item,
          databaseItem
        )
      ) {
        const availableSpace =
          maxStack -
          Number(item.quantity || 1);

        const moveAmount = Math.min(
          availableSpace,
          quantity
        );

        item.quantity =
          Number(item.quantity || 1) +
          moveAmount;

        quantity -= moveAmount;

        if (quantity <= 0) {
          break;
        }
      }
    }

    while (quantity > 0) {
      const emptySlotIndex =
        inventoryItems.findIndex(
          function (item) {
            return item === null;
          }
        );

      if (emptySlotIndex === -1) {
        return null;
      }

      const moveAmount = Math.min(
        maxStack,
        quantity
      );

      inventoryItems[emptySlotIndex] = {
        ...databaseItem,
        quantity: moveAmount
      };

      if (
        databaseItem.category === "container" &&
        databaseItem.containerData
      ) {
        inventoryItems[emptySlotIndex].contents =
          null;
      }

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

function completeDiscoveryGoal(goalId) {
  if (!goalId) {
    return;
  }

  const saveData = getMainSaveData();

  if (!saveData) {
    return;
  }

  if (!Array.isArray(saveData.completedGoals)) {
    saveData.completedGoals = [];
  }

  if (saveData.completedGoals.includes(goalId)) {
    return;
  }

  saveData.completedGoals.push(goalId);

  saveMainSaveData(saveData);

  experience({
    general: getDiscoveryGoalExperienceReward(
      goalId
    )
  });
}

function getDiscoveryGoalExperienceReward(goalId) {
  if (
    typeof getGoalExperienceReward === "function"
  ) {
    return getGoalExperienceReward(goalId);
  }

  return 25;
}

function ensureCutTreesState() {
  if (
    !discoveryState.cutTrees ||
    typeof discoveryState.cutTrees !== "object"
  ) {
    discoveryState.cutTrees = {};
  }

  const currentMapId =
    discoveryState.currentMapId;

  if (
    !Array.isArray(
      discoveryState.cutTrees[currentMapId]
    )
  ) {
    discoveryState.cutTrees[currentMapId] = [];
  }
}

function isCurrentTileTreeArea(tileData) {
  return (
    tileData &&
    tileData.isTree === true
  );
}

function isTreeCutOnCurrentTile() {
  ensureCutTreesState();

  const currentMapId =
    discoveryState.currentMapId;

  const tileId = getTileId(
    discoveryState.x,
    discoveryState.y
  );

  return discoveryState.cutTrees[
    currentMapId
  ].includes(tileId);
}

function findMainInventoryToolByGroup(
  requiredToolGroup,
  saveData = null
) {
  const currentSaveData =
    saveData || getMainSaveData();

  if (
    !currentSaveData ||
    !currentSaveData.inventory ||
    !Array.isArray(currentSaveData.inventory.items)
  ) {
    return null;
  }

  const allowedToolIds =
    toolGroups[requiredToolGroup];

  if (!Array.isArray(allowedToolIds)) {
    return null;
  }

  for (
    let slotIndex = 0;
    slotIndex < currentSaveData.inventory.items.length;
    slotIndex++
  ) {
    const item =
      currentSaveData.inventory.items[slotIndex];

    if (!item || !item.id) {
      continue;
    }

    if (!allowedToolIds.includes(item.id)) {
      continue;
    }

    return {
      slotIndex: slotIndex,
      item: item
    };
  }

  return null;
}

function applyTreeAxeDurabilityCost(
  saveData,
  toolData
) {
  if (
    !saveData ||
    !saveData.inventory ||
    !Array.isArray(saveData.inventory.items) ||
    !toolData ||
    typeof toolData.slotIndex !== "number"
  ) {
    return false;
  }

  const slotIndex = toolData.slotIndex;

  const axe =
    saveData.inventory.items[slotIndex];

  if (!axe) {
    return false;
  }

  if (typeof axe.durability !== "number") {
    return true;
  }

  const durabilityCost =
    getDiscoveryToolDurabilityCost(
      axe,
      1
    );

  axe.durability = Math.max(
    0,
    axe.durability - durabilityCost
  );

  if (axe.durability <= 0) {
    const axeName =
      getDiscoveryItemName(axe);

    saveData.inventory.items[
      slotIndex
    ] = null;

    addDiscoveryLog(
      t("treeAxeBroke", {
        tool: axeName
      })
    );
  }

  return true;
}

function startChopTreeAction(
  chopTreeButton
) {
  if (isDiscoveryTimedActionInProgress) {
    return;
  }

  const currentTileId = getTileId(
    discoveryState.x,
    discoveryState.y
  );

  const tileData =
    getTileSpecialData(currentTileId);

  if (!isCurrentTileTreeArea(tileData)) {
    return;
  }

  if (isTreeCutOnCurrentTile()) {
    addDiscoveryLog(t("treeAlreadyCut"));
    updateTileActionPanel();
    return;
  }

  const saveData =
    getMainSaveData();

  const axeData =
    findMainInventoryToolByGroup(
      "axe",
      saveData
    );

  if (!axeData) {
    addDiscoveryLog(t("axeRequired"));
    updateTileActionPanel();
    return;
  }

  const inventoryPreview =
    simulateAddLootItemsToInventory(
      saveData,
      [
        {
          itemId: "woodLog",
          quantity: 1
        }
      ]
    );

  if (!inventoryPreview) {
    addDiscoveryLog(
      t("inventoryFullOrTooHeavy")
    );
    return;
  }

  startDiscoveryTimedAction({
    button: chopTreeButton,
    durationMs: 4000,
    actionCostKey: "chopTree",
    progressTextKey:
      "choppingInProgress",

    onComplete: function () {
      chopCurrentTree();
    }
  });
}

function chopCurrentTree() {
  const currentTileId = getTileId(
    discoveryState.x,
    discoveryState.y
  );

  const tileData =
    getTileSpecialData(currentTileId);

  if (!isCurrentTileTreeArea(tileData)) {
    return;
  }

  if (isTreeCutOnCurrentTile()) {
    addDiscoveryLog(t("treeAlreadyCut"));
    updateTileActionPanel();
    return;
  }

  const initialSaveData =
    getMainSaveData();

  const initialAxeData =
    findMainInventoryToolByGroup(
      "axe",
      initialSaveData
    );

  if (!initialAxeData) {
    addDiscoveryLog(t("axeRequired"));
    updateTileActionPanel();
    return;
  }

  const inventoryPreview =
    simulateAddLootItemsToInventory(
      initialSaveData,
      [
        {
          itemId: "woodLog",
          quantity: 1
        }
      ]
    );

  if (!inventoryPreview) {
    addDiscoveryLog(
      t("inventoryFullOrTooHeavy")
    );
    return;
  }

  const updatedSaveData =
    getMainSaveData();

  if (
    !updatedSaveData ||
    !updatedSaveData.inventory
  ) {
    return;
  }

  const updatedAxeData =
    findMainInventoryToolByGroup(
      "axe",
      updatedSaveData
    );

  if (!updatedAxeData) {
    addDiscoveryLog(t("axeRequired"));
    return;
  }

  const treeLoot = [
    {
      itemId: "woodLog",
      quantity: 1
    }
  ];

  const updatedInventoryPreview =
    simulateAddLootItemsToInventory(
      updatedSaveData,
      treeLoot
    );

  if (!updatedInventoryPreview) {
    addDiscoveryLog(
      t("inventoryFullOrTooHeavy")
    );
    return;
  }

  const durabilityApplied =
  applyTreeAxeDurabilityCost(
    updatedSaveData,
    updatedAxeData
  );

  if (!durabilityApplied) {
    addDiscoveryLog(t("axeRequired"));
    return;
  }

  saveMainSaveData(updatedSaveData);

  experience({
    lumberjack: 6
  });

  ensureCutTreesState();

  const currentMapId =
    discoveryState.currentMapId;

  if (
    !discoveryState.cutTrees[
      currentMapId
    ].includes(currentTileId)
  ) {
    discoveryState.cutTrees[
      currentMapId
    ].push(currentTileId);
  }

  setCurrentTileLoot(
    treeLoot,
    "treeChopping"
  );

  completeDiscoveryGoal("chopFirstTree");

  addDiscoveryLog(
    t("treeChopped", {
      item: getDiscoveryItemName(
        itemsDatabase.woodLog
      )
    })
  );

  saveDiscoveryState();
  renderDiscoveryMap();
}

function isCurrentTileWaterFillArea(tileData) {
  return (
    discoveryState.currentMapId === "lake" &&
    tileData &&
    tileData.resource &&
    tileData.resource.lootTable === "lakeShoreDebris"
  );
}

function findFillableWaterContainer(saveData) {
  if (
    !saveData ||
    !saveData.inventory ||
    !Array.isArray(saveData.inventory.items)
  ) {
    return null;
  }

  for (
    let slotIndex = 0;
    slotIndex <
    saveData.inventory.items.length;
    slotIndex++
  ) {
    const item =
      saveData.inventory.items[slotIndex];

    if (
      !item ||
      item.category !== "container" ||
      !item.containerData
    ) {
      continue;
    }

    const allowedLiquids =
      item.containerData.allowedLiquids || [];

    if (
      !allowedLiquids.includes("freshWater")
    ) {
      continue;
    }

    const capacity = Number(
      item.containerData.capacity || 0
    );

    const currentAmount =
      item.contents &&
      item.contents.itemId === "freshWater"
        ? Number(item.contents.amount || 0)
        : 0;

    if (currentAmount < capacity) {
      return {
        slotIndex: slotIndex,
        item: item,
        capacity: capacity,
        currentAmount: currentAmount
      };
    }
  }

  return null;
}

function findEmptySavedInventorySlot(inventoryItems) {
  if (!Array.isArray(inventoryItems)) {
    return -1;
  }

  return inventoryItems.findIndex(function (item) {
    return item === null;
  });
}

function fillWaterContainer() {
  const currentTileId = getTileId(
    discoveryState.x,
    discoveryState.y
  );

  const tileData =
    getTileSpecialData(currentTileId);

  if (!isCurrentTileWaterFillArea(tileData)) {
    return;
  }

  const saveData = getMainSaveData();

  if (
    !saveData ||
    !saveData.inventory ||
    !Array.isArray(
      saveData.inventory.items
    )
  ) {
    return;
  }

  const containerData =
    findFillableWaterContainer(saveData);

  if (!containerData) {
    addDiscoveryLog(
      t("fillableWaterContainerRequired")
    );
    return;
  }

  const slotIndex =
    containerData.slotIndex;

  let targetContainer =
    saveData.inventory.items[slotIndex];

  const quantity = Number(
    targetContainer.quantity || 1
  );

  if (quantity > 1) {
    const emptySlotIndex =
      findEmptySavedInventorySlot(
        saveData.inventory.items
      );

    if (emptySlotIndex === -1) {
      addDiscoveryLog(
        t("containerNeedsEmptySlot")
      );
      return;
    }

    targetContainer.quantity =
      quantity - 1;

    saveData.inventory.items[
      emptySlotIndex
    ] = {
      ...itemsDatabase[targetContainer.id],
      quantity: 1,
      contents: null
    };

    targetContainer =
      saveData.inventory.items[
        emptySlotIndex
      ];
  }

  const capacity = Number(
    targetContainer.containerData.capacity || 0
  );

  const currentAmount =
    targetContainer.contents &&
    targetContainer.contents.itemId === "freshWater"
      ? Number(targetContainer.contents.amount || 0)
      : 0;

  const amountToAdd = Math.max(
    0,
    capacity - currentAmount
  );

  const unitWeight = Number(
    targetContainer.containerData.unitWeight || 0.1
  );

  const addedLiquidWeight =
    amountToAdd * unitWeight;

  const currentInventoryWeight =
    getSaveInventoryWeight(
      saveData.inventory.items
    );

  const maxInventoryWeight =
    Number(saveData.inventory.maxWeight || 0);

  if (
    currentInventoryWeight +
    addedLiquidWeight >
    maxInventoryWeight
  ) {
    addDiscoveryLog(
      t("inventoryTooHeavyForWater")
    );

    return;
  }

  targetContainer.contents = {
    itemId: "freshWater",
    amount: capacity
  };

  if (!payDiscoveryActionCost("fillWater")) {
    return;
  }

  const updatedSaveData =
    getMainSaveData();

  if (!updatedSaveData) {
    return;
  }

  updatedSaveData.inventory.items =
    saveData.inventory.items;

  saveMainSaveData(updatedSaveData);

  completeDiscoveryGoal(
    "collectFreshWater"
  );

  addDiscoveryLog(
    t("waterContainerFilled", {
      container:
        getDiscoveryItemName(
          targetContainer
        ),
      amount: capacity,
      ml: capacity * 100
    })
  );

  updateTileActionPanel();
}

function ensureDepletedActionTilesState() {
  if (!discoveryState.depletedActionTiles) {
    discoveryState.depletedActionTiles = {};
  }

  return discoveryState.depletedActionTiles;
}

function getCurrentTileIdForAction() {
  return getTileId(discoveryState.x, discoveryState.y);
}

function isActionTileDepleted(mapId, tileId, actionId) {
  const depletedState = ensureDepletedActionTilesState();

  return Boolean(
    depletedState[mapId] &&
    depletedState[mapId][tileId] &&
    depletedState[mapId][tileId].actionId === actionId
  );
}

function isCurrentActionTileDepleted(actionId) {
  const mapId = discoveryState.currentMapId;
  const tileId = getCurrentTileIdForAction();

  return isActionTileDepleted(mapId, tileId, actionId);
}

function markActionTileDepleted(mapId, tileId, actionId) {
  const depletedState = ensureDepletedActionTilesState();

  if (!depletedState[mapId]) {
    depletedState[mapId] = {};
  }

  depletedState[mapId][tileId] = {
    actionId,
    depletedAt: Date.now()
  };
}

function markCurrentActionTileDepleted(actionId) {
  const mapId = discoveryState.currentMapId;
  const tileId = getCurrentTileIdForAction();

  markActionTileDepleted(mapId, tileId, actionId);
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

  experience({
    explorer: getLootExplorerExperienceReward(
      pendingLootItems
    )
  });

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

  clearCurrentTileLoot();

  saveDiscoveryState();
  updateTileActionPanel();
}

function leavePendingLoot() {
  discoveryState.pendingLoot = null;

  saveDiscoveryState();
  updateTileActionPanel();
}

function getLootExplorerExperienceReward(lootItems) {
  if (!Array.isArray(lootItems)) {
    return 0;
  }

  let totalExperience = 0;

  lootItems.forEach(function (lootItem) {
    if (
      !lootItem ||
      !lootItem.itemId
    ) {
      return;
    }

    const quantity =
      typeof lootItem.quantity === "number"
        ? lootItem.quantity
        : 1;

    totalExperience += Math.max(
      1,
      Math.ceil(quantity / 2)
    );
  });

  return Math.min(
    totalExperience,
    10
  );
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