const healthText = document.getElementById("health");
const hungerText = document.getElementById("hunger");
const energyText = document.getElementById("energy");
const nicknameText = document.getElementById("nickname");
const regionText = document.getElementById("region");
const professionText = document.getElementById("profession");
const experienceText = document.getElementById("experience");
const healthFill = document.getElementById("healthFill");
const hungerFill = document.getElementById("hungerFill");
const energyFill = document.getElementById("energyFill");
const healthIconFill = document.getElementById("healthIconFill");
const hungerIconFill = document.getElementById("hungerIconFill");
const energyIconFill = document.getElementById("energyIconFill");

const statusText = document.getElementById("status");
const messageText = document.getElementById("alertMessage");
const inventoryGrid = document.getElementById("inventoryGrid");
const inventorySlotsText = document.getElementById("inventorySlots");
const inventoryWeightText = document.getElementById("inventoryWeight");
const sleepHoursSelect = document.getElementById("sleepHours");
const areaSelect = document.getElementById("areaSelect");
const searchButton = document.getElementById("searchBtn");
const languageButtons = document.querySelectorAll("[data-language]");
let messageTimeoutId;

let playerNickname = "Survivor";
let playerRegion = "meadow";
let playerProfession = "Explorer";
let playerXP = 420;

let draggedSlotIndex = null;

const regionBackgrounds = {
  meadow: "img/meadow.png",
  lake: "img/lake.png",
  trail: "img/trail.png",
  mountain: "img/mountain.png",
  abadonedVillage: "img/abadonedVillage.png"
};

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
      slotElement.textContent = t(slotName);
      slotElement.classList.remove("is-equipped");
      return;
    }

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
  experienceText.textContent = playerXP + " XP";

healthFill.style.width = `${clamp(Number(health), 0, 100)}%`;
hungerFill.style.width = `${clamp(Number(hunger), 0, 100)}%`;
energyFill.style.width = `${clamp(Number(energy), 0, 100)}%`;

healthIconFill.style.setProperty("--empty", 100 - clamp(health, 0, 100) + "%");
hungerIconFill.style.setProperty("--empty", 100 - clamp(hunger, 0, 100) + "%");
energyIconFill.style.setProperty("--empty", 100 - clamp(energy, 0, 100) + "%");
}

function showMessage(message) {
  clearTimeout(messageTimeoutId);

  messageText.textContent = message;
  messageText.hidden = false;
  messageText.classList.add("is-visible");

  messageTimeoutId = setTimeout(function () {
    messageText.textContent = "";
    messageText.hidden = true;
    messageText.classList.remove("is-visible");
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

      if (item.quantity > 1) {
        let quantityBadge = document.createElement("span");
        quantityBadge.classList.add("quantity-badge");
        quantityBadge.textContent = "x" + item.quantity;
        slot.appendChild(quantityBadge);
      }

      slot.draggable = true;
      slot.addEventListener("dragstart", function () {
        draggedSlotIndex = i;
      });

      let slotActions = document.createElement("div");
      slotActions.classList.add("slot-actions");

      if (item.type === "food") {
        let useButton = document.createElement("button");
        useButton.type = "button";
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
        wearButton.classList.add("slot-action", "wear-action");
        wearButton.textContent = t("wear");

        wearButton.addEventListener("click", function () {
          wearInventoryItem(i);
        });

        slotActions.appendChild(wearButton);
      }

      let dropButton = document.createElement("button");
      dropButton.type = "button";
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
      if (draggedSlotIndex === null) {
        return;
      }

      moveInventoryItem(draggedSlotIndex, i);
      draggedSlotIndex = null;
    });

    inventoryGrid.appendChild(slot);
  }
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
}

function updateLanguageButtons() {
  for (let button of languageButtons) {
    button.classList.toggle("is-active", button.dataset.language === currentLanguage);
  }
}
