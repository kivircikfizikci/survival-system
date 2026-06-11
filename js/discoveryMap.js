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

function renderDiscoveryMap() {
  const map = getCurrentMap();

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

      if (x === discoveryState.x && y === discoveryState.y) {
        tileButton.classList.add("is-current");

        const tileName = document.createElement("span");
        tileName.classList.add("current-tile-label");
        tileName.textContent = tileId;

        tileButton.appendChild(tileName);
        } else if (canMoveTo(x, y)) {
        tileButton.classList.add("is-movable");

        tileButton.addEventListener("click", function () {
          movePlayerTo(x, y);
        });
      }

      mapGrid.appendChild(tileButton);
    }
  }

    updateDiscoveryHeader();
    updateTileActionPanel();

    requestAnimationFrame(function () {
        updateMapCamera();
    });

    if (typeof updateDiscoverySleepNotice === "function") {
      updateDiscoverySleepNotice();
    }
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

  const currentTileId = getTileId(discoveryState.x, discoveryState.y);
  const tileData = getTileSpecialData(currentTileId);

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