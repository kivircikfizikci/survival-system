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
    ...createTileRange("A30", "C32"), "D31", "D32", "E32", "F32", ...createTileRange("D29", "F28"), "E27", "E30", "F30", "G30", ...createTileRange("A27", "A17"), "B18", "B19", "B20", 
    ...createTileRange("C19", "D21"), "D22", "D23", "E22", ...createTileRange("E20", "I21"), ...createTileRange("H22", "I27"), "G23", "F23", "G24", "G25", "B23", "B24", "B25", "C25", "C26", 
    "H28", "J29", "K28", "K27", ...createTileRange("J23", "K26"), "L24", "L25", "L26", "L27", "H32", "I31", "I32", "J32", "L31", ...createTileRange("N29", "O31"), "P32", "P31", "Q32", "Q31", 
    "R32", "P28", "P27", "Q27", ...createTileRange("T27", "T23"), ...createTileRange("U24", "U28"), "V27", "V28", "V29", "W28", "W29", "W30", "X28", "X29", "X30", "Y28", "Y29", "Y30", "Z27",
    "Z28", "Z29", "Y32", "Z31", "Z32", "AA30", "AA28", "AA27", "AB26", "AB27", "AC27", "AC26", "AC25", "AD26", "AD25", "AE25", ...createTileRange("AC21", "AF24"), "AF20", "AC20", "AB20", "AB21",
    "AB22", "AB23", "AA21", "AA20", "AA19", "Z19", "Z18", "AA18", "X20", ...createTileRange("V22", "Y24"), "Z23", "Z24", "W25", "X25", "Y25", 
    "R20", "Q19", "R19", "S19", ...createTileRange("P18", "T17"), "U17", "R16", "Q16", "S14", "U12", "X15", "Y15", "Y14", "Z13", "Z14", "Z15", "AA15", "AD18", "AD16", "AC15", "AD15", "AE15",
    ...createTileRange("AC14", "AF9"), ...createTileRange("AD8", "AF1"), "AC2", "AA5", "Z6", "AA6", "AB6", "Z7", "AA7", "AB7", "Y8", "Z8", "AA8", "X9", "Y9", "Z9", "W10", "X10", "Y10", "Z10",
    "V9", "V8", ...createTileRange("V4", "L1"), "O5", "P5", "P6", "Q5", "R5", "R6", "S5", "T5", "U5", "Q8", "Q10", "P10", "P11", "O10", "N9", "N8", "M8", "M7", "L7", "K6", "K7", "J6", "J7",
    "I5", "I6", "H5", "H6", "G5", "G6", "F4", "F5", "F6", "E4", "E5", "E6", "D3", "D4", "D5", ...createTileRange("C1", "A4"), ...createTileRange("E1", "K1"), "J2", "K2", "I3", "J3", "K3", 
    "J4", "K4", "N6", "N10", "M11", "M12", "N12", "N14", "M14", "M15", "L15", "L14", "L13", "K15", "K14", "K13", "K12", "J13", "J12", "J11", "I12", "I11", "I10", "I9",
    "H12", "H11", "H10", "H9", "G11", "G10", "F11", "F10", "E8", "E9", "E10", "E12", "D11", "D12", "C9", "C10", "C11", "B9", "B10", "A8", "A9", "C12", "C13", "B13",
    "A15", "B15", "C15", "C16", "D16", "E16", "E17", "F16", "F17", "G17", "H17", "J16", "I16", "K29", "O28",
  ],

  treeTiles: [ 
    "L23", "M23", "N23", "L21", "K21", "M19", "L19", "I18", "F18", "C17", "J14", "I14", "H14", "H13", "D14", "E14", "B14", "B11", "A11", "E11", "D9", "D8", "C7", 
    "A6", "H7", "I7", "L9", "M10", "N11", "O12", "R8", "S7", "P7", "M5", "V5", "W4", "X2", "AB2", "X7", "V13", "V12", "Q14", "T20", "X17", "AC18", "AF18", "Z20", "X19", "W20", 
    "V21", "U23", "S23", "S25", "U29", "V30", "Y31", "Z30", "AB29", "AC29", "AD30", "AB31", "AE27", "AF28", "AF25", "S32", "R28", "Q28", "M30", "K31", "O32",
  ],

  resourceTiles: {
    ...createResourceTiles(
        [
          ...createTileRange("A29", "C28"), "B27", "C27", "D27", ...createTileRange("D26", "F24"), "C24", "C23", "C22", "B22", "B21", "E23", "F22", "G22", "G26", "F27", "G27", 
          "G28", "G29", "H29", "H30", "H31", "G31", "F31", "E31", "D30", "I30", "I29", "I28", "J28", "J27", "J30", "J31", "K30", "L30", "L29", "M29", "M28", "N28", "N27", "O27", 
          "O26", "P26", "P25", "Q26", "Q25", "Q24", "R23", "R22", "Q21", "P20", "O19", "O18", "O17", "N17", "N16", "M16", "L17", "K16", "K17", "K18", "J19", "I19", "J15", "I15", 
          "H15", "G15", "F15", "E15", "F14", "O16", "O15", "P15", "P14", "O14", "P13", "Q12", "R12", "R11", "S11", "S10", "R10", "S9", "T9", "T8", "U8", "V7", "V6", "W6", "X5", 
          "X4", "Y4", "Y3", "Y2", "Z2", "Z1", "R9", "Q9", "P9", "O8", "O7", "N7", "O13", "N13", "M13", "L12", "K11", "K10", "J9", "Q15", "R15", "S15", "T15", "U14", "V14", "W13", 
          "X12", "Q20", "Q21", "S22", "T21", "U20", "V20", "W19", "X18", "Y18", "R26", "R27", "S27", "S28", "S29", "T29", "T30", "U31", "V31", "V32", "W32", 
        ],
        "mountainPath"
    ),
    ...createResourceTiles(
        [
          ...createTileRange("A29", "C28"), "B27", "C27", "D27", ...createTileRange("D26", "F24"), "C24", "C23", "C22", "B22", "B21", "E23", "F22", "G22", "G26", "F27", "G27", 
          "G28", "G29", "H29", "H30", "H31", "G31", "F31", "E31", "D30", "I30", "I29", "I28", "J28", "J27",
        ],
        "mountainMinePath"
    ),
    ...createResourceTiles(
        [
          "T21", "S20", "T20", "U20", "U19", "V19", "U18", "V18", "W18", "V17", "U16", "V16", "W16", "V15", "W15", "X14", "X13", "Y13", "Z12", "V25", "V26", "W26", "W27", "X26", 
          "X27", "Y26", "Y27", "Z26", "Z25", "AA25", "AA26", "AB25", "AB24", "AA23", "AA22", "Z22", "Z21", "Y21", "Y20", "Y19", "Z17", "AA17", "AA16", "AB17", "AB16", "AC16", 
          "AB15", "AB14", "AA14", "AA13", "AA12", "AA11", "AA10", "AA9", "AB9", "AB8", "AC8", "AC7", "AC6", "AC5", "AB4", "AC3", "W9", "V10", "U10", "U11", "U13", "T13", 
        ],
        "mountainObsidianField"
    ),
    ...createResourceTiles(
        [
          "O6", "N5", "M5", "L5", "K5", "J5", "I4", "H3", "Q6", "Q7", "S6", "T6", "W3", "W2", "W1", "X1", "Y1", "AC1", "AB3", "AA3", "AA4", "Z5", "Y6", "Y7", "X8", "W8", "U9", "T10", 
          "T11", "T12", "S12", "S13", "R13", "R14", "W12", "X11", "AD17", "AE16", "AF15", "AF16", "AE17", "AE18", "AF19", "AE19", "AD19", "AC19", "AB19", "AB18", "AD20", "AE20", "X21",
          "W21", "U22", "T22", "S24", "R24", "R25", "S26", "T28", "U30", "W31", "X21", "X32", "AA29", ...createTileRange("AB28", "AF32"), "AF27", "AF26", "AE26", "AD27", "AA31", "AA32", 
        ],
        "mountainHillside"
    ),
    ...createResourceTiles(
        [ 
          "L23", "M23", "N23", "L21", "K21", "M19", "L19", "I18", "F18", "C17", "J14", "I14", "H14", "H13", "D14", "E14", "B14", "B11", "A11", "E11", "D9", "D8", "C7", 
          "A6", "H7", "I7", "L9", "M10", "N11", "O12", "R8", "S7", "P7", "M5", "V5", "W4", "X2", "AB2", "X7", "V13", "V12", "Q14", "T20", "X17", "AC18", "AF18", "Z20", "X19", "W20", 
          "V21", "U23", "S23", "S25", "U29", "V30", "Y31", "Z30", "AB29", "AC29", "AD30", "AB31", "AE27", "AF28", "AF25", "S32", "R28", "Q28", "M30", "K31", "O32",
        ],
        "mountainTrees"
    ),
  },

  lootTables: {
    mountainPath: [
      { itemId: "pebble", chance: 10, quantity: 1 },
      { itemId: "sharpStone", chance: 9, quantity: 1 },
      { itemId: "flint", chance: 8, quantity: 1 },
      { itemId: "dryLeaf", chance: 5, quantity: 1 },
      { itemId: "feather", chance: 3, quantity: 1 },
      { itemId: "rope", chance: 1, quantity: 1 },
      { itemId: "tinCan", chance: 4, quantity: 1 },
    ],
    mountainMinePath: [
      { itemId: "pebble", chance: 15, quantity: 1 },
      { itemId: "ironOre", chance: 7, quantity: 1 },
      { itemId: "copperOre", chance: 5, quantity: 1 },
      { itemId: "flint", chance: 8, quantity: 1 },
      { itemId: "stonePickaxe", chance: 1, quantity: 1 },
      { itemId: "rope", chance: 3, quantity: 1 },
      { itemId: "salt", chance: 2, quantity: 1 },
      { itemId: "coal", chance: 3, quantity: 1 },
      
    ],
    mountainObsidianField: [
      { itemId: "obsidianShard", chance: 5, quantity: 1 },
      { itemId: "sharpStone", chance: 5, quantity: 1 },
      
    ],
    mountainHillside: [
      { itemId: "pebble", chance: 5, quantity: 1 },
      { itemId: "mushroom", chance: 5, quantity: 1 },
      { itemId: "insect", chance: 5, quantity: 1 },
      { itemId: "coal", chance: 2, quantity: 1 },
      { itemId: "dryGrass", chance: 2, quantity: 1 },
      { itemId: "dryLeaf", chance: 2, quantity: 1 },
      { itemId: "feather", chance: 1, quantity: 1 },
    ],
    mountainTrees: [
      { itemId: "stick", chance: 15, quantity: 1 },
      { itemId: "branch", chance: 15, quantity: 1 },
      { itemId: "bark", chance: 8, quantity: 1 },
      { itemId: "dryWood", chance: 10, quantity: 1 },
      { itemId: "resin", chance: 1, quantity: 1 },
      { itemId: "pineCone", chance: 2, quantity: 1 },
      
      
    ],
  },

   encounterTiles: {
    ...createEncounterTiles(
      [
          ...createTileRange("A29", "C28"), "B27", "C27", "D27", ...createTileRange("D26", "F24"), "C24", "C23", "C22", "B22", "B21", "E23", "F22", "G22", "G26", "F27", "G27", 
          "G28", "G29", "H29", "H30", "H31", "G31", "F31", "E31", "D30", "I30", "I29", "I28", "J28", "J27", "J30", "J31", "K30", "L30", "L29", "M29", "M28", "N28", "N27", "O27", 
          "O26", "P26", "P25", "Q26", "Q25", "Q24", "R23", "R22", "Q21", "P20", "O19", "O18", "O17", "N17", "N16", "M16", "L17", "K16", "K17", "K18", "J19", "I19", "J15", "I15", 
          "H15", "G15", "F15", "E15", "F14", "O16", "O15", "P15", "P14", "O14", "P13", "Q12", "R12", "R11", "S11", "S10", "R10", "S9", "T9", "T8", "U8", "V7", "V6", "W6", "X5", 
          "X4", "Y4", "Y3", "Y2", "Z2", "Z1", "R9", "Q9", "P9", "O8", "O7", "N7", "O13", "N13", "M13", "L12", "K11", "K10", "J9", "Q15", "R15", "S15", "T15", "U14", "V14", "W13", 
          "X12", "Q20", "Q21", "S22", "T21", "U20", "V20", "W19", "X18", "Y18", "R26", "R27", "S27", "S28", "S29", "T29", "T30", "U31", "V31", "V32", "W32", 
      ],
      "mountainLowRisk"
    ),
    ...createEncounterTiles(
      [
        "O6", "N5", "M5", "L5", "K5", "J5", "I4", "H3", "Q6", "Q7", "S6", "T6", "W3", "W2", "W1", "X1", "Y1", "AC1", "AB3", "AA3", "AA4", "Z5", "Y6", "Y7", "X8", "W8", "U9", "T10", 
        "T11", "T12", "S12", "S13", "R13", "R14", "W12", "X11", "AD17", "AE16", "AF15", "AF16", "AE17", "AE18", "AF19", "AE19", "AD19", "AC19", "AB19", "AB18", "AD20", "AE20", "X21",
        "W21", "U22", "T22", "S24", "R24", "R25", "S26", "T28", "U30", "W31", "X21", "X32", "AA29", ...createTileRange("AB28", "AF32"), "AF27", "AF26", "AE26", "AD27", "AA31", "AA32", 

      ],
      "mountainAnimalZone"
    ),
    ...createEncounterTiles(
      [
        "L23", "M23", "N23", "L21", "K21", "M19", "L19", "I18", "F18", "C17", "J14", "I14", "H14", "H13", "D14", "E14", "B14", "B11", "A11", "E11", "D9", "D8", "C7", 
        "A6", "H7", "I7", "L9", "M10", "N11", "O12", "R8", "S7", "P7", "M5", "V5", "W4", "X2", "AB2", "X7", "V13", "V12", "Q14", "T20", "X17", "AC18", "AF18", "Z20", "X19", "W20", 
        "V21", "U23", "S23", "S25", "U29", "V30", "Y31", "Z30", "AB29", "AC29", "AD30", "AB31", "AE27", "AF28", "AF25", "S32", "R28", "Q28", "M30", "K31", "O32",

      ],
      "mountainBearZone"
    ),
    ...createEncounterTiles(
      [
        ...createTileRange("A1", "AF32"), 
      ],
      "mountainDangerZone"
    ),
  },

  encounterTables: {
    mountainLowRisk: [
      { id: "smallBird", type: "friendly", chance: 4 },
      { id: "mufflon", type: "friendly", chance: 1 },
      { id: "snake", type: "enemy", chance: 2 },
      
    ],
    mountainAnimalZone: [
      { id: "mufflon", type: "friendly", chance: 9 },
      { id: "smallBird", type: "friendly", chance: 4 },
      { id: "snake", type: "enemy", chance: 3 },
      { id: "wolf", type: "enemy", chance: 1 },
    ],
    mountainBearZone: [
      { id: "bear", type: "enemy", chance: 7 }
    ],
    mountainDangerZone: [
      { id: "wolf", type: "enemy", chance: 1 },
      { id: "bear", type: "enemy", chance: 1 },
      { id: "snake", type: "enemy", chance: 2 },
      { id: "mufflon", type: "friendly", chance: 2 },
      { id: "smallBird", type: "friendly", chance: 4 },
    ],
  },

 exits: {
    "A29": {
      targetMapId: "lake",
      targetPosition: {
        x: 30,
        y: 0
      },
      label: "Lake"
    },

    "B26": {
      targetMapId: "mine1",
      targetPosition: {
        x: 0,
        y: 15
      },
      label: "Mine"
    },

    "B21": {
      targetMapId: "mine2",
      targetPosition: {
        x: 15,
        y: 15
      },
      label: "Mine"
    },

    "F24": {
      targetMapId: "mine3",
      targetPosition: {
        x: 15,
        y: 31
      },
      label: "Mine"
    },

    "J27": {
      targetMapId: "mine4",
      targetPosition: {
        x: 15,
        y: 31
      },
      label: "Mine"
    },

    /** "Z1": {
      targetMapId: "mistyHills",
      targetPosition: {
        x: 1,
        y: 1
      },
      label: "Misty Hills"
    },*/
 }
};