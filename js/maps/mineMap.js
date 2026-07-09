const mineMaps = {
  mine1 :{
    id: "mine1",
    nameKey: "Mine",
    width: 16,
    height: 16,

    backgroundImage: "img/maps/mine1-map.png",

    defaultLootTable: "mineGeneralArea",

    startPosition: {
        x: 2,
        y: 1
      },

    blockedTiles: [
      ...createTileRange("A15", "A5"), "B13", "B12", "B9", "C9", "C10", "D11", "D10", "B5", "C5", "C6", "D6", "D7", "E7", "E8", "E9", "C16", "C15", ...createTileRange("D16", "E14"), 
      "E13", "F13", "G13", "H13", "H14", ...createTileRange("F16", "P16"), "J15", "K15", "K14", "J14", "J13", "J12", "J11", "J10", "J9", "K11", "K10", "I9", "I8", "H7", "H8", "G8", 
      "G9", "G10", "G11", "F6", "F5", "F4", "G6", "G5", "E4", "E3", "F3", ...createTileRange("E1", "I2"), "I3", "J3", "I4", "H3", ...createTileRange("B4", "A1"), "C1", "D1", "J1",
      "I6", "J6", "J7", "J5", "K4", "K5", "L5", "M5", "M6", "M7", "M8", "M9", "L8", "L9", "K1", "K2", "L1", "L2", "L3", "M1", "M2", "N1", "O1", "O2", ...createTileRange("P1", "P32"), 
      "O5", "N5", "O6", "N6", "O9", "O10", "O11", "N10", "O12", "O15", "N15", "N14", "M13", "M12", "M11", "L12", "M15", "M14", 
    ],

    resourceTiles: {
      ...createResourceTiles(
          [ "B11", "B10", "C4", "C3", "C2", "O4", "O3", "O13", "O14", "L13", "L14", "L15", ],
          "mineCopperVein"
      ),
      ...createResourceTiles(
          [ "I10", "H9", "N7", ],
          "mineIronVein"
      ),
      ...createResourceTiles(
          [ "B6", "B7", "B8", "G3", "O8", ],
          "mineCoalVein"
      ),
      ...createResourceTiles(
          [ "D13", "C11", "D9", "D8", "C8", "D4", "D3", "D2", "H6", "H5", "L4", "M4", "J8", "K8", "L6", "L10", "N13", "I12", "H15", "F15", ],
          "mineDebris"
      ),
    },

    lootTables: {
      mineCopperVein: [
        { itemId: "copperOre", chance: 60, minQuantity: 2, maxQuantity: 5 },
        { itemId: "flint", chance: 15, quantity: 1 },
        { itemId: "sharpStone", chance: 20, quantity: 1 },
      ],
       mineIronVein: [
        { itemId: "ironOre", chance: 60, minQuantity: 1, maxQuantity: 3 },
        { itemId: "flint", chance: 15, quantity: 1 },
        { itemId: "sharpStone", chance: 20, quantity: 1 },
      ],
       mineCoalVein: [
        { itemId: "coal", chance: 60, minQuantity: 3, maxQuantity: 6 },
        { itemId: "flint", chance: 15, quantity: 1 },
        { itemId: "sharpStone", chance: 20, quantity: 1 },
      ],
      mineGeneralArea: [
        { itemId: "copperOre", chance: 2, quantity: 1 },
        { itemId: "ironOre", chance: 1, quantity: 1 },
        { itemId: "coal", chance: 2, quantity: 1 },
        { itemId: "pebble", chance: 12, quantity: 1 },
        { itemId: "sharpStone", chance: 10, quantity: 1 },
        { itemId: "flint", chance: 8, quantity: 1 },
      ],
      mineDebris: [
        { itemId: "coal", chance: 12, quantity: 1 },
        { itemId: "animalBone", chance: 8, quantity: 1 },
        { itemId: "rope", chance: 4, quantity: 1 },
        { itemId: "tinCan", chance: 3, quantity: 1 },
        { itemId: "stonePickaxe", chance: 1, quantity: 1 },
      ],
    },

    encounterTiles: {
      ...createEncounterTiles(
        [
          "F14", "B6", "G3", "K6", "L5", "N13",
        ],
        "mineBearDen"
      ),
      ...createEncounterTiles(
        [
          ...createTileRange("A1", "P16"), 
        ],
        "mineDangerZone"
      ),
      ...createEncounterTiles(
        [
          "N12", "M10", "N9", "K12", "K9", "I7", "M3", "L4", "K3", "J4", "I5", "H4", "G7", "E6", "D5", "C8", "D9", "E10", "F11", "H11", "I11", "I13", "F12", "C12", "B14",
        ],
        "mineLowRisk"
      ),
    },

  encounterTables: {
    mineDangerZone: [
      { id: "spider", type: "enemy", chance: 10 },
      { id: "snake", type: "enemy", chance: 6 },
      { id: "bear", type: "enemy", chance: 2 }
    ],
    mineBearDen: [
      { id: "bear", type: "enemy", chance: 8 },
      { id: "spider", type: "enemy", chance: 5 }
    ],
    mineLowRisk: [
      { id: "spider", type: "enemy", chance: 5 },
      { id: "snake", type: "enemy", chance: 2 }
    ],
  },

    exits: {
      "A16": {
        targetMapId: "mountain",
        targetPosition: {
          x: 1,
          y: 25
        },
        label: "Mountain"
      }
    }
  },
  mine2 :{
    id: "mine2",
    nameKey: "Mine",
    width: 16,
    height: 16,

    backgroundImage: "img/maps/mine2-map.png",

    defaultLootTable: "mineGeneralArea",

    startPosition: {
        x: 2,
        y: 1
      },

    blockedTiles: [
      ...createTileRange("A15", "A5"), 
    ],

    resourceTiles: {
      ...createResourceTiles(
          [ "B11", "B10", "C4", "C3", "C2", "O4", "O3", "O13", "O14", "L13", "L14", "L15", ],
          "mineCopperVein"
      ),
      ...createResourceTiles(
          [ "I10", "H9", "N7", ],
          "mineIronVein"
      ),
      ...createResourceTiles(
          [ "B6", "B7", "B8", "G3", "O8", ],
          "mineCoalVein"
      ),
      ...createResourceTiles(
          [ "D13", "C11", "D9", "D8", "C8", "D4", "D3", "D2", "H6", "H5", "L4", "M4", "J8", "K8", "L6", "L10", "N13", "I12", "H15", "F15", ],
          "mineDebris"
      ),
    },

    lootTables: {
      mineCopperVein: [
        { itemId: "copperOre", chance: 10, quantity: 1 },
        { itemId: "flint", chance: 15, quantity: 1 },
        { itemId: "sharpStone", chance: 20, quantity: 1 },
      ],
       mineIronVein: [
        { itemId: "ironOre", chance: 10, quantity: 1 },
        { itemId: "flint", chance: 15, quantity: 1 },
        { itemId: "sharpStone", chance: 20, quantity: 1 },
      ],
       mineCoalVein: [
        { itemId: "coal", chance: 10, quantity: 1 },
        { itemId: "flint", chance: 15, quantity: 1 },
        { itemId: "sharpStone", chance: 20, quantity: 1 },
      ],
      mineGeneralArea: [
        { itemId: "copperOre", chance: 2, quantity: 1 },
        { itemId: "ironOre", chance: 2, quantity: 1 },
        { itemId: "coal", chance: 2, quantity: 1 },
        { itemId: "pebble", chance: 12, quantity: 1 },
        { itemId: "sharpStone", chance: 10, quantity: 1 },
        { itemId: "flint", chance: 8, quantity: 1 },
      ],
      mineDebris: [
        { itemId: "coal", chance: 12, quantity: 1 },
        { itemId: "animalBone", chance: 8, quantity: 1 },
        { itemId: "rope", chance: 4, quantity: 1 },
        { itemId: "tinCan", chance: 3, quantity: 1 },
        { itemId: "stonePickaxe", chance: 1, quantity: 1 },
      ],
    },

    encounterTiles: {
      ...createEncounterTiles(
        [
          "F14", "B6", "G3", "K6", "L5", "N13",
        ],
        "mineBearDen"
      ),
      ...createEncounterTiles(
        [
          ...createTileRange("A1", "P16"), 
        ],
        "mineDangerZone"
      ),
      ...createEncounterTiles(
        [
          "N12", "M10", "N9", "K12", "K9", "I7", "M3", "L4", "K3", "J4", "I5", "H4", "G7", "E6", "D5", "C8", "D9", "E10", "F11", "H11", "I11", "I13", "F12", "C12", "B14",
        ],
        "mineLowRisk"
      ),
    },

  encounterTables: {
    mineDangerZone: [
      { id: "spider", type: "enemy", chance: 10 },
      { id: "snake", type: "enemy", chance: 6 },
      { id: "bear", type: "enemy", chance: 2 }
    ],
    mineBearDen: [
      { id: "bear", type: "enemy", chance: 8 },
      { id: "spider", type: "enemy", chance: 5 }
    ],
    mineLowRisk: [
      { id: "spider", type: "enemy", chance: 5 },
      { id: "snake", type: "enemy", chance: 2 }
    ],
  },

    exits: {
      "P16": {
        targetMapId: "mountain",
        targetPosition: {
          x: 1,
          y: 20
        },
        label: "Mountain"
      }
    }
  },
};