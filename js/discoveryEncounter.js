const encounterDatabase = {
  rabbit: {
    id: "rabbit",
    name: "Rabbit",
    type: "friendly",
    canHunt: true,
    canFight: false,
    huntChance: 50,
    huntToolBonuses: {
      knife: 15,
      spear: 20
    },
    huntToolDurabilityCost: {
      knife: 1,
      spear: 1
    },
    lootTable: [
      { itemId: "rabbitMeat", chance: 55, quantity: 1 },
      { itemId: "rabbitFur", chance: 35, quantity: 1 },
      { itemId: "smallBones", chance: 20, quantityMin: 1, quantityMax: 2 }
    ]
  },

  deer: {
    id: "deer",
    name: "Deer",
    type: "friendly",
    canHunt: true,
    canFight: false,
    huntChance: 22,
    huntToolBonuses: {
      spear: 35,
      knife: 5
    },
    huntToolDurabilityCost: {
      spear: 2,
      knife: 4
    },
    lootTable: [
      { itemId: "rawMeat", chance: 80, quantityMin: 1, quantityMax: 3 },
      { itemId: "animalHide", chance: 55, quantity: 1 },
      { itemId: "animalBone", chance: 35, quantityMin: 1, quantityMax: 2 }
    ]
  },

  smallBird: {
    id: "smallBird",
    name: "Small Bird",
    type: "friendly",
    canHunt: true,
    canFight: false,
    huntChance: 35,
    huntToolBonuses: {
      spear: 10,
      knife: 5
    },
    huntToolDurabilityCost: {
      spear: 1,
      knife: 1
    },
    lootTable: [
      { itemId: "feather", chance: 75, quantityMin: 1, quantityMax: 3 }
    ]
  },

  mufflon: {
    id: "mufflon",
    name: "Mufflon",
    type: "friendly",
    canHunt: true,
    canFight: false,
    huntChance: 18,
    huntToolBonuses: {
      spear: 35,
      knife: 5
    },
    huntToolDurabilityCost: {
      spear: 2,
      knife: 4
    },
    lootTable: [
      { itemId: "wool", chance: 55, quantityMin: 1, quantityMax: 3 },
      { itemId: "rawMeat", chance: 65, quantityMin: 1, quantityMax: 3},
      { itemId: "animalBone", chance: 65, quantityMin: 1, quantityMax: 3},
    ]
  },

  beeHive: {
    id: "beeHive",
    name: "Bee Hive",
    type: "friendly",
    canHunt: true,
    canFight: false,
    huntChance: 35,
    huntToolBonuses: {
      spear: 25,
      knife: 10
    },
    huntToolDurabilityCost: {
      spear: 1,
      knife: 1
    },
    lootTable: [
      { itemId: "honeycomb", chance: 60, quantity: 1 },
      { itemId: "beeswax", chance: 30, quantity: 1 }
    ]
  },

  wildDog: {
    id: "wildDog",
    name: "Wild Dog",
    type: "enemy",
    canHunt: false,
    canFight: true,
    fightChance: 45,
    failedFightDamage: 12,
    fightToolBonuses: {
      knife: 15,
      spear: 25
    },
    fightToolDurabilityCost: {
      knife: 2,
      spear: 4
    },
    lootTable: [
      { itemId: "rawMeat", chance: 35, quantityMin: 1, quantityMax: 2 },
      { itemId: "animalHide", chance: 22, quantity: 1 },
      { itemId: "animalBone", chance: 28, quantityMin: 1, quantityMax: 2 }
    ]
  },

  wolf: {
    id: "wolf",
    name: "Wolf",
    type: "enemy",
    canHunt: false,
    canFight: true,
    fightChance: 32,
    failedFightDamage: 20,
    fightToolBonuses: {
      knife: 12,
      spear: 30
    },
    fightToolDurabilityCost: {
      knife: 4,
      spear: 6
    },
    lootTable: [
      { itemId: "wolfPelt", chance: 40, quantity: 1 },
      { itemId: "rawMeat", chance: 45, quantityMin: 1, quantityMax: 3 },
      { itemId: "animalBone", chance: 30, quantityMin: 1, quantityMax: 2 },
      { itemId: "wolfTooth", chance: 18, quantityMin: 1, quantityMax: 3 }
    ]
  },

  wildBoar: {
    id: "wildBoar",
    name: "Wild Boar",
    type: "enemy",
    canHunt: false,
    canFight: true,
    fightChance: 35,
    failedFightDamage: 18,
    fightToolBonuses: {
      knife: 8,
      spear: 30
    },
    fightToolDurabilityCost: {
      knife: 8,
      spear: 12
    },
    lootTable: [
      { itemId: "thickHide", chance: 45, quantity: 1 },
      { itemId: "animalFat", chance: 35, quantityMin: 1, quantityMax: 2 },
      { itemId: "animalBone", chance: 30, quantityMin: 1, quantityMax: 2 }
    ]
  },

  snake: {
    id: "snake",
    name: "Snake",
    type: "enemy",
    canHunt: false,
    canFight: true,
    fightChance: 42,
    failedFightDamage: 10,
    fightToolBonuses: {
      knife: 20,
      spear: 15
    },
    fightToolDurabilityCost: {
      knife: 1,
      spear: 2
    },
    lootTable: [
      { itemId: "venomSac", chance: 30, quantity: 1 },
      { itemId: "snakeSkin", chance: 45, quantityMin: 1, quantityMax: 2 }
    ]
  },

  bear: {
    id: "bear",
    name: "Bear",
    type: "enemy",
    canHunt: false,
    canFight: true,
    fightChance: 12,
    failedFightDamage: 40,
    fightToolBonuses: {
      knife: 5,
      spear: 25
    },
    fightToolDurabilityCost: {
      knife: 6,
      spear: 10
    },
    lootTable: [
      { itemId: "bearPelt", chance: 35, quantity: 1 },
      { itemId: "bearClaw", chance: 20, quantityMin: 1, quantityMax: 2 },
      { itemId: "animalFat", chance: 45, quantityMin: 1, quantityMax: 3 },
      { itemId: "animalBone", chance: 30, quantityMin: 1, quantityMax: 3 },
      { itemId: "rawMeat", chance: 65, quantityMin: 2, quantityMax: 6 }
    ]
  },

  alligator: {
    id: "alligator",
    name: "Alligator",
    type: "enemy",
    canHunt: false,
    canFight: true,
    fightChance: 18,
    failedFightDamage: 32,
    fightToolBonuses: {
      knife: 5,
      spear: 30
    },
    fightToolDurabilityCost: {
      knife: 6,
      spear: 20
    },
    lootTable: [
      { itemId: "scalyHide", chance: 45, quantity: 1 },
      { itemId: "animalFat", chance: 35, quantityMin: 1, quantityMax: 2 },
      { itemId: "animalBone", chance: 30, quantityMin: 2, quantityMax: 4 },
      { itemId: "rawMeat", chance: 60, quantityMin: 2, quantityMax: 3 }
    ]
  },

  fish: {
    id: "fish",
    name: "Fish",
    type: "friendly",
    canHunt: true,
    canFight: false,
    huntChance: 25,
    huntToolBonuses: {
      spear: 30,
      knife: 5
    },
    huntToolDurabilityCost: {
      spear: 1,
      knife: 4
    },
    lootTable: [
      { itemId: "fishMeat", chance: 65, quantity: 1 },
      { itemId: "fishOil", chance: 20, quantity: 1 },
      { itemId: "fishBone", chance: 25, quantity: 1 }
    ]
  },

  spider: {
    id: "spider",
    name: "Spider",
    type: "enemy",
    canHunt: false,
    canFight: true,
    fightChance: 50,
    failedFightDamage: 4,
    fightToolBonuses: {
      knife: 20,
      spear: 10
    },
    fightToolDurabilityCost: {
      knife: 1,
      spear: 2
    },

    lootTable: [
      { itemId: "spiderSilk", chance: 45, quantityMin: 1, quantityMax: 2 }
    ]
  }
};

let isFishingActionInProgress = false;

const fishingMethods = {
  fishBait: {
    itemId: "fishBait",
    baseChance: 45,
    consumeAmount: 1,
    actionCostKey: "fishBait",
    durationMs: 3000
  },

  spear: {
    toolGroup: "spear",
    baseChance: 30,
    durabilityCost: 3,
    actionCostKey: "fishSpear",
    durationMs: 4000
  },

  oldFishNet: {
    itemId: "oldFishNet",
    baseChance: 60,
    durabilityCost: 4,
    actionCostKey: "fishNet",
    durationMs: 5000
  }
};

const makeshiftRaftFishingBonus = 20;

const fishingLootTable = [
  {
    itemId: "fish",
    chance: 100,
    minQuantity: 1,
    maxQuantity: 2
  },
  {
    itemId: "fishBone",
    chance: 45,
    minQuantity: 1,
    maxQuantity: 1
  },
  {
    itemId: "fishOil",
    chance: 20,
    minQuantity: 1,
    maxQuantity: 1
  }
];

function findSavedInventoryItemById(
  saveData,
  itemId
) {
  if (
    !saveData ||
    !saveData.inventory ||
    !Array.isArray(saveData.inventory.items)
  ) {
    return null;
  }

  for (
    let slotIndex = 0;
    slotIndex < saveData.inventory.items.length;
    slotIndex++
  ) {
    const item =
      saveData.inventory.items[slotIndex];

    if (!item || item.id !== itemId) {
      continue;
    }

    return {
      slotIndex: slotIndex,
      item: item
    };
  }

  return null;
}

function findSavedInventoryToolByGroup(
  saveData,
  toolGroupName
) {
  if (
    !saveData ||
    !saveData.inventory ||
    !Array.isArray(saveData.inventory.items)
  ) {
    return null;
  }

  const allowedToolIds =
    toolGroups[toolGroupName];

  if (!Array.isArray(allowedToolIds)) {
    return null;
  }

  for (
    let slotIndex = 0;
    slotIndex < saveData.inventory.items.length;
    slotIndex++
  ) {
    const item =
      saveData.inventory.items[slotIndex];

    if (
      !item ||
      !item.id ||
      !allowedToolIds.includes(item.id)
    ) {
      continue;
    }

    return {
      slotIndex: slotIndex,
      item: item
    };
  }

  return null;
}

function hasMakeshiftRaftForFishing(
  saveData
) {
  return (
    discoveryState.currentMapId === "lake" &&
    findSavedInventoryItemById(
      saveData,
      "makeshiftRaft"
    ) !== null
  );
}

function getFishingChance(
  fishingMethodId,
  saveData
) {
  const fishingMethod =
    fishingMethods[fishingMethodId];

  if (!fishingMethod) {
    return 0;
  }

  let finalChance =
    Number(fishingMethod.baseChance || 0);

  if (
    hasMakeshiftRaftForFishing(saveData)
  ) {
    finalChance +=
      makeshiftRaftFishingBonus;
  }

  return Math.min(
    95,
    Math.max(0, finalChance)
  );
}

function rollFishingLoot() {
  const lootItems = [];

  for (
    const lootData of fishingLootTable
  ) {
    const lootRoll =
      Math.random() * 100;

    if (lootRoll >= lootData.chance) {
      continue;
    }

    const minQuantity =
      Number(lootData.minQuantity || 1);

    const maxQuantity =
      Number(
        lootData.maxQuantity ||
        minQuantity
      );

    const quantity =
      Math.floor(
        Math.random() *
          (
            maxQuantity -
            minQuantity +
            1
          )
      ) + minQuantity;

    lootItems.push({
      itemId: lootData.itemId,
      quantity: quantity
    });
  }

  return lootItems;
}

function consumeFishingBait(
  saveData,
  baitData,
  consumeAmount
) {
  if (
    !saveData ||
    !saveData.inventory ||
    !Array.isArray(saveData.inventory.items) ||
    !baitData
  ) {
    return false;
  }

  const baitItem =
    saveData.inventory.items[
      baitData.slotIndex
    ];

  if (
    !baitItem ||
    baitItem.id !== "fishBait"
  ) {
    return false;
  }

  const currentQuantity =
    Number(baitItem.quantity || 1);

  if (currentQuantity < consumeAmount) {
    return false;
  }

  const remainingQuantity =
    currentQuantity - consumeAmount;

  if (remainingQuantity <= 0) {
    saveData.inventory.items[
      baitData.slotIndex
    ] = null;
  } else {
    baitItem.quantity =
      remainingQuantity;
  }

  return true;
}

function applyFishingToolDurabilityCost(
  saveData,
  toolData,
  baseCost
) {
  if (
    !saveData ||
    !saveData.inventory ||
    !Array.isArray(saveData.inventory.items) ||
    !toolData ||
    typeof toolData.slotIndex !== "number"
  ) {
    return false;
  }

  const tool =
    saveData.inventory.items[
      toolData.slotIndex
    ];

  if (
    !tool ||
    tool.id !== toolData.item.id
  ) {
    return false;
  }

  if (
    typeof tool.durability !== "number"
  ) {
    return true;
  }

  const finalCost =
    getDiscoveryToolDurabilityCost(
      tool,
      baseCost
    );

  tool.durability = Math.max(
    0,
    tool.durability - finalCost
  );

  if (tool.durability <= 0) {
    const toolName =
      getDiscoveryItemName(tool);

    saveData.inventory.items[
      toolData.slotIndex
    ] = null;

    addDiscoveryLog(
      t("fishingToolBroke", {
        tool: toolName
      })
    );
  }

  return true;
}

function startFishingAction(
  fishingMethodId,
  fishButton
) {
  if (isFishingActionInProgress) {
    return;
  }

  const fishingMethod =
    fishingMethods[fishingMethodId];

  if (!fishingMethod) {
    return;
  }

  const saveData =
    getMainSaveData();

  if (
    !saveData ||
    !saveData.inventory ||
    !Array.isArray(saveData.inventory.items)
  ) {
    return;
  }

  let fishingItemData = null;

  if (fishingMethod.itemId) {
    fishingItemData =
      findSavedInventoryItemById(
        saveData,
        fishingMethod.itemId
      );
  } else if (
    fishingMethod.toolGroup
  ) {
    fishingItemData =
      findSavedInventoryToolByGroup(
        saveData,
        fishingMethod.toolGroup
      );
  }

  if (!fishingItemData) {
    addDiscoveryLog(
      t("fishingItemMissing")
    );

    updateTileActionPanel();
    return;
  }

  if (
    !payDiscoveryActionCost(
      fishingMethod.actionCostKey
    )
  ) {
    return;
  }

  isFishingActionInProgress = true;

  const durationMs =
    Number(
      fishingMethod.durationMs || 3000
    );

  fishButton.disabled = true;
  fishButton.textContent = t("fishingInProgress");

  fishButton.style.setProperty(
    "--fishing-duration",
    durationMs + "ms"
  );

  fishButton.classList.add(
    "is-fishing"
  );

  setTimeout(function () {
    isFishingActionInProgress = false;

    fishAtCurrentTile(
      fishingMethodId
    );
  }, durationMs);
}

function fishAtCurrentTile(
  fishingMethodId
) {
  const currentTileId =
    getTileId(
      discoveryState.x,
      discoveryState.y
    );

  const tileData =
    getTileSpecialData(currentTileId);

  if (
    !tileData ||
    tileData.isFishingSpot !== true
  ) {
    return;
  }

  if (
    discoveryState.pendingEncounter ||
    getPendingLootItems().length > 0
  ) {
    return;
  }

  const fishingMethod =
    fishingMethods[fishingMethodId];

  if (!fishingMethod) {
    return;
  }

  const saveData =
    getMainSaveData();

  if (
    !saveData ||
    !saveData.inventory ||
    !Array.isArray(saveData.inventory.items)
  ) {
    return;
  }

  let fishingItemData = null;

  if (fishingMethod.itemId) {
    fishingItemData =
      findSavedInventoryItemById(
        saveData,
        fishingMethod.itemId
      );
  } else if (fishingMethod.toolGroup) {
    fishingItemData =
      findSavedInventoryToolByGroup(
        saveData,
        fishingMethod.toolGroup
      );
  }

  if (!fishingItemData) {
    addDiscoveryLog(
      t("fishingItemMissing")
    );

    updateTileActionPanel();
    return;
  }

  const fishingChance =
    getFishingChance(
      fishingMethodId,
      saveData
    );

  const fishingSucceeded =
    Math.random() * 100 <
    fishingChance;

  let fishingLoot = [];

  if (fishingSucceeded) {
    fishingLoot = rollFishingLoot();

    const simulatedInventoryItems =
      simulateAddLootItemsToInventory(
        saveData,
        fishingLoot
      );

    if (!simulatedInventoryItems) {
      addDiscoveryLog(
        t("notEnoughInventorySpace")
      );

      return;
    }
  }

  if (
    fishingMethod.consumeAmount
  ) {
    const consumed =
      consumeFishingBait(
        saveData,
        fishingItemData,
        fishingMethod.consumeAmount
      );

    if (!consumed) {
      return;
    }
  }

  if (
    fishingMethod.durabilityCost
  ) {
    const durabilityApplied =
      applyFishingToolDurabilityCost(
        saveData,
        fishingItemData,
        fishingMethod.durabilityCost
      );

    if (!durabilityApplied) {
      return;
    }
  }

  if (!fishingSucceeded) {
    saveMainSaveData(saveData);
    addDiscoveryLog(
      t("fishingFailed")
    );

    updateTileActionPanel();
    return;
  }

  if (
    saveData.activeGoalsStage === "lake"
  ) {
    if (
      !Array.isArray(
        saveData.completedGoals
      )
    ) {
      saveData.completedGoals = [];
    }

    if (
      !saveData.completedGoals.includes(
        "catchFirstFish"
      )
    ) {
      saveData.completedGoals.push(
        "catchFirstFish"
      );
    }
  }

  saveMainSaveData(saveData);

  discoveryState.pendingLoot = {
    source: "fishing",
    items: fishingLoot
  };

  saveDiscoveryState();

  addDiscoveryLog(
    t("fishingSucceeded")
  );

  renderDiscoveryMap();
}

function renderFishingActions() {
  const saveData = getMainSaveData();

  if (
    !saveData ||
    !saveData.inventory ||
    !Array.isArray(saveData.inventory.items)
  ) {
    return;
  }

  const fishingCard =
    document.createElement("div");

  fishingCard.classList.add(
    "encounter-card",
    "encounter-card-friendly"
  );

  const fishingTitle =
    document.createElement("strong");

  fishingTitle.textContent =
    t("fishingSpot");

  fishingCard.appendChild(
    fishingTitle
  );

  const selectedFishingMethod =
    discoveryState.selectedFishingMethod;

  const chanceText =
    document.createElement("span");

  chanceText.classList.add(
    "encounter-hunt-chance"
  );

  if (
    selectedFishingMethod &&
    fishingMethods[selectedFishingMethod]
  ) {
    chanceText.textContent = t(
      "fishingChance",
      {
        chance: getSelectedFishingChance()
      }
    );
  } else {
    chanceText.textContent =
      t("selectFishingMethod");
  }

  fishingCard.appendChild(chanceText);

  const methodSelector =
    document.createElement("div");

  methodSelector.classList.add(
    "hunt-tool-selector"
  );

  const noMethodButton =
    document.createElement("button");

  noMethodButton.type = "button";
  noMethodButton.classList.add(
    "hunt-tool-button"
  );

  if (
    discoveryState.selectedFishingMethod ===
    null
  ) {
    noMethodButton.classList.add(
      "is-selected"
    );
  }

  noMethodButton.textContent =
    t("noTool");

  noMethodButton.addEventListener(
    "click",
    function () {
      clearSelectedFishingMethod();
    }
  );

  methodSelector.appendChild(
    noMethodButton
  );

  for (
    const fishingMethodId in
      fishingMethods
  ) {
    const fishingMethod =
      fishingMethods[fishingMethodId];

    let fishingItemData = null;

    if (fishingMethod.itemId) {
      fishingItemData =
        findSavedInventoryItemById(
          saveData,
          fishingMethod.itemId
        );
    } else if (
      fishingMethod.toolGroup
    ) {
      fishingItemData =
        findSavedInventoryToolByGroup(
          saveData,
          fishingMethod.toolGroup
        );
    }

    if (!fishingItemData) {
      continue;
    }

    const methodButton =
      document.createElement("button");

    methodButton.type = "button";
    methodButton.classList.add(
      "hunt-tool-button"
    );

    if (
      discoveryState.selectedFishingMethod ===
      fishingMethodId
    ) {
      methodButton.classList.add(
        "is-selected"
      );
    }

    methodButton.textContent =
      getFishingMethodButtonLabel(
        fishingMethodId
      );

    methodButton.addEventListener(
      "click",
      function () {
        selectFishingMethod(
          fishingMethodId
        );
      }
    );

    methodSelector.appendChild(
      methodButton
    );
  }

  fishingCard.appendChild(
    methodSelector
  );

  if (
    hasMakeshiftRaftForFishing(saveData)
  ) {
    const raftBonusText =
      document.createElement("span");

    raftBonusText.classList.add(
      "encounter-hunt-chance"
    );

    raftBonusText.textContent =
      t("fishingRaftBonus", {
        bonus:
          makeshiftRaftFishingBonus
      });

    fishingCard.appendChild(
      raftBonusText
    );
  }

  tileActions.appendChild(
    fishingCard
  );

  if (
    selectedFishingMethod &&
    fishingMethods[selectedFishingMethod]
  ) {
    const actions =
      document.createElement("div");

    actions.classList.add(
      "found-loot-actions"
    );

    const fishButton =
      document.createElement("button");

    fishButton.type = "button";

    fishButton.classList.add(
      "tile-action-button",
      "fishing-action-button"
    );

    fishButton.disabled = isFishingActionInProgress;

    fishButton.textContent =
      t("fish");

    fishButton.addEventListener(
      "click",
      function () {
        startFishingAction(
          selectedFishingMethod,
          fishButton
        );
      }
    );

    actions.appendChild(
      fishButton
    );

    tileActions.appendChild(
      actions
    );
  }
}

function selectFishingMethod(fishingMethodId) {
  discoveryState.selectedFishingMethod =
    fishingMethodId;

  saveDiscoveryState();
  updateTileActionPanel();
}

function clearSelectedFishingMethod() {
  discoveryState.selectedFishingMethod =
    null;

  saveDiscoveryState();
  updateTileActionPanel();
}

function getSelectedFishingChance() {
  const saveData = getMainSaveData();

  if (!saveData) {
    return 0;
  }

  const fishingMethodId =
    discoveryState.selectedFishingMethod;

  if (
    !fishingMethodId ||
    !fishingMethods[fishingMethodId]
  ) {
    return 0;
  }

  return getFishingChance(
    fishingMethodId,
    saveData
  );
}

function getFishingMethodButtonLabel(
  fishingMethodId
) {
  const fishingMethod =
    fishingMethods[fishingMethodId];

  if (!fishingMethod) {
    return "";
  }

  if (fishingMethodId === "fishBait") {
    return t("fishingMethod_fishBaitShort");
  }

  if (fishingMethodId === "spear") {
    return t("fishingMethod_spearShort");
  }

  if (fishingMethodId === "oldFishNet") {
    return t("fishingMethod_oldFishNetShort");
  }

  return fishingMethodId;
}

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
  renderDiscoveryMap();
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

function getLootEntryQuantity(lootEntry) {
  if (
    typeof lootEntry.quantityMin === "number" &&
    typeof lootEntry.quantityMax === "number"
  ) {
    return Math.floor(
      Math.random() *
        (lootEntry.quantityMax - lootEntry.quantityMin + 1)
    ) + lootEntry.quantityMin;
  }

  return lootEntry.quantity || 1;
}

function rollMultipleLootFromTable(lootTable) {
  if (!lootTable) {
    return [];
  }

  const lootResults = [];

  for (let lootEntry of lootTable) {
    const roll = Math.random() * 100;

    if (roll <= lootEntry.chance) {
      lootResults.push({
        itemId: lootEntry.itemId,
        quantity: getLootEntryQuantity(lootEntry)
      });
    }
  }

  return lootResults;
}

function rollEncounterLoot(encounterData) {
  if (!encounterData || !encounterData.lootTable) {
    return [];
  }

  return rollMultipleLootFromTable(encounterData.lootTable);
}

function rollFightLoot(encounterData) {
  if (!encounterData || !encounterData.lootTable) {
    return [];
  }

  return rollMultipleLootFromTable(encounterData.lootTable);
}

function getAvailableHuntTools(encounterData) {
  const saveData = getMainSaveData();

  if (
    !saveData ||
    !saveData.inventory ||
    !Array.isArray(saveData.inventory.items)
  ) {
    return [];
  }

  if (!encounterData.huntToolBonuses) {
    return [];
  }

  const availableTools = [];

  for (
    let slotIndex = 0;
    slotIndex < saveData.inventory.items.length;
    slotIndex++
  ) {
    const item =
      saveData.inventory.items[slotIndex];

    if (!item || !item.id) {
      continue;
    }

    for (
      const toolGroupName in
        encounterData.huntToolBonuses
    ) {
      const allowedToolIds =
        toolGroups[toolGroupName];

      if (!Array.isArray(allowedToolIds)) {
        continue;
      }

      if (!allowedToolIds.includes(item.id)) {
        continue;
      }

      availableTools.push({
        slotIndex: slotIndex,
        itemId: item.id,
        toolGroup: toolGroupName,
        bonus:
          encounterData.huntToolBonuses[
            toolGroupName
          ]
      });

      break;
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

function applySelectedHuntToolDurabilityCost(
  encounterData
) {
  if (!discoveryState.selectedHuntTool) {
    return true;
  }

  const saveData = getMainSaveData();

  if (
    !saveData ||
    !saveData.inventory ||
    !Array.isArray(
      saveData.inventory.items
    )
  ) {
    discoveryState.selectedHuntTool =
      null;

    addDiscoveryLog(
      t("selectedHuntToolMissing")
    );

    return false;
  }

  const selectedTool =
    discoveryState.selectedHuntTool;

  const inventoryItem =
    saveData.inventory.items[
      selectedTool.slotIndex
    ];

  const allowedToolIds =
    toolGroups[selectedTool.toolGroup];

  if (
    !inventoryItem ||
    inventoryItem.id !==
      selectedTool.itemId ||
    !Array.isArray(allowedToolIds) ||
    !allowedToolIds.includes(
      inventoryItem.id
    )
  ) {
    discoveryState.selectedHuntTool =
      null;

    saveDiscoveryState();

    addDiscoveryLog(
      t("selectedHuntToolMissing")
    );

    updateTileActionPanel();

    return false;
  }

  if (
    typeof inventoryItem.durability !==
      "number"
  ) {
    return true;
  }

  const baseCost =
    getSelectedHuntToolDurabilityCost(
      encounterData
    );

  const finalCost =
    getDiscoveryToolDurabilityCost(
      inventoryItem,
      baseCost
    );

  inventoryItem.durability -= finalCost;

  if (inventoryItem.durability <= 0) {
    const toolName =
      getDiscoveryItemName(
        inventoryItem
      );

    saveData.inventory.items[
      selectedTool.slotIndex
    ] = null;

    discoveryState.selectedHuntTool =
      null;

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

  if (!payDiscoveryActionCost("hunt")) {
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
    discoveryState.selectedHuntTool = null;

    saveDiscoveryState();
    renderDiscoveryMap();

    return;
  }

  const lootResults = rollEncounterLoot(encounterData);

  discoveryState.pendingEncounter = null;
  discoveryState.selectedHuntTool = null;

  if (lootResults.length === 0) {
    addDiscoveryLog(t("huntSucceededNoLoot"));

    saveDiscoveryState();
    renderDiscoveryMap();

    return;
  }

  discoveryState.pendingLoot = {
    tileId: encounter.tileId,
    items: lootResults
  };

  addDiscoveryLog(t("huntSucceeded"));

  saveDiscoveryState();
  renderDiscoveryMap();
}

function getAvailableFightTools(encounterData) {
  const saveData = getMainSaveData();

  if (
    !saveData ||
    !saveData.inventory ||
    !Array.isArray(saveData.inventory.items)
  ) {
    return [];
  }

  if (!encounterData.fightToolBonuses) {
    return [];
  }

  const availableTools = [];

  for (
    let slotIndex = 0;
    slotIndex < saveData.inventory.items.length;
    slotIndex++
  ) {
    const item =
      saveData.inventory.items[slotIndex];

    if (!item || !item.id) {
      continue;
    }

    for (
      const toolGroupName in encounterData.fightToolBonuses
    ) {
      const allowedToolIds =
        toolGroups[toolGroupName];

      if (!Array.isArray(allowedToolIds)) {
        continue;
      }

      if (!allowedToolIds.includes(item.id)) {
        continue;
      }

      availableTools.push({
        slotIndex: slotIndex,
        itemId: item.id,
        toolGroup: toolGroupName,
        bonus:
          encounterData.fightToolBonuses[
            toolGroupName
          ]
      });

      break;
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

  if (
    !saveData ||
    !saveData.inventory ||
    !Array.isArray(saveData.inventory.items)
  ) {
    discoveryState.selectedFightTool = null;
    addDiscoveryLog(t("selectedFightToolMissing"));
    return false;
  }

  const selectedTool = discoveryState.selectedFightTool;
  const inventoryItem = saveData.inventory.items[selectedTool.slotIndex];

 const allowedToolIds =
  toolGroups[selectedTool.toolGroup];

  if (
    !inventoryItem ||
    inventoryItem.id !==
      selectedTool.itemId ||
    !Array.isArray(allowedToolIds) ||
    !allowedToolIds.includes(
      inventoryItem.id
    )
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

  if (!encounterData || !encounterData.canFight) {
    return;
  }

  if (!payDiscoveryActionCost("flee")) {
    return;
  }

  discoveryState.pendingEncounter = null;
  discoveryState.selectedFightTool = null;

  addDiscoveryLog(t("fleeSucceeded"));

  saveDiscoveryState();
  renderDiscoveryMap()
}

function damageRandomEquippedClothing(durabilityLoss) {
  const saveData = getMainSaveData();

  if (
    !saveData ||
    !saveData.equipment ||
    typeof saveData.equipment !== "object"
  ) {
    return [];
  }

  const equippedClothing = [];

  for (let slotName in saveData.equipment) {
    const equippedItem = saveData.equipment[slotName];

    if (!equippedItem || equippedItem.type !== "clothing") {
      continue;
    }

    const databaseItem = itemsDatabase[equippedItem.id];

    const maxDurability = Number(
      equippedItem.maxDurability ??
      databaseItem?.maxDurability ??
      databaseItem?.durability ??
      0
    );

    if (maxDurability <= 0) {
      continue;
    }

    equippedClothing.push({
      slotName,
      item: equippedItem,
      databaseItem,
      maxDurability
    });
  }

  if (equippedClothing.length === 0) {
    return [];
  }

  const selectedEntry =
    equippedClothing[
      Math.floor(Math.random() * equippedClothing.length)
    ];

  const selectedItem = selectedEntry.item;

  const currentDurability = Number(
    selectedItem.durability ?? selectedEntry.maxDurability
  );

  selectedItem.maxDurability = selectedEntry.maxDurability;
  selectedItem.durability = Math.max(
    0,
    currentDurability - durabilityLoss
  );

  const itemData = selectedEntry.databaseItem || selectedItem;
  const itemName = t(itemData.nameKey);

  if (selectedItem.durability > 0) {
    addDiscoveryLog(
      t("clothingDamaged", {
        item: itemName,
        durability: selectedItem.durability,
        maxDurability: selectedItem.maxDurability
      })
    );

    saveMainSaveData(saveData);
    return [];
  }

  saveData.equipment[selectedEntry.slotName] = null;

  const breakLoot =
    selectedItem.breakLoot ||
    selectedEntry.databaseItem?.breakLoot ||
    null;

  const brokenLootItems = [];

  if (breakLoot && breakLoot.itemId) {
    brokenLootItems.push({
      itemId: breakLoot.itemId,
      quantity: breakLoot.quantity || 1
    });
  }

  addDiscoveryLog(
    t("clothingBroken", {
      item: itemName
    })
  );

  saveMainSaveData(saveData);

  return brokenLootItems;
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

  if (!payDiscoveryActionCost("fight")) {
    return;
  }

  const toolStillAvailable =
    applySelectedFightToolDurabilityCost(encounterData);

  if (!toolStillAvailable) {
    return;
  }

  const finalFightChance = getFinalFightChance(encounterData);
  const fightRoll = Math.random() * 100;
  const fightSucceeded = fightRoll <= finalFightChance;

  discoveryState.pendingEncounter = null;
  discoveryState.selectedFightTool = null;

  const clothingDurabilityLoss = fightSucceeded ? 1 : 3;

  const brokenClothingLoot =
    damageRandomEquippedClothing(clothingDurabilityLoss);

  if (!fightSucceeded) {
    const damage = encounterData.failedFightDamage || 10;

    updateMainCharacterStat("health", -damage);

    addDiscoveryLog(
      t("fightFailed", {
        damage: damage
      })
    );

    if (brokenClothingLoot.length > 0) {
      discoveryState.pendingLoot = {
        tileId: encounter.tileId,
        items: brokenClothingLoot
      };
    }

    saveDiscoveryState();
    renderDiscoveryMap();
    return;
  }

  const rolledFightLoot = rollFightLoot(encounterData);

  const fightLootResults = Array.isArray(rolledFightLoot)
    ? rolledFightLoot
    : [];

  const clothingLootResults = Array.isArray(brokenClothingLoot)
    ? brokenClothingLoot
    : [];

  const lootResults = [
    ...fightLootResults,
    ...clothingLootResults
  ];

  if (lootResults.length === 0) {
    addDiscoveryLog(t("fightSucceededNoLoot"));

    saveDiscoveryState();
    renderDiscoveryMap();
    return;
  }

  discoveryState.pendingLoot = {
    tileId: encounter.tileId,
    items: lootResults
  };

  addDiscoveryLog(t("fightSucceeded"));

  saveDiscoveryState();
  renderDiscoveryMap();
}