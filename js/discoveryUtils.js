function columnToLetters(columnIndex) {
  let letters = "";
  let number = columnIndex + 1;

  while (number > 0) {
    const remainder = (number - 1) % 26;
    letters = String.fromCharCode(65 + remainder) + letters;
    number = Math.floor((number - 1) / 26);
  }

  return letters;
}

function getTileId(x, y) {
  return columnToLetters(x) + (y + 1);
}

function getCurrentMap() {
  return mapsDatabase[discoveryState.currentMapId];
}

function isInsideMap(x, y) {
  const map = getCurrentMap();

  return (
    x >= 0 &&
    y >= 0 &&
    x < map.width &&
    y < map.height
  );
}

function getTileSpecialData(tileId) {
  const map = getCurrentMap();

  return {
    isBlocked: map.blockedTiles.includes(tileId),
    resource: map.resourceTiles[tileId] || null,
    exit: map.exits[tileId] || null
  };
}

function isBlockedTile(x, y) {
  const tileId = getTileId(x, y);
  const tileData = getTileSpecialData(tileId);

  return tileData.isBlocked;
}

function isAdjacentToPlayer(x, y) {
  const dx = Math.abs(discoveryState.x - x);
  const dy = Math.abs(discoveryState.y - y);

  return dx <= 1 && dy <= 1 && !(dx === 0 && dy === 0);
}

function canMoveTo(x, y) {
  if (!isInsideMap(x, y)) {
    return false;
  }

  if (isBlockedTile(x, y)) {
    return false;
  }

  return isAdjacentToPlayer(x, y);
}

function getVisitedTilesForCurrentMap() {
  const mapId = discoveryState.currentMapId;

  if (!discoveryState.visitedTiles[mapId]) {
    discoveryState.visitedTiles[mapId] = [];
  }

  return discoveryState.visitedTiles[mapId];
}

function markCurrentTileVisited() {
  const visitedTiles = getVisitedTilesForCurrentMap();
  const currentTileId = getTileId(discoveryState.x, discoveryState.y);

  if (!visitedTiles.includes(currentTileId)) {
    visitedTiles.push(currentTileId);
  }
}