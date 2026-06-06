const DISCOVERY_SAVE_KEY = "survivalSystemDiscoverySave";

let discoveryState = {
  currentMapId: "meadow",
  x: 16,
  y: 16,
  tileSize: 48,
  zoom: 1,
  pendingLoot: null,
  pendingEncounter: null,
  visitedTiles: {
    meadow: []
  }
};

function saveDiscoveryState() {
  localStorage.setItem(
    DISCOVERY_SAVE_KEY,
    JSON.stringify(discoveryState)
  );
}

function loadDiscoveryState() {
  const savedData = localStorage.getItem(DISCOVERY_SAVE_KEY);

  if (!savedData) {
    markCurrentTileVisited();
    return;
  }

  try {
    const loadedState = JSON.parse(savedData);

    discoveryState = {
      ...discoveryState,
      ...loadedState
    };

    if (!discoveryState.tileSize) {
      discoveryState.tileSize = 48;
    }

    if (!discoveryState.zoom) {
      discoveryState.zoom = 1;
    }

    if (!discoveryState.visitedTiles[discoveryState.currentMapId]) {
      discoveryState.visitedTiles[discoveryState.currentMapId] = [];
    }

    markCurrentTileVisited();
  } catch (error) {
    console.error("Discovery save could not be loaded:", error);
    localStorage.removeItem(DISCOVERY_SAVE_KEY);
    markCurrentTileVisited();
  }
}