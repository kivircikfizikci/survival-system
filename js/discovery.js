const zoomInButton = document.getElementById("zoomInButton");
const zoomOutButton = document.getElementById("zoomOutButton");

let sleepingDiscoveryLogShown = false;
let wokeUpDiscoveryLogShown = false;

function updateDiscoverySleepNotice() {
  const isSleepingNow = isPlayerSleepingFromSave();

  if (isSleepingNow) {
    wokeUpDiscoveryLogShown = false;

    if (!sleepingDiscoveryLogShown) {
      addDiscoveryLog(t("sleepingDiscoveryNotice"));
      sleepingDiscoveryLogShown = true;
    }

    return;
  }

  if (sleepingDiscoveryLogShown && !wokeUpDiscoveryLogShown) {
    addDiscoveryLog(t("wokeUpRested"));
    wokeUpDiscoveryLogShown = true;
  }

  sleepingDiscoveryLogShown = false;
}

function animatePlayerMovement(targetX, targetY, moveCostType) {
  return new Promise(function (resolve) {
    const sourceTile = mapGrid.querySelector(
      `.map-tile[data-x="${discoveryState.x}"][data-y="${discoveryState.y}"]`
    );

    const targetTile = mapGrid.querySelector(
      `.map-tile[data-x="${targetX}"][data-y="${targetY}"]`
    );

    if (!sourceTile || !targetTile) {
      resolve();
      return;
    }

    const sourceRect = sourceTile.getBoundingClientRect();
    const targetRect = targetTile.getBoundingClientRect();

    const movementMarker = document.createElement("div");
    movementMarker.classList.add("discovery-movement-marker");

    if (moveCostType === "raftMove") {
      movementMarker.classList.add("is-rafting");
      movementMarker.textContent = "⛵";
    } else {
      movementMarker.innerHTML = `
        <div class="movement-footprints">
          <span class="movement-step movement-step-left"></span>
          <span class="movement-step movement-step-right"></span>
        </div>
      `;
    }

    const startX = sourceRect.left + sourceRect.width / 2;
    const startY = sourceRect.top + sourceRect.height / 2;
    const endX = targetRect.left + targetRect.width / 2;
    const endY = targetRect.top + targetRect.height / 2;

    const deltaX = endX - startX;
    const deltaY = endY - startY;

    const movementAngle =
      Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;

    const footprints =
      movementMarker.querySelector(".movement-footprints");

    if (footprints) {
      footprints.style.transform =
        `rotate(${movementAngle}deg)`;
    }

    movementMarker.style.left = startX + "px";
    movementMarker.style.top = startY + "px";

    document.body.appendChild(movementMarker);

    sourceTile.classList.add("is-move-source");
    targetTile.classList.add("is-move-target");

    const duration = moveCostType === "raftMove" ? 900 : 650;

    const movementAnimation = movementMarker.animate(
      [
        {
          left: startX + "px",
          top: startY + "px",
          transform: "translate(-50%, -50%) scale(1)"
        },
        {
          left: (startX + endX) / 2 + "px",
          top: (startY + endY) / 2 + "px",
          transform: "translate(-50%, -60%) scale(1.08)",
          offset: 0.5
        },
        {
          left: endX + "px",
          top: endY + "px",
          transform: "translate(-50%, -50%) scale(1)"
        }
      ],
      {
        duration: duration,
        easing: "ease-in-out",
        fill: "forwards"
      }
    );

    function finishMovementAnimation() {
      movementMarker.remove();
      sourceTile.classList.remove("is-move-source");
      targetTile.classList.remove("is-move-target");
      resolve();
    }

    movementAnimation.addEventListener(
      "finish",
      finishMovementAnimation,
      { once: true }
    );

    movementAnimation.addEventListener(
      "cancel",
      finishMovementAnimation,
      { once: true }
    );
  });
}

async function movePlayerTo(x, y) {
  if (isDiscoveryMoving) {
    return;
  }

  if (isPlayerSleepingFromSave()) {
    updateDiscoverySleepNotice();
    return;
  }

  if (discoveryState.pendingEncounter) {
    updateTileActionPanel();
    return;
  }

  if (!canMoveTo(x, y)) {
    return;
  }

  const targetTileId = getTileId(x, y);
  const targetTileData = getTileSpecialData(targetTileId);

  const moveCostType =
    targetTileData.requiredItem &&
    targetTileData.requiredItem.requiredItemId === "makeshiftRaft"
      ? "raftMove"
      : "move";

  if (!payDiscoveryActionCost(moveCostType)) {
    return;
  }

  isDiscoveryMoving = true;
  mapGrid.classList.add("is-player-moving");

  try {
    await animatePlayerMovement(x, y, moveCostType);

    discoveryState.x = x;
    discoveryState.y = y;

    markCurrentTileVisited();

    rollCurrentTileLoot();
    rollCurrentTileEncounter();

    saveDiscoveryState();
    renderDiscoveryMap();

    if (typeof updateWorkstationScreen === "function") {
      updateWorkstationScreen();
    }

    if (typeof updateCraftingScreen === "function") {
      updateCraftingScreen();
    }

  } finally {
    isDiscoveryMoving = false;
    mapGrid.classList.remove("is-player-moving");
  }
}

function setDiscoveryZoom(newZoom) {
 const minZoom = 0.5;
 const maxZoom = 2;

  discoveryState.zoom = Math.max(
    minZoom,
    Math.min(maxZoom, newZoom)
  );

  saveDiscoveryState();
  renderDiscoveryMap();
}

function debugMarkers() {
  document.body.classList.toggle("show-map-debug-markers");

  const isEnabled = document.body.classList.contains("show-map-debug-markers");

  console.log(
    "Map debug markers:",
    isEnabled ? "ON" : "OFF"
  );
}

function searchCurrentTile() {
  const currentTileId = getTileId(discoveryState.x, discoveryState.y);
  const tileData = getTileSpecialData(currentTileId);

  if (!tileData.resource) {
    return;
  }

  addDiscoveryLog("Searched " + currentTileId + ".");
}

function travelToMap(exitData) {
  if (!mapsDatabase[exitData.targetMapId]) {
    addDiscoveryLog(t("targetMapNotReady"));
    return;
  }

  discoveryState.currentMapId = exitData.targetMapId;
  discoveryState.x = exitData.targetPosition.x;
  discoveryState.y = exitData.targetPosition.y;

  if (!discoveryState.visitedTiles[discoveryState.currentMapId]) {
    discoveryState.visitedTiles[discoveryState.currentMapId] = [];
  }

  markCurrentTileVisited();
  saveDiscoveryState();
  renderDiscoveryMap();

  addDiscoveryLog(
    t("enteredMap", {
      map: exitData.label
    })
  );
}

zoomInButton.addEventListener("click", function () {
  setDiscoveryZoom(discoveryState.zoom + 0.15);
});

zoomOutButton.addEventListener("click", function () {
  setDiscoveryZoom(discoveryState.zoom - 0.15);
});

window.addEventListener("resize", function () {
  requestAnimationFrame(function () {
    updateMapCamera();
  });
});

const languageButtons = document.querySelectorAll("[data-language]");

languageButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    currentLanguage = button.dataset.language;

    const saveData = JSON.parse(
      localStorage.getItem("survivalSystemSave") || "{}"
    );

    saveData.currentLanguage = currentLanguage;

    localStorage.setItem(
      "survivalSystemSave",
      JSON.stringify(saveData)
    );

    updateDiscoveryStaticTexts();
    updateDiscoveryLanguageButtons();

    if (typeof updateTexts === "function") {
      updateTexts();
    }
    
    renderDiscoveryMap();
  });
});

const discoveryLanguageButtons = document.querySelectorAll("[data-language]");

function saveDiscoveryLanguage() {
  const savedData = localStorage.getItem("survivalSystemSave");
  let saveData = {};

  if (savedData) {
    try {
      saveData = JSON.parse(savedData);
    } catch (error) {
      saveData = {};
    }
  }

  saveData.currentLanguage = currentLanguage;

  localStorage.setItem(
    "survivalSystemSave",
    JSON.stringify(saveData)
  );
}

function updateDiscoveryLanguageButtons() {
  discoveryLanguageButtons.forEach(function (button) {
    if (button.dataset.language === currentLanguage) {
      button.classList.add("is-active");
    } else {
      button.classList.remove("is-active");
    }
  });
}

discoveryLanguageButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    currentLanguage = button.dataset.language;

    saveDiscoveryLanguage();

    if (typeof updateTexts === "function") {
      updateTexts();
    }

    updateDiscoveryLanguageButtons();
    renderDiscoveryMap();
  });
});

function updateDiscoveryStaticTexts() {
  const translatableElements = document.querySelectorAll("[data-i18n]");

  translatableElements.forEach(function (element) {
    const key = element.dataset.i18n;

    if (!key) {
      return;
    }

    element.textContent = t(key);
  });
}

loadDiscoveryLanguage();
loadDiscoveryState();

updateDiscoveryStaticTexts();
updateDiscoveryLanguageButtons();
renderDiscoveryMap();
updateDiscoverySleepNotice();

requestAnimationFrame(function () {
  updateMapCamera();

  requestAnimationFrame(function () {
    updateMapCamera();
  });
});

setInterval(function () {
  const changed = processSleepProgressFromSave();

  if (changed) {
    updateDiscoverySleepNotice();
    renderDiscoveryMap();
  }
}, 1000);