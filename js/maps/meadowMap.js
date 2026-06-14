const meadowMap = {
  id: "meadow",
  nameKey: "Meadow",
  width: 32,
  height: 32,

  backgroundImage: "img/maps/meadow-map.png",

  defaultLootTable: "meadowGeneralArea",

  startPosition: {
      x: 16,
      y: 16
    },

  blockedTiles: [
    "A5", "A6", "A11", "A12", "A13", "A18", "A19", "A23", "A24", "A25", "A26", "A27", "A28", "A29",
    "B6", "B11", "B12", "B23", "B24", "B25", "B26", "B27", "B28", "B29",
    "C6", "C7", "C15", "C24", "C25", "C26", "C27", "C28", "C29",
    "D25", "D26", "D27", "D28", "D29", "D31", "D32",
    "E25", "E26", "E28", "E31", "E32",
    "F2", "F28", "F31", "F32",
    "G2", "G19", "G20", "G21", "G32",
    "H2", "H19", "H20", "H21", "H22",
    "I19", "I20", "I21", "I22", "I23", "I24",
    "J20", "J21", "J22", "J23",
    "K21",
    "L2", "L19", "L21",
    "M21",
    "N17",
    "O4", "O24",
    "P2", "P9", "P10", "P31",
    "Q2", "Q9", "Q10", "Q20", "Q30", "Q31",
    "S21", "S22", "S27", "S32",
    "T22", "T27", "T32",
    "U9", "U14", "U26", "U27", "U28", "U31", "U32",
    "V9", "V25", "V26", "V27", "V30", "V31", "V32",
    "W4", "W5", "W6", "W25", "W26", "W27", "W31", "W32",
    "X1", "X2", "X3", "X4", "X5", "X6", "X26", "X27", "X31", "X32",
    "Y1", "Y2", "Y3", "Y4", "Y5", "Y6", "Y26", "Y27", "Y31", "Y32",
    "Z1", "Z2", "Z3", "Z4", "Z31", "Z32",
    "AA1", "AA2", "AA3", "AA4", "AA7", "AA27", "AA28", "AA31", "AA32",
    "AB1", "AB2", "AB3", "AB4", "AB7", "AB11", "AB27", "AB28", "AB31", "AB32",
    "AC1", "AC2", "AC3", "AC9", "AC10", "AC11", "AC12", "AC18", "AC19", "AC20", "AC21", "AC28", "AC29", "AC30", "AC31", "AC32",
    "AD1", "AD2", "AD3", "AD4", "AD11", "AD12", "AD13", "AD19", "AD20", "AD21", "AD22", "AD29", "AD30", "AD31", "AD32",
    "AE1", "AE2", "AE11", "AE12", "AE13", "AE19", "AE20", "AE21", "AE22", "AE30", "AE31", "AE32",
    "AF11", "AF12", "AF13", "AF19", "AF20", "AF21", "AF22", "AF32",

  ],

  resourceTiles: {
    ...createResourceTiles(
        ["E15", "E16", "E27", "F15", "F16", "F26", "K12", "P16", "U11", "Y24", "Z10", "AA8", "AC6", "AD23", "AE23", "AF23", ],
        "meadowBush"
    ),

    ...createResourceTiles(
        ["S16", "U17", "W18", "X18", "Y17", "Z16", "AA23", "AA24", "AA26", "AB10", "AB12", "AB19", "AB21", "AC13", "AC14", "AD15", "AD18", "AD25", "AE15", "AE18", "AE27", "AF4", "AF5", "AF6", "AF15", "AF18", "AF28"],
        "dryGrassPatch"
    ),

    ...createResourceTiles(
        ["G22", "H4", "I4", "K10", "L10", "W1", "W2", "W3", "Z5", "Z6", "AA5", "AB5", "AC4", "AD14", "AE14", ],
        "fallenBranch"
    ),

    ...createResourceTiles(
        ["B18", "B19", "D1", "D2", "D3", "D9", "E2", "E8", "E9", "F8", "F3", "F9", "H11", "H23", "J24", "K23", "O14", "O23", "P23", "S23", "S26", "R27", "V1", "V2", "V3", "V7", "V8", "V10", "W7", "W8", "W9", "W10", "X8", "X9", "X10", "X28", "Y8", "Y9", "Y11", "Y28", "Z8", "Z9", "Z11", "Z30", "AA30", "AD10", "AE10", "AC22", "AC23", ],
        "wildHerbPatch"
    ),
  },

  lootTables: {
    meadowGeneralArea: [
        { itemId: "dryGrass", chance: 10, quantity: 1 },
        { itemId: "dryLeaf", chance: 10, quantity: 1 },
        { itemId: "plantFiber", chance: 7, quantity: 1 },
        { itemId: "smallFlower", chance: 5, quantity: 1 },
        { itemId: "wildHerb", chance: 4, quantity: 1 },
        { itemId: "reed", chance: 4, quantity: 1 },
        { itemId: "pebble", chance: 4, quantity: 1 },
        { itemId: "flint", chance: 4, quantity: 1 },
        { itemId: "insect", chance: 3, quantity: 1 },
        { itemId: "stick", chance: 3, quantity: 1 },
        { itemId: "feather", chance: 2, quantity: 1 }
    ],
    meadowBush: [
      { itemId: "blackberry", chance: 35, quantity: 1 },
      { itemId: "dryLeaf", chance: 20, quantity: 1 },
      { itemId: "insect", chance: 10, quantity: 1 },
      { itemId: "plantFiber", chance: 10, quantity: 1 }
    ],

    dryGrassPatch: [
      { itemId: "dryGrass", chance: 45, quantity: 2 },
      { itemId: "plantFiber", chance: 25, quantity: 2 },
      { itemId: "dryLeaf", chance: 15, quantity: 2 }
    ],

    fallenBranch: [
      { itemId: "stick", chance: 35, quantity: 2 },
      { itemId: "branch", chance: 25, quantity: 1 },
      { itemId: "bark", chance: 18, quantity: 1 },
      { itemId: "dryWood", chance: 12, quantity: 1 }
    ],

    wildHerbPatch: [
      { itemId: "wildHerb", chance: 35, quantity: 1 },
      { itemId: "smallFlower", chance: 25, quantity: 1 },
      { itemId: "plantFiber", chance: 15, quantity: 1 },
      { itemId: "insect", chance: 8, quantity: 1 }
    ],
  },

  encounterTiles: {
    ...createEncounterTiles(
      [
        ...createTileRange("A1", "Z32"), 
      ],
      "meadowDangerZone"
    ),
    ...createEncounterTiles(
      [
        "E2", "F3",  ...createTileRange("G3", "I5"),  ...createTileRange("F6", "M11"), ...createTileRange("E14", "G16"),  
        "C12", "B13", "D15", "C16", "B18", "B19", "B22", "C23", "D24", "E24",  ...createTileRange("F25", "H27"),  ...createTileRange("A30", "C32"),
        ...createTileRange("H30", "O32"),  ...createTileRange("J25", "O28"),  ...createTileRange("R28", "U30"),
        ...createTileRange("W28", "AA30"),  ...createTileRange("AE24", "AF27"),  ...createTileRange("Q23", "T26"),
        ...createTileRange("I16", "N20"),  ...createTileRange("I11", "T15"),  ...createTileRange("J1", "V6"),
        ...createTileRange("U8", "Z13"),  ...createTileRange("AF4", "AF10"),  ...createTileRange("Z5", "AC7"),
        ...createTileRange("P17", "S19"), ...createTileRange("U21", "Z25"),
      ],
      "meadowAnimalZone"
    ),
  },

  encounterTables: {
    meadowAnimalZone: [
      { id: "rabbit", type: "friendly", chance: 10 },
      { id: "deer", type: "friendly", chance: 5 },
      { id: "wildDog", type: "enemy", chance: 3 }
    ],

    meadowDangerZone: [
      { id: "wildDog", type: "enemy", chance: 8 }
    ]
  },

  exits: {
    "AF16": {
      targetMapId: "trail",
      targetPosition: {
        x: 16,
        y: 30
      },
      label: "Trail"
    }
  }
};