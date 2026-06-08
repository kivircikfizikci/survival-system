function createResourceTiles(tileIds, lootTable) {
  const resourceTiles = {};
  const uniqueTileIds = [...new Set(tileIds)];

  for (let tileId of uniqueTileIds) {
    if (!parseTileId(tileId)) {
      console.warn(
        getMapHelperText("invalidResourceTileId", {
          tileId: tileId
        })
      );
      continue;
    }

    resourceTiles[tileId] = {
      lootTable: lootTable
    };
  }

  return resourceTiles;
}

function lettersToColumn(columnLetters) {
  let columnNumber = 0;

  for (let i = 0; i < columnLetters.length; i++) {
    columnNumber *= 26;
    columnNumber += columnLetters.charCodeAt(i) - 64;
  }

  return columnNumber - 1;
}

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

function parseTileId(tileId) {
  const match = tileId.match(/^([A-Z]+)(\d+)$/);

  if (!match) {
    return null;
  }

  return {
    x: lettersToColumn(match[1]),
    y: Number(match[2]) - 1
  };
}

function createTileRange(startTileId, endTileId) {
  const start = parseTileId(startTileId);
  const end = parseTileId(endTileId);

  if (!start || !end) {
    return [];
  }

  const tiles = [];

  const minX = Math.min(start.x, end.x);
  const maxX = Math.max(start.x, end.x);
  const minY = Math.min(start.y, end.y);
  const maxY = Math.max(start.y, end.y);

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      tiles.push(columnToLetters(x) + (y + 1));
    }
  }

  return tiles;
}

function createEncounterTiles(tileIds, encounterTable) {
  const encounterTiles = {};
  const uniqueTileIds = [...new Set(tileIds)];

  for (let tileId of uniqueTileIds) {
    if (!parseTileId(tileId)) {
      console.warn(
        getMapHelperText("invalidEncounterTileId", {
          tileId: tileId
        })
      );
      continue;
    }

    encounterTiles[tileId] = {
      encounterTable: encounterTable
    };
  }

  return encounterTiles;
}

function getMapHelperText(key, params = {}) {
  if (typeof t === "function") {
    return t(key, params);
  }

  const fallbackTexts = {
    invalidResourceTileId: "Invalid resource tile id: {tileId}",
    invalidEncounterTileId: "Invalid encounter tile id: {tileId}",
    invalidRequiredItemTileId: "Invalid required item tile id: {tileId}"
  };

  let text = fallbackTexts[key] || key;

  for (let paramName in params) {
    text = text.replace("{" + paramName + "}", params[paramName]);
  }

  return text;
}

function createRequiredItemTiles(tileIds, requiredItemId) {
  const requiredItemTiles = {};
  const uniqueTileIds = [...new Set(tileIds)];

  for (let tileId of uniqueTileIds) {
    if (!parseTileId(tileId)) {
      console.warn(
        getMapHelperText("invalidRequiredItemTileId", {
          tileId: tileId
        })
      );

      continue;
    }

    requiredItemTiles[tileId] = {
      requiredItemId: requiredItemId
    };
  }

  return requiredItemTiles;
}