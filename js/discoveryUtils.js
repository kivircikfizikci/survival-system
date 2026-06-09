function columnToLetters(columnIndex) {
  let letters = "";
  let number = columnIndex + 1;

  while (number > 0) {
    const remainder = (number - 1) % 26;
    letters = String.fromCharCode(65 + remainder) + letters;
    number = Math.floor((number - 1) / 26);
  }

  return letters;
}

function getTileId(x, y) {
  return columnToLetters(x) + (y + 1);
}

function getCurrentMap() {
  return mapsDatabase[discoveryState.currentMapId];
}

function isInsideMap(x, y) {
  const map = getCurrentMap();

  return (
    x >= 0 &&
    y >= 0 &&
    x < map.width &&
    y < map.height
  );
}

function getTileSpecialData(tileId) {
  const map = getCurrentMap();

  const specificResource =
    map.resourceTiles && map.resourceTiles[tileId]
      ? map.resourceTiles[tileId]
      : null;

  const defaultResource =
    map.defaultLootTable
      ? {
          lootTable: map.defaultLootTable,
          isDefault: true
        }
      : null;

  return {
    isBlocked: map.blockedTiles.includes(tileId),

    resource: specificResource || defaultResource,

    encounter: map.encounterTiles
      ? map.encounterTiles[tileId] || null
      : null,

    requiredItem: map.requiredItemTiles
      ? map.requiredItemTiles[tileId] || null
      : null,

    exit: map.exits[tileId] || null
  };
}

function playerHasDiscoveryRequiredItem(itemId) {
  const savedData = localStorage.getItem("survivalSystemSave");

  if (!savedData) {
    return false;
  }

  try {
    const saveData = JSON.parse(savedData);

    if (!saveData.inventory || !saveData.inventory.items) {
      return false;
    }

    return saveData.inventory.items.some(function (item) {
      return item !== null && item.id === itemId;
    });
  } catch (error) {
    console.error("Main save could not be checked:", error);
    return false;
  }
}

function canEnterRequiredItemTile(x, y) {
  const tileId = getTileId(x, y);
  const tileData = getTileSpecialData(tileId);

  if (!tileData.requiredItem) {
    return true;
  }

  return playerHasDiscoveryRequiredItem(
    tileData.requiredItem.requiredItemId
  );
}

function isBlockedTile(x, y) {
  const tileId = getTileId(x, y);
  const tileData = getTileSpecialData(tileId);

  return tileData.isBlocked;
}

function isAdjacentToPlayer(x, y) {
  const dx = Math.abs(discoveryState.x - x);
  const dy = Math.abs(discoveryState.y - y);

  return dx <= 1 && dy <= 1 && !(dx === 0 && dy === 0);
}

function canMoveTo(x, y) {
  if (isPlayerSleepingFromSave()) {
    return false;
  }

  if (!isInsideMap(x, y)) {
    return false;
  }

  if (isBlockedTile(x, y)) {
    return false;
  }

  if (!canEnterRequiredItemTile(x, y)) {
    return false;
  }

  return isAdjacentToPlayer(x, y);
}

function getVisitedTilesForCurrentMap() {
  const mapId = discoveryState.currentMapId;

  if (!discoveryState.visitedTiles[mapId]) {
    discoveryState.visitedTiles[mapId] = [];
  }

  return discoveryState.visitedTiles[mapId];
}

function markCurrentTileVisited() {
  const visitedTiles = getVisitedTilesForCurrentMap();
  const currentTileId = getTileId(discoveryState.x, discoveryState.y);

  if (!visitedTiles.includes(currentTileId)) {
    visitedTiles.push(currentTileId);
  }
}

function isPlayerSleepingFromSave() {
  processSleepProgressFromSave();

  const savedData = localStorage.getItem("survivalSystemSave");

  if (!savedData) {
    return false;
  }

  try {
    const saveData = JSON.parse(savedData);

    return (
      saveData.isSleeping === true &&
      saveData.sleepSession &&
      saveData.sleepSession.active === true
    );
  } catch (error) {
    return false;
  }
}

function clampSaveStat(value) {
  value = Number(value);

  if (Number.isNaN(value)) {
    return 0;
  }

  return Math.max(0, Math.min(100, Number(value.toFixed(2))));
}

function processSleepProgressFromSave() {
  const savedData = localStorage.getItem("survivalSystemSave");

  if (!savedData) {
    return false;
  }

  let saveData;

  try {
    saveData = JSON.parse(savedData);
  } catch (error) {
    console.error("Sleep save could not be processed:", error);
    return false;
  }

  if (
    saveData.isSleeping !== true ||
    !saveData.sleepSession ||
    saveData.sleepSession.active !== true
  ) {
    return false;
  }

  if (
    !saveData.inventory ||
    !saveData.inventory.items ||
    typeof saveData.sleepSession.slotIndex !== "number"
  ) {
    saveData.isSleeping = false;
    saveData.activeSleepSlotIndex = null;
    saveData.sleepSession = null;

    localStorage.setItem("survivalSystemSave", JSON.stringify(saveData));
    return true;
  }

  const slotIndex = saveData.sleepSession.slotIndex;
  const sleepItem = saveData.inventory.items[slotIndex];

  if (
    !sleepItem ||
    sleepItem.id !== saveData.sleepSession.itemId ||
    sleepItem.category !== "sleep" ||
    !sleepItem.sleepData
  ) {
    saveData.isSleeping = false;
    saveData.activeSleepSlotIndex = null;
    saveData.sleepSession = null;

    localStorage.setItem("survivalSystemSave", JSON.stringify(saveData));
    return true;
  }

  const sleepData = sleepItem.sleepData;
  const tickMs = gameConfig.sleepTickMs || 30000;
  const now = Date.now();

  let lastTickAt = saveData.sleepSession.lastTickAt || now;
const elapsedMs = now - lastTickAt;
const elapsedTicks = Math.floor(elapsedMs / tickMs);

let health = Number(saveData.health ?? 100);
let hunger = Number(saveData.hunger ?? 100);
let energy = Number(saveData.energy ?? 100);

if (energy >= 100) {
  if (typeof sleepItem.durability === "number") {
    const durabilityCost =
      sleepData.durabilityCostOnSleepEnd || 1;

    sleepItem.durability -= durabilityCost;

    if (sleepItem.durability <= 0) {
      saveData.inventory.items[slotIndex] = null;
    }
  }

  saveData.energy = 100;
  saveData.isSleeping = false;
  saveData.activeSleepSlotIndex = null;
  saveData.sleepSession = null;

  localStorage.setItem("survivalSystemSave", JSON.stringify(saveData));

  return true;
}

if (elapsedTicks <= 0) {
  return false;
}

  let sleepFinished = false;
  let wokeUpHungry = false;

  for (let i = 0; i < elapsedTicks; i++) {
    if (energy >= 100) {
      sleepFinished = true;
      break;
    }

    const hungerCost = sleepData.hungerCostPerTick || 1;

    if (hunger <= hungerCost) {
      wokeUpHungry = true;
      break;
    }

    energy = clampSaveStat(energy + (sleepData.energyPerTick || 1));
    health = clampSaveStat(health + (sleepData.healthPerTick || 0));
    hunger = clampSaveStat(hunger - hungerCost);

    lastTickAt += tickMs;

    if (energy >= 100) {
      sleepFinished = true;
      break;
    }
  }

  saveData.health = health;
  saveData.hunger = hunger;
  saveData.energy = energy;

  saveData.sleepSession.lastTickAt = lastTickAt;

  if (sleepFinished) {
    if (typeof sleepItem.durability === "number") {
      const durabilityCost =
        sleepData.durabilityCostOnSleepEnd || 1;

      sleepItem.durability -= durabilityCost;

      if (sleepItem.durability <= 0) {
        saveData.inventory.items[slotIndex] = null;
      }
    }

    saveData.isSleeping = false;
    saveData.activeSleepSlotIndex = null;
    saveData.sleepSession = null;
  }

  if (wokeUpHungry) {
    saveData.isSleeping = false;
    saveData.activeSleepSlotIndex = null;
    saveData.sleepSession = null;
  }

  localStorage.setItem("survivalSystemSave", JSON.stringify(saveData));

  return true;
}