const encounterDatabase = {
  rabbit: {
    id: "rabbit",
    name: "Rabbit",
    type: "friendly",
    canHunt: true,
    canFight: false,
    huntChance: 50,
    huntToolBonuses: {
      knife: 15,
      spear: 20
    },
    huntToolDurabilityCost: {
      knife: 1,
      spear: 1
    },
    lootTable: [
      { itemId: "rabbitMeat", chance: 55, quantity: 1 },
      { itemId: "rabbitFur", chance: 35, quantity: 1 },
      { itemId: "smallBones", chance: 20, quantityMin: 1, quantityMax: 2 }
    ]
  },

  deer: {
    id: "deer",
    name: "Deer",
    type: "friendly",
    canHunt: true,
    canFight: false,
    huntChance: 22,
    huntToolBonuses: {
      spear: 35,
      knife: 5
    },
    huntToolDurabilityCost: {
      spear: 2,
      knife: 4
    },
    lootTable: [
      { itemId: "rawMeat", chance: 80, quantityMin: 1, quantityMax: 3 },
      { itemId: "animalHide", chance: 55, quantity: 1 },
      { itemId: "animalBone", chance: 35, quantityMin: 1, quantityMax: 2 }
    ]
  },

  smallBird: {
    id: "smallBird",
    name: "Small Bird",
    type: "friendly",
    canHunt: true,
    canFight: false,
    huntChance: 35,
    huntToolBonuses: {
      spear: 10,
      knife: 5
    },
    huntToolDurabilityCost: {
      spear: 1,
      knife: 1
    },
    lootTable: [
      { itemId: "feather", chance: 75, quantityMin: 1, quantityMax: 3 }
    ]
  },

  mufflon: {
    id: "mufflon",
    name: "Mufflon",
    type: "friendly",
    canHunt: true,
    canFight: false,
    huntChance: 18,
    huntToolBonuses: {
      spear: 35,
      knife: 5
    },
    huntToolDurabilityCost: {
      spear: 2,
      knife: 4
    },
    lootTable: [
      { itemId: "wool", chance: 55, quantityMin: 1, quantityMax: 3 },
      { itemId: "rawMeat", chance: 65, quantityMin: 1, quantityMax: 3},
      { itemId: "animalBone", chance: 65, quantityMin: 1, quantityMax: 3},
    ]
  },

  beeHive: {
    id: "beeHive",
    name: "Bee Hive",
    type: "friendly",
    canHunt: true,
    canFight: false,
    huntChance: 35,
    huntToolBonuses: {
      spear: 25,
      knife: 10
    },
    huntToolDurabilityCost: {
      spear: 1,
      knife: 1
    },
    lootTable: [
      { itemId: "honeycomb", chance: 60, quantity: 1 },
      { itemId: "beeswax", chance: 30, quantity: 1 }
    ]
  },

  wildDog: {
    id: "wildDog",
    name: "Wild Dog",
    type: "enemy",
    canHunt: false,
    canFight: true,
    fightChance: 45,
    failedFightDamage: 12,
    fightToolBonuses: {
      knife: 15,
      spear: 25
    },
    fightToolDurabilityCost: {
      knife: 2,
      spear: 4
    },
    lootTable: [
      { itemId: "rawMeat", chance: 35, quantityMin: 1, quantityMax: 2 },
      { itemId: "animalHide", chance: 22, quantity: 1 },
      { itemId: "animalBone", chance: 28, quantityMin: 1, quantityMax: 2 }
    ]
  },

  wolf: {
    id: "wolf",
    name: "Wolf",
    type: "enemy",
    canHunt: false,
    canFight: true,
    fightChance: 32,
    failedFightDamage: 20,
    fightToolBonuses: {
      knife: 12,
      spear: 30
    },
    fightToolDurabilityCost: {
      knife: 4,
      spear: 6
    },
    lootTable: [
      { itemId: "wolfPelt", chance: 40, quantity: 1 },
      { itemId: "rawMeat", chance: 45, quantityMin: 1, quantityMax: 3 },
      { itemId: "animalBone", chance: 30, quantityMin: 1, quantityMax: 2 },
      { itemId: "wolfTooth", chance: 18, quantityMin: 1, quantityMax: 3 }
    ]
  },

  wildBoar: {
    id: "wildBoar",
    name: "Wild Boar",
    type: "enemy",
    canHunt: false,
    canFight: true,
    fightChance: 35,
    failedFightDamage: 18,
    fightToolBonuses: {
      knife: 8,
      spear: 30
    },
    fightToolDurabilityCost: {
      knife: 8,
      spear: 12
    },
    lootTable: [
      { itemId: "thickHide", chance: 45, quantity: 1 },
      { itemId: "animalFat", chance: 35, quantityMin: 1, quantityMax: 2 },
      { itemId: "animalBone", chance: 30, quantityMin: 1, quantityMax: 2 }
    ]
  },

  snake: {
    id: "snake",
    name: "Snake",
    type: "enemy",
    canHunt: false,
    canFight: true,
    fightChance: 42,
    failedFightDamage: 10,
    fightToolBonuses: {
      knife: 20,
      spear: 15
    },
    fightToolDurabilityCost: {
      knife: 1,
      spear: 2
    },
    lootTable: [
      { itemId: "venomSac", chance: 30, quantity: 1 },
      { itemId: "snakeSkin", chance: 45, quantityMin: 1, quantityMax: 2 }
    ]
  },

  bear: {
    id: "bear",
    name: "Bear",
    type: "enemy",
    canHunt: false,
    canFight: true,
    fightChance: 12,
    failedFightDamage: 40,
    fightToolBonuses: {
      knife: 5,
      spear: 25
    },
    fightToolDurabilityCost: {
      knife: 6,
      spear: 10
    },
    lootTable: [
      { itemId: "bearPelt", chance: 35, quantity: 1 },
      { itemId: "bearClaw", chance: 20, quantityMin: 1, quantityMax: 2 },
      { itemId: "animalFat", chance: 45, quantityMin: 1, quantityMax: 3 },
      { itemId: "animalBone", chance: 30, quantityMin: 1, quantityMax: 3 },
      { itemId: "rawMeat", chance: 65, quantityMin: 2, quantityMax: 6 }
    ]
  },

  alligator: {
    id: "alligator",
    name: "Alligator",
    type: "enemy",
    canHunt: false,
    canFight: true,
    fightChance: 18,
    failedFightDamage: 32,
    fightToolBonuses: {
      knife: 5,
      spear: 30
    },
    fightToolDurabilityCost: {
      knife: 6,
      spear: 20
    },
    lootTable: [
      { itemId: "scalyHide", chance: 45, quantity: 1 },
      { itemId: "animalFat", chance: 35, quantityMin: 1, quantityMax: 2 },
      { itemId: "animalBone", chance: 30, quantityMin: 2, quantityMax: 4 },
      { itemId: "rawMeat", chance: 60, quantityMin: 2, quantityMax: 3 }
    ]
  },

  fish: {
    id: "fish",
    name: "Fish",
    type: "friendly",
    canHunt: true,
    canFight: false,
    huntChance: 25,
    huntToolBonuses: {
      spear: 30,
      knife: 5
    },
    huntToolDurabilityCost: {
      spear: 1,
      knife: 4
    },
    lootTable: [
      { itemId: "fishMeat", chance: 65, quantity: 1 },
      { itemId: "fishOil", chance: 20, quantity: 1 },
      { itemId: "fishBone", chance: 25, quantity: 1 }
    ]
  },

  spider: {
    id: "spider",
    name: "Spider",
    type: "enemy",
    canHunt: false,
    canFight: true,
    fightChance: 50,
    failedFightDamage: 4,
    fightToolBonuses: {
      knife: 20,
      spear: 10
    },
    fightToolDurabilityCost: {
      knife: 1,
      spear: 2
    },

    lootTable: [
      { itemId: "spiderSilk", chance: 45, quantityMin: 1, quantityMax: 2 }
    ]
  }
};

function rollEncounterFromTable(encounterTableId) {
  const map = getCurrentMap();

  if (!map.encounterTables || !map.encounterTables[encounterTableId]) {
    return null;
  }

  const encounterTable = map.encounterTables[encounterTableId];

  let roll = Math.random() * 100;
  let cumulativeChance = 0;

  for (let encounterEntry of encounterTable) {
    cumulativeChance += encounterEntry.chance;

    if (roll <= cumulativeChance) {
      return {
        id: encounterEntry.id,
        type: encounterEntry.type
      };
    }
  }

  return null;
}

function rollCurrentTileEncounter() {
  const currentTileId = getTileId(discoveryState.x, discoveryState.y);
  const tileData = getTileSpecialData(currentTileId);

  discoveryState.pendingEncounter = null;
  discoveryState.selectedHuntTool = null;

  if (!tileData.encounter) {
    return;
  }

  const encounterResult = rollEncounterFromTable(
    tileData.encounter.encounterTable
  );

  if (!encounterResult) {
    return;
  }

  discoveryState.pendingEncounter = {
    tileId: currentTileId,
    id: encounterResult.id,
    type: encounterResult.type
  };
}

function clearPendingEncounter() {
  discoveryState.pendingEncounter = null;
  discoveryState.selectedHuntTool = null;
  discoveryState.selectedFightTool = null;

  saveDiscoveryState();
  updateTileActionPanel();
}

function getEncounterName(encounterId) {
  const encounterData = encounterDatabase[encounterId];

  if (!encounterData) {
    return encounterId;
  }

  return encounterData.name;
}

function getEncounterDescription(encounter) {
  const encounterData = encounterDatabase[encounter.id];

  if (encounterData && encounterData.canHunt) {
    return t("encounterCanHunt");
  }

  if (encounter.type === "enemy") {
    return t("encounterEnemyNearby");
  }

  if (encounter.type === "friendly") {
    return t("encounterFriendlyNearby");
  }

  return t("encounterSomethingNearby");
}

function getLootEntryQuantity(lootEntry) {
  if (
    typeof lootEntry.quantityMin === "number" &&
    typeof lootEntry.quantityMax === "number"
  ) {
    return Math.floor(
      Math.random() *
        (lootEntry.quantityMax - lootEntry.quantityMin + 1)
    ) + lootEntry.quantityMin;
  }

  return lootEntry.quantity || 1;
}

function rollMultipleLootFromTable(lootTable) {
  if (!lootTable) {
    return [];
  }

  const lootResults = [];

  for (let lootEntry of lootTable) {
    const roll = Math.random() * 100;

    if (roll <= lootEntry.chance) {
      lootResults.push({
        itemId: lootEntry.itemId,
        quantity: getLootEntryQuantity(lootEntry)
      });
    }
  }

  return lootResults;
}

function rollEncounterLoot(encounterData) {
  if (!encounterData || !encounterData.lootTable) {
    return [];
  }

  return rollMultipleLootFromTable(encounterData.lootTable);
}

function rollFightLoot(encounterData) {
  if (!encounterData || !encounterData.lootTable) {
    return [];
  }

  return rollMultipleLootFromTable(encounterData.lootTable);
}

function getAvailableHuntTools(encounterData) {
  const saveData = getMainSaveData();

  if (!saveData || !saveData.inventory || !saveData.inventory.items) {
    return [];
  }

  if (!encounterData.huntToolBonuses) {
    return [];
  }

  const availableTools = [];

  for (let slotIndex = 0; slotIndex < saveData.inventory.items.length; slotIndex++) {
    const item = saveData.inventory.items[slotIndex];

    if (item === null) {
      continue;
    }

    if (!item.toolTags) {
      continue;
    }

    for (let toolGroupName in encounterData.huntToolBonuses) {
      if (item.toolTags.includes(toolGroupName)) {
        availableTools.push({
          slotIndex: slotIndex,
          itemId: item.id,
          toolGroup: toolGroupName,
          bonus: encounterData.huntToolBonuses[toolGroupName]
        });

        break;
      }
    }
  }

  return availableTools;
}

function getSavedInventoryItem(slotIndex) {
  const saveData = getMainSaveData();

  if (!saveData || !saveData.inventory || !saveData.inventory.items) {
    return null;
  }

  return saveData.inventory.items[slotIndex] || null;
}

function getHuntToolButtonLabel(toolData) {
  const toolItem = getSavedInventoryItem(toolData.slotIndex);
  const databaseItem = itemsDatabase[toolData.itemId];

  if (!toolItem || !databaseItem) {
    return "";
  }

  let label =
    getDiscoveryItemName(databaseItem) +
    " +" +
    toolData.bonus +
    "%";

  if (
    typeof toolItem.durability === "number" &&
    typeof toolItem.maxDurability === "number"
  ) {
    label +=
      " (" +
      toolItem.durability +
      "/" +
      toolItem.maxDurability +
      ")";
  }

  return label;
}

function selectHuntTool(toolData) {
  discoveryState.selectedHuntTool = toolData;

  saveDiscoveryState();
  updateTileActionPanel();
}

function clearSelectedHuntTool() {
  discoveryState.selectedHuntTool = null;

  saveDiscoveryState();
  updateTileActionPanel();
}

function getSelectedHuntToolBonus(encounterData) {
  if (!discoveryState.selectedHuntTool) {
    return 0;
  }

  if (!encounterData.huntToolBonuses) {
    return 0;
  }

  const selectedToolGroup = discoveryState.selectedHuntTool.toolGroup;

  return encounterData.huntToolBonuses[selectedToolGroup] || 0;
}

function getFinalHuntChance(encounterData) {
  const baseChance = encounterData.huntChance || 0;
  const toolBonus = getSelectedHuntToolBonus(encounterData);

  return Math.min(95, baseChance + toolBonus);
}

function getDiscoveryToolDurabilityCost(tool, baseCost) {
  if (!tool) {
    return baseCost;
  }

  if (tool.toolTier === "iron") {
    return Math.max(1, Math.ceil(baseCost * 0.25));
  }

  if (tool.toolTier === "copper") {
    return Math.max(1, Math.ceil(baseCost * 0.5));
  }

  return baseCost;
}

function getSelectedHuntToolDurabilityCost(encounterData) {
  if (!discoveryState.selectedHuntTool) {
    return 0;
  }

  if (!encounterData.huntToolDurabilityCost) {
    return 1;
  }

  const selectedToolGroup = discoveryState.selectedHuntTool.toolGroup;

  return encounterData.huntToolDurabilityCost[selectedToolGroup] || 1;
}

function applySelectedHuntToolDurabilityCost(encounterData) {
  if (!discoveryState.selectedHuntTool) {
    return true;
  }

  const saveData = getMainSaveData();

  if (!saveData || !saveData.inventory || !saveData.inventory.items) {
    discoveryState.selectedHuntTool = null;
    addDiscoveryLog(t("selectedHuntToolMissing"));
    return false;
  }

  const selectedTool = discoveryState.selectedHuntTool;
  const inventoryItem = saveData.inventory.items[selectedTool.slotIndex];

  if (
    inventoryItem === null ||
    inventoryItem.id !== selectedTool.itemId ||
    !inventoryItem.toolTags ||
    !inventoryItem.toolTags.includes(selectedTool.toolGroup)
  ) {
    discoveryState.selectedHuntTool = null;
    saveDiscoveryState();
    addDiscoveryLog(t("selectedHuntToolMissing"));
    updateTileActionPanel();
    return false;
  }

  if (typeof inventoryItem.durability !== "number") {
    return true;
  }

  const baseCost = getSelectedHuntToolDurabilityCost(encounterData);
  const finalCost = getDiscoveryToolDurabilityCost(inventoryItem, baseCost);

  inventoryItem.durability -= finalCost;

  if (inventoryItem.durability <= 0) {
    const toolName = getDiscoveryItemName(inventoryItem);

    saveData.inventory.items[selectedTool.slotIndex] = null;
    discoveryState.selectedHuntTool = null;

    addDiscoveryLog(
      t("huntToolBroke", {
        tool: toolName
      })
    );
  }

  saveMainSaveData(saveData);
  saveDiscoveryState();

  return true;
}

function huntPendingEncounter() {
  if (!discoveryState.pendingEncounter) {
    return;
  }

  const encounter = discoveryState.pendingEncounter;
  const encounterData = encounterDatabase[encounter.id];

  if (!encounterData || !encounterData.canHunt) {
    return;
  }

  if (!payDiscoveryActionCost("hunt")) {
    return;
  }

  const toolStillAvailable =
    applySelectedHuntToolDurabilityCost(encounterData);

    if (!toolStillAvailable) {
    return;
    }

const finalHuntChance = getFinalHuntChance(encounterData);
const huntRoll = Math.random() * 100;

if (huntRoll > finalHuntChance) {
    addDiscoveryLog(
      t("huntEscaped", {
        encounter: getEncounterName(encounter.id)
      })
    );

    discoveryState.pendingEncounter = null;

    saveDiscoveryState();
    updateTileActionPanel();

    return;
  }

  const lootResults = rollEncounterLoot(encounterData);

  discoveryState.pendingEncounter = null;
  discoveryState.selectedHuntTool = null;

  if (lootResults.length === 0) {
    addDiscoveryLog(t("huntSucceededNoLoot"));

    saveDiscoveryState();
    updateTileActionPanel();

    return;
  }

  discoveryState.pendingLoot = {
    tileId: encounter.tileId,
    items: lootResults
  };

  addDiscoveryLog(t("huntSucceeded"));

  saveDiscoveryState();
  updateTileActionPanel();
}

function getAvailableFightTools(encounterData) {
  const saveData = getMainSaveData();

  if (!saveData || !saveData.inventory || !saveData.inventory.items) {
    return [];
  }

  if (!encounterData.fightToolBonuses) {
    return [];
  }

  const availableTools = [];

  for (let slotIndex = 0; slotIndex < saveData.inventory.items.length; slotIndex++) {
    const item = saveData.inventory.items[slotIndex];

    if (item === null || !item.toolTags) {
      continue;
    }

    for (let toolGroupName in encounterData.fightToolBonuses) {
      if (item.toolTags.includes(toolGroupName)) {
        availableTools.push({
          slotIndex: slotIndex,
          itemId: item.id,
          toolGroup: toolGroupName,
          bonus: encounterData.fightToolBonuses[toolGroupName]
        });

        break;
      }
    }
  }

  return availableTools;
}

function selectFightTool(toolData) {
  discoveryState.selectedFightTool = toolData;

  saveDiscoveryState();
  updateTileActionPanel();
}

function clearSelectedFightTool() {
  discoveryState.selectedFightTool = null;

  saveDiscoveryState();
  updateTileActionPanel();
}

function getSelectedFightToolBonus(encounterData) {
  if (!discoveryState.selectedFightTool || !encounterData.fightToolBonuses) {
    return 0;
  }

  const selectedToolGroup = discoveryState.selectedFightTool.toolGroup;

  return encounterData.fightToolBonuses[selectedToolGroup] || 0;
}

function getFinalFightChance(encounterData) {
  const baseChance = encounterData.fightChance || 0;
  const toolBonus = getSelectedFightToolBonus(encounterData);

  return Math.min(95, baseChance + toolBonus);
}

function getFightToolButtonLabel(toolData) {
  const toolItem = getSavedInventoryItem(toolData.slotIndex);
  const databaseItem = itemsDatabase[toolData.itemId];

  if (!toolItem || !databaseItem) {
    return "";
  }

  let label =
    getDiscoveryItemName(databaseItem) +
    " +" +
    toolData.bonus +
    "%";

  if (
    typeof toolItem.durability === "number" &&
    typeof toolItem.maxDurability === "number"
  ) {
    label +=
      " (" +
      toolItem.durability +
      "/" +
      toolItem.maxDurability +
      ")";
  }

  return label;
}

function getSelectedFightToolDurabilityCost(encounterData) {
  if (!discoveryState.selectedFightTool) {
    return 0;
  }

  if (!encounterData.fightToolDurabilityCost) {
    return 1;
  }

  const selectedToolGroup = discoveryState.selectedFightTool.toolGroup;

  return encounterData.fightToolDurabilityCost[selectedToolGroup] || 1;
}

function applySelectedFightToolDurabilityCost(encounterData) {
  if (!discoveryState.selectedFightTool) {
    return true;
  }

  const saveData = getMainSaveData();

  if (!saveData || !saveData.inventory || !saveData.inventory.items) {
    discoveryState.selectedFightTool = null;
    addDiscoveryLog(t("selectedFightToolMissing"));
    return false;
  }

  const selectedTool = discoveryState.selectedFightTool;
  const inventoryItem = saveData.inventory.items[selectedTool.slotIndex];

  if (
    inventoryItem === null ||
    inventoryItem.id !== selectedTool.itemId ||
    !inventoryItem.toolTags ||
    !inventoryItem.toolTags.includes(selectedTool.toolGroup)
  ) {
    discoveryState.selectedFightTool = null;
    saveDiscoveryState();
    addDiscoveryLog(t("selectedFightToolMissing"));
    updateTileActionPanel();
    return false;
  }

  if (typeof inventoryItem.durability !== "number") {
    return true;
  }

  const baseCost = getSelectedFightToolDurabilityCost(encounterData);
  const finalCost = getDiscoveryToolDurabilityCost(inventoryItem, baseCost);

  inventoryItem.durability -= finalCost;

  if (inventoryItem.durability <= 0) {
    const toolName = getDiscoveryItemName(inventoryItem);

    saveData.inventory.items[selectedTool.slotIndex] = null;
    discoveryState.selectedFightTool = null;

    addDiscoveryLog(
      t("fightToolBroke", {
        tool: toolName
      })
    );
  }

  saveMainSaveData(saveData);
  saveDiscoveryState();

  return true;
}

function updateMainCharacterStat(statName, amount) {
  const saveData = getMainSaveData();

  if (!saveData) {
    return false;
  }

  const currentValue = saveData[statName] ?? 100;
  const newValue = Math.max(0, Math.min(100, currentValue + amount));

  saveData[statName] = newValue;
  saveMainSaveData(saveData);

  return true;
}

function getMainCharacterStat(statName) {
  const saveData = getMainSaveData();

  if (!saveData) {
    return 100;
  }

  return saveData[statName] ?? 100;
}

function fleePendingEncounter() {
  if (!discoveryState.pendingEncounter) {
    return;
  }

  const encounter = discoveryState.pendingEncounter;
  const encounterData = encounterDatabase[encounter.id];

  if (!encounterData || !encounterData.canFight) {
    return;
  }

  if (!payDiscoveryActionCost("flee")) {
    return;
  }

  discoveryState.pendingEncounter = null;
  discoveryState.selectedFightTool = null;

  addDiscoveryLog(t("fleeSucceeded"));

  saveDiscoveryState();
  updateTileActionPanel();
}

function damageRandomEquippedClothing(durabilityLoss) {
  const saveData = getMainSaveData();

  if (
    !saveData ||
    !saveData.equipment ||
    typeof saveData.equipment !== "object"
  ) {
    return [];
  }

  const equippedClothing = [];

  for (let slotName in saveData.equipment) {
    const equippedItem = saveData.equipment[slotName];

    if (!equippedItem || equippedItem.type !== "clothing") {
      continue;
    }

    const databaseItem = itemsDatabase[equippedItem.id];

    const maxDurability = Number(
      equippedItem.maxDurability ??
      databaseItem?.maxDurability ??
      databaseItem?.durability ??
      0
    );

    if (maxDurability <= 0) {
      continue;
    }

    equippedClothing.push({
      slotName,
      item: equippedItem,
      databaseItem,
      maxDurability
    });
  }

  if (equippedClothing.length === 0) {
    return [];
  }

  const selectedEntry =
    equippedClothing[
      Math.floor(Math.random() * equippedClothing.length)
    ];

  const selectedItem = selectedEntry.item;

  const currentDurability = Number(
    selectedItem.durability ?? selectedEntry.maxDurability
  );

  selectedItem.maxDurability = selectedEntry.maxDurability;
  selectedItem.durability = Math.max(
    0,
    currentDurability - durabilityLoss
  );

  const itemData = selectedEntry.databaseItem || selectedItem;
  const itemName = t(itemData.nameKey);

  if (selectedItem.durability > 0) {
    addDiscoveryLog(
      t("clothingDamaged", {
        item: itemName,
        durability: selectedItem.durability,
        maxDurability: selectedItem.maxDurability
      })
    );

    saveMainSaveData(saveData);
    return [];
  }

  saveData.equipment[selectedEntry.slotName] = null;

  const breakLoot =
    selectedItem.breakLoot ||
    selectedEntry.databaseItem?.breakLoot ||
    null;

  const brokenLootItems = [];

  if (breakLoot && breakLoot.itemId) {
    brokenLootItems.push({
      itemId: breakLoot.itemId,
      quantity: breakLoot.quantity || 1
    });
  }

  addDiscoveryLog(
    t("clothingBroken", {
      item: itemName
    })
  );

  saveMainSaveData(saveData);

  return brokenLootItems;
}

function fightPendingEncounter() {
  if (!discoveryState.pendingEncounter) {
    return;
  }

  const encounter = discoveryState.pendingEncounter;
  const encounterData = encounterDatabase[encounter.id];

  if (!encounterData || !encounterData.canFight) {
    return;
  }

  if (!payDiscoveryActionCost("fight")) {
    return;
  }

  const toolStillAvailable =
    applySelectedFightToolDurabilityCost(encounterData);

  if (!toolStillAvailable) {
    return;
  }

  const finalFightChance = getFinalFightChance(encounterData);
  const fightRoll = Math.random() * 100;
  const fightSucceeded = fightRoll <= finalFightChance;

  discoveryState.pendingEncounter = null;
  discoveryState.selectedFightTool = null;

  const clothingDurabilityLoss = fightSucceeded ? 1 : 3;

  const brokenClothingLoot =
    damageRandomEquippedClothing(clothingDurabilityLoss);

  if (!fightSucceeded) {
    const damage = encounterData.failedFightDamage || 10;

    updateMainCharacterStat("health", -damage);

    addDiscoveryLog(
      t("fightFailed", {
        damage: damage
      })
    );

    if (brokenClothingLoot.length > 0) {
      discoveryState.pendingLoot = {
        tileId: encounter.tileId,
        items: brokenClothingLoot
      };
    }

    saveDiscoveryState();
    updateTileActionPanel();

    return;
  }

  const rolledFightLoot = rollFightLoot(encounterData);

  const fightLootResults = Array.isArray(rolledFightLoot)
    ? rolledFightLoot
    : [];

  const clothingLootResults = Array.isArray(brokenClothingLoot)
    ? brokenClothingLoot
    : [];

  const lootResults = [
    ...fightLootResults,
    ...clothingLootResults
  ];

  if (lootResults.length === 0) {
    addDiscoveryLog(t("fightSucceededNoLoot"));

    saveDiscoveryState();
    updateTileActionPanel();

    return;
  }

  discoveryState.pendingLoot = {
    tileId: encounter.tileId,
    items: lootResults
  };

  addDiscoveryLog(t("fightSucceeded"));

  saveDiscoveryState();
  updateTileActionPanel();
}