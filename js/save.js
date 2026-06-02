const SAVE_KEY = "survivalSystemSave";
let isLoadingGame = false;

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
  const saveData = {
    health: health,
    hunger: hunger,
    energy: energy,

    inventory: inventory,
    equipment: equipment,
    craftSlots: craftSlots,

    discoveredRecipes: discoveredRecipes,

    currentLanguage: currentLanguage,
    selectedAreaId: areaSelect ? areaSelect.value : "meadow"
  };

  localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
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

  restoreInventory(saveData.inventory);
  restoreEquipment(saveData.equipment);
  restoreCraftSlots(saveData.craftSlots);

  if (saveData.discoveredRecipes) {
    discoveredRecipes = saveData.discoveredRecipes;
  }

  if (saveData.currentLanguage) {
    currentLanguage = saveData.currentLanguage;
  }

  if (saveData.selectedAreaId && areaSelect) {
    areaSelect.value = saveData.selectedAreaId;
  }

  updateInventoryCapacityFromEquipment();

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