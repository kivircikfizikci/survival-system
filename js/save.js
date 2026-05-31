const SAVE_KEY = "survivalSystemSave";

function restoreItem(savedItem) {
  if (savedItem === null) {
    return null;
  }

  // Önce doğrudan key ile ara
  let databaseItem = itemsDatabase[savedItem.id];

  // Bulamazsa item id üzerinden ara
  if (!databaseItem) {
    databaseItem = Object.values(itemsDatabase).find(function (item) {
      return item.id === savedItem.id;
    });
  }

  // Database'de hâlâ yoksa eski kaydı koru
  if (!databaseItem) {
    return savedItem;
  }

  return {
    ...databaseItem,
    quantity: savedItem.quantity ?? 1
  };
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

  health = saveData.health ?? health;
  hunger = saveData.hunger ?? hunger;
  energy = saveData.energy ?? energy;

  restoreInventory(saveData.inventory);
  restoreEquipment(saveData.equipment);
  restoreCraftSlots(saveData.craftSlots);

  if (saveData.currentLanguage) {
    currentLanguage = saveData.currentLanguage;
  }

  if (saveData.selectedAreaId && areaSelect) {
    areaSelect.value = saveData.selectedAreaId;
  }

  updateInventoryCapacityFromEquipment();
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