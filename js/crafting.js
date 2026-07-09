let craftSlots = [
  null, null, null,
  null, null, null,
  null, null, null
];

const workstationSlots = ["campfire", "choppingBlock", "tanningRack", "loom"];

let regionWorkstations = {
  meadow: {},
  trail: {},
  lake: {},
  mountain: {},
  mine: {},
  abandonedVillage: {}
};

function getInventoryItemCount(itemId) {
  let count = 0;

  inventory.items.forEach(function (item) {
    if (item && item.id === itemId) {
      count += item.quantity || 1;
    }
  });

  return count;
}

function getIngredientGroupTotalCount(groupData) {
  if (!groupData || !Array.isArray(groupData.itemIds)) {
    return 0;
  }

  return groupData.itemIds.reduce(function (total, itemId) {
    return total + getInventoryItemCount(itemId);
  }, 0);
}

function hasEnoughIngredientGroups(recipe) {
  if (!recipe.ingredientGroups) {
    return true;
  }

  for (let groupName in recipe.ingredientGroups) {
    const groupData = recipe.ingredientGroups[groupName];
    const requiredAmount = groupData.amount || 1;
    const totalAvailable = getIngredientGroupTotalCount(groupData);

    if (totalAvailable < requiredAmount) {
      return false;
    }
  }

  return true;
}

function removeInventoryItemQuantity(itemId, amount) {
  let remainingAmount = amount;

  for (let slotIndex = 0; slotIndex < inventory.items.length; slotIndex++) {
    const item = inventory.items[slotIndex];

    if (!item || item.id !== itemId) {
      continue;
    }

    const itemQuantity = item.quantity || 1;
    const removeAmount = Math.min(itemQuantity, remainingAmount);

    item.quantity = itemQuantity - removeAmount;
    remainingAmount -= removeAmount;

    if (item.quantity <= 0) {
      inventory.items[slotIndex] = null;
    }

    if (remainingAmount <= 0) {
      return true;
    }
  }

  return false;
}

function removeIngredientGroupItems(groupData) {
  if (!groupData || !Array.isArray(groupData.itemIds)) {
    return false;
  }

  let remainingAmount = groupData.amount || 1;

  for (let itemId of groupData.itemIds) {
    const availableAmount = getInventoryItemCount(itemId);

    if (availableAmount <= 0) {
      continue;
    }

    const removeAmount = Math.min(availableAmount, remainingAmount);

    removeInventoryItemQuantity(itemId, removeAmount);

    remainingAmount -= removeAmount;

    if (remainingAmount <= 0) {
      return true;
    }
  }

  return false;
}

function getCurrentRegionId() {
  return playerRegion || "meadow";
}

function getCurrentRegionName() {
  return getRegionNameById(getCurrentRegionId());
}

function getCurrentRegionWorkstations() {
  const currentPosition =
    getCurrentDiscoveryPosition();

  const currentRegionId =
    currentPosition.regionId ||
    getCurrentRegionId();

  if (!regionWorkstations[currentRegionId]) {
    regionWorkstations[currentRegionId] = {};
  }

  return regionWorkstations[currentRegionId];
}

function isWorkstationAtCurrentTile(workstation) {
  if (!workstation) {
    return false;
  }

  const currentPosition = getCurrentDiscoveryPosition();

  return (
    workstation.x === currentPosition.x &&
    workstation.y === currentPosition.y
  );
}

function hasWorkstation(workstationId) {
  const currentRegionWorkstations = getCurrentRegionWorkstations();

  return currentRegionWorkstations[workstationId] !== null &&
    currentRegionWorkstations[workstationId] !== undefined;
}

function placeWorkstation(workstationId, item) {
  refreshBaseSleepState();

  if (isSleeping) {
    showMessage(t("cannotUseSleeping"));
    return;
  }

  const currentPosition =
    getCurrentDiscoveryPosition();

  const currentRegionId =
    currentPosition.regionId ||
    getCurrentRegionId();

  if (!regionWorkstations[currentRegionId]) {
    regionWorkstations[currentRegionId] = {};
  }

  const currentRegionWorkstations =
    regionWorkstations[currentRegionId];

  if (
    currentRegionWorkstations[workstationId]
  ) {
    showMessage(
      t("workstationAlreadyPlaced", {
        regionLabel: getCurrentRegionName()
      })
    );

    return false;
  }

  currentRegionWorkstations[workstationId] = {
    id: item.id,
    itemId: item.id,
    x: Number(currentPosition.x),
    y: Number(currentPosition.y)
  };

  discoverItem(workstationId);
  updateWorkstationScreen();
  autoSave();

  return true;
}

function removeWorkstation(workstationId) {
    refreshBaseSleepState();

  if (isSleeping) {
    showMessage(t("cannotUseSleeping"));
    return;
  }

  const currentRegionWorkstations = getCurrentRegionWorkstations();
  const workstation = currentRegionWorkstations[workstationId];

  if (!workstation) {
    return;
  }

  const added = addItem({
    ...itemsDatabase[workstation.itemId],
    quantity: 1
  });

  if (!added) {
    return;
  }

  currentRegionWorkstations[workstationId] = null;

  updateWorkstationScreen();
  updateInventoryScreen();
  autoSave();
}

function discoverItem(itemId) {
  if (!itemId) {
    return;
  }

  if (!discoveredItems.includes(itemId)) {
    discoveredItems.push(itemId);
  }

  discoverRecipesFromKnownItems();
}

function hasDiscoveredItem(itemId) {
  return discoveredItems.includes(itemId);
}

function isRecipeDiscoveryConditionMet(recipe) {
  const anyList = Array.isArray(recipe.discoverByAny)
    ? recipe.discoverByAny
    : [];

  const allList = Array.isArray(recipe.discoverByAll)
    ? recipe.discoverByAll
    : [];

  const hasAnyCondition = anyList.length > 0;
  const hasAllCondition = allList.length > 0;

  if (!hasAnyCondition && !hasAllCondition) {
    return false;
  }

  const anyPassed =
    !hasAnyCondition ||
    anyList.some(function (itemId) {
      return hasDiscoveredItem(itemId);
    });

  const allPassed =
    !hasAllCondition ||
    allList.every(function (itemId) {
      return hasDiscoveredItem(itemId);
    });

  return anyPassed && allPassed;
}

function discoverRecipesFromKnownItems() {
  for (let recipeId in recipesDatabase) {
    const recipe = recipesDatabase[recipeId];

    if (!recipe || recipe.isPublic) {
      continue;
    }

    if (discoveredRecipes.includes(recipe.id)) {
      continue;
    }

    if (isRecipeDiscoveryConditionMet(recipe)) {
      discoveredRecipes.push(recipe.id);
    }
  }
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
    refreshBaseSleepState();

  if (isSleeping) {
    showMessage(t("cannotUseSleeping"));
    return;
  }
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
    refreshBaseSleepState();

  if (isSleeping) {
    showMessage(t("cannotUseSleeping"));
    return;
  }
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
    refreshBaseSleepState();

  if (isSleeping) {
    showMessage(t("cannotUseSleeping"));
    return;
  }
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
    if (item === null) {
      continue;
    }

    const itemQuantity = item.quantity || 1;

    if (!counts[item.id]) {
      counts[item.id] = 0;
    }

    counts[item.id] += itemQuantity;

    for (let groupKey in toolGroups) {
      const allowedToolIds = toolGroups[groupKey];

      if (!Array.isArray(allowedToolIds)) {
        continue;
      }

      if (!allowedToolIds.includes(item.id)) {
        continue;
      }

      const toolGroupKey =
        "toolGroup:" + groupKey;

      if (!counts[toolGroupKey]) {
        counts[toolGroupKey] = 0;
      }

      counts[toolGroupKey] += itemQuantity;
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

  if (item.toolTier === "bone") {
    return Math.max(1, Math.ceil(baseCost * 0.3));
  }

  if (item.toolTier === "copper") {
    return Math.max(1, Math.ceil(baseCost * 0.5));
  }

  return baseCost;
}

function isRecipeMatch(recipe, craftCounts) {
  const requiredItems = {
    ...(recipe.ingredients || {})
  };

  if (recipe.requiredTools) {
    for (
      const toolId in recipe.requiredTools
    ) {
      requiredItems[toolId] =
        recipe.requiredTools[toolId];
    }
  }

  if (recipe.requiredToolGroups) {
    for (
      const groupName in
        recipe.requiredToolGroups
    ) {
      requiredItems[
        "toolGroup:" + groupName
      ] =
        recipe.requiredToolGroups[
          groupName
        ];
    }
  }

  for (const requiredId in requiredItems) {
    if (
      craftCounts[requiredId] !==
      requiredItems[requiredId]
    ) {
      return false;
    }
  }

  for (const itemId in craftCounts) {
    if (
      itemId.startsWith("toolGroup:")
    ) {
      continue;
    }

    if (requiredItems[itemId]) {
      continue;
    }

    const item = craftSlots.find(
      function (slotItem) {
        return (
          slotItem !== null &&
          slotItem.id === itemId
        );
      }
    );

    if (!item || !item.id) {
      return false;
    }

    let isUsedAsRequiredGroup = false;

    if (recipe.requiredToolGroups) {
      for (
        const groupName in
          recipe.requiredToolGroups
      ) {
        const allowedToolIds =
          toolGroups[groupName];

        if (
          Array.isArray(allowedToolIds) &&
          allowedToolIds.includes(item.id)
        ) {
          isUsedAsRequiredGroup = true;
          break;
        }
      }
    }

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

  for (
    const toolKey in recipe.toolDurabilityCost
  ) {
    const durabilityCost =
      recipe.toolDurabilityCost[toolKey];

    for (
      let i = 0;
      i < craftSlots.length;
      i++
    ) {
      const item = craftSlots[i];

      if (!item) {
        continue;
      }

      const isExactTool =
        item.id === toolKey;

      const isToolGroup =
        isItemInToolGroup(item, toolKey);

      if (
        !isExactTool &&
        !isToolGroup
      ) {
        continue;
      }

      if (
        typeof item.durability !== "number"
      ) {
        const databaseItem =
          itemsDatabase[item.id];

        if (
          databaseItem &&
          typeof databaseItem.durability ===
            "number"
        ) {
          item.durability =
            databaseItem.durability;
        } else {
          continue;
        }
      }

      const finalDurabilityCost =
        getToolDurabilityCost(
          item,
          durabilityCost
        );

      item.durability = Math.max(
        0,
        item.durability -
          finalDurabilityCost
      );

      if (item.durability <= 0) {
        const brokenToolName =
          getItemName(item);

        craftSlots[i] = null;

        showMessage(
          t("toolBroke", {
            item: brokenToolName
          }),
          "warning"
        );

        addLog(
          t("toolBroke", {
            item: brokenToolName
          }),
          "warning"
        );
      }

      break;
    }
  }
}

function hasEnoughNormalCraftIngredients(recipe) {
  const ingredients = recipe.ingredients || {};

  for (let itemId in ingredients) {
    const requiredAmount = ingredients[itemId];
    const availableAmount = getCraftSlotItemCount(itemId);

    if (availableAmount < requiredAmount) {
      return false;
    }
  }

  return true;
}

function hasEnoughQuickCraftIngredients(recipe) {
  const ingredients = recipe.ingredients || {};

  for (let itemId in ingredients) {
    const requiredAmount = ingredients[itemId];
    const availableAmount = getInventoryItemCount(itemId);

    if (availableAmount < requiredAmount) {
      return false;
    }
  }

  return true;
}

function hasEnoughQuickCraftIngredientGroups(recipe) {
  if (!recipe.ingredientGroups) {
    return true;
  }

  for (let groupName in recipe.ingredientGroups) {
    const groupData = recipe.ingredientGroups[groupName];

    if (!groupData || !Array.isArray(groupData.itemIds)) {
      return false;
    }

    const requiredAmount = groupData.amount || 1;

    const availableAmount = groupData.itemIds.reduce(
      function (total, itemId) {
        return total + getInventoryItemCount(itemId);
      },
      0
    );

    if (availableAmount < requiredAmount) {
      return false;
    }
  }

  return true;
}

function hasEnoughQuickCraftTools(recipe) {
  const requiredTools = recipe.requiredTools || {};

  for (let toolId in requiredTools) {
    const requiredAmount = requiredTools[toolId];
    const availableAmount = getInventoryItemCount(toolId);

    if (availableAmount < requiredAmount) {
      return false;
    }
  }

  const requiredToolGroups = recipe.requiredToolGroups || {};

  for (let groupName in requiredToolGroups) {
    const requiredAmount = requiredToolGroups[groupName];
    let availableAmount = 0;

    for (let item of inventory.items) {
      if (!item) {
        continue;
      }

      if (isItemInToolGroup(item, groupName)) {
        availableAmount += item.quantity || 1;
      }
    }

    if (availableAmount < requiredAmount) {
      return false;
    }
  }

  return true;
}

function hasRequiredCraftWorkstation(recipe) {
  if (!recipe.requiredWorkstation) {
    return true;
  }

  const currentRegionWorkstations =
    getCurrentRegionWorkstations();

  const requiredWorkstation =
    currentRegionWorkstations[
      recipe.requiredWorkstation
    ];

  return isWorkstationAtCurrentTile(
    requiredWorkstation
  );
}

function getInventoryLiquidAmount(liquidItemId) {
  let totalAmount = 0;

  for (let item of inventory.items) {
    if (
      !item ||
      !item.contents ||
      item.contents.itemId !== liquidItemId
    ) {
      continue;
    }

    totalAmount += Number(
      item.contents.amount || 0
    );
  }

  return totalAmount;
}

function hasEnoughLiquidIngredients(recipe) {
  if (
    !recipe.liquidIngredients ||
    recipe.liquidIngredients.length === 0
  ) {
    return true;
  }

  for (let liquidIngredient of recipe.liquidIngredients) {
    const requiredAmount = Number(
      liquidIngredient.amount || 0
    );

    const availableAmount =
      getInventoryLiquidAmount(
        liquidIngredient.itemId
      );

    if (availableAmount < requiredAmount) {
      return false;
    }
  }

  return true;
}

function consumeInventoryLiquid(
  liquidItemId,
  amountToConsume
) {
  let remainingAmount = Number(
    amountToConsume || 0
  );

  if (remainingAmount <= 0) {
    return true;
  }

  for (
    let slotIndex = 0;
    slotIndex < inventory.items.length;
    slotIndex++
  ) {
    const container =
      inventory.items[slotIndex];

    if (
      !container ||
      !container.contents ||
      container.contents.itemId !== liquidItemId
    ) {
      continue;
    }

    const currentAmount = Number(
      container.contents.amount || 0
    );

    if (currentAmount <= 0) {
      continue;
    }

    const consumedAmount = Math.min(
      currentAmount,
      remainingAmount
    );

    container.contents.amount =
      currentAmount - consumedAmount;

    remainingAmount -= consumedAmount;

    if (container.contents.amount <= 0) {
      container.contents = null;
    }

    if (remainingAmount <= 0) {
      return true;
    }
  }

  return false;
}

function consumeRecipeLiquidIngredients(recipe) {
  if (
    !recipe.liquidIngredients ||
    recipe.liquidIngredients.length === 0
  ) {
    return true;
  }

  if (!hasEnoughLiquidIngredients(recipe)) {
    return false;
  }

  for (let liquidIngredient of recipe.liquidIngredients) {
    const consumed = consumeInventoryLiquid(
      liquidIngredient.itemId,
      liquidIngredient.amount
    );

    if (!consumed) {
      return false;
    }
  }

  return true;
}

function canQuickCraftRecipe(recipe) {
  if (!recipe) {
    return false;
  }

  if (!hasEnoughQuickCraftIngredients(recipe)) {
    return false;
  }

  if (!hasEnoughQuickCraftIngredientGroups(recipe)) {
    return false;
  }

  if (!hasEnoughQuickCraftTools(recipe)) {
    return false;
  }

  if (!hasEnoughLiquidIngredients(recipe)) {
    return false;
  }

  if (
    recipe.requiredWorkstation &&
    !hasRequiredCraftWorkstation(recipe)
  ) {
    return false;
  }

  return true;
}

function canCraftSlotsMatchRecipe(recipe) {
  if (!hasEnoughNormalCraftIngredients(recipe)) {
    return false;
  }

  if (!hasEnoughIngredientGroups(recipe)) {
    return false;
  }

  if (!hasEnoughLiquidIngredients(recipe)) {
    return false;
  }

  if (recipe.requiredToolGroups) {
    const craftItemCounts =
      getCraftItemCounts();

    for (
      const groupName in recipe.requiredToolGroups
    ) {
      const requiredAmount =
        recipe.requiredToolGroups[groupName];

      const availableAmount =
        craftItemCounts[
          "toolGroup:" + groupName
        ] || 0;

      if (availableAmount < requiredAmount) {
        return false;
      }
    }
  }

  if (!hasRequiredCraftWorkstation(recipe)) {
    return false;
  }

  return true;
}

function getMatchingRecipe() {
  const matchingRecipes = [];

  for (let recipeId in recipesDatabase) {
    const recipe = recipesDatabase[recipeId];

    if (!isRecipeVisible(recipe)) {
      continue;
    }

    if (recipe.category !== selectedRecipeCategory) {
      continue;
    }

    if (canCraftSlotsMatchRecipe(recipe)) {
      matchingRecipes.push(recipe);
    }
  }

  if (matchingRecipes.length === 0) {
    return null;
  }

  const workstationRecipe = matchingRecipes.find(function (recipe) {
    return (
      recipe.requiredWorkstation &&
      hasRequiredCraftWorkstation(recipe)
    );
  });

  if (workstationRecipe) {
    return workstationRecipe;
  }

  return matchingRecipes[0];
}

function consumeQuickCraftIngredients(recipe) {
  const ingredients = recipe.ingredients || {};

  for (let itemId in ingredients) {
    const removed = removeInventoryItemQuantity(
      itemId,
      ingredients[itemId]
    );

    if (!removed) {
      return false;
    }
  }

  return true;
}

function removeQuickCraftIngredientGroups(recipe) {
  if (!recipe.ingredientGroups) {
    return true;
  }

  for (let groupName in recipe.ingredientGroups) {
    const groupData = recipe.ingredientGroups[groupName];

    if (!groupData || !Array.isArray(groupData.itemIds)) {
      return false;
    }

    let remainingAmount = groupData.amount || 1;

    for (let itemId of groupData.itemIds) {
      if (remainingAmount <= 0) {
        break;
      }

      const availableAmount = getInventoryItemCount(itemId);

      if (availableAmount <= 0) {
        continue;
      }

      const removeAmount = Math.min(
        availableAmount,
        remainingAmount
      );

      const removed = removeInventoryItemQuantity(
        itemId,
        removeAmount
      );

      if (!removed) {
        return false;
      }

      remainingAmount -= removeAmount;
    }

    if (remainingAmount > 0) {
      return false;
    }
  }

  return true;
}

function applyQuickCraftToolDurabilityCost(recipe) {
  if (!recipe.toolDurabilityCost) {
    return;
  }

  for (let toolKey in recipe.toolDurabilityCost) {
    const durabilityCost =
      recipe.toolDurabilityCost[toolKey];

    for (let i = 0; i < inventory.items.length; i++) {
      const item = inventory.items[i];

      if (!item) {
        continue;
      }

      const isExactTool = item.id === toolKey;
      const isToolGroup =
        isItemInToolGroup(item, toolKey);

      if (!isExactTool && !isToolGroup) {
        continue;
      }

      const finalDurabilityCost =
        getToolDurabilityCost(item, durabilityCost);

      item.durability -= finalDurabilityCost;

      if (item.durability <= 0) {
        const brokenToolName = getItemName(item);

        inventory.items[i] = null;

        showMessage(
          t("toolBroke", {
            item: brokenToolName
          }),
          "warning"
        );

        addLog(
          t("toolBroke", {
            item: brokenToolName
          }),
          "warning"
        );
      }

      break;
    }
  }
}

function addQuickCraftResultToInventory(item, quantity) {
  let remainingAmount = quantity || 1;
  const maxStack = item.maxStack || 1;

  for (let i = 0; i < inventory.items.length; i++) {
    const inventoryItem = inventory.items[i];

    if (
      !inventoryItem ||
      inventoryItem.id !== item.id
    ) {
      continue;
    }

    const currentQuantity =
      inventoryItem.quantity || 1;

    const availableSpace =
      maxStack - currentQuantity;

    if (availableSpace <= 0) {
      continue;
    }

    const addAmount = Math.min(
      availableSpace,
      remainingAmount
    );

    inventoryItem.quantity =
      currentQuantity + addAmount;

    remainingAmount -= addAmount;

    if (remainingAmount <= 0) {
      return true;
    }
  }

  for (let i = 0; i < inventory.items.length; i++) {
    if (inventory.items[i] !== null) {
      continue;
    }

    const addAmount = Math.min(
      maxStack,
      remainingAmount
    );

    inventory.items[i] = {
      ...item,
      quantity: addAmount
    };

    remainingAmount -= addAmount;

    if (remainingAmount <= 0) {
      return true;
    }
  }

  return false;
}

function getCraftExperienceRewards(recipe) {
  if (!recipe) {
    return {};
  }

  if (
    recipe.experienceRewards &&
    typeof recipe.experienceRewards === "object"
  ) {
    return {
      ...recipe.experienceRewards
    };
  }

  const rewards = {
    crafter: getBaseCraftExperienceReward(recipe)
  };

  const resultItem =
    itemsDatabase[recipe.resultItemId];

  const resultItemId =
    recipe.resultItemId || "";

  const category =
    recipe.category || "";

  const requiredWorkstation =
    recipe.requiredWorkstation || "";

  if (
    category === "clothing" ||
    requiredWorkstation === "loom" ||
    requiredWorkstation === "tanningRack" ||
    resultItemId === "cloth" ||
    resultItemId === "leather" ||
    resultItemId === "leatherStrip" ||
    (
      resultItem &&
      (
        resultItem.type === "clothing" ||
        resultItem.type === "bag"
      )
    )
  ) {
    rewards.tailor =
      getSpecializedCraftExperienceReward(recipe);
  }

  if (
    category === "cooking" ||
    resultItemId.startsWith("cooked") ||
    resultItemId === "boiledWater"
  ) {
    rewards.cooking =
      getSpecializedCraftExperienceReward(recipe);
  }

  if (
    category === "smelting" ||
    resultItemId.startsWith("copper") ||
    resultItemId.startsWith("iron")
  ) {
    rewards.blacksmith =
      getSpecializedCraftExperienceReward(recipe);
  }

  return rewards;
}

function getBaseCraftExperienceReward(recipe) {
  let reward = 3;

  const ingredients =
    recipe.ingredients || {};

  Object.keys(ingredients).forEach(function (itemId) {
    reward += Number(
      ingredients[itemId] || 0
    );
  });

  if (recipe.ingredientGroups) {
    Object.keys(recipe.ingredientGroups).forEach(function (groupName) {
      const groupData =
        recipe.ingredientGroups[groupName];

      reward += Number(
        groupData.amount || 1
      );
    });
  }

  if (recipe.liquidIngredients) {
    reward += recipe.liquidIngredients.length;
  }

  if (recipe.requiredWorkstation) {
    reward += 2;
  }

  if (
    recipe.requiredTools ||
    recipe.requiredToolGroups
  ) {
    reward += 1;
  }

  return Math.min(
    Math.max(reward, 3),
    12
  );
}

function getSpecializedCraftExperienceReward(recipe) {
  return Math.min(
    getBaseCraftExperienceReward(recipe) + 2,
    15
  );
}

function quickCraftRecipe(recipeId) {
  refreshBaseSleepState();

  if (isSleeping) {
    showMessage(t("cannotUseSleeping"));
    return;
  }

  const recipe = recipesDatabase[recipeId];

  if (!recipe || !canQuickCraftRecipe(recipe)) {
    updateRecipesScreen();
    return;
  }

  const resultItem =
    itemsDatabase[recipe.resultItemId];

  if (!resultItem) {
    showMessage(t("invalidRecipeResult"));
    return;
  }
  const inventoryBackup = JSON.parse(
    JSON.stringify(inventory.items)
  );

  const normalIngredientsRemoved =
    consumeQuickCraftIngredients(recipe);

  if (!normalIngredientsRemoved) {
    inventory.items = inventoryBackup;

    showMessage(t("notEnoughIngredients"));
    updateRecipesScreen();
    updateInventoryScreen();
    return;
  }

  const ingredientGroupsRemoved =
    removeQuickCraftIngredientGroups(recipe);

  if (!ingredientGroupsRemoved) {
    inventory.items = inventoryBackup;

    showMessage(t("notEnoughIngredients"));
    updateRecipesScreen();
    updateInventoryScreen();
    return;
  }

  const liquidIngredientsRemoved =
    consumeRecipeLiquidIngredients(recipe);

  if (!liquidIngredientsRemoved) {
    inventory.items = inventoryBackup;

    showMessage(t("notEnoughLiquid"));
    updateRecipesScreen();
    updateInventoryScreen();
    return;
  }

  applyQuickCraftToolDurabilityCost(recipe);

  const added = addQuickCraftResultToInventory(
    resultItem,
    recipe.resultQuantity || 1
  );

  if (!added) {
    inventory.items = inventoryBackup;

    showMessage(t("notEnoughInventorySpace"));
    updateRecipesScreen();
    updateInventoryScreen();
    return;
  }

  discoverItem(resultItem.id);

  checkGoalsByCraftedItem(resultItem.id);
  updateGoalsPanel();

  experience(
    getCraftExperienceRewards(recipe)
  );

  updateInventoryScreen();
  updateCraftingScreen();
  updateRecipesScreen();

  const message = t("crafted", {
    item: getItemName(resultItem)
  });

  showMessage(message, "success");
  addLog(message, "success");

  autoSave();
}

function moveItemBetweenContainers(
  fromContainer,
  fromIndex,
  toContainer,
  toIndex,
  amount,
  fullMessageKey
) {
    refreshBaseSleepState();

  if (isSleeping) {
    showMessage(t("cannotUseSleeping"));
    return;
  }

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
  refreshBaseSleepState();

  if (isSleeping) {
    showMessage(t("cannotUseSleeping"));
    return;
  }

  const recipe = getMatchingRecipe();

  if (recipe === null) {
    showMessage(t("noMatchingRecipe"));
    return;
  }

  if (!hasEnoughIngredientGroups(recipe)) {
    showMessage(t("notEnoughIngredients"));
    return;
  }

  if (!hasEnoughLiquidIngredients(recipe)) {
    showMessage(t("notEnoughLiquid"));
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

    applyToolDurabilityCost(recipe);

    consumeCraftIngredients(recipe);

    if (!removeRecipeIngredientGroups(recipe)) {
      showMessage(t("notEnoughIngredients"));
      updateCraftingScreen();
      updateInventoryScreen();
      autoSave();
      return;
    }

    if (!consumeRecipeLiquidIngredients(recipe)) {
      showMessage(t("notEnoughLiquid"));
      updateCraftingScreen();
      updateInventoryScreen();
      autoSave();
      return;
    }

    const added = addItem(craftedItem);

  if (!added) {
    showMessage(t("notEnoughInventorySpace"));
    updateCraftingScreen();
    updateInventoryScreen();
    autoSave();
    return;
  }

  discoverItem(craftedItem.id);

  checkGoalsByCraftedItem(craftedItem.id);
  updateGoalsPanel();

  experience(
    getCraftExperienceRewards(recipe)
  );

  updateCraftingScreen();
  updateInventoryScreen();

  const message = t("crafted", { item: getItemName(resultItem) });

  showMessage(message, "success");
  addLog(message, "success");

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
  const neededIngredients = { ...(recipe.ingredients || {}) };

  for (let i = 0; i < craftSlots.length; i++) {
    const item = craftSlots[i];

    if (!item) {
      continue;
    }

    const neededAmount = neededIngredients[item.id];

    if (!neededAmount || neededAmount <= 0) {
      continue;
    }

    const itemQuantity = item.quantity || 1;
    const consumeAmount = Math.min(itemQuantity, neededAmount);

    item.quantity = itemQuantity - consumeAmount;
    neededIngredients[item.id] -= consumeAmount;

    if (item.quantity <= 0) {
      craftSlots[i] = null;
    }
  }
}

function getCraftSlotItemCount(itemId) {
  let count = 0;

  craftSlots.forEach(function (item) {
    if (item && item.id === itemId) {
      count += item.quantity || 1;
    }
  });

  return count;
}

function getIngredientGroupCraftSlotTotal(groupData) {
  if (!groupData || !Array.isArray(groupData.itemIds)) {
    return 0;
  }

  return groupData.itemIds.reduce(function (total, itemId) {
    return total + getCraftSlotItemCount(itemId);
  }, 0);
}

function hasEnoughIngredientGroups(recipe) {
  if (!recipe.ingredientGroups) {
    return true;
  }

  for (let groupName in recipe.ingredientGroups) {
    const groupData = recipe.ingredientGroups[groupName];
    const requiredAmount = groupData.amount || 1;
    const availableAmount = getIngredientGroupCraftSlotTotal(groupData);

    if (availableAmount < requiredAmount) {
      return false;
    }
  }

  return true;
}

function removeCraftSlotItemQuantity(itemId, amount) {
  let remainingAmount = amount;

  for (let slotIndex = 0; slotIndex < craftSlots.length; slotIndex++) {
    const item = craftSlots[slotIndex];

    if (!item || item.id !== itemId) {
      continue;
    }

    const itemQuantity = item.quantity || 1;
    const removeAmount = Math.min(itemQuantity, remainingAmount);

    item.quantity = itemQuantity - removeAmount;
    remainingAmount -= removeAmount;

    if (item.quantity <= 0) {
      craftSlots[slotIndex] = null;
    }

    if (remainingAmount <= 0) {
      return true;
    }
  }

  return false;
}

function removeIngredientGroupItemsFromCraftSlots(groupData) {
  if (!groupData || !Array.isArray(groupData.itemIds)) {
    return false;
  }

  let remainingAmount = groupData.amount || 1;

  for (let itemId of groupData.itemIds) {
    const availableAmount = getCraftSlotItemCount(itemId);

    if (availableAmount <= 0) {
      continue;
    }

    const removeAmount = Math.min(availableAmount, remainingAmount);

    removeCraftSlotItemQuantity(itemId, removeAmount);

    remainingAmount -= removeAmount;

    if (remainingAmount <= 0) {
      return true;
    }
  }

  return false;
}

function removeRecipeIngredientGroups(recipe) {
  if (!recipe.ingredientGroups) {
    return true;
  }

  for (let groupName in recipe.ingredientGroups) {
    const groupData = recipe.ingredientGroups[groupName];

    const removed = removeIngredientGroupItemsFromCraftSlots(groupData);

    if (!removed) {
      return false;
    }
  }

  return true;
}

function discoverPlacedWorkstations() {
  if (
    !regionWorkstations ||
    typeof regionWorkstations !== "object"
  ) {
    return;
  }

  Object.keys(regionWorkstations).forEach(function (regionId) {
    const workstations =
      regionWorkstations[regionId];

    if (
      !workstations ||
      typeof workstations !== "object"
    ) {
      return;
    }

    Object.keys(workstations).forEach(function (workstationId) {
      if (workstations[workstationId]) {
        discoverItem(workstationId);
      }
    });
  });
}