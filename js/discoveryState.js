const DISCOVERY_SAVE_KEY = "survivalSystemDiscoverySave";

let discoveryState = {
  currentMapId: "meadow",
  x: 16,
  y: 16,
  tileSize: 48,
  zoom: 1,
  pendingLoot: null,
  pendingEncounter: null,
  selectedHuntTool: null,
  selectedFightTool: null,
  cutTrees: {
    meadow: [],
    trail: [],
    lake: [],
    mountain: [],
    abandonedVillage: [],
  },
  visitedTiles: {
    meadow: [],
    trail: [],
    lake: [],
    mountain: [],
    abandonedVillage: [],
    mine1: [],
    mine2: [],
    mine3: [],
    mine4: [],
  },
  tileLoot: {},
  recentTileHistory: [],
  depletedActionTiles: {}
};

let isDiscoveryMoving = false;

function saveDiscoveryState() {
  localStorage.setItem(
    DISCOVERY_SAVE_KEY,
    JSON.stringify(discoveryState)
  );
}

function loadDiscoveryState() {
  const savedData = localStorage.getItem(DISCOVERY_SAVE_KEY);

  if (!savedData) {
    ensureDiscoveryMapState(discoveryState.currentMapId);
    markCurrentTileVisited();
    return;
  }

  try {
    const loadedState = JSON.parse(savedData);

    discoveryState = {
      ...discoveryState,
      ...loadedState
    };

    if (!discoveryState.currentMapId) {
      discoveryState.currentMapId = "meadow";
    }

    if (typeof discoveryState.x !== "number") {
      discoveryState.x = 16;
    }

    if (typeof discoveryState.y !== "number") {
      discoveryState.y = 16;
    }

    const currentMap = getCurrentMap();

    if (currentMap) {
      if (
        discoveryState.x < 1 ||
        discoveryState.x > currentMap.width ||
        discoveryState.y < 1 ||
        discoveryState.y > currentMap.height
      ) {
        discoveryState.x = currentMap.startX || 1;
        discoveryState.y = currentMap.startY || 1;
      }
    }

    if (!discoveryState.tileSize) {
      discoveryState.tileSize = 48;
    }

    if (!discoveryState.zoom) {
      discoveryState.zoom = 1;
    }

    if (!discoveryState.visitedTiles) {
      discoveryState.visitedTiles = {};
    }

    if (!discoveryState.cutTrees) {
      discoveryState.cutTrees = {};
    }

    if (!discoveryState.tileLoot) {
      discoveryState.tileLoot = {};
    }

    if (!Array.isArray(discoveryState.recentTileHistory)) {
      discoveryState.recentTileHistory = [];
    }

    if (!discoveryState.depletedActionTiles) {
      discoveryState.depletedActionTiles = {};
    }

    if (typeof discoveryState.pendingLoot === "undefined") {
      discoveryState.pendingLoot = null;
    }

    if (typeof discoveryState.pendingEncounter === "undefined") {
      discoveryState.pendingEncounter = null;
    }

    if (typeof discoveryState.selectedHuntTool === "undefined") {
      discoveryState.selectedHuntTool = null;
    }

    if (typeof discoveryState.selectedFightTool === "undefined") {
      discoveryState.selectedFightTool = null;
    }

    ensureDiscoveryMapState(discoveryState.currentMapId);
    markCurrentTileVisited();
  } catch (error) {
    console.error("Discovery save could not be loaded:", error);
    localStorage.removeItem(DISCOVERY_SAVE_KEY);

    ensureDiscoveryMapState(discoveryState.currentMapId);
    markCurrentTileVisited();
  }
}

function ensureDiscoveryMapState(mapId) {
  if (!discoveryState.visitedTiles) {
    discoveryState.visitedTiles = {};
  }

  if (!Array.isArray(discoveryState.visitedTiles[mapId])) {
    discoveryState.visitedTiles[mapId] = [];
  }

  if (!discoveryState.tileLoot) {
    discoveryState.tileLoot = {};
  }

  if (!discoveryState.tileLoot[mapId]) {
    discoveryState.tileLoot[mapId] = {};
  }

  if (!discoveryState.depletedActionTiles) {
    discoveryState.depletedActionTiles = {};
  }

  if (!discoveryState.depletedActionTiles[mapId]) {
    discoveryState.depletedActionTiles[mapId] = {};
  }
}

function loadDiscoveryLanguage() {
  const savedData = localStorage.getItem("survivalSystemSave");

  if (!savedData) {
    return;
  }

  try {
    const saveData = JSON.parse(savedData);

    if (saveData.currentLanguage) {
      currentLanguage = saveData.currentLanguage;
    }
  } catch (error) {
    console.error("Language could not be loaded:", error);
  }
}