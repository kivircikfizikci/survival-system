const healthText = document.getElementById("health");
const hungerText = document.getElementById("hunger");
const energyText = document.getElementById("energy");
const nicknameText = document.getElementById("nickname");
const regionText = document.getElementById("region");
const professionText = document.getElementById("profession");
// const experienceText = document.getElementById("experience");
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
const sleepHoursSelect = document.getElementById("sleepHours");
const areaSelect = document.getElementById("areaSelect");
const searchButton = document.getElementById("searchBtn");
const languageButtons = document.querySelectorAll("[data-language]");

const logList = document.getElementById("logList");
const toastContainer = document.getElementById("toastContainer");
const MAX_LOG_ITEMS = 10;

let playerNickname = "Survivor";
let playerRegion = "meadow";
let playerProfession = "Explorer";
//let playerXP = 420;

let draggedSlotIndex = null;
let draggedEquipmentSlot = null;
let dragMoveAmount = "all";

const regionBackgrounds = {
  meadow: "img/meadow.png",
  lake: "img/lake.png",
  trail: "img/trail.png",
  mountain: "img/mountain.png",
  abandonedVillage: "img/abandonedVillage.png"
};

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

    const recipeInputItems = {
      ...recipe.ingredients,
      ...(recipe.requiredTools || {})
    };

    if (recipe.requiredToolGroups) {
      for (let groupName in recipe.requiredToolGroups) {
        const firstToolId = toolGroups[groupName][0];
        recipeInputItems[firstToolId] = recipe.requiredToolGroups[groupName];
      }
    }

    const ingredientIds = Object.keys(recipeInputItems);

    ingredientIds.forEach(function (itemId, index) {
      const ingredientItem = itemsDatabase[itemId];
      const ingredientAmount = recipeInputItems[itemId];

      if (!ingredientItem) {
        return;
      }

      const ingredientElement = document.createElement("div");
      ingredientElement.classList.add("recipe-item");

      const ingredientImage = document.createElement("img");
      ingredientImage.src = ingredientItem.imageSrc;
      ingredientImage.alt = getItemName(ingredientItem);

      const ingredientName = document.createElement("span");

      if (ingredientAmount > 1) {
        ingredientName.textContent =
          getItemName(ingredientItem) + " x" + ingredientAmount;
      } else {
        ingredientName.textContent = getItemName(ingredientItem);
      }

      ingredientElement.append(ingredientImage, ingredientName);
      ingredientsWrapper.appendChild(ingredientElement);

      if (index < ingredientIds.length - 1) {
        const plusElement = document.createElement("span");
        plusElement.classList.add("recipe-plus");
        plusElement.textContent = "+";
        ingredientsWrapper.appendChild(plusElement);
      }
    });

    const equalsElement = document.createElement("span");
    equalsElement.classList.add("recipe-equals");
    equalsElement.textContent = "=";

    const resultItem = itemsDatabase[recipe.resultItemId];

    const resultWrapper = document.createElement("div");
    resultWrapper.classList.add("recipe-result");

    if (resultItem) {
      const resultImage = document.createElement("img");
      resultImage.src = resultItem.imageSrc;
      resultImage.alt = getItemName(resultItem);

      const resultName = document.createElement("span");

      if (recipe.resultQuantity > 1) {
        resultName.textContent =
          getItemName(resultItem) + " x" + recipe.resultQuantity;
      } else {
        resultName.textContent = getItemName(resultItem);
      }

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

function updateRegionBackground(regionId) {
  const imagePath = regionBackgrounds[regionId] || "";

  if (imagePath) {
    document.body.style.setProperty("--region-image", `url("${imagePath}")`);
    return;
  }

  document.body.style.setProperty("--region-image", "none");
}

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

areaSelect.addEventListener("change", function () {
  playerRegion = areaSelect.value;
  updateRegionBackground(playerRegion);
  updateScreen();
  saveGame();
});
let searchButtonRemainingSeconds = 0;
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
      emptyLabel.textContent = t("empty");
      slot.appendChild(emptyLabel);
    }

    slot.addEventListener("dragover", function (event) {
      event.preventDefault();
    });

    slot.addEventListener("drop", function () {
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

const craftResultSlot = document.getElementById("craftResultSlot");

function updateCraftResultScreen() {
  craftResultSlot.innerHTML = "";

  const recipe = getMatchingRecipe();

  if (recipe === null) {
    const emptyText = document.createElement("span");
    emptyText.textContent = t("empty");
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

function updateSearchButton(remainingSeconds) {
  searchButtonRemainingSeconds = remainingSeconds;

  if (remainingSeconds > 0) {
    searchButton.disabled = true;
    searchButton.textContent = t("search") + " (" + remainingSeconds + ")";
    return;
  }

  searchButton.disabled = false;
  searchButton.textContent = t("search");
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
  updateSearchButton(searchButtonRemainingSeconds);
  updateInventoryScreen();
  updateEquipmentScreen();
  updateLanguageButtons();
  updateScreen();
  updateCraftingScreen();
  updateCraftResultScreen();
  updateRecipesScreen();
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