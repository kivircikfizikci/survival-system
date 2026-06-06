const trailMap = {
  id: "trail",
  nameKey: "Trail",
  width: 32,
  height: 32,

  backgroundImage: "img/maps/trail-map.png",

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
      ["P29"],
      "fallenBranch"
    ),

    ...createResourceTiles(
      ["M29", "J29", "D27", "G24"],
      "mushroomPatch"
    ),

    ...createResourceTiles(
      ["K30"],
      "wildHerbPatch"
    ),

    ...createResourceTiles(
        [ "S24", "S25", "S26", "R21", "O18", "O19", "Q13", "O10", "O9", "N9", "N10", "O8", "R5", "R6", "Q4", "Q3", "P3",
            ...createTileRange("Q21", "Q31"), ...createTileRange("R24", "R31"), ...createTileRange("P18", "P21"), ...createTileRange("Q14", "R17"), ...createTileRange("O11", "P13"), 
            ...createTileRange("P5", "Q8"), 
        ],
       "pebblePatch"
    )
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
  },

  lootTables: {
    fallenBranch: [
      { itemId: "stick", chance: 35, quantity: 1 },
      { itemId: "branch", chance: 25, quantity: 1 },
      { itemId: "bark", chance: 20, quantity: 1 },
      { itemId: "resin", chance: 10, quantity: 1 }
    ],

    mushroomPatch: [
      { itemId: "mushroom", chance: 30, quantity: 1 },
      { itemId: "wildHerb", chance: 10, quantity: 1 }
    ],

    wildHerbPatch: [
      { itemId: "wildHerb", chance: 25, quantity: 1 },
      { itemId: "smallFlower", chance: 15, quantity: 1 }
    ],

    pebblePatch: [
        { itemId: "pebble", chance: 25, quantity: 1 },
    ]
  }
};