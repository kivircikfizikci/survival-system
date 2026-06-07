const trailMap = {
  id: "trail",
  nameKey: "Trail",
  width: 32,
  height: 32,

  backgroundImage: "img/maps/trail-map.png",

  //defaultLootTable: "trailGeneralArea",

  startPosition: {
      x: 16,
      y: 30
    },

  blockedTiles: [
      ...createTileRange("A1", "B27"), "A26", "B31", "C31",
      ...createTileRange("C1", "C11"), ...createTileRange("C14", "C26"),
      ...createTileRange("D1", "D8"), "D11", ...createTileRange("D16", "D26"),
      "E1", "E2", "E3", "E5", "E7", "E8", "E9", ...createTileRange("E16", "E26"),
      ...createTileRange("F1", "H3"), "F6", "F7", "F8", ...createTileRange("F13", "G16"), "F18", 
      "F19", "F20", "F21", "F22", "F23", "F26", "G6", "G7", "G8", "G9", "G12", "G19", "G20", "G23", "H6", "H7", "H8", "H9", "H11", "H12", "H13", "H16", "H17", "H20", "H21",
      "I1", "I2", "I6", "I7", "I8", "I10", "I11", "I12", "I13", "I16", "I17", "I20", "I21", "I22", "I23",
      "J1", "J6", ...createTileRange("J9", "J14"), "J17", "J18", "J20", "J23", "J28",
      "K1", ...createTileRange("K8", "K14"), "K18", "K19", "K23", "K24", "K28",
      "L1", "L2", ...createTileRange("L6", "L14"), "L18", "L19", "L22", "L23", "L24", "L25",
      "M1", "M2", "M3", "M8", ...createTileRange("M10", "M13"), "M18", "M22", "M23", "M25", "M26",
      ...createTileRange("N1", "N6"), "N8", "N11", "N12", "N15", "N16", "N22", "N25", "N29",
      ...createTileRange("O1", "O5"), "O15", "O16", "O20", "O22", "O24", "O25",
      "P4", "P10", "P16", "P17", "P22", "P24", "P25", "P26", "P28",
      "Q1", "Q2", "Q9", "Q10", "Q11", "Q19", "Q20",
      "R1", "R2", "R9", "R10", "R12", "R13", ...createTileRange("R18", "R20"), "R22", "R23",
      "S1", "S2", "S3", "S7", "S8", "S9", "S10", "S12", "S13", "S14", ...createTileRange("S16", "S20"), "S22", "S23", "S27",
      "T1", "T2", ...createTileRange("T4", "T9"), "T13", "T14", "T17", "T18", ...createTileRange("T22", "T25"), "T27", "T28",
      ...createTileRange("U1", "U9"), ...createTileRange("U11", "U14"), "U17", ...createTileRange("U22", "U25"),
      ...createTileRange("V1", "V7"), ...createTileRange("V11", "V17"), "V19", ...createTileRange("V22", "V25"),
      ...createTileRange("W1", "W8"), ...createTileRange("W11", "W16"), ...createTileRange("W21", "W24"), "W27",
      ...createTileRange("X1", "X7"), ...createTileRange("X13", "X15"), "X18", ...createTileRange("X21", "X24"), "X27", "X28",
      ...createTileRange("Y1", "Y6"), "Y10", "Y11", "Y14", "Y18", "Y24", "Y25", "Y27", 
      ...createTileRange("Z1", "AF6"), "Z9", "Z10", "Z11", "Z24", "Z25", "Z27", 
      "AA9", "AA10", "AA11", "AA13", "AA15", "AA17", "AA24", "AA25", "AA28",
      ...createTileRange("AB7", "AB11"), "AB13", "AB14", "AB15", "AB17", ...createTileRange("AB20", "AB24"), "AB28", "AB29",
      ...createTileRange("AC7", "AF10"), ...createTileRange("AC12", "AF14"), "AC15", ...createTileRange("AC20", "AC25"), ...createTileRange("AC28", "AC32"),
      ...createTileRange("AD19", "AF25"), ...createTileRange("AD28", "AF32"),
  ],
  resourceTiles: {
    ...createResourceTiles(
      [ 
        "S24", "S25", "S26", "R21", "O18", "O19", "Q13", "O10", "O9", "N9", "N10", "O8", "R5", "R6", "Q4", "Q3", "P3",
              ...createTileRange("Q21", "Q31"), ...createTileRange("R24", "R31"), ...createTileRange("P18", "P21"), 
              ...createTileRange("Q14", "R17"), ...createTileRange("O11", "P13"), ...createTileRange("P5", "Q8"), 
          ],
      "trailPathDebris"
    ),

    // Sol ve sağ yoğun çam/ağaç zemini
    ...createResourceTiles(
      [
        
      ],
      "pineForestFloor"
    ),

    ...createResourceTiles(
      [
        "P29", "I29", "G30", "D32", "C30", "AB30", "AB25", "AE26", "P23", "J19", "F17", "L15", "M7", "E4", "F9", "G4", "J2",
        "R11", "V8", "AA8", "Y9", "Y12", "AC11", "Y17", "AE18", "AA21", "V30", "AA29", "AB27", "AD27",
      ],
      "fallenBranchArea"
    ),

    // Patika kenarı çiçek / ot / lif alanları
    ...createResourceTiles(
      [
        "N31", "L30", "K29", "J29", "J30", "I31", "G31", "E31", "A31", "A28", "C27", "D27", "F27", "F24", "H25", "L26", "N26", 
        "T30", "U28", "W28", "X29", "Y28", "Y30", "X31", "AA31", "AA26", "Y26", "N23", "J21", "K20", "G18", "M16", "M14", "N7", "O6", "G5", "D9", "D12", "C13", "K7", 
        "R8", "T10", "V10", "X8", "T12", "U15", "U18", "W19", "X20", "Z18", "AA16", "AA14", "AB32", "K31"
      ],
      "herbTrailEdge"
    ),

    // Gölge/nemli cepler - mantar alanları
    ...createResourceTiles(
      [
        "I32", "B30", "E27", "G24", "G21", "H23", "I28", "K22", "K15", "P15", "K6", "D10", "E11", "E15", "F4", "J3", "K2", "M4", "R3", "T3", "S5", "Y7", "Z8", "X10",
        "X12", "AB12", "AD11", "Z17", "AF18", "AC19", "Z21", "AA23", "T26", "X26", "AD26", "AF27", "Z30"
      ],
      "mushroomPatch"
    ),

    // Ağaç dipleri / kuş yuvası hissi
    ...createResourceTiles(
      [
        "H30", "F30", "E30", "D31", "B29", "G26", "F25", "G22", "J24", "O26", "M24", "L21", "M19", "I19", "G17",  "H15", "J15", "O14", "L5", "I3", "F5", 
      ],
      "birdNestArea"
    ),

    // Eski patika kalıntıları / insan izi
    ...createResourceTiles(
      [
        
      ],
      "oldTrailTrash"
    )
  },
  lootTables: {
  trailGeneralArea: [
    { itemId: "dryLeaf", chance: 9, quantity: 1 },
    { itemId: "stick", chance: 8, quantity: 1 },
    { itemId: "pineCone", chance: 7, quantity: 1 },
    { itemId: "bark", chance: 6, quantity: 1 },
    { itemId: "dryGrass", chance: 5, quantity: 1 },
    { itemId: "insect", chance: 4, quantity: 1 },
    { itemId: "pebble", chance: 4, quantity: 1 },
    { itemId: "plantFiber", chance: 4, quantity: 1 },
    { itemId: "resin", chance: 2, quantity: 1 }
  ],

  trailPathDebris: [
    { itemId: "stick", chance: 12, quantity: 1 },
    { itemId: "dryLeaf", chance: 16, quantity: 1 },
    { itemId: "pebble", chance: 18, quantity: 1 },
    { itemId: "insect", chance: 10, quantity: 1 },
    { itemId: "feather", chance: 6, quantity: 1 }
  ],

  fallenBranchArea: [
    { itemId: "branch", chance: 35, quantity: 1 },
    { itemId: "stick", chance: 25, quantity: 1 },
    { itemId: "bark", chance: 20, quantity: 1 },
    { itemId: "dryWood", chance: 15, quantity: 1 },
    { itemId: "resin", chance: 5, quantity: 1 }
  ],

  pineForestFloor: [
    { itemId: "pineCone", chance: 35, quantity: 1 },
    { itemId: "dryLeaf", chance: 25, quantity: 1 },
    { itemId: "bark", chance: 18, quantity: 1 },
    { itemId: "resin", chance: 12, quantity: 1 }
  ],

  mushroomPatch: [
    { itemId: "mushroom", chance: 40, quantity: 1 },
    { itemId: "wildHerb", chance: 18, quantity: 1 },
    { itemId: "insect", chance: 12, quantity: 1 },
    { itemId: "dryLeaf", chance: 10, quantity: 1 }
  ],

  herbTrailEdge: [
    { itemId: "wildHerb", chance: 30, quantity: 1 },
    { itemId: "plantFiber", chance: 24, quantity: 1 },
    { itemId: "dryGrass", chance: 18, quantity: 1 },
    { itemId: "smallFlower", chance: 14, quantity: 1 },
    { itemId: "insect", chance: 6, quantity: 1 }
  ],

  birdNestArea: [
    { itemId: "feather", chance: 35, quantity: 1 },
    { itemId: "dryGrass", chance: 22, quantity: 1 },
    { itemId: "stick", chance: 18, quantity: 1 },
    { itemId: "insect", chance: 10, quantity: 1 }
  ],

  oldTrailTrash: [
    { itemId: "tinCan", chance: 18, quantity: 1 },
    { itemId: "plasticBottle", chance: 14, quantity: 1 },
    { itemId: "clothScrap", chance: 12, quantity: 1 },
    { itemId: "oldFishNet", chance: 6, quantity: 1 }
  ]
  },

  encounterTiles: {
    ...createEncounterTiles(
      [
        
      ],
      "trailSmallAnimals"
    ),

    ...createEncounterTiles(
      [
        
      ],
      "trailWildPath"
    ),

    ...createEncounterTiles(
      [
        
      ],
      "trailDangerZone"
    )
  }, 

  encounterTables: {
    trailSmallAnimals: [
      { id: "rabbit", type: "friendly", chance: 9 },
      { id: "deer", type: "friendly", chance: 4 },
      { id: "strayDog", type: "friendly", chance: 3 }
    ],

    trailWildPath: [
      { id: "rabbit", type: "friendly", chance: 6 },
      { id: "deer", type: "friendly", chance: 5 },
      { id: "wildDog", type: "enemy", chance: 5 }
    ],

    trailDangerZone: [
      { id: "wildDog", type: "enemy", chance: 10 },
      { id: "strayDog", type: "friendly", chance: 3 },
      { id: "deer", type: "friendly", chance: 2 }
    ]
  },

 exits: {
    "Q32": {
      targetMapId: "meadow",
      targetPosition: {
        x: 30,
        y: 15
      },
      label: "Meadow"
    },

    "P1": {
      targetMapId: "lake",
      targetPosition: {
        x: 0,
        y: 15
      },
      label: "Lake"
    }
 }
};
