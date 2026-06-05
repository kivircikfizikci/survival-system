const zoomInButton = document.getElementById("zoomInButton");
const zoomOutButton = document.getElementById("zoomOutButton");

function movePlayerTo(x, y) {
  if (!canMoveTo(x, y)) {
    return;
  }

  discoveryState.x = x;
  discoveryState.y = y;

  markCurrentTileVisited();
  rollCurrentTileLoot();

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
    addDiscoveryLog("Target map is not ready yet.");
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

  addDiscoveryLog("Entered " + exitData.label + ".");
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

loadDiscoveryState();
renderDiscoveryMap();

requestAnimationFrame(function () {
  updateMapCamera();

  requestAnimationFrame(function () {
    updateMapCamera();
  });
});