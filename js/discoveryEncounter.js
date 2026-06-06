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
    canHunt: false
  },

  strayDog: {
    id: "strayDog",
    name: "Stray Dog",
    type: "friendly",
    canHunt: false
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

function playerHasToolGroup(toolGroupName) {
  const saveData = getMainSaveData();

  if (!saveData || !saveData.inventory || !saveData.inventory.items) {
    return false;
  }

  const groupItems = toolGroups[toolGroupName] || [];

  return saveData.inventory.items.some(function (item) {
    return item !== null && groupItems.includes(item.id);
  });
}

function getBestHuntToolBonus(encounterData) {
  if (!encounterData.huntToolBonuses) {
    return 0;
  }

  let bestBonus = 0;

  for (let toolGroupName in encounterData.huntToolBonuses) {
    if (playerHasToolGroup(toolGroupName)) {
      const bonus = encounterData.huntToolBonuses[toolGroupName];

      if (bonus > bestBonus) {
        bestBonus = bonus;
      }
    }
  }

  return bestBonus;
}

function getFinalHuntChance(encounterData) {
  const baseChance = encounterData.huntChance || 0;
  const toolBonus = getBestHuntToolBonus(encounterData);

  return Math.min(95, baseChance + toolBonus);
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