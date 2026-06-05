const meadowMap = {
  id: "meadow",
  nameKey: "Meadow",
  width: 32,
  height: 32,

  backgroundImage: "img/maps/meadow-test.png",

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
    "AD1", "AD2", "AD3", "AD4", "AD11", "AD12", "AD13", "AD19", "AD20", "AD21", "AD22", "AD23", "AD29", "AD30", "AD31", "AD32",
    "AE1", "AE2", "AE11", "AE12", "AE13", "AE19", "AE20", "AE21", "AE22", "AE30", "AE31", "AE32",
    "AF11", "AF12", "AF13", "AF19", "AF20", "AF21", "AF22", "AF32",

  ],

  resourceTiles: {
    "D5": {
      lootTable: "meadowBush"
    },
    "E9": {
      lootTable: "dryGrassPatch"
    },
    "J6": {
      lootTable: "fallenBranch"
    },
    "M12": {
      lootTable: "wildHerbPatch"
    }
  },

  exits: {
    "AF16": {
      targetMapId: "trail",
      targetPosition: {
        x: 31,
        y: 15
      },
      label: "Trail"
    }
  }
};

const mapsDatabase = {
  meadow: meadowMap
};