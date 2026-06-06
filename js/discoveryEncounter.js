const encounterDatabase = {
  rabbit: {
    id: "rabbit",
    name: "Rabbit",
    type: "friendly",
    canHunt: true,
    huntChance: 35,
    lootTable: [
      { itemId: "rawMeat", chance: 45, quantity: 1 },
      { itemId: "animalHide", chance: 20, quantity: 1 },
      { itemId: "animalBone", chance: 15, quantity: 1 }
    ]
  },

  deer: {
    id: "deer",
    name: "Deer",
    type: "friendly",
    canHunt: true,
    huntChance: 10,
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

function huntPendingEncounter() {
  if (!discoveryState.pendingEncounter) {
    return;
  }

  const encounter = discoveryState.pendingEncounter;
  const encounterData = encounterDatabase[encounter.id];

  if (!encounterData || !encounterData.canHunt) {
    return;
  }

  const huntRoll = Math.random() * 100;

  if (huntRoll > encounterData.huntChance) {
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