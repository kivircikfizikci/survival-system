const healthText = document.getElementById("health");
const hungerText = document.getElementById("hunger");
const energyText = document.getElementById("energy");
const nicknameText = document.getElementById("nickname");
const regionText = document.getElementById("region");
const professionText = document.getElementById("profession");
const healthFill = document.getElementById("healthFill");
const hungerFill = document.getElementById("hungerFill");
const energyFill = document.getElementById("energyFill");
const healthIconFill = document.getElementById("healthIconFill");
const hungerIconFill = document.getElementById("hungerIconFill");
const energyIconFill = document.getElementById("energyIconFill");

const statusText = document.getElementById("status");
const inventoryGrid = document.getElementById("inventoryGrid");
const inventorySlotsText = document.getElementById("inventorySlots");
const inventoryWeightText = document.getElementById("inventoryWeight");
const languageButtons = document.querySelectorAll("[data-language]");

const logList = document.getElementById("logList");
const toastContainer = document.getElementById("toastContainer");
const MAX_LOG_ITEMS = 10;

const shelterCard = document.getElementById("shelterCard");
const shelterTitle = document.getElementById("shelterTitle");
const shelterRegionText = document.getElementById("shelterRegionText");
const shelterStorageText = document.getElementById("shelterStorageText");
const shelterWeightText = document.getElementById("shelterWeightText");
const shelterStorageGrid = document.getElementById("shelterStorageGrid");

let playerNickname = "Survivor";
let playerRegion = "meadow";
let playerProfession = "Explorer";
//let playerXP = 420;

let draggedSlotIndex = null;
let draggedEquipmentSlot = null;
let dragMoveAmount = "all";

const recipesBtn = document.getElementById("recipesBtn");
const recipesPanel = document.getElementById("recipesPanel");
const closeRecipesBtn = document.getElementById("closeRecipesBtn");
const recipeFilters = document.getElementById("recipeFilters");
const recipeFilterButtons = document.querySelectorAll(".recipe-filter-btn");
let selectedRecipeCategory = "basic";
const recipeList = document.getElementById("recipeList");

if (recipesBtn && recipesPanel && closeRecipesBtn) {
  recipesBtn.addEventListener("click", function () {
    recipesPanel.hidden = !recipesPanel.hidden;
  });

  closeRecipesBtn.addEventListener("click", function () {
    recipesPanel.hidden = true;
  });
}

let recipeToolCycleIndex = 0;

setInterval(function () {
  recipeToolCycleIndex++;
  updateRecipesScreen();
}, 1500);

function updateRecipesScreen() {
  if (!recipeList) {
    return;
  }

  recipeList.innerHTML = "";

  for (let recipeId in recipesDatabase) {
    const recipe = recipesDatabase[recipeId];

    if (!isRecipeVisible(recipe)) {
      continue;
    }

    if (recipe.category !== selectedRecipeCategory) {
      continue;
    }

    const recipeRow = document.createElement("article");
    recipeRow.classList.add("recipe-row");

    const ingredientsWrapper = document.createElement("div");
    ingredientsWrapper.classList.add("recipe-ingredients");

    const normalInputItems = {
      ...recipe.ingredients,
      ...(recipe.requiredTools || {})
    };

    const normalInputIds = Object.keys(normalInputItems);

    function addPlus() {
      const plusElement = document.createElement("span");
      plusElement.classList.add("recipe-plus");
      plusElement.textContent = "+";
      ingredientsWrapper.appendChild(plusElement);
    }

    function addRecipeItem(item, amount, extraClassName = "") {
      if (!item) {
        return;
      }

      const itemElement = document.createElement("div");
      itemElement.classList.add("recipe-item");

      if (extraClassName) {
        const classNames = extraClassName.split(" ");

        for (let className of classNames) {
          if (className) {
            itemElement.classList.add(className);
          }
        }
      }

      const itemImage = document.createElement("img");
      itemImage.src = item.imageSrc;
      itemImage.alt = getItemName(item);

      const itemName = document.createElement("span");
      itemName.textContent =
        amount > 1
          ? getItemName(item) + " x" + amount
          : getItemName(item);

      itemElement.append(itemImage, itemName);
      ingredientsWrapper.appendChild(itemElement);
    }

    normalInputIds.forEach(function (itemId, index) {
      addRecipeItem(itemsDatabase[itemId], normalInputItems[itemId]);

      if (index < normalInputIds.length - 1) {
        addPlus();
      }
    });

    if (recipe.requiredToolGroups) {
      for (let groupName in recipe.requiredToolGroups) {
        const groupItems = toolGroups[groupName] || [];

        const visibleToolIds = groupItems.filter(function (toolId) {
          const toolItem = itemsDatabase[toolId];

          if (!toolItem) {
            return false;
          }

          const toolRecipe = recipesDatabase[toolId];

          if (!toolRecipe) {
            return true;
          }

          return toolRecipe.isPublic || discoveredRecipes.includes(toolId);
        });

        if (visibleToolIds.length === 0) {
          continue;
        }

        if (ingredientsWrapper.children.length > 0) {
          addPlus();
        }

        const selectedToolId =
          visibleToolIds[recipeToolCycleIndex % visibleToolIds.length];

        addRecipeItem(
          itemsDatabase[selectedToolId],
          recipe.requiredToolGroups[groupName],
          "recipe-tool-group"
        );
      }
    }

    if (recipe.requiredWorkstation) {
      const workstationItem = itemsDatabase[recipe.requiredWorkstation];

      if (workstationItem) {
        if (ingredientsWrapper.children.length > 0) {
          addPlus();
        }

        addRecipeItem(
          workstationItem,
          1,
          hasWorkstation(recipe.requiredWorkstation)
            ? "recipe-workstation"
            : "recipe-workstation recipe-workstation-missing"
        );
      }
    }

    const equalsElement = document.createElement("span");
    equalsElement.classList.add("recipe-equals");
    equalsElement.textContent = "=";

    const resultWrapper = document.createElement("div");
    resultWrapper.classList.add("recipe-result");

    const resultItem = itemsDatabase[recipe.resultItemId];

    if (resultItem) {
      const resultImage = document.createElement("img");
      resultImage.src = resultItem.imageSrc;
      resultImage.alt = getItemName(resultItem);

      const resultName = document.createElement("span");
      resultName.textContent =
        recipe.resultQuantity > 1
          ? getItemName(resultItem) + " x" + recipe.resultQuantity
          : getItemName(resultItem);

      resultWrapper.append(resultImage, resultName);
    }

    recipeRow.append(ingredientsWrapper, equalsElement, resultWrapper);
    recipeList.appendChild(recipeRow);
  }
}

function hasDurability(item) {
  return typeof item.durability === "number";
}

function createDurabilityBadge(item) {
  const durabilityBadge = document.createElement("span");
  durabilityBadge.classList.add("item-durability");

  const databaseItem = itemsDatabase[item.id];
  const maxDurability =
    item.maxDurability ||
    databaseItem?.maxDurability ||
    databaseItem?.durability ||
    item.durability;

  durabilityBadge.textContent = item.durability + "/" + maxDurability;
  durabilityBadge.title = "Durability: " + item.durability + "/" + maxDurability;

  return durabilityBadge;
}

function updateRecipeFilterButtons() {
  recipeFilterButtons.forEach(function (button) {
    if (button.dataset.category === selectedRecipeCategory) {
      button.classList.add("is-active");
    } else {
      button.classList.remove("is-active");
    }
  });
}

recipeFilterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    selectedRecipeCategory = button.dataset.category;
    updateRecipeFilterButtons();
    updateRecipesScreen();
  });
});

const equipmentSlots = document.querySelectorAll(".equipment-slot");

function updateEquipmentScreen() {
  equipmentSlots.forEach(function (slotElement) {
    const slotName = slotElement.dataset.equipSlot;
    const item = equipment[slotName];

    slotElement.innerHTML = "";

    if (item === null) {
      slotElement.draggable = false;
      slotElement.ondragstart = null;
      slotElement.textContent = t(slotName);
      slotElement.classList.remove("is-equipped");
      return;
    }

    slotElement.draggable = true;
    slotElement.ondragstart = function () {
      draggedEquipmentSlot = slotName;
    };

    slotElement.classList.add("is-equipped");

    const img = document.createElement("img");
    img.src = item.imageSrc;
    img.alt = getItemName(item);

    const name = document.createElement("span");
    name.textContent = getItemName(item);

    slotElement.append(img, name);

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.classList.add("equipment-remove");
    removeButton.innerHTML = "&times;";

    removeButton.addEventListener("click", function (event) {
      event.stopPropagation();
      unequipItem(slotName);
    });

    slotElement.appendChild(removeButton);
  });
}

let currentStatus = {
  key: "statusAwake",
  replacements: {}
};

function clamp(value, min, max) {
  value = Number(value);
  return Math.max(min, Math.min(max, value));
}

function updateScreen() {
  healthText.textContent = health;
  hungerText.textContent = hunger;
  energyText.textContent = energy;


  nicknameText.textContent = playerNickname;
  regionText.textContent = t(playerRegion);
  professionText.textContent = playerProfession;
  // const experienceText = document.getElementById("experience");
  // experienceText.textContent = playerXP + " XP";

healthFill.style.width = `${clamp(Number(health), 0, 100)}%`;
hungerFill.style.width = `${clamp(Number(hunger), 0, 100)}%`;
energyFill.style.width = `${clamp(Number(energy), 0, 100)}%`;

healthIconFill.style.setProperty("--empty", 100 - clamp(health, 0, 100) + "%");
hungerIconFill.style.setProperty("--empty", 100 - clamp(hunger, 0, 100) + "%");
energyIconFill.style.setProperty("--empty", 100 - clamp(energy, 0, 100) + "%");
}

function showMessage(message, type = "warning") {
  if (!toastContainer) {
    return;
  }

  const toast = document.createElement("div");
  toast.classList.add("toast", "is-" + type);
  toast.textContent = message;

  toastContainer.appendChild(toast);

  setTimeout(function () {
    toast.classList.add("is-hiding");

    setTimeout(function () {
      toast.remove();
    }, 180);
  }, 3000);
}

function getItemName(item) {
  return t(item.nameKey);
}

function getAreaName(area) {
  return t(area.nameKey);
}

function updateStatusText() {
  statusText.textContent = t(currentStatus.key, currentStatus.replacements);
}

function setAwakeStatus() {
  currentStatus = {
    key: "statusAwake",
    replacements: {}
  };
  updateStatusText();
}

function setSleepingStatus(remainingHours) {
  currentStatus = {
    key: "statusSleeping",
    replacements: {
      hours: remainingHours
    }
  };
  updateStatusText();
}

function setupEquipmentDropZones() {
  const equipmentSlots = document.querySelectorAll(".equipment-slot");

  equipmentSlots.forEach(function (equipmentSlot) {
    equipmentSlot.addEventListener("dragover", function (event) {
      event.preventDefault();
    });

    equipmentSlot.addEventListener("drop", function () {
      if (draggedSlotIndex === null) {
        return;
      }

      const targetEquipSlot = equipmentSlot.dataset.equipSlot;

      wearInventoryItemToSlot(draggedSlotIndex, targetEquipSlot);

      draggedSlotIndex = null;
    });
  });
}

function updateInventoryScreen() {
  inventoryGrid.innerHTML = "";
  inventorySlotsText.textContent = t("slots", {
    used: getUsedSlots(),
    total: inventory.items.length
  });
  inventoryWeightText.textContent = t("weight", {
    current: getCurrentWeight().toFixed(1),
    max: inventory.maxWeight
  });

  for (let i = 0; i < inventory.items.length; i++) {
    let slot = document.createElement("div");
    slot.classList.add("inventory-slot");

    let item = inventory.items[i];

    if (item !== null) {
      let itemInfo = document.createElement("div");
      itemInfo.classList.add("item-info");

      let itemImage = document.createElement("img");
      itemImage.classList.add("item-image");
      itemImage.src = item.imageSrc;
      itemImage.alt = getItemName(item);

      let itemName = document.createElement("strong");
      itemName.textContent = getItemName(item);

      let itemWeight = document.createElement("span");
      itemWeight.classList.add("item-weight");

      let totalItemWeight = item.weight * item.quantity;
      itemWeight.textContent = totalItemWeight.toFixed(2) + " kg";

      itemInfo.append(itemImage, itemName);
      slot.appendChild(itemInfo);
      slot.appendChild(itemWeight);

      if (hasDurability(item)) {
        slot.appendChild(createDurabilityBadge(item));
      }

      if (item.quantity > 1) {
        let quantityBadge = document.createElement("span");
        quantityBadge.classList.add("quantity-badge");
        quantityBadge.textContent = "x" + item.quantity;
        slot.appendChild(quantityBadge);
      }

      slot.draggable = true;

      slot.addEventListener("dragstart", function (event) {
        draggedSlotIndex = i;
        dragMoveAmount = event.ctrlKey ? "one" : "all";
      });

      slot.addEventListener("dragend", function () {
        draggedSlotIndex = null;
        dragMoveAmount = "all";
      });

      slot.addEventListener("click", function (event) {
        if (event.target.closest(".slot-action")) {
          return;
        }

        if (event.ctrlKey) {
          quickMoveInventoryItemToCraft(i, "one");
          return;
        }

        if (event.shiftKey) {
          quickMoveInventoryItemToCraft(i, "all");
          return;
        }
      });

      let slotActions = document.createElement("div");
      slotActions.classList.add("slot-actions");

      if (item.type === "usable") {
        let useButton = document.createElement("button");
        useButton.type = "button";
        useButton.title = t("use");
        useButton.classList.add("slot-action", "use-action");
        useButton.textContent = t("use");
        useButton.addEventListener("click", function () {
          useInventoryItem(i);
        });

        slotActions.appendChild(useButton);
      }
      
      if (item.type === "clothing" || item.type === "bag") {
        let wearButton = document.createElement("button");
        wearButton.type = "button";
        wearButton.title = t("wear");
        wearButton.classList.add("slot-action", "wear-action");
        wearButton.textContent = t("wear");

        wearButton.addEventListener("click", function () {
          wearInventoryItem(i);
        });

        slotActions.appendChild(wearButton);
      }

      let dropButton = document.createElement("button");
      dropButton.type = "button";
      dropButton.title = t("drop");
      dropButton.classList.add("slot-action", "drop-action");
      dropButton.textContent = t("drop");
      dropButton.addEventListener("click", function () {
        dropInventoryItem(i);
      });

      slotActions.appendChild(dropButton);
      slot.appendChild(slotActions);
    } else {
      slot.classList.add("is-empty");
      const emptyLabel = document.createElement("span");
      emptyLabel.classList.add("empty-slot-label");
      emptyLabel.textContent = "";
      slot.appendChild(emptyLabel);
    }

    slot.addEventListener("dragover", function (event) {
      event.preventDefault();
    });

    slot.addEventListener("drop", function () {
      if (draggedShelterSlotIndex !== null) {
        moveShelterItemToInventorySlot(draggedShelterSlotIndex, i);
        draggedShelterSlotIndex = null;
        dragMoveAmount = "all";
        return;
      }

      if (draggedEquipmentSlot !== null) {
        unequipItem(draggedEquipmentSlot);
        draggedEquipmentSlot = null;
        return;
      }

      if (draggedCraftSlotIndex !== null) {
        moveCraftItemToInventorySlot(draggedCraftSlotIndex, i, dragMoveAmount);
        draggedCraftSlotIndex = null;
        dragMoveAmount = "all";
        return;
      }

      if (draggedSlotIndex !== null) {
        moveInventoryItem(draggedSlotIndex, i);
        draggedSlotIndex = null;
      }
    });

    inventoryGrid.appendChild(slot);
  }
}

function setupCraftDropZones() {
  const craftSlotElements = document.querySelectorAll(".craft-slot");

  craftSlotElements.forEach(function (craftSlotElement) {
    craftSlotElement.addEventListener("dragover", function (event) {
      event.preventDefault();
    });

    craftSlotElement.addEventListener("drop", function () {
      const craftSlotIndex = Number(craftSlotElement.dataset.craftSlot);

      if (draggedCraftSlotIndex !== null) {
        moveCraftItem(draggedCraftSlotIndex, craftSlotIndex, dragMoveAmount);
        draggedCraftSlotIndex = null;
        dragMoveAmount = "all";
        return;
      }

      if (draggedSlotIndex !== null) {
        moveInventoryItemToCraftSlot(draggedSlotIndex, craftSlotIndex, dragMoveAmount);
        draggedSlotIndex = null;
        dragMoveAmount = "all";
        return;
      }
    });
  });
}

function updateCraftingScreen() {
  const craftSlotElements = document.querySelectorAll(".craft-slot");

  craftSlotElements.forEach(function (slotElement) {
    const slotIndex = Number(slotElement.dataset.craftSlot);
    const item = craftSlots[slotIndex];

    slotElement.innerHTML = "";

    if (item === null) {
      slotElement.draggable = false;
      slotElement.ondragstart = null;
      slotElement.onclick = null;
      slotElement.innerHTML = "";
      return;
    }

    slotElement.draggable = true;
    slotElement.ondragstart = function (event) {
      draggedCraftSlotIndex = slotIndex;
      dragMoveAmount = event.ctrlKey ? "one" : "all";
    };

    slotElement.onclick = function (event) {
      if (event.ctrlKey) {
        quickMoveCraftItemToInventory(slotIndex, "one");
        return;
      }

      if (event.shiftKey) {
        quickMoveCraftItemToInventory(slotIndex, "all");
        return;
      }
    };

    const img = document.createElement("img");
    img.src = item.imageSrc;
    img.alt = getItemName(item);

    const name = document.createElement("span");
    name.textContent = getItemName(item);

    slotElement.append(img, name);

    if (item.quantity > 1) {
      const quantityBadge = document.createElement("span");
      quantityBadge.classList.add("quantity-badge");
      quantityBadge.textContent = "x" + item.quantity;
      slotElement.appendChild(quantityBadge);
    }
    
  });

  updateCraftResultScreen();
}

function updateWorkstationScreen() {
  const workstationSlotElements = document.querySelectorAll(".workstation-slot");

  if (!workstationSlotElements.length) {
    return;
  }

  const currentRegionWorkstations = getCurrentRegionWorkstations();

  for (let slotElement of workstationSlotElements) {
    const workstationId = slotElement.dataset.workstationSlot;
    const workstation = currentRegionWorkstations[workstationId];

    slotElement.innerHTML = "";
    slotElement.classList.remove("is-active");

    if (!workstation) {
      continue;
    }

    const workstationItem = itemsDatabase[workstation.itemId];

    if (!workstationItem) {
      continue;
    }

    slotElement.classList.add("is-active");

    const image = document.createElement("img");
    image.src = workstationItem.imageSrc;
    image.alt = getItemName(workstationItem);

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.classList.add("workstation-remove");
    removeButton.title = t("remove");

    removeButton.addEventListener("click", function () {
      removeWorkstation(workstationId);
    });

    slotElement.append(image, removeButton);
  }
}

const craftResultSlot = document.getElementById("craftResultSlot");

function updateCraftResultScreen() {
  craftResultSlot.innerHTML = "";

  const recipe = getMatchingRecipe();

  if (recipe === null) {
    const emptyText = document.createElement("span");
    emptyText.textContent = "";
    craftResultSlot.appendChild(emptyText);
    return;
  }

  const resultItem = itemsDatabase[recipe.resultItemId];

  const resultImage = document.createElement("img");
  resultImage.src = resultItem.imageSrc;
  resultImage.alt = getItemName(resultItem);

  const resultName = document.createElement("span");
  resultName.textContent = getItemName(resultItem);

  craftResultSlot.append(resultImage, resultName);
}

function getVisibleToolGroupItems(groupName) {
  const groupItems = toolGroups[groupName] || [];

  return groupItems.filter(function (itemId) {
    const item = itemsDatabase[itemId];

    if (!item) {
      return false;
    }

    const recipe = recipesDatabase[itemId];

    if (!recipe) {
      return true;
    }

    return recipe.isPublic || discoveredRecipes.includes(itemId);
  });
}

function updateAreaOptions() {
  const areaOptions = document.querySelectorAll("[data-area-option]");

  for (let option of areaOptions) {
    option.textContent = t(option.dataset.areaOption);
  }
  autoSave();
}

function applyLanguage() {
  const translatedElements = document.querySelectorAll("[data-i18n]");

  for (let element of translatedElements) {
    element.textContent = t(element.dataset.i18n);
  }

  updateAreaOptions();
  updateStatusText();
  updateInventoryScreen();
  updateEquipmentScreen();
  updateLanguageButtons();
  updateScreen();
  updateCraftingScreen();
  updateCraftResultScreen();
  updateWorkstationScreen();
  updateRecipesScreen();
  updateShelterScreen();
}

function updateLanguageButtons() {
  for (let button of languageButtons) {
    button.classList.toggle("is-active", button.dataset.language === currentLanguage);
  }
  
}

function showToast(message, type = "warning") {
  if (!toastContainer) {
    return;
  }

  const toast = document.createElement("div");
  toast.classList.add("toast", "is-" + type);
  toast.textContent = message;

  toastContainer.appendChild(toast);

  setTimeout(function () {
    toast.remove();
  }, 3000);
}

function addLog(message, type = "info") {
  if (!logList) {
    return;
  }

  const emptyLog = logList.querySelector(".log-empty");

  if (emptyLog) {
    emptyLog.remove();
  }

  const logItem = document.createElement("p");
  logItem.classList.add("log-item", "log-" + type);
  logItem.textContent = message;

  logList.prepend(logItem);

  const logItems = logList.querySelectorAll(".log-item");

  if (logItems.length > MAX_LOG_ITEMS) {
    logItems[logItems.length - 1].remove();
  }
}

function updateShelterScreen() {
  if (!shelterCard) {
    return;
  }

  if (
    playerShelter === null ||
    playerShelter.regionId !== getCurrentRegionName()
  ) {
    shelterCard.hidden = true;
    return;
  }

  shelterCard.hidden = false;

  const usedSlots = playerShelter.storageItems.filter(function (item) {
    return item !== null;
  }).length;

  const shelterWeight = playerShelter.storageItems.reduce(function (total, item) {
    if (item === null) {
      return total;
    }

    return total + item.weight * (item.quantity || 1);
  }, 0);

  shelterTitle.textContent = playerShelter.type;

  shelterRegionText.textContent =
    getAreaName(areasDatabase[playerShelter.regionId]);

  shelterStorageText.textContent =
    usedSlots + " / " + playerShelter.storageSlots + " slots";

  shelterWeightText.textContent =
    shelterWeight.toFixed(1) + " / " + playerShelter.maxWeight + " kg";

  shelterStorageGrid.innerHTML = "";

  for (let i = 0; i < playerShelter.storageSlots; i++) {
    const slot = document.createElement("div");
    slot.classList.add("shelter-storage-slot");
    slot.dataset.shelterSlot = i;

    slot.addEventListener("dragover", function (event) {
      event.preventDefault();
    });

    slot.addEventListener("drop", function () {
      const shelterSlotIndex = Number(slot.dataset.shelterSlot);

      if (draggedShelterSlotIndex !== null) {
        moveShelterItem(draggedShelterSlotIndex, shelterSlotIndex);
        draggedShelterSlotIndex = null;
        dragMoveAmount = "all";
        return;
      }

      if (draggedSlotIndex !== null) {
        moveInventoryItemToShelterSlot(draggedSlotIndex, shelterSlotIndex);
        draggedSlotIndex = null;
        dragMoveAmount = "all";
        return;
      }
    });

    const item = playerShelter.storageItems[i];

    if (item === null) {
      slot.draggable = false;

      const emptyLabel = document.createElement("span");
      emptyLabel.classList.add("shelter-empty-label");
      emptyLabel.textContent = "";

      slot.appendChild(emptyLabel);
    } else {
      slot.classList.add("is-filled");
      slot.draggable = true;

      slot.addEventListener("dragstart", function () {
        draggedShelterSlotIndex = Number(slot.dataset.shelterSlot);
        dragMoveAmount = "all";
      });

      slot.addEventListener("dragend", function () {
        draggedShelterSlotIndex = null;
        dragMoveAmount = "all";
      });

      if ((item.quantity || 1) > 1) {
        const quantityBadge = document.createElement("span");
        quantityBadge.classList.add("quantity-badge");
        quantityBadge.textContent = "x" + item.quantity;
        slot.appendChild(quantityBadge);
      }

      const itemInfo = document.createElement("div");
      itemInfo.classList.add("item-info");

      const img = document.createElement("img");
      img.classList.add("item-image");
      img.src = item.imageSrc;
      img.alt = getItemName(item);

      const name = document.createElement("strong");
      name.textContent = getItemName(item);

      itemInfo.append(img, name);
      slot.appendChild(itemInfo);

      if (hasDurability(item)) {
        slot.appendChild(createDurabilityBadge(item));
      }

      const itemWeight = document.createElement("span");
      itemWeight.classList.add("item-weight");
      itemWeight.textContent =
        ((item.weight || 0) * (item.quantity || 1)).toFixed(2) + " kg";

      slot.appendChild(itemWeight);
    }

    shelterStorageGrid.appendChild(slot);
  }
}