const SEARCH_COOLDOWN_SECONDS = 5;
let searchCooldownTimer = null;

function getRandomLoot(areaId) {
  const area = areasDatabase[areaId];

  if (!area) {
    return null;
  }

  let totalChance = 0;

  for (let lootEntry of area.loot) {
    totalChance += lootEntry.chance;
  }

  let roll = Math.random() * totalChance;

  for (let lootEntry of area.loot) {
    roll -= lootEntry.chance;

    if (roll <= 0) {
      return itemsDatabase[lootEntry.itemId];
    }
  }

  return null;
}

function startSearchCooldown() {
  let remainingSeconds = SEARCH_COOLDOWN_SECONDS;

  updateSearchButton(remainingSeconds);

  searchCooldownTimer = setInterval(function () {
    remainingSeconds--;
    updateSearchButton(remainingSeconds);

    if (remainingSeconds <= 0) {
      clearInterval(searchCooldownTimer);
      searchCooldownTimer = null;
    }
  }, 1000);
}

document.getElementById("searchBtn").addEventListener("click", function () {
  if (isSleeping) {
    showMessage(t("cannotSearchSleeping"));
    return;
  }

  if (searchCooldownTimer !== null) {
    showMessage(t("searchWait"));
    return;
  }

  const selectedAreaId = areaSelect.value;
  const selectedArea = areasDatabase[selectedAreaId];
  const foundItem = getRandomLoot(selectedAreaId);

  if (foundItem === null) {
    showMessage(t("foundNothing"));
    startSearchCooldown();
    return;
  }

  if (addItem(foundItem)) {
    showMessage(t("foundItem", {
      item: getItemName(foundItem),
      area: getAreaName(selectedArea)
    }));
    startSearchCooldown();
  }
});

document.getElementById("workBtn").addEventListener("click", function () {
  if (isSleeping) {
    showMessage(t("cannotWorkSleeping"));
    return;
  }

  if (energy < 15) {
    showMessage(t("lowEnergyWork"));
    return;
  }

  energy -= 15;
  hunger -= 10;
  if (hunger < 0) {
    hunger = 0;
  }

  if (energy < 0) {
    energy = 0;
  }

  updateScreen();
});

document.getElementById("sleepBtn").addEventListener("click", function () {
  if (isSleeping) {
    showMessage(t("alreadySleeping"));
    return;
  }

  let selectedHours = Number(sleepHoursSelect.value);
  let remainingHours = selectedHours;

  isSleeping = true;
  setSleepingStatus(remainingHours);

  const sleepCounter = setInterval(function () {
    remainingHours--;

    if (remainingHours > 0) {
      setSleepingStatus(remainingHours);
    }
  }, GAME_HOUR_MS);

  setTimeout(function () {
    clearInterval(sleepCounter);

    energy += selectedHours * 10;
    hunger -= selectedHours * 5;

    if (energy > 100) {
      energy = 100;
    }

    if (hunger < 0) {
      hunger = 0;
    }

    isSleeping = false;
    setAwakeStatus();

    updateScreen();
  }, selectedHours * GAME_HOUR_MS);
});

for (let languageButton of languageButtons) {
  languageButton.addEventListener("click", function () {
    setLanguage(languageButton.dataset.language);
    applyLanguage();
  });
}

setInterval(function () {
  if (!isSleeping) {
    hunger -= 1;
    energy -= 1;
  }

  if (hunger < 0) {
    hunger = 0;
  }

  if (energy < 0) {
    energy = 0;
  }

  if (hunger < 20) {
    health -= 5;
  }

  if (health < 0) {
    health = 0;
  }

  updateScreen();
}, GAME_HOUR_MS);

updateScreen();
setInventoryCapacity(inventory.baseSlots, inventory.baseMaxWeight);
updateInventoryScreen();
updateEquipmentScreen();
updateSearchButton(0);
updateRegionBackground(playerRegion);
applyLanguage();
