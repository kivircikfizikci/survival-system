let inventory = {
  baseMaxWeight: 5,
  baseSlots: 4,
  maxWeight: 5,
  items: [null, null, null, null]
};

function setInventoryCapacity(totalSlots, totalWeight) {
  inventory.maxWeight = totalWeight;

  while (inventory.items.length < totalSlots) {
    inventory.items.push(null);
  }

  while (inventory.items.length > totalSlots) {
    const lastItem = inventory.items[inventory.items.length - 1];

    if (lastItem !== null) {
      showMessage(t("cannotReduceInventory"));
      break;
    }

    inventory.items.pop();
  }
}

function findEmptySlot() {
  for (let i = 0; i < inventory.items.length; i++) {
    if (inventory.items[i] === null) {
      return i;
    }
  }

  return -1;
}

function findStackableSlot(item) {
  for (let i = 0; i < inventory.items.length; i++) {
    const slotItem = inventory.items[i];

    if (
      slotItem !== null &&
      slotItem.id === item.id &&
      slotItem.quantity < slotItem.maxStack
    ) {
      return i;
    }
  }

  return -1;
}

function getCurrentWeight() {
  let total = 0;

  for (let item of inventory.items) {
    if (item !== null) {
      total += item.weight * item.quantity;
    }
  }

  return total;
}

function getUsedSlots() {
  let usedSlots = 0;

  for (let item of inventory.items) {
    if (item !== null) {
      usedSlots++;
    }
  }

  return usedSlots;
}


function addItem(item) {
  if (getCurrentWeight() + item.weight > inventory.maxWeight) {
    showMessage(t("tooHeavy"));
    return false;
  }

  const stackableSlot = findStackableSlot(item);

  if (stackableSlot !== -1) {
    inventory.items[stackableSlot].quantity++;
    updateInventoryScreen();
    return true;
  }

  const emptySlot = findEmptySlot();

  if (emptySlot === -1) {
    showMessage(t("noEmptySlot"));
    return false;
  }

  inventory.items[emptySlot] = {
    ...item,
    quantity: 1
  };

  updateInventoryScreen();
  return true;
}

function removeOneItem(slotIndex) {
  const item = inventory.items[slotIndex];

  if (item === null) {
    return;
  }

  item.quantity--;

  if (item.quantity <= 0) {
    inventory.items[slotIndex] = null;
  }

  updateInventoryScreen();
}

function removeItem(slotIndex) {
  inventory.items[slotIndex] = null;
  updateInventoryScreen();
}

function dropInventoryItem(slotIndex) {
  const item = inventory.items[slotIndex];

  if (item === null) {
    return;
  }
  

  if (isSleeping) {
    showMessage(t("cannotDropSleeping"));
    return;
  }

  removeItem(slotIndex);
  showMessage(t("dropped", { item: getItemName(item) }));
}

function moveInventoryItem(fromSlot, toSlot) {
  if (fromSlot === toSlot) {
    return;
  }

  const fromItem = inventory.items[fromSlot];
  const toItem = inventory.items[toSlot];

  inventory.items[fromSlot] = toItem;
  inventory.items[toSlot] = fromItem;

  updateInventoryScreen();
}

function useInventoryItem(slotIndex) {
  const item = inventory.items[slotIndex];

  if (item === null) {
    return;
  }

  if (isSleeping) {
    showMessage(t("cannotUseSleeping"));
    return;
  }

  if (item.type === "food") {
    hunger += item.hungerRestore;

    if (hunger > 100) {
      hunger = 100;
    }

    removeOneItem(slotIndex);
    updateScreen();
    showMessage(t("eaten", { item: getItemName(item) }));
  }
}
