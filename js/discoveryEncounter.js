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
  const names = {
    rabbit: "Rabbit",
    deer: "Deer",
    wildDog: "Wild Dog",
    strayDog: "Stray Dog"
  };

  return names[encounterId] || encounterId;
}

function getEncounterDescription(encounter) {
  if (encounter.type === "enemy") {
    return "You notice a threat nearby.";
  }

  if (encounter.type === "friendly") {
    return "You notice a living creature nearby.";
  }

  return "Something is nearby.";
}