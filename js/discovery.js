
const zoomInButton = document.getElementById("zoomInButton");
const zoomOutButton = document.getElementById("zoomOutButton");

let sleepingDiscoveryLogShown = false;

function updateDiscoverySleepNotice() {
  if (isPlayerSleepingFromSave()) {
    if (!sleepingDiscoveryLogShown) {
      addDiscoveryLog(t("sleepingDiscoveryNotice"));
      sleepingDiscoveryLogShown = true;
    }

    return;
  }

  sleepingDiscoveryLogShown = false;
}

function movePlayerTo(x, y) {
  if (isPlayerSleepingFromSave()) {
    updateDiscoverySleepNotice();
    return;
  }

  if (!canMoveTo(x, y)) {
    return;
  }

  discoveryState.x = x;
  discoveryState.y = y;

  markCurrentTileVisited();

  rollCurrentTileLoot();
  rollCurrentTileEncounter();

  saveDiscoveryState();
  renderDiscoveryMap();
}

function setDiscoveryZoom(newZoom) {
 const minZoom = 0.5;
 const maxZoom = 1.5;

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
    updateTexts();
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