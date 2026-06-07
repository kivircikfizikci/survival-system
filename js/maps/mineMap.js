const mineMap = {
  id: "mine",
  nameKey: "mine",
  width: 32,
  height: 32,

  backgroundImage: "img/maps/mine-map.png",

  defaultLootTable: "mineGeneralArea",

  startPosition: {
      x: 32,
      y: 15
    },

  blockedTiles: [
  ],

  resourceTiles: {
    ...createResourceTiles(
        [ ],
        "mine..."
    ),
  },

  lootTables: {
    mineGeneralArea: [
        { itemId: "", chance: 1, quantity: 1 },
    ],
  },

   encounterTiles: {
    ...createEncounterTiles(
      [
        ...createTileRange("A1", "Z32"), 
      ],
      "mineDangerZone"
    ),
    ...createEncounterTiles(
      [

      ],
      "mineLowRisk"
    ),
  },

encounterTables: {
  mineLowRisk: [
    { id: "spider", type: "enemy", chance: 5 },
    { id: "snake", type: "enemy", chance: 2 }
  ],

  mineSpiderNest: [
    { id: "spider", type: "enemy", chance: 14 },
    { id: "snake", type: "enemy", chance: 3 }
  ],

  mineDangerZone: [
    { id: "spider", type: "enemy", chance: 10 },
    { id: "snake", type: "enemy", chance: 6 },
    { id: "bear", type: "enemy", chance: 2 }
  ],

  mineBearDen: [
    { id: "bear", type: "enemy", chance: 8 },
    { id: "spider", type: "enemy", chance: 5 }
  ]
},

  /*exits: {
    "AF16": {
      targetMapId: "mine",
      targetPosition: {
        x: 16,
        y: 30
      },
      label: "Mine"
    }
  }*/
};