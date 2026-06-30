const healthText = document.getElementById("health");
const hungerText = document.getElementById("hunger");
const energyText = document.getElementById("energy");
const nicknameText = document.getElementById("nickname");
const statusText = document.getElementById("statusText");
const regionText = document.getElementById("region");
const professionText = document.getElementById("profession");
const healthFill = document.getElementById("healthFill");
const hungerFill = document.getElementById("hungerFill");
const energyFill = document.getElementById("energyFill");
const healthIconFill = document.getElementById("healthIconFill");
const hungerIconFill = document.getElementById("hungerIconFill");
const energyIconFill = document.getElementById("energyIconFill");
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

const storageContainerCard = document.getElementById("storageContainerCard");
const storageContainerTitle = document.getElementById("storageContainerTitle");
const storageContainerRegionText = document.getElementById("storageContainerRegionText");
const storageContainerSlotsText = document.getElementById("storageContainerSlotsText");
const storageContainerWeightText = document.getElementById("storageContainerWeightText");
const storageContainerGrid = document.getElementById("storageContainerGrid");
const packStorageContainerButton = document.getElementById("packStorageContainerButton");

let playerNickname = "Survivor";
let playerRegion = "meadow";
let playerProfession = "Explorer";
//let playerXP = 420;

let placedStorageContainers = [];

let draggedSlotIndex = null;
let draggedEquipmentSlot = null;
let draggedCraftSlotIndex = null;
let draggedShelterSlotIndex = null;
let draggedStorageSlotIndex = null;
let dragMoveAmount = "all";

const recipesBtn = document.getElementById("recipesBtn");
const recipesPanel = document.getElementById("recipesPanel");
const closeRecipesBtn = document.getElementById("closeRecipesBtn");
const recipeFilters = document.getElementById("recipeFilters");
const recipeFilterButtons = document.querySelectorAll(".recipe-filter-btn");
let selectedRecipeCategory = "basic";
const recipeList = document.getElementById("recipeList");

const goalsList = document.getElementById("goalsList");
const goalsPanel = document.getElementById("goalsPanel");
const goalsToggle = document.getElementById("goalsToggle");
const goalsContent = document.getElementById("goalsContent");
const goalsArrow = document.getElementById("goalsArrow");

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
      ...(recipe.ingredients || {}),
      ...(recipe.requiredTools || {})
    };

    const normalInputIds = Object.keys(normalInputItems);

    function addPlus() {
      const plusElement = document.createElement("span");
      plusElement.classList.add("recipe-plus");
      plusElement.textContent = "+";
      ingredientsWrapper.appendChild(plusElement);
    }

    function addRecipeItem(item, amount, extraClassName = "", customText = null) {
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

      if (customText !== null) {
        itemName.textContent = customText;
      } else {
        itemName.textContent =
          amount > 1
            ? getItemName(item) + " x" + amount
            : getItemName(item);
      }

      itemElement.append(itemImage, itemName);
      ingredientsWrapper.appendChild(itemElement);
    }

    normalInputIds.forEach(function (itemId, index) {
      addRecipeItem(itemsDatabase[itemId], normalInputItems[itemId]);

      if (index < normalInputIds.length - 1) {
        addPlus();
      }
    });

    if (recipe.ingredientGroups) {
      for (let groupName in recipe.ingredientGroups) {
        const groupData = recipe.ingredientGroups[groupName];

        if (!groupData || !Array.isArray(groupData.itemIds)) {
          continue;
        }

        const visibleItemIds = groupData.itemIds.filter(function (itemId) {
          return itemsDatabase[itemId];
        });

        if (visibleItemIds.length === 0) {
          continue;
        }

        if (ingredientsWrapper.children.length > 0) {
          addPlus();
        }

        let cycleIndex = 0;

        if (typeof recipeToolCycleIndex !== "undefined") {
          cycleIndex = recipeToolCycleIndex;
        }

        const selectedGroupItemId =
          visibleItemIds[cycleIndex % visibleItemIds.length];

        addRecipeItem(
          itemsDatabase[selectedGroupItemId],
          groupData.amount || 1,
          "recipe-ingredient-group"
        );
      }
    }

    if ( Array.isArray(recipe.liquidIngredients) && recipe.liquidIngredients.length > 0) {
      for (let liquidIngredient of recipe.liquidIngredients) {
        if (!liquidIngredient) {
          continue;
        }

        const liquidItem =
          itemsDatabase[liquidIngredient.itemId];

        if (!liquidItem) {
          continue;
        }

        const requiredAmount = Number(
          liquidIngredient.amount || 0
        );

        if (requiredAmount <= 0) {
          continue;
        }

        const availableAmount =
          getInventoryLiquidAmount(
            liquidIngredient.itemId
          );

        if (ingredientsWrapper.children.length > 0) {
          addPlus();
        }

        const liquidClassName =
          availableAmount >= requiredAmount
            ? "recipe-liquid"
            : "recipe-liquid recipe-liquid-missing";

        const requiredMilliliters =
          requiredAmount * 100;

        const availableMilliliters =
          availableAmount * 100;

        const liquidText =
          getItemName(liquidItem) +
          " " +
          requiredMilliliters +
          " ml" +
          " (" +
          availableMilliliters +
          " ml)";

        addRecipeItem(
          liquidItem,
          requiredAmount,
          liquidClassName,
          liquidText
        );
      }
    }

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

    recipeRow.append(
    ingredientsWrapper,
    equalsElement,
    resultWrapper
  );

  if (canQuickCraftRecipe(recipe)) {
    const quickCraftButton =
      document.createElement("button");

    quickCraftButton.type = "button";
    quickCraftButton.classList.add(
      "quick-craft-button"
    );

    quickCraftButton.textContent =
      t("quickCraft");

    quickCraftButton.addEventListener(
      "click",
      function () {
        quickCraftRecipe(recipe.id);
      }
    );

    recipeRow.appendChild(quickCraftButton);
  }
    recipeList.appendChild(recipeRow);
  }
}

function hasDurability(item) {
  return typeof item.durability === "number";
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

function getSleepRemainingMinutes() {
  if (
    !isSleeping ||
    !sleepSession ||
    !sleepSession.active
  ) {
    return 0;
  }

  const slotIndex = sleepSession.slotIndex;
  const sleepItem = inventory.items[slotIndex];

  if (
    !sleepItem ||
    sleepItem.id !== sleepSession.itemId ||
    !sleepItem.sleepData
  ) {
    return 0;
  }

  const energyPerTick = Number(
    sleepItem.sleepData.energyPerTick || 1
  );

  const tickMs = Number(gameConfig.sleepTickMs);

  const remainingEnergy = Math.max(
    0,
    100 - energy
  );

  if (remainingEnergy <= 0) {
    return 0;
  }

  const remainingTicks = Math.ceil(
    remainingEnergy / energyPerTick
  );

  const elapsedSinceLastTick = Math.max(
    0,
    Date.now() - sleepSession.lastTickAt
  );

  const remainingMs = Math.max(
    0,
    remainingTicks * tickMs - elapsedSinceLastTick
  );

  return Math.max(
    1,
    Math.ceil(remainingMs / 60000)
  );
}

function getPlayerStatusText() {
    if (isSleeping) { const remainingMinutes = getSleepRemainingMinutes();
    const sleepingStatus = t("sleeping") + " ( " + remainingMinutes + " " + t("minute") + " )";
    return t("statusLabel", { status: sleepingStatus});
  }
  if (hunger <= 15) return t("statusLabel", { status: t("starving") });
  if (energy <= 15) return t("statusLabel", { status: t("exhausted") });
  if (health <= 30) return t("statusLabel", { status: t("weak") });

  return t("statusLabel", { status: t("awake") });
}

function clamp(value, min, max) {
  value = Number(value);
  return Math.max(min, Math.min(max, value));
}

function formatStat(value) {
  return Math.round(clamp(value, 0, 100));
}

function normalizeStat(value) {
  return Number(clamp(value, 0, 100).toFixed(2));
}

function updateScreen() {
  healthText.textContent = formatStat(health);
  hungerText.textContent = formatStat(hunger);
  energyText.textContent = formatStat(energy);


  nicknameText.textContent = playerNickname;
  
  if (statusText) { statusText.textContent = getPlayerStatusText(); }

  regionText.textContent = t(playerRegion);
  professionText.textContent = playerProfession;
  

  healthFill.style.width = `${formatStat(health)}%`;
  hungerFill.style.width = `${formatStat(hunger)}%`;
  energyFill.style.width = `${formatStat(energy)}%`;

  healthIconFill.style.setProperty("--empty", 100 - formatStat(health) + "%");
  hungerIconFill.style.setProperty("--empty", 100 - formatStat(hunger) + "%");
  energyIconFill.style.setProperty("--empty", 100 - formatStat(energy) + "%");

  updateGoalsPanel();
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

function createItemMetric(options) {
  const metric = document.createElement("div");
  metric.classList.add("item-footer-metric");

  if (options.extraClassName) {
    const classNames =
      options.extraClassName.split(" ");

    for (let className of classNames) {
      if (className) {
        metric.classList.add(className);
      }
    }
  }

  const header = document.createElement("div");
  header.classList.add("item-footer-metric-header");

  const title = document.createElement("span");
  title.classList.add("item-footer-metric-title");
  title.textContent = options.title || "";

  const value = document.createElement("span");
  value.classList.add("item-footer-metric-value");
  value.textContent = options.value || "";

  const mainInfo = document.createElement("div");
  mainInfo.classList.add("item-footer-main-info");

  mainInfo.append(title, value);
  header.appendChild(mainInfo);
  metric.appendChild(header);

  if (options.subtext) {
    const subtext = document.createElement("div");
    subtext.classList.add("item-footer-metric-subtext");
    subtext.textContent = options.subtext;
    metric.appendChild(subtext);
  }

  if (typeof options.fillPercent === "number") {
    const bar = document.createElement("div");
    bar.classList.add("item-footer-metric-bar");

    const fill = document.createElement("div");
    fill.classList.add("item-footer-metric-fill");
    fill.style.width = Math.max(0, Math.min(100, options.fillPercent)) + "%";

    bar.appendChild(fill);
    metric.appendChild(bar);
  }

  return metric;
}

function createContainerContentInfo(item) {
  if (
    !item ||
    item.category !== "container" ||
    !item.containerData
  ) {
    return null;
  }

  const capacity = Math.max(
    0,
    Number(item.containerData.capacity || 0)
  );

  const unitMl = Math.max(
    1,
    Number(item.containerData.unitMl || 100)
  );

  const hasContents = Boolean(
    item.contents &&
    item.contents.itemId &&
    Number(item.contents.amount || 0) > 0
  );

  const currentAmount = hasContents
    ? Math.max(
        0,
        Math.min(
          capacity,
          Number(item.contents.amount || 0)
        )
      )
    : 0;

  const fillPercent =
    capacity > 0
      ? (currentAmount / capacity) * 100
      : 0;

  const totalItemWeight =
  getItemTotalWeight(item);

  const liquidItem = hasContents
    ? itemsDatabase[item.contents.itemId]
    : null;

  const liquidName = hasContents
    ? (
        liquidItem
          ? getItemName(liquidItem)
          : item.contents.itemId
      )
    : t("containerEmpty");

  const metric = createItemMetric({
    title: liquidName,
    value:
      currentAmount +
      "/" +
      capacity,
    subtext:
      currentAmount * unitMl +
      " ml",
    fillPercent: fillPercent,
    extraClassName:
      hasContents
        ? "item-container-info"
        : "item-container-info is-empty"
  });

  const header = metric.querySelector(
    ".item-footer-metric-header"
  );

  if (header) {
    const weight = document.createElement("span");
    weight.classList.add("item-footer-inline-weight");

    weight.textContent =
      totalItemWeight.toFixed(2) +
      " kg";

    header.appendChild(weight);
  }

  return metric;
}

function createWeightFooterInfo(item) {
  if (!item) {
    return null;
  }

  const totalItemWeight =
    getItemTotalWeight(item);

  const weightBadge = document.createElement("div");

  weightBadge.classList.add(
    "item-standalone-weight"
  );

  weightBadge.textContent =
    totalItemWeight.toFixed(2) + " kg";

  return weightBadge;
}

function createItemFooter(item) {
  if (!item) {
    return null;
  }

  if (
    item.category === "container" &&
    item.containerData
  ) {
    return createContainerContentInfo(item);
  }

  if (hasDurability(item)) {
    return createDurabilityFooterInfo(item);
  }

  return createWeightFooterInfo(item);
}

function createDurabilityInfo(item) {
  if (!hasDurability(item)) {
    return null;
  }

  const currentDurability = Math.max(
    0,
    Math.round(Number(item.durability || 0))
  );

  const maxDurability = Math.max(
    1,
    Math.round(Number(item.maxDurability || 1))
  );

  const percent = (currentDurability / maxDurability) * 100;

  return createItemMetric({
    title: t("durability"),
    value: currentDurability + "/" + maxDurability,
    subtext: Math.round(percent) + "%",
    fillPercent: percent,
    extraClassName: "item-durability-info"
  });
}

function createDurabilityFooterInfo(item) {
  if (!item || !hasDurability(item)) {
    return null;
  }

  const currentDurability = Math.max(
    0,
    Number(item.durability || 0)
  );

  const maxDurability = Math.max(
    1,
    Number(
      item.maxDurability ||
      item.durability ||
      1
    )
  );

  const durabilityPercent = Math.max(
    0,
    Math.min(
      100,
      Math.round(
        (currentDurability / maxDurability) * 100
      )
    )
  );

  const totalItemWeight =
    getItemTotalWeight(item);

  const footerBox =
    document.createElement("div");

  footerBox.classList.add(
    "item-footer-box",
    "item-durability-footer"
  );

  const topRow =
    document.createElement("div");

  topRow.classList.add("item-footer-top");

  const durabilityValue =
    document.createElement("span");

  durabilityValue.classList.add(
    "item-footer-main-value"
  );

  durabilityValue.textContent =
    Math.round(currentDurability) +
    "/" +
    Math.round(maxDurability);

  const weightValue =
    document.createElement("span");

  weightValue.classList.add(
    "item-footer-inline-weight"
  );

  weightValue.textContent =
    totalItemWeight.toFixed(2) + " kg";

  topRow.append(
    durabilityValue,
    weightValue
  );

  const progressBar =
    document.createElement("div");

  progressBar.classList.add(
    "item-footer-bar"
  );

  const progressFill =
    document.createElement("div");

  progressFill.classList.add(
    "item-footer-bar-fill"
  );

  progressFill.style.width =
    durabilityPercent + "%";

  progressBar.appendChild(progressFill);

  footerBox.append(
    topRow,
    progressBar
  );

  return footerBox;
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

      let totalItemWeight = item.weight * item.quantity;

      itemInfo.append(itemImage, itemName);
      slot.appendChild(itemInfo);

      const itemFooter = createItemFooter(item);

      if (itemFooter) {
        const hasLargeFooter =
          itemFooter.classList.contains("item-footer-box") ||
          itemFooter.classList.contains("item-footer-metric");

        if (hasLargeFooter) {
          slot.classList.add("has-item-footer");
        }

        slot.appendChild(itemFooter);
      }
      slot.appendChild(createItemFooter(item));

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
        moveShelterItemToInventorySlot(
          draggedShelterSlotIndex,
          i
        );

        draggedShelterSlotIndex = null;
        dragMoveAmount = "all";
        return;
      }

      if (draggedStorageSlotIndex !== null) {
        moveStorageContainerItemToInventorySlot(
          draggedStorageSlotIndex,
          i
        );

        draggedStorageSlotIndex = null;
        dragMoveAmount = "all";
        return;
      }

      if (draggedEquipmentSlot !== null) {
        unequipItem(draggedEquipmentSlot);
        draggedEquipmentSlot = null;
        return;
      }

      if (draggedCraftSlotIndex !== null) {
        moveCraftItemToInventorySlot(
          draggedCraftSlotIndex,
          i,
          dragMoveAmount
        );

        draggedCraftSlotIndex = null;
        dragMoveAmount = "all";
        return;
      }

      if (draggedSlotIndex !== null) {
        moveInventoryItem(
          draggedSlotIndex,
          i
        );

        draggedSlotIndex = null;
        dragMoveAmount = "all";
      }
    });

    inventoryGrid.appendChild(slot);
  }
}

function setupCraftDropZones() {
  const craftSlotElements =
    document.querySelectorAll(".craft-slot");

  craftSlotElements.forEach(function (
    craftSlotElement
  ) {
    craftSlotElement.addEventListener(
      "dragover",
      function (event) {
        event.preventDefault();
      }
    );

    craftSlotElement.addEventListener(
      "drop",
      function () {
        const craftSlotIndex = Number(
          craftSlotElement.dataset.craftSlot
        );

        if (
          draggedCraftSlotIndex !== null
        ) {
          moveCraftItem(
            draggedCraftSlotIndex,
            craftSlotIndex,
            dragMoveAmount
          );

          draggedCraftSlotIndex = null;
          dragMoveAmount = "all";
          return;
        }

        if (
          draggedShelterSlotIndex !== null
        ) {
          moveShelterItemToCraftSlot(
            draggedShelterSlotIndex,
            craftSlotIndex,
            dragMoveAmount
          );

          draggedShelterSlotIndex = null;
          dragMoveAmount = "all";
          return;
        }

        if (
          draggedStorageSlotIndex !== null
        ) {
          moveStorageContainerItemToCraftSlot(
            draggedStorageSlotIndex,
            craftSlotIndex,
            dragMoveAmount
          );

          draggedStorageSlotIndex = null;
          dragMoveAmount = "all";
          return;
        }

        if (draggedSlotIndex !== null) {
          moveInventoryItemToCraftSlot(
            draggedSlotIndex,
            craftSlotIndex,
            dragMoveAmount
          );

          draggedSlotIndex = null;
          dragMoveAmount = "all";
        }
      }
    );
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

    if (
      !workstation ||
      !isWorkstationAtCurrentTile(workstation)
    ) {
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

  const currentPosition = getCurrentDiscoveryPosition();

  const isPlayerAtShelter =
    playerShelter !== null &&
    playerShelter.regionId === currentPosition.regionId &&
    playerShelter.x === currentPosition.x &&
    playerShelter.y === currentPosition.y;

  if (!isPlayerAtShelter) {
    shelterCard.hidden = true;
    return;
  }

  shelterCard.hidden = false;

  const usedSlots = playerShelter.storageItems.filter(function (item) {
    return item !== null;
  }).length;

  const shelterWeight =
    playerShelter.storageItems.reduce(
      function (total, item) {
        return total + getItemTotalWeight(item);
      },
      0
    );

  shelterTitle.textContent = playerShelter.type;

  if (playerShelter && shelterRegionText) {
    shelterRegionText.textContent = getRegionNameById(playerShelter.regionId);
  }

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

      if (draggedCraftSlotIndex !== null) {
        moveCraftItemToShelterSlot(draggedCraftSlotIndex, shelterSlotIndex, dragMoveAmount);
        draggedCraftSlotIndex = null;
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

      const itemFooter = createItemFooter(item);

      if (itemFooter) {
        const hasLargeFooter =
          itemFooter.classList.contains("item-footer-box") ||
          itemFooter.classList.contains("item-footer-metric");

        if (hasLargeFooter) {
          slot.classList.add("has-item-footer");
        }

        slot.appendChild(itemFooter);
      }

    }

    shelterStorageGrid.appendChild(slot);
  }
}

function getActiveGoals() {
  return goalsDatabase[activeGoalsStage] || [];
}

function completeGoal(goalId) {
  if (!goalId) {
    return;
  }

  if (!completedGoals.includes(goalId)) {
    completedGoals.push(goalId);
  }
}

function isGoalCompleted(goalId) {
  return completedGoals.includes(goalId);
}

function checkGoalsByPlacedWorkstation(workstationId) {
  if (!workstationId) {
    return;
  }

  const activeGoals = getActiveGoals();

  activeGoals.forEach(function (goal) {
    if (goal.type !== "placedWorkstation") {
      return;
    }

    if (goal.workstationId === workstationId) {
      completeGoal(goal.id);
    }
  });
}

function checkGoalsByCurrentWorkstations() {
  const currentRegionWorkstations =
    getCurrentRegionWorkstations();

  if (
    !currentRegionWorkstations ||
    typeof currentRegionWorkstations !== "object"
  ) {
    return;
  }

  const activeGoals = getActiveGoals();

  activeGoals.forEach(function (goal) {
    if (
      goal.type !== "placedWorkstation" ||
      !goal.workstationId
    ) {
      return;
    }

    if (currentRegionWorkstations[goal.workstationId]) {
      completeGoal(goal.id);
    }
  });
}

function checkGoalsByCraftedItem(itemId) {
  if (!itemId) {
    return;
  }

  const activeGoals = getActiveGoals();

  activeGoals.forEach(function (goal) {
    if (goal.type === "craftedItem") {
      if (goal.itemId === itemId) {
        completeGoal(goal.id);
      }

      return;
    }

    if (goal.type === "craftedAnyItem") {
      if (
        Array.isArray(goal.itemIds) &&
        goal.itemIds.includes(itemId)
      ) {
        completeGoal(goal.id);
      }
    }
  });
}

function getCurrentDiscoveryMapIdForGoals() {
  const savedDiscoveryData = localStorage.getItem("survivalSystemDiscoverySave");

  if (!savedDiscoveryData) {
    return "meadow";
  }

  try {
    const discoveryData = JSON.parse(savedDiscoveryData);
    return discoveryData.currentMapId || "meadow";
  } catch (error) {
    return "meadow";
  }
}

function checkGoalsByCurrentMap() {
  const currentMapId = getCurrentDiscoveryMapIdForGoals();
  const activeGoals = getActiveGoals();

  activeGoals.forEach(function (goal) {
    if (goal.type !== "reachedMap") {
      return;
    }

    if (goal.mapId === currentMapId) {
      completeGoal(goal.id);
    }
  });
}

function updateGoalsProgress() {
  const goalsProgress =
    document.getElementById("goalsProgress");

  if (!goalsProgress) {
    return;
  }

  const activeGoals = getActiveGoals();

  goalsProgress.innerHTML = "";

  goalsProgress.style.gridTemplateColumns =
    "repeat(" +
    activeGoals.length +
    ", minmax(12px, 1fr))";

  activeGoals.forEach(function (goal) {
    const progressCell = document.createElement("span");
    progressCell.classList.add("goal-progress-cell");

    if (isGoalCompleted(goal.id)) {
      progressCell.classList.add("is-completed");
    }

    goalsProgress.appendChild(progressCell);
  });
}

function areStarterGoalsCompleted() {
  return goalsDatabase.starter.every(function (goal) {
    return isGoalCompleted(goal.id);
  });
}

function checkStarterGoalsReward() {
  if (
    starterGoalsRewardClaimed ||
    isGrantingStarterGoalsReward
  ) {
    return;
  }

  if (!areStarterGoalsCompleted()) {
    return;
  }

  const rewardItem = itemsDatabase.buriedStashMap;

  if (!rewardItem) {
    console.error("buriedStashMap item is missing.");
    return;
  }

  isGrantingStarterGoalsReward = true;

  try {
    const added = addItem({
      ...rewardItem,
      quantity: 1
    });

    if (!added) {
      return;
    }

    starterGoalsRewardClaimed = true;
    activeGoalsStage = "trail";

    const completedMessage =
      t("starterGoalsCompleted");

    const rewardMessage =
      t("starterGoalsRewardReceived");

    showMessage(rewardMessage, "success");

    addLog(
      completedMessage + " " + rewardMessage,
      "success"
    );

    autoSave();
  } finally {
    isGrantingStarterGoalsReward = false;
  }
}

function updateGoalsPanel() {
  if (!goalsList) {
    return;
  }

  checkGoalsByCurrentMap();
  checkGoalsByCurrentWorkstations();
  checkStarterGoalsReward();

  const activeGoals = getActiveGoals();

  goalsList.innerHTML = "";

  activeGoals.forEach(function (goal) {
    const goalElement = document.createElement("div");
    goalElement.classList.add("goal-item");

    if (isGoalCompleted(goal.id)) {
      goalElement.classList.add("goal-completed");
    }

    const checkbox = document.createElement("span");
    checkbox.classList.add("goal-check");
    checkbox.textContent =
      isGoalCompleted(goal.id) ? "✓" : "○";

    const text = document.createElement("span");
    text.classList.add("goal-text");
    text.textContent = t(goal.textKey);

    goalElement.append(checkbox, text);
    goalsList.appendChild(goalElement);
  });

  updateGoalsProgress();
  updateGoalsPanelState();
}

let isGoalsPanelOpen = false;

function updateGoalsPanelState() {
  if (!goalsPanel || !goalsContent || !goalsArrow) {
    return;
  }

  if (isGoalsPanelOpen) {
    goalsPanel.classList.add("goals-open");
    goalsContent.style.maxHeight = goalsContent.scrollHeight + "px";
    goalsArrow.textContent = "▴";
  } else {
    goalsPanel.classList.remove("goals-open");
    goalsContent.style.maxHeight = "0px";
    goalsArrow.textContent = "▾";
  }
}

if (goalsToggle) {
  goalsToggle.addEventListener("click", function () {
    isGoalsPanelOpen = !isGoalsPanelOpen;
    updateGoalsPanelState();
  });
}