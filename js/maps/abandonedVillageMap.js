const abandonedVillageMap = {
  id: "abandonedVillage",
  nameKey: "Abandoned Village",
  width: 32,
  height: 32,

  backgroundImage: "img/maps/abandonedVillage-map.png",

  defaultLootTable: "abandonedVillageGeneralArea",

  startPosition: {
      x: 32,
      y: 15
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
    abandonedVillageGeneralArea: [
        { itemId: "", chance: 1, quantity: 1 },
    ],
  },

   encounterTiles: {
    ...createEncounterTiles(
        createTileRange("A1", "AF32"),
        "abandonedVillageLowRisk"
    ),

    // Özel bölgeler altta genel riski ezer
    ...createEncounterTiles(
        [
        // bahçe / ağaçlık / çalı alanları
        ],
        "abandonedVillageAnimalZone"
    ),

    ...createEncounterTiles(
        [
        // ev / bina içi / harabe çevresi
        ],
        "abandonedVillageHouseZone"
    ),

    ...createEncounterTiles(
        [
        // en tehlikeli küçük noktalar
        ],
        "abandonedVillageDangerZone"
    )
    },

encounterTables: {
  abandonedVillageLowRisk: [
    { id: "smallBird", type: "friendly", chance: 4 },
    { id: "rabbit", type: "friendly", chance: 3 },
    { id: "snake", type: "enemy", chance: 2 },
    { id: "spider", type: "enemy", chance: 2 }
  ],

  abandonedVillageAnimalZone: [
    { id: "rabbit", type: "friendly", chance: 7 },
    { id: "smallBird", type: "friendly", chance: 5 },
    { id: "beeHive", type: "friendly", chance: 3 },
    { id: "snake", type: "enemy", chance: 2 }
  ],

  abandonedVillageDangerZone: [
    { id: "wildDog", type: "enemy", chance: 8 },
    { id: "snake", type: "enemy", chance: 5 },
    { id: "spider", type: "enemy", chance: 4 },
    { id: "rabbit", type: "friendly", chance: 2 }
  ],

  abandonedVillageHouseZone: [
    { id: "spider", type: "enemy", chance: 8 },
    { id: "snake", type: "enemy", chance: 4 },
    { id: "smallBird", type: "friendly", chance: 3 }
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