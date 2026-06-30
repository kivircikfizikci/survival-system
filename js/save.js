const SAVE_KEY = "survivalSystemSave";
let isLoadingGame = false;
let isSavingGame = false;
let isPlayerDead = false;

function restoreItem(savedItem) {
  if (savedItem === null) {
    return null;
  }

  let databaseItem = itemsDatabase[savedItem.id];

  if (!databaseItem) {
    databaseItem = Object.values(
      itemsDatabase
    ).find(function (item) {
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

  if (
    databaseItem.category === "container" &&
    databaseItem.containerData
  ) {
    restoredItem.containerData = {
      ...databaseItem.containerData
    };

    if (
      savedItem.contents &&
      savedItem.contents.itemId &&
      Number(savedItem.contents.amount || 0) > 0
    ) {
      restoredItem.contents = {
        itemId: savedItem.contents.itemId,
        amount: Number(
          savedItem.contents.amount || 0
        )
      };
    } else {
      restoredItem.contents = null;
    }
  }

  if (
    typeof databaseItem.maxDurability ===
    "number"
  ) {
    restoredItem.maxDurability =
      databaseItem.maxDurability;
  }

  return restoredItem;
}

function restoreInventory(savedInventory) {
  if (!savedInventory) {
    return;
  }

  inventory = savedInventory;

  inventory.baseSlots = inventory.baseSlots ?? 10;
  inventory.baseMaxWeight = inventory.baseMaxWeight ?? 15;
  inventory.maxWeight = inventory.maxWeight ?? inventory.baseMaxWeight;
  inventory.items = inventory.items ?? [null, null, null, null, null, null, null, null, null, null];

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
  if (
    isSavingGame ||
    isPlayerDead
  ) {
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
    activeGoalsStage: activeGoalsStage,
    starterGoalsRewardClaimed: starterGoalsRewardClaimed,
    trailGoalsRewardClaimed: trailGoalsRewardClaimed,
    buriedStash: buriedStash,

    regionWorkstations: regionWorkstations,
    playerShelter: playerShelter,
    placedStorageContainers: placedStorageContainers,
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

  if (
    saveData.activeGoalsStage === "starter" ||
    saveData.activeGoalsStage === "trail" ||
    saveData.activeGoalsStage === "lake"
  ) {
    activeGoalsStage = saveData.activeGoalsStage;
  } else if (
    saveData.trailGoalsRewardClaimed === true
  ) {
    activeGoalsStage = "lake";
  } else if (
    saveData.starterGoalsRewardClaimed === true
  ) {
    activeGoalsStage = "trail";
  } else {
    activeGoalsStage = "starter";
  }

  starterGoalsRewardClaimed =
  saveData.starterGoalsRewardClaimed === true;
  trailGoalsRewardClaimed =
  saveData.trailGoalsRewardClaimed === true;

  buriedStash = saveData.buriedStash || null;

  if (saveData.currentLanguage) {
    currentLanguage = saveData.currentLanguage;
  }

  if (saveData.playerShelter) {
    playerShelter = saveData.playerShelter;
  }

  if (
    Array.isArray(
      saveData.placedStorageContainers
    )
  ) {
    placedStorageContainers =
      saveData.placedStorageContainers.map(
        function (container) {
          const storageSlots =
            Number(
              container.storageSlots || 8
            );

          const restoredItems =
            Array.isArray(
              container.storageItems
            )
              ? container.storageItems.map(
                  function (item) {
                    return restoreItem(item);
                  }
                )
              : [];

          while (
            restoredItems.length <
            storageSlots
          ) {
            restoredItems.push(null);
          }

          return {
            ...container,
            storageSlots: storageSlots,
            maxWeight: Number(
              container.maxWeight || 15
            ),
            storageItems:
              restoredItems.slice(
                0,
                storageSlots
              )
          };
        }
      );
  } else {
    placedStorageContainers = [];
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
  updateStorageContainerScreen();

  isLoadingGame = false;
}

function resetSave() {
  localStorage.removeItem(SAVE_KEY);

  localStorage.removeItem(
    "survivalSystemDiscoverySave"
  );

  location.reload();
}

function autoSave() {
  if (typeof saveGame === "function") {
    saveGame();
  }
}

function handlePlayerDeath() {
  if (
    isPlayerDead ||
    health > 0
  ) {
    return false;
  }

  isPlayerDead = true;
  health = 0;

  localStorage.removeItem(SAVE_KEY);

  localStorage.removeItem(
    "survivalSystemDiscoverySave"
  );

  const deathMessage =
    t("survivalFailed");

  showMessage(
    deathMessage,
    "error"
  );

  addLog(
    deathMessage,
    "error"
  );

  setTimeout(function () {
    location.reload();
  }, 1500);

  return true;
}