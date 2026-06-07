const mountainMap = {
  id: "mountain",
  nameKey: "Mountain",
  width: 32,
  height: 32,

  backgroundImage: "img/maps/mountain-map.png",

  defaultLootTable: "mountainGeneralArea",

  startPosition: {
      x: 32,
      y: 15
    },

  blockedTiles: [
  ],

  resourceTiles: {
    ...createResourceTiles(
        [ ],
        "mountain..."
    ),
  },

  lootTables: {
    mountainGeneralArea: [
        { itemId: "", chance: 1, quantity: 1 },
    ],
  },

   encounterTiles: {
    ...createEncounterTiles(
      [
        ...createTileRange("A1", "Z32"), 
      ],
      "mountainDangerZone"
    ),
    ...createEncounterTiles(
      [

      ],
      "mountainAnimalZone"
    ),
  },

encounterTables: {
  mountainLowRisk: [
    { id: "smallBird", type: "friendly", chance: 4 },
    { id: "mufflon", type: "friendly", chance: 4 },
    { id: "snake", type: "enemy", chance: 2 }
  ],

  mountainAnimalZone: [
    { id: "mufflon", type: "friendly", chance: 9 },
    { id: "smallBird", type: "friendly", chance: 4 },
    { id: "snake", type: "enemy", chance: 3 }
  ],

  mountainDangerZone: [
    { id: "wolf", type: "enemy", chance: 7 },
    { id: "bear", type: "enemy", chance: 3 },
    { id: "snake", type: "enemy", chance: 4 },
    { id: "mufflon", type: "friendly", chance: 2 }
  ],

  mountainBearZone: [
    { id: "bear", type: "enemy", chance: 7 },
    { id: "wolf", type: "enemy", chance: 4 },
    { id: "mufflon", type: "friendly", chance: 2 }
  ]
},

  exits: {
    "AF16": {
      targetMapId: "mine",
      targetPosition: {
        x: 16,
        y: 30
      },
      label: "Mine"
    }
  }
};