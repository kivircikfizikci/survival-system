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
    ...createTileRange("AF23", "AE20"), "AF29", ...createTileRange("AF18", "AE16"), "AF15", "AD14", "AD13", "AD12", ...createTileRange("AC12", "AC5"), "AD6", "AD5", "AC14", "AC15", "AC16",
    "AF9", ...createTileRange("AB4", "Z1"), ...createTileRange("AA5", "AB10"), ...createTileRange("Z10", "Z5"), "AF10", "AE9", "AE8", "AF8", "AF7", ...createTileRange("AF5", "AF1"), "AE4",
    "AE3", "AE2", "AD3", "AC1", "AC4",
  ],

  requiredItemTiles: {
    ...createRequiredItemTiles(
      [
        ...createTileRange("A1", "S7"), ...createTileRange("E8", "V15"), ...createTileRange("I16", "W21"), ...createTileRange("M22", "S25"), 
        "C8", "C9", "D8", "D9", "D10", "K22", "L22", "L23", "T23", "T22", "U22", ...createTileRange("X19", "X13"), ...createTileRange("W15", "W11"), ...createTileRange("U7", "T5"), 
      ],
      "makeshiftRaft"
    )
  },

  resourceTiles: {
    ...createResourceTiles(
        [  
          "A9", "A10", "C11", "D13", "D14", "D16", "F19", "G19", "H22", "J23", "L25", "O26", "S26", "V24", "X21", "Y19", "Z17", "Y12", "X8", "W6", "T4", "V1"
        ],
        "lakeReedBed"
    ),
    ...createResourceTiles(
        [  
          ...createTileRange("W1", "Y4"), "X5", "Y5", "Y6", "V2", "V3", "X5", "X6", "Y5", "Y6", "Y7"
        ],
        "lakeClayBank"
    ),
    ...createResourceTiles(
        [  
        "A10", "A11", "B12", "B13", "C13", "C14", "C15", "D13", "D14", "C15", "D16", "D17", "E19", "F19", "G19", "G20", "G21", "H21", "H22", "I23", "J23", "K24", "L25", "M26", "O27",
       "P27", "Q27", "R27", "T26", "U25", "V24", "V25", "W24", "W23", "X23", "Y21", "Z20", ...createTileRange("Z19", "AA13"), "Y12", "Y11", ...createTileRange("Y10", "W7"), "W6", "W5",
       "W4", ...createTileRange("V4", "U1"), 
        ],
        "lakeShoreDebris"
    ),
    ...createResourceTiles(
        [  
        "A13", "A18", "A19", ...createTileRange("A20", "D32"), "E24", ...createTileRange("E25", "G32"), "H27", "I27", ...createTileRange("H28", "L32"), ...createTileRange("M30", "N32"), 
        ...createTileRange("T32", "AF29"), "S32", "S31", "Y28", "Z28", "Z27", ...createTileRange("AA28", "AF26"), ...createTileRange("AC25", "AF24"), "AE19", "AB11", "X3"
        ],
        "lakeTreeArea"
    ),
    ...createResourceTiles(
        [  
        "A15", "B15", "B16", "C16", "C17", "C18", "D18", "E18", "D19", "D20", "E21", "E22", "F22", "F23", "G23", "G24", "H25", "I26", "J26", "K27", "L27", "M28", "N28", "O28", "P29", "Q29", 
        "P30", "Q30", "P31", "Q31", "P32", "Q32", "R29", "R28", "S28", "T28", "U27", "V27", "W27", "X26", "Y25", "Z25", "Z24", "AA24", "AA23", "AB22", "AB21", "AB20", "AB19", "AB18",
        "AC17",  "AD16", "AE15", "AE14", "AF13", "AF12", "AE11", "AE10", "AD10", "AD9", "AD8", "AE7", "AE6", "AE5", "AD4", "AC3", "AC2", "AD2", "AD1", "AE1"
        ],
        "lakePathArea"
    ),
  },

  lootTables: {
    lakeGeneralArea: [
      { itemId: "reed", chance: 8, quantity: 1 },
      { itemId: "pebble", chance: 7, quantity: 1 },
      { itemId: "plantFiber", chance: 6, quantity: 1 },
      { itemId: "dryGrass", chance: 5, quantity: 1 },
      { itemId: "frog", chance: 4, quantity: 1 },
      { itemId: "snail", chance: 4, quantity: 1 },
      { itemId: "plasticBottle", chance: 2, quantity: 1 }
    ],

    lakeShoreDebris: [
      { itemId: "pebble", chance: 28, quantity: 1 },
      { itemId: "reed", chance: 20, quantity: 1 },
      { itemId: "dryGrass", chance: 16, quantity: 1 },
      { itemId: "oldFishNet", chance: 2, quantity: 1 },
      { itemId: "plasticBottle", chance: 8, quantity: 1 },
      { itemId: "tinCan", chance: 5, quantity: 1 },
      { itemId: "snail", chance: 8, quantity: 1 },
    ],

    lakeReedBed: [
      { itemId: "reed", chance: 45, quantity: 1 },
      { itemId: "plantFiber", chance: 22, quantity: 1 },
      { itemId: "frog", chance: 12, quantity: 1 },
      { itemId: "insect", chance: 8, quantity: 1 }
    ],

    lakeClayBank: [
      { itemId: "clay", chance: 15, quantity: 1 },
      { itemId: "pebble", chance: 5, quantity: 1 },
      { itemId: "snail", chance: 3, quantity: 1 },
      { itemId: "worm", chance: 5, quantity: 3 },
    ],
    
    lakeTreeArea: [
      { itemId: "branch", chance: 15, quantity: 1 },
      { itemId: "stick", chance: 25, quantity: 1 },
      { itemId: "bark", chance: 10, quantity: 1 },
      { itemId: "dryWood", chance: 15, quantity: 1 },
      { itemId: "resin", chance: 5, quantity: 1 },
      { itemId: "pineCone", chance: 35, quantity: 1 },
      { itemId: "dryLeaf", chance: 25, quantity: 1 },
      { itemId: "mushroom", chance: 10, quantity: 1 },
      { itemId: "wildHerb", chance: 8, quantity: 1 },
      { itemId: "insect", chance: 12, quantity: 1 },
    ],

    lakePathArea: [
      { itemId: "tinCan", chance: 18, quantity: 1 },
      { itemId: "plasticBottle", chance: 14, quantity: 1 },
      { itemId: "clothScrap", chance: 12, quantity: 1 },
      { itemId: "oldFishNet", chance: 2, quantity: 1 }
    ],
  },

  encounterTiles: {
    ...createEncounterTiles(
      [
       "A10", "A11", "B12", "B13", "C13", "C14", "C15", "D13", "D14", "C15", "D16", "D17", "E19", "F19", "G19", "G20", "G21", "H21", "H22", "I23", "J23", "K24", "L25", "M26", "O27",
       "P27", "Q27", "R27", "T26", "U25", "V24", "V25", "W24", "W23", "X23", "Y21", "Z20", ...createTileRange("Z19", "AA13"), "Y12", "Y11", ...createTileRange("Y10", "W7"), "W6", "W5",
       "W4", ...createTileRange("V4", "U1"), 
      ],
      "lakeDangerZone"
    ),
    ...createEncounterTiles(
      [
        ...createTileRange("A1", "S7"), ...createTileRange("E8", "V15"), ...createTileRange("I16", "W21"), ...createTileRange("M22", "S25"), 
        "C8", "C9", "D8", "D9", "D10", "K22", "L22", "L23", "T23", "T22", "U22", ...createTileRange("X19", "X13"), ...createTileRange("W15", "W11"), ...createTileRange("U7", "T5"), 
      ],
      "lakeZone"
    ),
    ...createEncounterTiles(
      [
        "A13", "A18", "A19", ...createTileRange("A20", "D32"), "E24", ...createTileRange("E25", "G32"), "H27", "I27", ...createTileRange("H28", "L32"), ...createTileRange("M30", "N32"), 
        ...createTileRange("T32", "AF29"), "S32", "S31", "Y28", "Z28", "Z27", ...createTileRange("AA28", "AF26"), ...createTileRange("AC25", "AF24"), "AE19", "AB11", "X3"
      ],
      "lakeTreeZone"
    ),
    ...createEncounterTiles(
      [
        "A15", "B15", "B16", "C16", "C17", "C18", "D18", "E18", "D19", "D20", "E21", "E22", "F22", "F23", "G23", "G24", "H25", "I26", "J26", "K27", "L27", "M28", "N28", "O28", "P29", "Q29", 
        "P30", "Q30", "P31", "Q31", "P32", "Q32", "R29", "R28", "S28", "T28", "U27", "V27", "W27", "X26", "Y25", "Z25", "Z24", "AA24", "AA23", "AB22", "AB21", "AB20", "AB19", "AB18",
        "AC17",  "AD16", "AE15", "AE14", "AF13", "AF12", "AE11", "AE10", "AD10", "AD9", "AD8", "AE7", "AE6", "AE5", "AD4", "AC3", "AC2", "AD2", "AD1", "AE1"
      ],
      "lakePathRoad"
    ),
  },

  encounterTables: {
    lakeZone: [
      { id: "alligator", type: "enemy", chance: 5 }
    ],
    lakeTreeZone: [
      { id: "deer", type: "friendly", chance: 4 },
      { id: "smallBird", type: "friendly", chance: 4 },
      { id: "wildBoar", type: "enemy", chance: 2 },
      { id: "wildDog", type: "enemy", chance: 2 },
      { id: "snake", type: "enemy", chance: 3 }
    ],
    lakeDangerZone: [
      { id: "alligator", type: "enemy", chance: 4 },
      { id: "snake", type: "enemy", chance: 4 },
      { id: "smallBird", type: "friendly", chance: 4 },
      { id: "deer", type: "friendly", chance: 4 },
      { id: "wolf", type: "enemy", chance: 4 },
      { id: "wildDog", type: "enemy", chance: 4 },
      { id: "wildBoar", type: "enemy", chance: 4 }

    ],
    lakePathRoad: [
      { id: "snake", type: "enemy", chance: 2 },
      { id: "wolf", type: "enemy", chance: 1 },
      { id: "wildDog", type: "enemy", chance: 2 }
    ]
  },

  fishingSpotTiles: [ 
    "A8", "B8", "B9", "C10", "D11", "D12", "D13", "D14", "D15", "E16", "F16", "G16", "H16", "H17", "G17", "F17", "E17", "F18", "G18", "H18", "G19", "H19", 
    "H20", "H21", "I22", "J22", "J23", "K23", "K24", "L24", "L25", "M26", "N26", "O26", "P26", "Q26", "R26", "S26", "T25", "T24", "U24", "U23", "V23", "V22", "W22", "X21", 
    "X20", "Y19", "Y18", "Y17", "Y16", "Z16", "Y15", "Z15", "Y14", "Z14", "Y13", "X12", "X11", "W10", "W9", "W8", "V7", "V6", "V5", "U4", "T4", "T3", "T2", "T1"
  ],

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
        x: 31,
        y: 1
      },
      label: "Abandoned village"
    },
 }
};