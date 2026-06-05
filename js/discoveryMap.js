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

      if (tileData.resource) {
        tileButton.classList.add("has-resource");
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
}

function updateTileActionPanel() {
  if (!tileActions) {
    return;
  }

  tileActions.innerHTML = "";

  if (discoveryState.pendingLoot) {
    const item = itemsDatabase[discoveryState.pendingLoot.itemId];

    if (item) {
      const lootCard = document.createElement("div");
      lootCard.classList.add("found-loot-card");

      const image = document.createElement("img");
      image.src = item.imageSrc;
      image.alt = getDiscoveryItemName(item);

      const info = document.createElement("div");

      const title = document.createElement("strong");
      title.textContent = getDiscoveryItemName(item);

      const quantity = document.createElement("span");
      quantity.textContent = "x" + discoveryState.pendingLoot.quantity;

      info.append(title, quantity);
      lootCard.append(image, info);

      const actions = document.createElement("div");
      actions.classList.add("found-loot-actions");

      const takeButton = document.createElement("button");
      takeButton.type = "button";
      takeButton.classList.add("tile-action-button");
      takeButton.textContent = "Take";
      takeButton.addEventListener("click", takePendingLoot);

      const leaveButton = document.createElement("button");
      leaveButton.type = "button";
      leaveButton.classList.add("tile-action-button", "secondary");
      leaveButton.textContent = "Leave";
      leaveButton.addEventListener("click", leavePendingLoot);

      actions.append(takeButton, leaveButton);

      tileActions.append(lootCard, actions);
    }
  }

  const currentTileId = getTileId(discoveryState.x, discoveryState.y);
  const tileData = getTileSpecialData(currentTileId);

  if (tileData.exit) {
    const exitButton = document.createElement("button");
    exitButton.type = "button";
    exitButton.classList.add("tile-action-button", "secondary");
    exitButton.textContent = "Go to " + tileData.exit.label;

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