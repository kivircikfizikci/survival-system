let craftSlots = [
  null, null, null,
  null, null, null,
  null, null, null
];

let draggedCraftSlotIndex = null;

const workstationSlots = ["campfire", "choppingBlock", "tanningRack"];

let regionWorkstations = {
  meadow: {},
  trail: {},
  lake: {},
  mountain: {},
  mine: {},
  abandonedVillage: {}
};

function getCurrentRegionId() {
  const savedDiscoveryData =
    localStorage.getItem("survivalSystemDiscoverySave");

  if (!savedDiscoveryData) {
    return "meadow";
  }

  try {
    const discoveryData = JSON.parse(savedDiscoveryData);

    return discoveryData.currentMapId || "meadow";
  } catch (error) {
    console.error("Discovery region could not be loaded:", error);
    return "meadow";
  }
}

function getCurrentRegionName() {
  const currentRegionId = getCurrentRegionId();

  if (
    typeof areasDatabase !== "undefined" &&
    areasDatabase[currentRegionId]
  ) {
    return getAreaName(areasDatabase[currentRegionId]);
  }

  return currentRegionId;
}

function getCurrentRegionWorkstations() {
  const currentRegionId = getCurrentRegionId();

  if (!regionWorkstations[currentRegionId]) {
    regionWorkstations[currentRegionId] = {};
  }

  return regionWorkstations[currentRegionId];
}

function hasWorkstation(workstationId) {
  const currentRegionWorkstations = getCurrentRegionWorkstations();

  return currentRegionWorkstations[workstationId] !== null &&
    currentRegionWorkstations[workstationId] !== undefined;
}

function placeWorkstation(workstationId, item) {
  const currentRegionWorkstations = getCurrentRegionWorkstations();

if (hasWorkstation(workstationId)) {
  showMessage(
    t("workstationAlreadyPlaced", {
      regionLabel: getCurrentRegionName()
    })
  );

  return false;
}

  currentRegionWorkstations[workstationId] = {
    id: item.id,
    itemId: item.id
  };

  updateWorkstationScreen();
  autoSave();

  return true;
}

function removeWorkstation(workstationId) {
  const currentRegionWorkstations = getCurrentRegionWorkstations();
  const workstation = currentRegionWorkstations[workstationId];

  if (!workstation) {
    return;
  }

  addItem({
    ...itemsDatabase[workstation.itemId],
    quantity: 1
  });

  currentRegionWorkstations[workstationId] = null;

  updateWorkstationScreen();
  updateInventoryScreen();
  autoSave();
}

function isRecipeVisible(recipe) {
  if (recipe.isPublic) {
    return true;
  }

  return discoveredRecipes.includes(recipe.id);
}

function discoverRecipe(recipeId) {
  const recipe = recipesDatabase[recipeId];

  if (!recipe) {
    return;
  }

  if (recipe.isPublic) {
    return;
  }

  if (discoveredRecipes.includes(recipeId)) {
    return;
  }

  discoveredRecipes.push(recipeId);

  updateRecipesScreen();

  const message = t("recipeDiscovered", {
    recipe: t(recipe.nameKey)
  });

  showMessage(message, "success");
  addLog(message, "success");

  autoSave();
}

function moveInventoryItemToCraftSlot(inventorySlotIndex, craftSlotIndex, amount = "all") {
  const moved = moveItemBetweenContainers(
    inventory.items,
    inventorySlotIndex,
    craftSlots,
    craftSlotIndex,
    amount,
    "craftSlotFull"
  );

  if (!moved) {
    return;
  }

  updateInventoryScreen();
  updateCraftingScreen();
  autoSave();
}

function findAvailableSlotForItem(container, item) {
  for (let i = 0; i < container.length; i++) {
    const slotItem = container[i];

    if (slotItem !== null && canStackItems(slotItem, item)) {
      return i;
    }
  }

  for (let i = 0; i < container.length; i++) {
    if (container[i] === null) {
      return i;
    }
  }

  return -1;
}

function quickMoveInventoryItemToCraft(slotIndex, amount = "all") {
  const item = inventory.items[slotIndex];

  if (item === null) {
    return;
  }

  const targetCraftSlot = findAvailableSlotForItem(craftSlots, item);

  if (targetCraftSlot === -1) {
    showMessage(t("craftSlotFull"));
    return;
  }

  moveInventoryItemToCraftSlot(slotIndex, targetCraftSlot, amount);
}

function quickMoveCraftItemToInventory(craftSlotIndex, amount = "all") {
  const item = craftSlots[craftSlotIndex];

  if (item === null) {
    return;
  }

  const targetInventorySlot = findAvailableSlotForItem(inventory.items, item);

  if (targetInventorySlot === -1) {
    showMessage(t("inventorySlotFull"));
    return;
  }

  moveCraftItemToInventorySlot(craftSlotIndex, targetInventorySlot, amount);
}

function moveCraftItemToInventorySlot(craftSlotIndex, inventorySlotIndex, amount = "all") {
  const moved = moveItemBetweenContainers(
    craftSlots,
    craftSlotIndex,
    inventory.items,
    inventorySlotIndex,
    amount,
    "inventorySlotFull"
  );

  if (!moved) {
    return;
  }

  updateInventoryScreen();
  updateCraftingScreen();
  autoSave();
}

function moveCraftItem(craftFromSlot, craftToSlot, amount = "all") {
  if (craftFromSlot === craftToSlot) {
    return;
  }

  const fromItem = craftSlots[craftFromSlot];
  const toItem = craftSlots[craftToSlot];

  if (fromItem === null) {
    return;
  }

  if (
    amount === "all" &&
    toItem !== null &&
    !canStackItems(toItem, fromItem)
  ) {
    craftSlots[craftFromSlot] = toItem;
    craftSlots[craftToSlot] = fromItem;

    updateCraftingScreen();
    autoSave();

    return;
  }

  const moved = moveItemBetweenContainers(
    craftSlots,
    craftFromSlot,
    craftSlots,
    craftToSlot,
    amount,
    "craftSlotFull"
  );

  if (!moved) {
    return;
  }

  updateCraftingScreen();

  if (typeof saveGame === "function") {
    saveGame();
  }
}

function canStackItems(targetItem, sourceItem) {
  if (targetItem === null || sourceItem === null) {
    return false;
  }

  return (
    targetItem.id === sourceItem.id &&
    targetItem.quantity < targetItem.maxStack
  );
}

function getCraftItemCounts() {
  const counts = {};

  for (let item of craftSlots) {
    if (item !== null) {
      if (!counts[item.id]) {
        counts[item.id] = 0;
      }

      counts[item.id] += item.quantity || 1;

      if (item.toolTags) {
        for (let tag of item.toolTags) {
          const groupKey = "toolGroup:" + tag;

          if (!counts[groupKey]) {
            counts[groupKey] = 0;
          }

          counts[groupKey] += item.quantity || 1;
        }
      }
    }
  }

  return counts;
}

function getToolDurabilityCost(item, baseCost) {
  if (!item) {
    return baseCost;
  }

  if (item.toolTier === "iron") {
    return Math.max(1, Math.ceil(baseCost * 0.25));
  }

  if (item.toolTier === "copper") {
    return Math.max(1, Math.ceil(baseCost * 0.5));
  }

  return baseCost;
}

function isRecipeMatch(recipe, craftCounts) {
  const requiredItems = { ...recipe.ingredients };

  if (recipe.requiredTools) {
    for (let toolId in recipe.requiredTools) {
      requiredItems[toolId] = recipe.requiredTools[toolId];
    }
  }

  if (recipe.requiredToolGroups) {
    for (let groupName in recipe.requiredToolGroups) {
      requiredItems["toolGroup:" + groupName] = recipe.requiredToolGroups[groupName];
    }
  }

  for (let requiredId in requiredItems) {
    if (craftCounts[requiredId] !== requiredItems[requiredId]) {
      return false;
    }
  }

  for (let itemId in craftCounts) {
    if (itemId.startsWith("toolGroup:")) {
      continue;
    }

    if (requiredItems[itemId]) {
      continue;
    }

    const item = craftSlots.find(function (slotItem) {
      return slotItem !== null && slotItem.id === itemId;
    });

    if (!item || !item.toolTags) {
      return false;
    }

    const isUsedAsRequiredGroup = item.toolTags.some(function (tag) {
      return requiredItems["toolGroup:" + tag];
    });

    if (!isUsedAsRequiredGroup) {
      return false;
    }
  }

  return true;
}

function applyToolDurabilityCost(recipe) {
  if (!recipe.toolDurabilityCost) {
    return;
  }

  for (let toolKey in recipe.toolDurabilityCost) {
    const durabilityCost = recipe.toolDurabilityCost[toolKey];

    for (let i = 0; i < craftSlots.length; i++) {
      const item = craftSlots[i];

      if (item === null) {
        continue;
      }

      const isExactTool = item.id === toolKey;
      const isToolGroup = isItemInToolGroup(item, toolKey);

      if (!isExactTool && !isToolGroup) {
        continue;
      }

      const finalDurabilityCost = getToolDurabilityCost(item, durabilityCost);

      item.durability -= finalDurabilityCost;
      autoSave();

      if (item.durability <= 0) {
        const brokenToolName = getItemName(item);
        craftSlots[i] = null;

        showMessage(t("toolBroke", { item: brokenToolName }), "warning");
        addLog(t("toolBroke", { item: brokenToolName }), "warning");
      }

      return;
    }
  }
}

function getMatchingRecipe() {
  const craftCounts = getCraftItemCounts();

  for (let recipeId in recipesDatabase) {
    const recipe = recipesDatabase[recipeId];

    if (isRecipeMatch(recipe, craftCounts)) {
      return recipe;
    }
  }

  return null;
}

function moveItemBetweenContainers(
  fromContainer,
  fromIndex,
  toContainer,
  toIndex,
  amount,
  fullMessageKey
) {
  const fromItem = fromContainer[fromIndex];

  if (fromItem === null) {
    return false;
  }

  const moveAmount = amount === "one" ? 1 : fromItem.quantity;
  const toItem = toContainer[toIndex];

  if (toItem !== null) {
    if (!canStackItems(toItem, fromItem)) {
      showMessage(t(fullMessageKey));
      return false;
    }

    const availableSpace = toItem.maxStack - toItem.quantity;
    const actualMoveAmount = Math.min(moveAmount, availableSpace);

    if (actualMoveAmount <= 0) {
      showMessage(t(fullMessageKey));
      return false;
    }

    toItem.quantity += actualMoveAmount;
    fromItem.quantity -= actualMoveAmount;

    if (fromItem.quantity <= 0) {
      fromContainer[fromIndex] = null;
    }

    return true;
  }

  if (moveAmount >= fromItem.quantity) {
    toContainer[toIndex] = fromItem;
    fromContainer[fromIndex] = null;
    return true;
  }

  toContainer[toIndex] = {
    ...fromItem,
    quantity: moveAmount
  };

  fromItem.quantity -= moveAmount;

  return true;

  autoSave();
}

function craftSelectedRecipe() {
  const recipe = getMatchingRecipe();

  if (recipe === null) {
    showMessage(t("noMatchingRecipe"));
    return;
  }

  if (recipe.requiredWorkstation && !hasWorkstation(recipe.requiredWorkstation)) {
    showMessage(t("requiresWorkstation", {
      workstation: getItemName(itemsDatabase[recipe.requiredWorkstation])
    }));

    return;
  }

  const resultItem = itemsDatabase[recipe.resultItemId];

  if (!resultItem) {
    showMessage(t("invalidRecipeResult"));
    return;
  }

  const craftedItem = {
    ...resultItem,
    quantity: recipe.resultQuantity || 1
  };

  if (!canAddItemToInventory(craftedItem)) {
    showMessage(t("notEnoughInventorySpace"));
    return;
  }

  consumeCraftIngredients(recipe);
  applyToolDurabilityCost(recipe);

  const added = addItem(craftedItem);

  if (!added) {
    showMessage(t("notEnoughInventorySpace"));
    updateCraftingScreen();
    updateInventoryScreen();
    autoSave();
    return;
  }

  checkRecipeDiscoveryByItem(craftedItem.id);

  updateCraftingScreen();
  updateInventoryScreen();

  const message = t("crafted", { item: getItemName(resultItem) });

  showMessage(message, "success");
  addLog(message, "success");

  autoSave();
}

function checkRecipeDiscoveryByItem(itemId) {
  const recipeIds = recipeDiscoveryRules[itemId];

  if (!recipeIds) {
    return;
  }

  for (let recipeId of recipeIds) {
    discoverRecipe(recipeId);
  }
  autoSave();
}

function canAddItemToInventory(item) {
  if (getCurrentWeight() + item.weight * item.quantity > inventory.maxWeight) {
    return false;
  }

  for (let inventoryItem of inventory.items) {
    if (
      inventoryItem !== null &&
      inventoryItem.id === item.id &&
      inventoryItem.quantity < inventoryItem.maxStack
    ) {
      return true;
    }
  }

  return findEmptySlot() !== -1;
}

function consumeCraftIngredients(recipe) {
  const neededIngredients = { ...recipe.ingredients };

  for (let i = 0; i < craftSlots.length; i++) {
    const item = craftSlots[i];

    if (item === null) {
      continue;
    }

    const neededAmount = neededIngredients[item.id];

    if (!neededAmount) {
      continue;
    }

    const consumeAmount = Math.min(item.quantity, neededAmount);

    item.quantity -= consumeAmount;
    neededIngredients[item.id] -= consumeAmount;

    if (item.quantity <= 0) {
      craftSlots[i] = null;
    }
  }
  autoSave();
}

function isItemInToolGroup(item, groupName) {
  if (item === null) {
    return false;
  }

  return item.toolTags && item.toolTags.includes(groupName);
}