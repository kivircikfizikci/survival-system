loadGame();
updateInventoryCapacityFromEquipment(false);
applyLanguage();
updateStatusText();
updateRecipeFilterButtons();
updateScreen();

function findItemInInventory(itemId) {
  for (let i = 0; i < inventory.items.length; i++) {
    const item = inventory.items[i];

    if (item !== null && item.id === itemId) {
      return { item, slotIndex: i };
    }
  }

  return null;
}

function findToolGroupInInventory(groupName) {
  for (let i = 0; i < inventory.items.length; i++) {
    const item = inventory.items[i];

    if (item !== null && item.toolTags && item.toolTags.includes(groupName)) {
      return { item, slotIndex: i };
    }
  }

  return null;
}

function applyInventoryToolDurability(toolData, durabilityCost) {
  if (!toolData || !durabilityCost) return;

  const tool = toolData.item;

  if (typeof tool.durability !== "number") return;

  const finalDurabilityCost = getToolDurabilityCost(tool, durabilityCost);
  tool.durability -= finalDurabilityCost;

  if (tool.durability <= 0) {
    const toolName = getItemName(tool);
    inventory.items[toolData.slotIndex] = null;

    showMessage(t("toolBroke", { item: toolName }), "warning");
    addLog(t("toolBroke", { item: toolName }), "warning");
  }

  autoSave();
}

document.getElementById("craftBtn").addEventListener("click", function () {
  craftSelectedRecipe();
});

for (let languageButton of languageButtons) {
  languageButton.addEventListener("click", function () {
    setLanguage(languageButton.dataset.language);
    applyLanguage();
    autoSave();
  });
}

setInterval(function () {
  if (!isSleeping) {
    hunger -= 1;
    energy -= 1;
  }

  if (hunger < 0) hunger = 0;
  if (energy < 0) energy = 0;

  if (hunger < 20) {
    health -= 5;
  }

  if (health < 0) health = 0;

  updateScreen();
  autoSave();
}, GAME_HOUR_MS);

updateLanguageButtons();
updateInventoryCapacityFromEquipment(false);
updateInventoryScreen();
updateEquipmentScreen();
updateShelterScreen();
updateCraftingScreen();
updateWorkstationScreen();
updateRecipesScreen();
setupCraftDropZones();
setupEquipmentDropZones();
updateRegionBackground();