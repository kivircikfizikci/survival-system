const encounterDatabase = {
    rabbit: {
        id: "rabbit",
        name: "Rabbit",
        type: "friendly",
        canHunt: true,
        huntChance: 45,

        huntToolBonuses: {
            knife: 15,
            spear: 25
        },

          huntToolDurabilityCost: {
            knife: 1,
            spear: 1
        },

        lootTable: [
            { itemId: "rawMeat", chance: 50, quantity: 1 },
            { itemId: "animalHide", chance: 20, quantity: 1 },
            { itemId: "animalBone", chance: 15, quantity: 1 }
        ]
    },

    deer: {
        id: "deer",
        name: "Deer",
        type: "friendly",
        canHunt: true,
        huntChance: 20,

        huntToolBonuses: {
            spear: 35,
            knife: 5
        },

          huntToolDurabilityCost: {
            spear: 2,
            knife: 2
        },

        lootTable: [
            { itemId: "rawMeat", chance: 65, quantity: 2 },
            { itemId: "animalHide", chance: 45, quantity: 1 },
            { itemId: "animalBone", chance: 25, quantity: 1 }
        ]
    },

    wildDog: {
        id: "wildDog",
        name: "Wild Dog",
        type: "enemy",
        canHunt: false,
        canFight: true,

        fightChance: 45,
        fleeEnergyCost: 8,
        failedFightDamage: 12,

        fightToolBonuses: {
            knife: 15,
            spear: 25
        },

        fightToolDurabilityCost: {
            knife: 1,
            spear: 2
        },

        lootTable: [
            { itemId: "rawMeat", chance: 35, quantity: 1 },
            { itemId: "animalHide", chance: 20, quantity: 1 },
            { itemId: "animalBone", chance: 25, quantity: 1 }
        ]
    },

    strayDog: {
        id: "strayDog",
        name: "Stray Dog",
        type: "friendly",
        canHunt: false,
        canFight: false
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

function rollEncounterLoot(encounterData) {
  if (!encounterData || !encounterData.lootTable) {
    return null;
  }

  let roll = Math.random() * 100;
  let cumulativeChance = 0;

  for (let lootEntry of encounterData.lootTable) {
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

  const lootResult = rollEncounterLoot(encounterData);

  discoveryState.pendingEncounter = null;

  if (!lootResult) {
    addDiscoveryLog(t("huntSucceededNoLoot"));

    saveDiscoveryState();
    updateTileActionPanel();

    return;
  }

  discoveryState.pendingLoot = {
    tileId: encounter.tileId,
    itemId: lootResult.itemId,
    quantity: lootResult.quantity
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

  const energyCost = encounterData.fleeEnergyCost || 5;
  const currentEnergy = getMainCharacterStat("energy");

  if (currentEnergy < energyCost) {
    addDiscoveryLog(t("notEnoughEnergyToFlee"));
    return;
  }

  updateMainCharacterStat("energy", -energyCost);

  discoveryState.pendingEncounter = null;
  discoveryState.selectedFightTool = null;

  addDiscoveryLog(t("fleeSucceeded"));

  saveDiscoveryState();
  updateTileActionPanel();
}

function rollFightLoot(encounterData) {
  if (!encounterData || !encounterData.lootTable) {
    return null;
  }

  let roll = Math.random() * 100;
  let cumulativeChance = 0;

  for (let lootEntry of encounterData.lootTable) {
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

function fightPendingEncounter() {
  if (!discoveryState.pendingEncounter) {
    return;
  }

  const encounter = discoveryState.pendingEncounter;
  const encounterData = encounterDatabase[encounter.id];

  if (!encounterData || !encounterData.canFight) {
    return;
  }

  const toolStillAvailable =
    applySelectedFightToolDurabilityCost(encounterData);

  if (!toolStillAvailable) {
    return;
  }

  const finalFightChance = getFinalFightChance(encounterData);
  const fightRoll = Math.random() * 100;

  discoveryState.pendingEncounter = null;
  discoveryState.selectedFightTool = null;

  if (fightRoll > finalFightChance) {
    const damage = encounterData.failedFightDamage || 10;

    updateMainCharacterStat("health", -damage);

    addDiscoveryLog(
      t("fightFailed", {
        damage: damage
      })
    );

    saveDiscoveryState();
    updateTileActionPanel();

    return;
  }

  const lootResult = rollFightLoot(encounterData);

  if (!lootResult) {
    addDiscoveryLog(t("fightSucceededNoLoot"));

    saveDiscoveryState();
    updateTileActionPanel();

    return;
  }

  discoveryState.pendingLoot = {
    tileId: encounter.tileId,
    itemId: lootResult.itemId,
    quantity: lootResult.quantity
  };

  addDiscoveryLog(t("fightSucceeded"));

  saveDiscoveryState();
  updateTileActionPanel();
}