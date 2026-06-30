loadGame();
updateInventoryCapacityFromEquipment(false);
applyLanguage();
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
  for (
    let i = 0;
    i < inventory.items.length;
    i++
  ) {
    const item = inventory.items[i];

    if (!item || !item.id) {
      continue;
    }

    if (
      !isItemInToolGroup(
        item,
        groupName
      )
    ) {
      continue;
    }

    return {
      item: item,
      slotIndex: i
    };
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

updateLanguageButtons();
updateInventoryCapacityFromEquipment(false);
updateInventoryScreen();
updateEquipmentScreen();
updateShelterScreen();
updateStorageContainerScreen();
updateCraftingScreen();
updateWorkstationScreen();
updateRecipesScreen();
setupCraftDropZones();
setupEquipmentDropZones();
updateRegionBackground();