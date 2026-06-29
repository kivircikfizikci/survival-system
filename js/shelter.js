function getCurrentDiscoveryPosition() {
  if (typeof discoveryState !== "undefined") {
    return {
      regionId: discoveryState.currentMapId || "meadow",
      x: discoveryState.x,
      y: discoveryState.y
    };
  }

  const savedDiscoveryData = localStorage.getItem(
    "survivalSystemDiscoverySave"
  );

  if (!savedDiscoveryData) {
    return {
      regionId: getCurrentRegionId(),
      x: 16,
      y: 16
    };
  }

  try {
    const discoveryData = JSON.parse(savedDiscoveryData);

    return {
      regionId: discoveryData.currentMapId || getCurrentRegionId(),
      x: Number(discoveryData.x ?? 16),
      y: Number(discoveryData.y ?? 16)
    };
  } catch (error) {
    console.error("Discovery position could not be loaded:", error);

    return {
      regionId: getCurrentRegionId(),
      x: 16,
      y: 16
    };
  }
}

function createShelter() {
  const currentPosition = getCurrentDiscoveryPosition();

  playerShelter = {
    type: "Tent",
    regionId: currentPosition.regionId,
    x: currentPosition.x,
    y: currentPosition.y,
    storageSlots: 16,
    maxWeight: 50,
    storageItems: Array(16).fill(null)
  };

  updateShelterScreen();
  autoSave();
}

function getShelterCurrentWeight() {
  if (!playerShelter) {
    return 0;
  }

  return playerShelter.storageItems.reduce(function (total, item) {
    return total + getItemTotalWeight(item);
  }, 0);
}

function canAddItemToShelter(item) {
  if (!playerShelter || item === null) {
    return false;
  }

  const itemWeight = getItemTotalWeight(item);

  return (
    getShelterCurrentWeight() + itemWeight <=
    playerShelter.maxWeight
  );
}

function canMoveInventoryItemToShelter(inventoryItem, shelterItem) {
  const currentShelterWeight = getShelterCurrentWeight();
  const incomingWeight = getItemTotalWeight(inventoryItem);
  const outgoingWeight = getItemTotalWeight(shelterItem);

  return currentShelterWeight - outgoingWeight + incomingWeight <= playerShelter.maxWeight;
}

function moveInventoryItemToShelterSlot(inventorySlotIndex, shelterSlotIndex) {
  if (!playerShelter) {
    return;
  }

  const inventoryItem = inventory.items[inventorySlotIndex];
  const shelterItem = playerShelter.storageItems[shelterSlotIndex];

  if (inventoryItem === null) {
    return;
  }

  if (canStackStorageItems(shelterItem, inventoryItem)) {
    const sourceWillBeEmpty = stackStorageItems(shelterItem, inventoryItem);

    if (sourceWillBeEmpty) {
      inventory.items[inventorySlotIndex] = null;
    }

    updateInventoryScreen();
    updateShelterScreen();
    autoSave();
    return;
  }

  if (!canMoveInventoryItemToShelter(inventoryItem, shelterItem)) {
    showMessage(t("shelterTooHeavy"));
    return;
  }

  playerShelter.storageItems[shelterSlotIndex] = inventoryItem;
  inventory.items[inventorySlotIndex] = shelterItem;

  updateInventoryScreen();
  updateShelterScreen();
  autoSave();
}

function moveShelterItemToInventorySlot(shelterSlotIndex, inventorySlotIndex) {
  if (!playerShelter) {
    return;
  }

  const shelterItem = playerShelter.storageItems[shelterSlotIndex];
  const inventoryItem = inventory.items[inventorySlotIndex];

  if (shelterItem === null) {
    return;
  }

  if (canStackStorageItems(inventoryItem, shelterItem)) {
    const sourceWillBeEmpty = stackStorageItems(inventoryItem, shelterItem);

    if (sourceWillBeEmpty) {
      playerShelter.storageItems[shelterSlotIndex] = null;
    }

    updateInventoryScreen();
    updateShelterScreen();
    autoSave();
    return;
  }

  const inventoryWeightAfterMove =
    getCurrentWeight() - getItemTotalWeight(inventoryItem) + getItemTotalWeight(shelterItem);

  if (inventoryWeightAfterMove > inventory.maxWeight) {
    showMessage(t("inventoryTooHeavy"));
    return;
  }

  inventory.items[inventorySlotIndex] = shelterItem;
  playerShelter.storageItems[shelterSlotIndex] = inventoryItem;

  updateInventoryScreen();
  updateShelterScreen();
  autoSave();
}

function moveShelterItemToCraftSlot(
  shelterSlotIndex,
  craftSlotIndex,
  amount = "all"
) {
  refreshBaseSleepState();

  if (isSleeping) {
    showMessage(t("cannotUseSleeping"));
    return;
  }

  if (!playerShelter) {
    return;
  }

  const moved = moveItemBetweenContainers(
    playerShelter.storageItems,
    shelterSlotIndex,
    craftSlots,
    craftSlotIndex,
    amount,
    "craftSlotFull"
  );

  if (!moved) {
    return;
  }

  updateShelterScreen();
  updateCraftingScreen();
  autoSave();
}

function moveCraftItemToShelterSlot(
  craftSlotIndex,
  shelterSlotIndex,
  amount = "all"
) {
  refreshBaseSleepState();

  if (isSleeping) {
    showMessage(t("cannotUseSleeping"));
    return;
  }

  if (!playerShelter) {
    return;
  }

  const moved = moveItemBetweenContainers(
    craftSlots,
    craftSlotIndex,
    playerShelter.storageItems,
    shelterSlotIndex,
    amount,
    "shelterSlotFull"
  );

  if (!moved) {
    return;
  }

  updateCraftingScreen();
  updateShelterScreen();
  autoSave();
}

function moveCraftItemToStorageContainerSlot(
  craftSlotIndex,
  storageSlotIndex,
  amount = "all"
) {
  refreshBaseSleepState();

  if (isSleeping) {
    showMessage(t("cannotUseSleeping"));
    return;
  }

  const container = getActiveStorageContainer();

  if (!container) {
    return;
  }

  const moved = moveItemBetweenContainers(
    craftSlots,
    craftSlotIndex,
    container.storageItems,
    storageSlotIndex,
    amount,
    "storageSlotFull"
  );

  if (!moved) {
    return;
  }

  updateCraftingScreen();
  updateStorageContainerScreen();
  autoSave();
}

function moveStorageContainerItemToCraftSlot(
  storageSlotIndex,
  craftSlotIndex,
  amount = "all"
) {
  refreshBaseSleepState();

  if (isSleeping) {
    showMessage(t("cannotUseSleeping"));
    return;
  }

  const container =
    getActiveStorageContainer();

  if (!container) {
    return;
  }

  const moved = moveItemBetweenContainers(
    container.storageItems,
    storageSlotIndex,
    craftSlots,
    craftSlotIndex,
    amount,
    "craftSlotFull"
  );

  if (!moved) {
    return;
  }

  updateStorageContainerScreen();
  updateCraftingScreen();
  autoSave();
}

function moveShelterItem(fromShelterSlotIndex, toShelterSlotIndex) {
  if (!playerShelter || fromShelterSlotIndex === toShelterSlotIndex) {
    return;
  }

  const fromItem = playerShelter.storageItems[fromShelterSlotIndex];
  const toItem = playerShelter.storageItems[toShelterSlotIndex];

  if (fromItem === null) {
    return;
  }

  if (canStackStorageItems(toItem, fromItem)) {
    const sourceWillBeEmpty = stackStorageItems(toItem, fromItem);

    if (sourceWillBeEmpty) {
      playerShelter.storageItems[fromShelterSlotIndex] = null;
    }

    updateShelterScreen();
    autoSave();
    return;
  }

  playerShelter.storageItems[toShelterSlotIndex] = fromItem;
  playerShelter.storageItems[fromShelterSlotIndex] = toItem;

  updateShelterScreen();
  autoSave();
}

function canStackStorageItems(targetItem, sourceItem) {
  if (targetItem === null || sourceItem === null) {
    return false;
  }

  return (
    targetItem.id === sourceItem.id &&
    targetItem.quantity < targetItem.maxStack
  );
}

function stackStorageItems(targetItem, sourceItem) {
  const availableSpace = targetItem.maxStack - targetItem.quantity;
  const moveAmount = Math.min(availableSpace, sourceItem.quantity);

  targetItem.quantity += moveAmount;
  sourceItem.quantity -= moveAmount;

  return sourceItem.quantity <= 0;
}

function isShelterEmpty() {
  if (!playerShelter) {
    return true;
  }

  return playerShelter.storageItems.every(function (item) {
    return item === null;
  });
}

function destroyShelter() {
  if (!playerShelter) {
    return;
  }

  if (!isShelterEmpty()) {
    showMessage(t("emptyShelterFirst"));
    return;
  }

  addItem({
    ...itemsDatabase.tent,
    quantity: 1
  });

  playerShelter = null;

  updateInventoryScreen();
  updateShelterScreen();

  const message = t("shelterRemoved");

  showMessage(message, "success");
  addLog(message, "success");

  autoSave();
}

const destroyShelterButton = document.getElementById("destroyShelterButton");

if (destroyShelterButton) {
  destroyShelterButton.addEventListener("click", function () {
    destroyShelter();
  });
}

function createStorageContainerInstanceId(itemId) {
  return (
    itemId +
    "_" +
    Date.now() +
    "_" +
    Math.floor(Math.random() * 100000)
  );
}

function getStorageContainerById(instanceId) {
  return placedStorageContainers.find(function (container) {
    return container.instanceId === instanceId;
  }) || null;
}

function getActiveStorageContainer() {
  if (!activeStorageContainerId) {
    return null;
  }

  return getStorageContainerById(
    activeStorageContainerId
  );
}

function getStorageContainersAtPosition(
  regionId,
  x,
  y
) {
  return placedStorageContainers.filter(
    function (container) {
      return (
        container.regionId === regionId &&
        Number(container.x) === Number(x) &&
        Number(container.y) === Number(y)
      );
    }
  );
}

function getStorageContainerAtCurrentPosition() {
  const position =
    getCurrentDiscoveryPosition();

  return (
    placedStorageContainers.find(
      function (container) {
        return (
          container.regionId ===
            position.regionId &&
          Number(container.x) ===
            Number(position.x) &&
          Number(container.y) ===
            Number(position.y)
        );
      }
    ) || null
  );
}

function getStorageContainerCurrentWeight(
  container
) {
  if (
    !container ||
    !Array.isArray(container.storageItems)
  ) {
    return 0;
  }

  return container.storageItems.reduce(
    function (total, item) {
      return total + getItemTotalWeight(item);
    },
    0
  );
}

function isStorageContainerEmpty(container) {
  if (
    !container ||
    !Array.isArray(container.storageItems)
  ) {
    return true;
  }

  return container.storageItems.every(
    function (item) {
      return item === null;
    }
  );
}

function placeWovenCrate() {
  const position =
    getCurrentDiscoveryPosition();

  const existingContainer =
    getStorageContainerAtCurrentPosition();

  if (existingContainer) {
    showMessage(t("storageAlreadyHere"));
    return false;
  }

  const wovenCratesInRegion =
    placedStorageContainers.filter(
      function (container) {
        return (
          container.regionId ===
            position.regionId &&
          container.itemId === "wovenCrate"
        );
      }
    );

  if (wovenCratesInRegion.length >= 3) {
    showMessage(t("storageRegionLimit"));
    return false;
  }

  const storageContainer = {
    instanceId:
      createStorageContainerInstanceId(
        "wovenCrate"
      ),

    itemId: "wovenCrate",

    regionId: position.regionId,
    x: position.x,
    y: position.y,

    storageSlots: 8,
    maxWeight: 15,

    storageItems: Array(8).fill(null)
  };

  placedStorageContainers.push(
    storageContainer
  );

  activeStorageContainerId =
    storageContainer.instanceId;

  const message = t("wovenCratePlaced");

  showMessage(message, "success");
  addLog(message, "success");

  updateStorageContainerScreen();
  autoSave();

  return true;
}

function openStorageContainerAtCurrentPosition() {
  const container =
    getStorageContainerAtCurrentPosition();

  if (!container) {
    activeStorageContainerId = null;
    return null;
  }

  activeStorageContainerId =
    container.instanceId;

  return container;
}

function canMoveInventoryItemToStorageContainer(
  inventoryItem,
  containerItem,
  container
) {
  if (!container || !inventoryItem) {
    return false;
  }

  const currentWeight =
    getStorageContainerCurrentWeight(container);

  const incomingWeight =
    getItemTotalWeight(inventoryItem);

  const outgoingWeight =
    getItemTotalWeight(containerItem);

  return (
    currentWeight -
      outgoingWeight +
      incomingWeight <=
    container.maxWeight
  );
}

function moveInventoryItemToStorageContainerSlot(
  inventorySlotIndex,
  containerSlotIndex
) {
  const container = getActiveStorageContainer();

  if (!container) {
    return;
  }

  const inventoryItem =
    inventory.items[inventorySlotIndex];

  const containerItem =
    container.storageItems[containerSlotIndex];

  if (!inventoryItem) {
    return;
  }

  if (
    canStackStorageItems(
      containerItem,
      inventoryItem
    )
  ) {
    const availableSpace =
      containerItem.maxStack -
      containerItem.quantity;

    const moveAmount = Math.min(
      availableSpace,
      inventoryItem.quantity
    );

    const addedWeight =
      getItemTotalWeight({
        ...inventoryItem,
        quantity: moveAmount
      });

    if (
      getStorageContainerCurrentWeight(
        container
      ) +
        addedWeight >
      container.maxWeight
    ) {
      showMessage(t("storageTooHeavy"));
      return;
    }

    containerItem.quantity += moveAmount;
    inventoryItem.quantity -= moveAmount;

    if (inventoryItem.quantity <= 0) {
      inventory.items[inventorySlotIndex] =
        null;
    }

    updateInventoryScreen();
    updateStorageContainerScreen();
    autoSave();
    return;
  }

  if (
    !canMoveInventoryItemToStorageContainer(
      inventoryItem,
      containerItem,
      container
    )
  ) {
    showMessage(t("storageTooHeavy"));
    return;
  }

  container.storageItems[containerSlotIndex] =
    inventoryItem;

  inventory.items[inventorySlotIndex] =
    containerItem;

  updateInventoryScreen();
  updateStorageContainerScreen();
  autoSave();
}

function moveStorageContainerItemToInventorySlot(
  containerSlotIndex,
  inventorySlotIndex
) {
  const container = getActiveStorageContainer();

  if (!container) {
    return;
  }

  const containerItem =
    container.storageItems[containerSlotIndex];

  const inventoryItem =
    inventory.items[inventorySlotIndex];

  if (!containerItem) {
    return;
  }

  if (
    canStackStorageItems(
      inventoryItem,
      containerItem
    )
  ) {
    const availableSpace =
      inventoryItem.maxStack -
      inventoryItem.quantity;

    const moveAmount = Math.min(
      availableSpace,
      containerItem.quantity
    );

    const addedWeight =
      getItemTotalWeight({
        ...containerItem,
        quantity: moveAmount
      });

    if (
      getCurrentWeight() + addedWeight >
      inventory.maxWeight
    ) {
      showMessage(t("inventoryTooHeavy"));
      return;
    }

    inventoryItem.quantity += moveAmount;
    containerItem.quantity -= moveAmount;

    if (containerItem.quantity <= 0) {
      container.storageItems[
        containerSlotIndex
      ] = null;
    }

    updateInventoryScreen();
    updateStorageContainerScreen();
    autoSave();
    return;
  }

  const inventoryWeightAfterMove =
    getCurrentWeight() -
    getItemTotalWeight(inventoryItem) +
    getItemTotalWeight(containerItem);

  if (
    inventoryWeightAfterMove >
    inventory.maxWeight
  ) {
    showMessage(t("inventoryTooHeavy"));
    return;
  }

  inventory.items[inventorySlotIndex] =
    containerItem;

  container.storageItems[containerSlotIndex] =
    inventoryItem;

  updateInventoryScreen();
  updateStorageContainerScreen();
  autoSave();
}

function moveStorageContainerItem(
  fromSlotIndex,
  toSlotIndex
) {
  const container = getActiveStorageContainer();

  if (
    !container ||
    fromSlotIndex === toSlotIndex
  ) {
    return;
  }

  const fromItem =
    container.storageItems[fromSlotIndex];

  const toItem =
    container.storageItems[toSlotIndex];

  if (!fromItem) {
    return;
  }

  if (
    canStackStorageItems(toItem, fromItem)
  ) {
    const sourceWillBeEmpty =
      stackStorageItems(toItem, fromItem);

    if (sourceWillBeEmpty) {
      container.storageItems[fromSlotIndex] =
        null;
    }

    updateStorageContainerScreen();
    autoSave();
    return;
  }

  container.storageItems[toSlotIndex] =
    fromItem;

  container.storageItems[fromSlotIndex] =
    toItem;

  updateStorageContainerScreen();
  autoSave();
}

function updateStorageContainerScreen() {
  if (!storageContainerCard) {
    return;
  }

  const container =
    getStorageContainerAtCurrentPosition();

  if (!container) {
    activeStorageContainerId = null;
    storageContainerCard.hidden = true;
    return;
  }

  activeStorageContainerId =
    container.instanceId;

  storageContainerCard.hidden = false;

  const usedSlots =
    container.storageItems.filter(
      function (item) {
        return item !== null;
      }
    ).length;

  const currentWeight =
    getStorageContainerCurrentWeight(
      container
    );

  const databaseItem =
    itemsDatabase[container.itemId];

  storageContainerTitle.textContent =
    databaseItem
      ? getItemName(databaseItem)
      : "Woven Crate";

  storageContainerRegionText.textContent =
    getRegionNameById(container.regionId);

  storageContainerSlotsText.textContent =
    usedSlots +
    " / " +
    container.storageSlots +
    " slots";

  storageContainerWeightText.textContent =
    currentWeight.toFixed(1) +
    " / " +
    container.maxWeight +
    " kg";

  storageContainerGrid.innerHTML = "";

  for (
    let i = 0;
    i < container.storageSlots;
    i++
  ) {
    const slot =
      document.createElement("div");

    slot.classList.add(
      "shelter-storage-slot"
    );

    slot.dataset.storageSlot = i;

    slot.addEventListener(
      "dragover",
      function (event) {
        event.preventDefault();
      }
    );

    slot.addEventListener("drop", function () {
      const targetSlotIndex = Number(
        slot.dataset.storageSlot
      );

      if (draggedStorageSlotIndex !== null) {
        moveStorageContainerItem(
          draggedStorageSlotIndex,
          targetSlotIndex
        );

        draggedStorageSlotIndex = null;
        dragMoveAmount = "all";
        return;
      }

      if (draggedCraftSlotIndex !== null) {
        moveCraftItemToStorageContainerSlot(
          draggedCraftSlotIndex,
          targetSlotIndex,
          dragMoveAmount
        );

        draggedCraftSlotIndex = null;
        dragMoveAmount = "all";
        return;
      }

      if (draggedSlotIndex !== null) {
        moveInventoryItemToStorageContainerSlot(
          draggedSlotIndex,
          targetSlotIndex
        );

        draggedSlotIndex = null;
        dragMoveAmount = "all";
      }
    });

    const item =
      container.storageItems[i];

    if (!item) {
      slot.draggable = false;

      const emptyLabel =
        document.createElement("span");

      emptyLabel.classList.add(
        "shelter-empty-label"
      );

      emptyLabel.textContent = "";

      slot.appendChild(emptyLabel);
    } else {
      slot.classList.add("is-filled");
      slot.draggable = true;

      slot.addEventListener(
        "dragstart",
        function () {
          draggedStorageSlotIndex =
            Number(
              slot.dataset.storageSlot
            );

          dragMoveAmount = "all";
        }
      );

      slot.addEventListener(
        "dragend",
        function () {
          draggedStorageSlotIndex = null;
          dragMoveAmount = "all";
        }
      );

      if ((item.quantity || 1) > 1) {
        const quantityBadge =
          document.createElement("span");

        quantityBadge.classList.add(
          "quantity-badge"
        );

        quantityBadge.textContent =
          "x" + item.quantity;

        slot.appendChild(quantityBadge);
      }

      const itemInfo =
        document.createElement("div");

      itemInfo.classList.add("item-info");

      const img =
        document.createElement("img");

      img.classList.add("item-image");
      img.src = item.imageSrc;
      img.alt = getItemName(item);

      const name =
        document.createElement("strong");

      name.textContent = getItemName(item);

      itemInfo.append(img, name);
      slot.appendChild(itemInfo);

      const itemFooter =
        createItemFooter(item);

      if (itemFooter) {
        const hasLargeFooter =
          itemFooter.classList.contains(
            "item-footer-box"
          ) ||
          itemFooter.classList.contains(
            "item-footer-metric"
          );

        if (hasLargeFooter) {
          slot.classList.add(
            "has-item-footer"
          );
        }

        slot.appendChild(itemFooter);
      }
    }

    storageContainerGrid.appendChild(slot);
  }
}

function packActiveStorageContainer() {
  const container =
    getActiveStorageContainer();

  if (!container) {
    return;
  }

  if (!isStorageContainerEmpty(container)) {
    showMessage(t("emptyStorageFirst"));
    return;
  }

  const emptyInventorySlot =
    findEmptySlot();

  if (emptyInventorySlot === -1) {
    showMessage(t("noEmptySlot"));
    return;
  }

  const databaseItem =
    itemsDatabase[container.itemId];

  if (!databaseItem) {
    return;
  }

  const packedItem = {
    ...databaseItem,
    quantity: 1
  };

  if (
    getCurrentWeight() +
      getItemTotalWeight(packedItem) >
    inventory.maxWeight
  ) {
    showMessage(t("tooHeavy"));
    return;
  }

  inventory.items[emptyInventorySlot] =
    packedItem;

  placedStorageContainers =
    placedStorageContainers.filter(
      function (placedContainer) {
        return (
          placedContainer.instanceId !==
          container.instanceId
        );
      }
    );

  activeStorageContainerId = null;

  updateInventoryScreen();
  updateStorageContainerScreen();

  const message =
    t("storageContainerPacked");

  showMessage(message, "success");
  addLog(message, "success");

  autoSave();
}

if (packStorageContainerButton) {
  packStorageContainerButton.addEventListener(
    "click",
    function () {
      packActiveStorageContainer();
    }
  );
}