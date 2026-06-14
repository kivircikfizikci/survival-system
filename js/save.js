const SAVE_KEY = "survivalSystemSave";
let isLoadingGame = false;
let isSavingGame = false;

function restoreItem(savedItem) {
  if (savedItem === null) {
    return null;
  }

  let databaseItem = itemsDatabase[savedItem.id];

  if (!databaseItem) {
    databaseItem = Object.values(itemsDatabase).find(function (item) {
      return item.id === savedItem.id;
    });
  }

  if (!databaseItem) {
    return savedItem;
  }

  const restoredItem = {
    ...databaseItem,
    ...savedItem,
    quantity: savedItem.quantity ?? 1
  };

  if (typeof databaseItem.maxDurability === "number") {
    restoredItem.maxDurability = databaseItem.maxDurability;
  }

  return restoredItem;
}

function restoreInventory(savedInventory) {
  if (!savedInventory) {
    return;
  }

  inventory = savedInventory;

  inventory.baseSlots = inventory.baseSlots ?? 4;
  inventory.baseMaxWeight = inventory.baseMaxWeight ?? 5;
  inventory.maxWeight = inventory.maxWeight ?? inventory.baseMaxWeight;
  inventory.items = inventory.items ?? [null, null, null, null];

  inventory.items = inventory.items.map(function (item) {
    return restoreItem(item);
  });
}

function restoreEquipment(savedEquipment) {
  if (!savedEquipment) {
    return;
  }

  equipment = {
    head: restoreItem(savedEquipment.head ?? null),
    neck: restoreItem(savedEquipment.neck ?? null),
    torso: restoreItem(savedEquipment.torso ?? null),
    hands: restoreItem(savedEquipment.hands ?? null),
    legs: restoreItem(savedEquipment.legs ?? null),
    feet: restoreItem(savedEquipment.feet ?? null),
    bag: restoreItem(savedEquipment.bag ?? null),
    vest: restoreItem(savedEquipment.vest ?? null)
  };
}

function restoreCraftSlots(savedCraftSlots) {
  if (!savedCraftSlots) {
    return;
  }

  craftSlots = savedCraftSlots.map(function (item) {
    return restoreItem(item);
  });
}

function saveGame() {
  if (isSavingGame) {
    return;
  }

  isSavingGame = true;

  const saveData = {
    health: health,
    hunger: hunger,
    energy: energy,

    isSleeping: isSleeping,
    activeSleepSlotIndex: activeSleepSlotIndex,
    sleepSession: sleepSession,

    inventory: inventory,
    equipment: equipment,
    craftSlots: craftSlots,

    completedGoals: completedGoals,
    starterGoalsRewardClaimed: starterGoalsRewardClaimed,
    buriedStash: buriedStash,

    regionWorkstations: regionWorkstations,
    playerShelter: playerShelter,
    discoveredRecipes: discoveredRecipes,
    discoveredItems: discoveredItems,
    currentLanguage: currentLanguage,
  };

  localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));

  isSavingGame = false;
}

function loadGame() {
  const savedData = localStorage.getItem(SAVE_KEY);

  if (savedData === null) {
    return;
  }

  let saveData;

  try {
    saveData = JSON.parse(savedData);
  } catch (error) {
    console.error("Save data could not be loaded:", error);
    localStorage.removeItem(SAVE_KEY);
    return;
  }

  isLoadingGame = true;

  health = saveData.health ?? health;
  hunger = saveData.hunger ?? hunger;
  energy = saveData.energy ?? energy;

  isSleeping = saveData.isSleeping || false;
  activeSleepSlotIndex =
    typeof saveData.activeSleepSlotIndex === "number"
      ? saveData.activeSleepSlotIndex
      : null;

  sleepSession = saveData.sleepSession || null;

  restoreInventory(saveData.inventory);
  restoreEquipment(saveData.equipment);
  restoreCraftSlots(saveData.craftSlots);

  if (Array.isArray(saveData.discoveredRecipes)) {
    discoveredRecipes = saveData.discoveredRecipes;
  }

  if (Array.isArray(saveData.discoveredItems)) {
    discoveredItems = saveData.discoveredItems;
  }

  if (Array.isArray(saveData.completedGoals)) {
    completedGoals = saveData.completedGoals;
  }

  starterGoalsRewardClaimed =
  saveData.starterGoalsRewardClaimed === true;

  buriedStash = saveData.buriedStash || null;

  if (saveData.currentLanguage) {
    currentLanguage = saveData.currentLanguage;
  }

  if (saveData.playerShelter) {
    playerShelter = saveData.playerShelter;
  }

  if (saveData.regionWorkstations) {
    regionWorkstations = saveData.regionWorkstations;
  }

  updateInventoryCapacityFromEquipment();

  processSleepProgress();

  syncSleepStateFromSave();

  if (isSleeping && sleepSession && sleepSession.active) {
    startSleepTimer();
  }

  updateScreen();
  updateInventoryScreen();

  isLoadingGame = false;
}

function resetSave() {
  localStorage.removeItem(SAVE_KEY);
  location.reload();
}

function autoSave() {
  if (typeof saveGame === "function") {
    saveGame();
  }
}