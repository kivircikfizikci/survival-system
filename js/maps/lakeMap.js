const lakeMap = {
  id: "lake",
  nameKey: "Lake",
  width: 32,
  height: 32,

  backgroundImage: "img/maps/lake-map.png",

  defaultLootTable: "lakeGeneralArea",

  startPosition: {
      x: 16,
      y: 31
    },

  blockedTiles: [
  ],

  resourceTiles: {
    ...createResourceTiles(
        [ ],
        "lake..."
    ),
  },

  lootTables: {
    lakeGeneralArea: [
        { itemId: "", chance: 1, quantity: 1 },
    ],
  },

   encounterTiles: {
    ...createEncounterTiles(
      [
        ...createTileRange("A1", "Z32"), 
      ],
      "lakeDangerZone"
    ),
    ...createEncounterTiles(
      [

      ],
      "lakeAnimalZone"
    ),
  },

encounterTables: {
  lakeShore: [
    { id: "fish", type: "friendly", chance: 10 },
    { id: "smallBird", type: "friendly", chance: 5 },
    { id: "snake", type: "enemy", chance: 3 }
  ],

  lakeAnimalZone: [
    { id: "deer", type: "friendly", chance: 5 },
    { id: "smallBird", type: "friendly", chance: 5 },
    { id: "fish", type: "friendly", chance: 6 },
    { id: "snake", type: "enemy", chance: 3 }
  ],

  lakeDangerZone: [
    { id: "alligator", type: "enemy", chance: 5 },
    { id: "snake", type: "enemy", chance: 6 },
    { id: "fish", type: "friendly", chance: 4 },
    { id: "smallBird", type: "friendly", chance: 2 }
  ],

  lakeFishingSpot: [
    { id: "fish", type: "friendly", chance: 18 },
    { id: "snake", type: "enemy", chance: 2 }
  ]
},



 exits: {
    "Q32": {
      targetMapId: "trail",
      targetPosition: {
        x: 15,
        y: 0
      },
      label: "Trail"
    },

    "AE1": {
      targetMapId: "mountain",
      targetPosition: {
        x: 0,
        y: 28
      },
      label: "Mountain"
    },

    "A15": {
      targetMapId: "abandonedVillage",
      targetPosition: {
        x: 30,
        y: 0
      },
      label: "Abandoned village"
    },
 }
};