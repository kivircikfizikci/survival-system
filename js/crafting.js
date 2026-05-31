let craftSlots = [
  null, null, null,
  null, null, null,
  null, null, null
];

let draggedCraftSlotIndex = null;

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
    }
  }

  return counts;
}

function isRecipeMatch(recipe, craftCounts) {
  const ingredientIds = Object.keys(recipe.ingredients);
  const craftItemIds = Object.keys(craftCounts);

  if (ingredientIds.length !== craftItemIds.length) {
    return false;
  }

  for (let itemId of ingredientIds) {
    if (craftCounts[itemId] !== recipe.ingredients[itemId]) {
      return false;
    }
  }

  return true;
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
}

function craftSelectedRecipe() {
  const recipe = getMatchingRecipe();

  if (recipe === null) {
    showMessage(t("noMatchingRecipe"));
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
  addItem(craftedItem);

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
}