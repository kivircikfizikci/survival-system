const SAVE_KEY = "survivalSystemSave";

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

  const saveData = JSON.parse(savedData);

  health = saveData.health ?? health;
  hunger = saveData.hunger ?? hunger;
  energy = saveData.energy ?? energy;

  inventory = saveData.inventory ?? inventory;
  equipment = saveData.equipment ?? equipment;

  if (saveData.craftSlots) {
    craftSlots = saveData.craftSlots;
  }

  if (saveData.currentLanguage) {
    currentLanguage = saveData.currentLanguage;
  }

  if (saveData.selectedAreaId && areaSelect) {
    areaSelect.value = saveData.selectedAreaId;
  }

  if (typeof updateInventoryCapacityFromEquipment === "function") {
    updateInventoryCapacityFromEquipment();
  }
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