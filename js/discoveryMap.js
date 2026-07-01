const mapViewport = document.getElementById("mapViewport");
const mapGrid = document.getElementById("mapGrid");
const mapTitle = document.getElementById("mapTitle");
const tileActions = document.getElementById("tileActions");
const discoveryLog = document.getElementById("discoveryLog");
const zoomText = document.getElementById("zoomText");

function addDiscoveryLog(message) {
  const logItem = document.createElement("p");
  logItem.textContent = message;

  discoveryLog.prepend(logItem);

  while (discoveryLog.children.length > 8) {
    discoveryLog.removeChild(discoveryLog.lastElementChild);
  }
}

function updateDiscoveryHeader() {
  const map = getCurrentMap();

  mapTitle.textContent = map.nameKey;
  zoomText.textContent = Math.round(discoveryState.zoom * 100) + "%";
}

function getSavedShelterForDiscovery() {
  const savedData = localStorage.getItem("survivalSystemSave");

  if (!savedData) {
    return null;
  }

  try {
    const saveData = JSON.parse(savedData);
    return saveData.playerShelter || null;
  } catch (error) {
    console.error("Shelter data could not be loaded:", error);
    return null;
  }
}

function getSavedStorageContainersForDiscovery() {
  const mainSaveData = getMainSaveData();

  if (
    !mainSaveData ||
    !Array.isArray(
      mainSaveData.placedStorageContainers
    )
  ) {
    return [];
  }

  return mainSaveData.placedStorageContainers;
}

function getSavedWorkstationsForDiscovery() {
  const savedData = localStorage.getItem("survivalSystemSave");

  if (!savedData) {
    return {};
  }

  try {
    const saveData = JSON.parse(savedData);

    if (
      !saveData.regionWorkstations ||
      !saveData.regionWorkstations[discoveryState.currentMapId]
    ) {
      return {};
    }

    return saveData.regionWorkstations[discoveryState.currentMapId];
  } catch (error) {
    console.error("Workstation data could not be loaded:", error);
    return {};
  }
}

function getMainSaveDataForDiscovery() {
  const savedData = localStorage.getItem("survivalSystemSave");

  if (!savedData) {
    return null;
  }

  try {
    return JSON.parse(savedData);
  } catch (error) {
    console.error("Main save could not be loaded:", error);
    return null;
  }
}

function saveMainSaveDataForDiscovery(saveData) {
  localStorage.setItem(
    "survivalSystemSave",
    JSON.stringify(saveData)
  );
}

function getSavedBuriedStashForDiscovery() {
  const saveData = getMainSaveDataForDiscovery();

  if (!saveData || !saveData.buriedStash) {
    return null;
  }

  return saveData.buriedStash;
}

function generateBuriedStashLoot() {
  let lootResults =
    rollMultipleLootFromTable(buriedStashLootTable);

  const validLootResults = lootResults.filter(function (lootItem) {
    return itemsDatabase[lootItem.itemId];
  });

  if (validLootResults.length > 0) {
    return validLootResults;
  }

  return [
    {
      itemId: "clothScrap",
      quantity: 1
    }
  ];
}

function canPlaceBuriedStashOnTile(x, y) {
  if (!isInsideMap(x, y)) {
    return false;
  }

  const tileId = getTileId(x, y);
  const tileData = getTileSpecialData(tileId);

  if (tileData.isBlocked) {
    return false;
  }

  if (tileData.exit) {
    return false;
  }

  if (tileData.requiredItem) {
    return false;
  }

  if (tileData.encounter) {
    return false;
  }

  if (
    x === discoveryState.x &&
    y === discoveryState.y
  ) {
    return false;
  }

  return true;
}

function ensureBuriedStashPlaced() {
  if (discoveryState.currentMapId !== "trail") {
    return;
  }

  const saveData = getMainSaveDataForDiscovery();

  if (!saveData || !saveData.buriedStash) {
    return;
  }

  const stash = saveData.buriedStash;

  if (
    typeof stash.x === "number" &&
    typeof stash.y === "number" &&
    Array.isArray(stash.items)
  ) {
    return;
  }

  const map = getCurrentMap();
  const availableTiles = [];

  for (let y = 0; y < map.height; y++) {
    for (let x = 0; x < map.width; x++) {
      if (canPlaceBuriedStashOnTile(x, y)) {
        availableTiles.push({ x, y });
      }
    }
  }

  if (availableTiles.length === 0) {
    console.error("No valid tile found for buried stash.");
    return;
  }

  const selectedTile =
    availableTiles[
      Math.floor(Math.random() * availableTiles.length)
    ];

  stash.regionId = "trail";
  stash.x = selectedTile.x;
  stash.y = selectedTile.y;
  stash.items = generateBuriedStashLoot();
  stash.revealed = true;

  saveData.buriedStash = stash;

  saveMainSaveDataForDiscovery(saveData);
}

function getWorkstationMarkerPositionClass(workstationId) {
  const markerPositions = {
    campfire: "marker-top-left",
    choppingBlock: "marker-top-right",
    tanningRack: "marker-bottom-left",
    loom: "marker-bottom-right"
  };

  return markerPositions[workstationId] || "marker-top-left";
}

function updateDiscoveryCoordinateBox() {
  let coordinateBox = document.getElementById(
    "discoveryCoordinateBox"
  );

  if (!coordinateBox) {
    coordinateBox = document.createElement("div");
    coordinateBox.id = "discoveryCoordinateBox";
    coordinateBox.classList.add("discovery-coordinate-box");

    mapViewport.appendChild(coordinateBox);
  }

  const currentTileId = getTileId(
    discoveryState.x,
    discoveryState.y
  );

  coordinateBox.textContent = currentTileId;
}

function renderDiscoveryMap() {
  const map = getCurrentMap();

  ensureBuriedStashPlaced();

  updateRegionBackground();

  mapGrid.innerHTML = "";

  mapGrid.style.setProperty("--tile-size", discoveryState.tileSize + "px");
  mapGrid.style.gridTemplateColumns =
    "repeat(" + map.width + ", var(--tile-size))";
  mapGrid.style.gridTemplateRows =
    "repeat(" + map.height + ", var(--tile-size))";

  if (map.backgroundImage) {
    mapGrid.style.setProperty(
      "--map-background",
      "url('../" + map.backgroundImage + "')"
    );
  } else {
    mapGrid.style.setProperty("--map-background", "none");
  }

  const visitedTiles = getVisitedTilesForCurrentMap();
  const savedShelter = getSavedShelterForDiscovery();
  const savedWorkstations = getSavedWorkstationsForDiscovery();
  const savedStorageContainers = getSavedStorageContainersForDiscovery();
  const savedBuriedStash = getSavedBuriedStashForDiscovery();

  for (let y = 0; y < map.height; y++) {
    for (let x = 0; x < map.width; x++) {
      const tileId = getTileId(x, y);
      const tileData = getTileSpecialData(tileId);

      const tileButton = document.createElement("button");
      tileButton.type = "button";
      tileButton.classList.add("map-tile");
      tileButton.dataset.x = x;
      tileButton.dataset.y = y;
      tileButton.dataset.tileId = tileId;

      if (visitedTiles.includes(tileId)) {
        tileButton.classList.add("is-visited");
      }

      if (tileData.isBlocked) {
        tileButton.classList.add("is-blocked");
      }

      if (tileData.resource && !tileData.resource.isDefault) {
        tileButton.classList.add("has-resource");

        const resourceMarker = document.createElement("span");
        resourceMarker.classList.add("tile-resource-marker");

        tileButton.appendChild(resourceMarker);
      }

      if (tileData.encounter) {
        tileButton.classList.add("has-encounter");

        const encounterMarker = document.createElement("span");
        encounterMarker.classList.add("tile-encounter-marker");

        tileButton.appendChild(encounterMarker);
      }

      if (tileData.requiredItem) {
        tileButton.classList.add("has-required-item");

        const requiredItemMarker = document.createElement("span");
        requiredItemMarker.classList.add("tile-required-item-marker");

        tileButton.appendChild(requiredItemMarker);
      }

      if (tileData.exit) {
        tileButton.classList.add("has-exit");
      }

      const hasShelterOnTile =
      savedShelter &&
      savedShelter.regionId === discoveryState.currentMapId &&
      savedShelter.x === x &&
      savedShelter.y === y;

    if (hasShelterOnTile) {
      tileButton.classList.add("has-shelter");

      const shelterMarker = document.createElement("img");
      shelterMarker.classList.add("tile-shelter-marker");
      shelterMarker.src = "../img/tent.png";
      shelterMarker.alt = "Tent";
      shelterMarker.draggable = false;

      tileButton.appendChild(shelterMarker);
    }

    const storageContainersOnTile =
      savedStorageContainers.filter(function (container) {
        return (
          container &&
          container.regionId === discoveryState.currentMapId &&
          Number(container.x) === Number(x) &&
          Number(container.y) === Number(y)
        );
      });

    if (storageContainersOnTile.length > 0) {
      tileButton.classList.add(
        "has-storage-container"
      );

      const storageMarkerGroup =
        document.createElement("div");

      storageMarkerGroup.classList.add(
        "tile-storage-markers"
      );

      for (
        const container of storageContainersOnTile
      ) {
        const containerItem =
          itemsDatabase[container.itemId];

        if (!containerItem) {
          continue;
        }

        const storageMarker =
          document.createElement("img");

        storageMarker.classList.add(
          "tile-storage-marker"
        );

        storageMarker.src =
          containerItem.imageSrc.startsWith("../")
            ? containerItem.imageSrc
            : "../" + containerItem.imageSrc;

        storageMarker.alt =
          containerItem.nameKey
            ? t(containerItem.nameKey)
            : container.itemId;

        storageMarker.title =
          storageMarker.alt;

        storageMarker.draggable = false;

        storageMarkerGroup.appendChild(
          storageMarker
        );
      }

      if (
        storageMarkerGroup.children.length > 0
      ) {
        tileButton.appendChild(
          storageMarkerGroup
        );
      }
    }

    const workstationsOnTile = Object.values(savedWorkstations).filter(
      function (workstation) {
        return (
          workstation &&
          workstation.x === x &&
          workstation.y === y
        );
      }
    );

    if (workstationsOnTile.length > 0) {
      tileButton.classList.add("has-workstation");

      const workstationMarkerGroup = document.createElement("div");
      workstationMarkerGroup.classList.add("tile-workstation-markers");

      for (let workstation of workstationsOnTile) {
        const workstationItem =
          itemsDatabase[workstation.itemId];

        if (!workstationItem) {
          continue;
        }

        const workstationMarker = document.createElement("img");
        workstationMarker.classList.add("tile-workstation-marker");

        workstationMarker.classList.add(
          getWorkstationMarkerPositionClass(workstation.itemId)
        );

        workstationMarker.src =
          workstationItem.imageSrc.startsWith("../")
            ? workstationItem.imageSrc
            : "../" + workstationItem.imageSrc;

        workstationMarker.alt =
          workstationItem.nameKey
            ? t(workstationItem.nameKey)
            : workstation.itemId;

        workstationMarker.draggable = false;

        workstationMarkerGroup.appendChild(workstationMarker);
      }

      if (workstationMarkerGroup.children.length > 0) {
        tileButton.appendChild(workstationMarkerGroup);
      }
    }

    const hasBuriedStashOnTile =
      savedBuriedStash &&
      savedBuriedStash.revealed === true &&
      savedBuriedStash.regionId === discoveryState.currentMapId &&
      savedBuriedStash.x === x &&
      savedBuriedStash.y === y &&
      Array.isArray(savedBuriedStash.items) &&
      savedBuriedStash.items.length > 0;

    if (hasBuriedStashOnTile) {
      tileButton.classList.add("has-buried-stash");

      const stashMarker = document.createElement("span");
      stashMarker.classList.add("tile-buried-stash-marker");
      stashMarker.textContent = "X";
      stashMarker.title = t("buriedStash");

      tileButton.appendChild(stashMarker);
    }

      if (x === discoveryState.x && y === discoveryState.y) {
        tileButton.classList.add("is-current");
      } else if (
          !discoveryState.pendingEncounter &&
          canMoveTo(x, y)
        ) {
          tileButton.classList.add("is-movable");

          tileButton.addEventListener("click", function () {
            if (
              isDiscoveryMoving ||
              discoveryState.pendingEncounter
            ) {
              return;
            }

            movePlayerTo(x, y);
          });
        }

      mapGrid.appendChild(tileButton);
    }
  }

    updateDiscoveryHeader();
    updateTileActionPanel();
    updateDiscoveryCoordinateBox();

    requestAnimationFrame(function () {
        updateMapCamera();
    });

    if (typeof updateDiscoverySleepNotice === "function") {
      updateDiscoverySleepNotice();
    }
}

function getCurrentTileBuriedStash() {
  const stash = getSavedBuriedStashForDiscovery();

  if (!stash) {
    return null;
  }

  if (stash.regionId !== discoveryState.currentMapId) {
    return null;
  }

  if (
    Number(stash.x) !== Number(discoveryState.x) ||
    Number(stash.y) !== Number(discoveryState.y)
  ) {
    return null;
  }

  if (
    !Array.isArray(stash.items) ||
    stash.items.length === 0
  ) {
    return null;
  }

  return stash;
}

function updateTileActionPanel() {
  if (!tileActions) {
    return;
  }

  tileActions.innerHTML = "";

  const pendingLootItems = getPendingLootItems();

  if (pendingLootItems.length > 0) {
    const lootList = document.createElement("div");
    lootList.classList.add("found-loot-list");

    for (let lootItem of pendingLootItems) {
      const item = itemsDatabase[lootItem.itemId];

      if (!item) {
        continue;
      }

      const lootCard = document.createElement("div");
      lootCard.classList.add("found-loot-card");

      const image = document.createElement("img");
      image.src = item.imageSrc;
      image.alt = getDiscoveryItemName(item);

      const info = document.createElement("div");

      const title = document.createElement("strong");
      title.textContent = getDiscoveryItemName(item);

      const quantity = document.createElement("span");
      quantity.textContent = "x" + lootItem.quantity;

      info.append(title, quantity);
      lootCard.append(image, info);

      lootList.appendChild(lootCard);
    }

    const actions = document.createElement("div");
    actions.classList.add("found-loot-actions");

    const takeButton = document.createElement("button");
    takeButton.type = "button";
    takeButton.classList.add("tile-action-button");
    takeButton.textContent = t("take");
    takeButton.addEventListener("click", takePendingLoot);

    const leaveButton = document.createElement("button");
    leaveButton.type = "button";
    leaveButton.classList.add("tile-action-button", "secondary");
    leaveButton.textContent = t("leave");
    leaveButton.addEventListener("click", leavePendingLoot);

    actions.append(takeButton, leaveButton);

    tileActions.append(lootList, actions);
  }

  if (discoveryState.pendingEncounter) {
    const encounter = discoveryState.pendingEncounter;
    const encounterData = encounterDatabase[encounter.id];

    const encounterCard = document.createElement("div");
    encounterCard.classList.add(
      "encounter-card",
      encounter.type === "enemy"
        ? "encounter-card-enemy"
        : "encounter-card-friendly"
    );

    const title = document.createElement("strong");
    title.textContent = getEncounterName(encounter.id);

    const description = document.createElement("span");
    description.textContent = getEncounterDescription(encounter);

    encounterCard.append(title, description);

  if (encounterData && encounterData.canHunt) {
    const huntChanceText = document.createElement("span");
    huntChanceText.classList.add("encounter-hunt-chance");

    huntChanceText.textContent = t("huntChance", {
      chance: getFinalHuntChance(encounterData)
    });

    encounterCard.appendChild(huntChanceText);

    const toolSelector = document.createElement("div");
    toolSelector.classList.add("hunt-tool-selector");

    const noToolButton = document.createElement("button");
    noToolButton.type = "button";
    noToolButton.classList.add("hunt-tool-button");

    if (discoveryState.selectedHuntTool === null) {
      noToolButton.classList.add("is-selected");
    }

    noToolButton.textContent = t("noTool");

    noToolButton.addEventListener("click", function () {
      clearSelectedHuntTool();
    });

    toolSelector.appendChild(noToolButton);

    const availableTools = getAvailableHuntTools(encounterData);

    for (let toolData of availableTools) {
      const toolItem = itemsDatabase[toolData.itemId];

      if (!toolItem) {
        continue;
      }

      const toolButton = document.createElement("button");
      toolButton.type = "button";
      toolButton.classList.add("hunt-tool-button");

      if (
        discoveryState.selectedHuntTool &&
        discoveryState.selectedHuntTool.slotIndex === toolData.slotIndex
      ) {
        toolButton.classList.add("is-selected");
      }

      toolButton.textContent = getHuntToolButtonLabel(toolData);

      toolButton.addEventListener("click", function () {
        selectHuntTool(toolData);
      });

      toolSelector.appendChild(toolButton);
    }

    encounterCard.appendChild(toolSelector);
  }

    const actions = document.createElement("div");
    actions.classList.add("found-loot-actions");

    if (encounterData && encounterData.canHunt) {
      const huntButton = document.createElement("button");
      huntButton.type = "button";
      huntButton.classList.add("tile-action-button");
      huntButton.textContent = t("hunt");
      huntButton.addEventListener("click", huntPendingEncounter);

      actions.appendChild(huntButton);
    }

    if (encounterData && encounterData.canFight) {
      const fightChanceText = document.createElement("span");
      fightChanceText.classList.add("encounter-hunt-chance");

      fightChanceText.textContent = t("fightChance", {
        chance: getFinalFightChance(encounterData)
      });

      encounterCard.appendChild(fightChanceText);

      const fightToolSelector = document.createElement("div");
      fightToolSelector.classList.add("hunt-tool-selector");

      const noToolButton = document.createElement("button");
      noToolButton.type = "button";
      noToolButton.classList.add("hunt-tool-button");

      if (discoveryState.selectedFightTool === null) {
        noToolButton.classList.add("is-selected");
      }

      noToolButton.textContent = t("noTool");

      noToolButton.addEventListener("click", function () {
        clearSelectedFightTool();
      });

      fightToolSelector.appendChild(noToolButton);

      const availableFightTools = getAvailableFightTools(encounterData);

      for (let toolData of availableFightTools) {
        const toolItem = itemsDatabase[toolData.itemId];

        if (!toolItem) {
          continue;
        }

        const toolButton = document.createElement("button");
        toolButton.type = "button";
        toolButton.classList.add("hunt-tool-button");

        if (
          discoveryState.selectedFightTool &&
          discoveryState.selectedFightTool.slotIndex === toolData.slotIndex
        ) {
          toolButton.classList.add("is-selected");
        }

        toolButton.textContent = getFightToolButtonLabel(toolData);

        toolButton.addEventListener("click", function () {
          selectFightTool(toolData);
        });

        fightToolSelector.appendChild(toolButton);
      }

      encounterCard.appendChild(fightToolSelector);
    }

    if (encounterData && encounterData.canFight) {
      const fightButton = document.createElement("button");
      fightButton.type = "button";
      fightButton.classList.add("tile-action-button");
      fightButton.textContent = t("fight");
      fightButton.addEventListener("click", fightPendingEncounter);

      const fleeButton = document.createElement("button");
      fleeButton.type = "button";
      fleeButton.classList.add("tile-action-button", "secondary");
      fleeButton.textContent = t("flee");
      fleeButton.addEventListener("click", fleePendingEncounter);

      actions.append(fightButton, fleeButton);
    }

    if (!encounterData || !encounterData.canFight) {
      const ignoreButton = document.createElement("button");
      ignoreButton.type = "button";
      ignoreButton.classList.add("tile-action-button", "secondary");
      ignoreButton.textContent = t("ignore");
      ignoreButton.addEventListener("click", clearPendingEncounter);

      actions.appendChild(ignoreButton);
    }

    tileActions.append(encounterCard, actions);
  }

  const currentBuriedStash = getCurrentTileBuriedStash();

    if (
      currentBuriedStash &&
      !discoveryState.pendingEncounter &&
      pendingLootItems.length === 0
    ) {
      const stashCard = document.createElement("div");
      stashCard.classList.add("buried-stash-card");

      const stashTitle = document.createElement("strong");
      stashTitle.classList.add("buried-stash-title");
      stashTitle.textContent = t("buriedStash");

      const stashLootList = document.createElement("div");
      stashLootList.classList.add("found-loot-list");

      for (let stashLootItem of currentBuriedStash.items) {
        const item = itemsDatabase[stashLootItem.itemId];

        if (!item) {
          continue;
        }

        const lootCard = document.createElement("div");
        lootCard.classList.add("found-loot-card");

        const image = document.createElement("img");
        image.src = item.imageSrc;
        image.alt = getDiscoveryItemName(item);

        const info = document.createElement("div");

        const title = document.createElement("strong");
        title.textContent = getDiscoveryItemName(item);

        const quantity = document.createElement("span");
        quantity.textContent = "x" + stashLootItem.quantity;

        info.append(title, quantity);
        lootCard.append(image, info);

        stashLootList.appendChild(lootCard);
      }

      const stashActions = document.createElement("div");
      stashActions.classList.add("found-loot-actions");

      const takeAllButton = document.createElement("button");
      takeAllButton.type = "button";
      takeAllButton.classList.add("tile-action-button");
      takeAllButton.textContent = t("takeAll");

      takeAllButton.addEventListener("click", function () {
        takeBuriedStashLoot();
      });

      stashActions.appendChild(takeAllButton);

      stashCard.append(
        stashTitle,
        stashLootList,
        stashActions
      );

      tileActions.appendChild(stashCard);
    }

  const currentTileId = getTileId(discoveryState.x, discoveryState.y);
  const tileData = getTileSpecialData(currentTileId);

  if (
    !discoveryState.pendingEncounter &&
    pendingLootItems.length === 0 &&
    !currentBuriedStash &&
    isCurrentTileTreeArea(tileData) &&
    !isTreeCutOnCurrentTile()
  ) {
    const axeData =
      findMainInventoryToolByGroup("axe");

    const chopTreeButton =
      document.createElement("button");

    chopTreeButton.type = "button";

    chopTreeButton.classList.add(
      "tile-action-button",
      "discovery-timed-action-button"
    );

    chopTreeButton.textContent =
      axeData
        ? t("chopTree")
        : t("chopTreeRequiresAxe");

    chopTreeButton.disabled =
      !axeData ||
      isDiscoveryTimedActionInProgress;

    chopTreeButton.addEventListener(
      "click",
      function () {
        startChopTreeAction(
          chopTreeButton
        );
      }
    );

    tileActions.appendChild(
      chopTreeButton
    );
  }

  if (
    !discoveryState.pendingEncounter &&
    pendingLootItems.length === 0 &&
    !currentBuriedStash &&
    isCurrentTileWaterFillArea(tileData)
  ) {
    const saveData = getMainSaveData();

    const containerData =
      findFillableWaterContainer(saveData);

    const fillWaterButton =
      document.createElement("button");

    fillWaterButton.type = "button";
    fillWaterButton.classList.add(
      "tile-action-button"
    );

    fillWaterButton.textContent =
      containerData
        ? t("fillWaterContainer")
        : t("fillWaterRequiresContainer");

    fillWaterButton.disabled = !containerData;

    fillWaterButton.addEventListener(
      "click",
      fillWaterContainer
    );

    tileActions.appendChild(fillWaterButton);
  }

  if (
    !discoveryState.pendingEncounter &&
    pendingLootItems.length === 0 &&
    !currentBuriedStash &&
    tileData.isFishingSpot === true
  ) {
    renderFishingActions();
  }

  if (
    !discoveryState.pendingEncounter &&
    pendingLootItems.length === 0 &&
    !currentBuriedStash &&
    isCurrentTileClayDigArea(tileData)
  ) {
    renderClayDigAction();
  }

  if (tileData.exit) {
    const exitButton = document.createElement("button");
    exitButton.type = "button";
    exitButton.classList.add("tile-action-button", "secondary");
    exitButton.textContent = t("goToMap", {
      map: tileData.exit.label
    });

    exitButton.addEventListener("click", function () {
      travelToMap(tileData.exit);
    });

    tileActions.appendChild(exitButton);
  }
}

function updateMapCamera() {
  const tileSize = discoveryState.tileSize;
  const zoom = discoveryState.zoom;

  const viewportWidth = mapViewport.clientWidth;
  const viewportHeight = mapViewport.clientHeight;

  const playerCenterX =
    discoveryState.x * tileSize + tileSize / 2;

  const playerCenterY =
    discoveryState.y * tileSize + tileSize / 2;

  const translateX =
    viewportWidth / 2 - playerCenterX * zoom;

  const translateY =
    viewportHeight / 2 - playerCenterY * zoom;

  mapGrid.style.transform =
    "translate(" +
    translateX +
    "px, " +
    translateY +
    "px) scale(" +
    zoom +
    ")";
}

function takeBuriedStashLoot() {
  const stash = getCurrentTileBuriedStash();

  if (!stash) {
    return;
  }

  const added = addPendingLootItemsToMainInventory(
    stash.items
  );

  if (!added) {
    addDiscoveryLog(t("inventoryFullOrTooHeavy"));
    return;
  }

  addDiscoveryLog(
    t("buriedStashLootTaken", {
      items: getLootText(stash.items)
    })
  );

  const saveData = getMainSaveDataForDiscovery();

  if (!saveData) {
    return;
  }

  saveData.buriedStash = null;

  saveMainSaveDataForDiscovery(saveData);

  renderDiscoveryMap();
}