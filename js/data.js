const itemsDatabase = {
  blackberry: {
    id: "blackberry",
    nameKey: "blackberry",
    type: "usable",
    category: "food",
    imageSrc: "img/blackberry.png",
    weight: 0.05,
    maxStack: 64,
    hungerRestore: 8
  },
  pebble: {
    id: "pebble",
    nameKey: "pebble",
    type: "material",
    category: "natural",
    imageSrc: "img/pebble.png",
    weight: 0.2,
    maxStack: 4,
  },
  dryWood: {
    id: "dryWood",
    nameKey: "dryWood",
    type: "material",
    category: "natural",
    imageSrc: "img/dryWood.png",
    weight: 0.7,
    maxStack: 1
  },
  insect: {
    id: "insect",
    nameKey: "insect",
    type: "material",
    category: "natural",
    imageSrc: "img/insect.png",
    weight: 0.1,
    maxStack: 16 
  },
  reed: {
    id: "reed",
    nameKey: "reed",
    type: "material",
    category: "natural",
    imageSrc: "img/reed.png",
    weight: 0.2,
    maxStack: 4
  },
  sharpStone: {
    id: "sharpStone",
    nameKey: "sharpStone",
    type: "material",
    category: "natural",
    imageSrc: "img/sharpStone.png",
    weight: 0.4,
    maxStack: 8
  },
  fish: {
    id: "fish",
    nameKey: "fish",
    type: "usable",
    category: "food",
    imageSrc: "img/fish.png",
    weight: 0.5,
    maxStack: 1,
    hungerRestore: 20
  },
  freshWater: {
    id: "freshWater",
    nameKey: "freshWater",
    type: "usable",
    category: "food",
    imageSrc: "img/freshWater.png",
    weight: 0.5,
    maxStack: 1,
    hungerRestore: 2
  },
  frog: {
    id: "frog",
    nameKey: "frog",
    type: "usable",
    category: "food",
    imageSrc: "img/frog.png",
    weight: 0.2,
    maxStack: 3,
    hungerRestore: 12
  },
  clay: {
    id: "clay",
    nameKey: "clay",
    type: "material",
    category: "natural",
    imageSrc: "img/clay.png",
    weight: 0.3,
    maxStack: 4
  },
  branch: {
    id: "branch",
    nameKey: "branch",
    type: "material",
    category: "natural",
    imageSrc: "img/branch.png",
    weight: 1,
    maxStack: 2
   },
  mushroom: {
    id: "mushroom",
    nameKey: "mushroom",
    type: "usable",
    category: "food",
    imageSrc: "img/mushroom.png",
    weight: 0.1,
    maxStack: 16,
    hungerRestore: 5
  },
  rope: {
    id: "rope",
    nameKey: "rope",
    type: "material",
    category: "natural",
    imageSrc: "img/rope.png",
    weight: 1.5,
    maxStack: 1
  },
  pebble: {
    id: "pebble",
    nameKey: "pebble",
    type: "material",
    category: "natural",
    imageSrc: "img/pebble.png",
    weight: 0.2,
    maxStack: 4
  },
  dryGrass: {
    id: "dryGrass",
    nameKey: "dryGrass",
    type: "material",
    category: "natural",
    imageSrc: "img/dryGrass.png",
    weight: 0.1,
    maxStack: 32
  },
  ironOre: {
    id: "ironOre",
    nameKey: "ironOre",
    type: "material",
    category: "resource",
    imageSrc: "img/ironOre.png",
    weight: 2,
    maxStack: 1
  },
  coal: {
    id: "coal",
    nameKey: "coal",
    type: "material",
    category: "resource",
    imageSrc: "img/coal.png",
    weight: 1,
    maxStack: 2
  },
  oldPants: {
    id: "oldPants",
    nameKey: "oldPants",
    type: "clothing",
    category: "clothing",
    equipSlot: "legs",
    imageSrc: "img/oldPants.png",
    weight: 0.8,
    maxStack: 1,
    extraSlots: 4,
    extraWeight: 4
  },
  cargoPants: {
    id: "cargoPants",
    nameKey: "cargoPants",
    type: "clothing",
    category: "clothing",
    equipSlot: "legs",
    imageSrc: "img/cargoPants.png",
    weight: 1,
    maxStack: 1,
    extraSlots: 6,
    extraWeight: 5
  },
  shorts: {
    id: "shorts",
    nameKey: "shorts",
    type: "clothing",
    category: "clothing",
    equipSlot: "legs",
    imageSrc: "img/shorts.png",
    weight: 0.5,
    maxStack: 1,
    extraSlots: 2,
    extraWeight: 1
  },
  sandals: {
    id: "sandals",
    nameKey: "sandals",
    type: "clothing",
    category: "clothing",
    equipSlot: "feet",
    imageSrc: "img/sandals.png",
    weight: 0.3,
    maxStack: 1,
    extraSlots: 0,
    extraWeight: 0
  },
  sneakers: {
    id: "sneakers",
    nameKey: "sneakers",
    type: "clothing",
    category: "clothing",
    equipSlot: "feet",
    imageSrc: "img/sneakers.png",
    weight: 0.7,
    maxStack: 1,
    extraSlots: 0,
    extraWeight: 1
  },
  workBoots: {
    id: "workBoots",
    nameKey: "workBoots",
    type: "clothing",
    category: "clothing",
    equipSlot: "feet",
    imageSrc: "img/workBoots.png",
    weight: 1.5,
    maxStack: 1,
    extraSlots: 0,
    extraWeight: 3
  },
  oldJacket: {
    id: "oldJacket",
    nameKey: "oldJacket",
    type: "clothing",
    category: "clothing",
    equipSlot: "vest",
    imageSrc: "img/oldJacket.png",
    weight: 1.2,
    maxStack: 1,
    extraSlots: 2,
    extraWeight: 2
  },
  leatherJacket: {
    id: "leatherJacket",
    nameKey: "leatherJacket",
    type: "clothing",
    category: "clothing",
    equipSlot: "vest",
    imageSrc: "img/leatherJacket.png",
    weight: 1.5,
    maxStack: 1,
    extraSlots: 3,
    extraWeight: 3
  },
  fingerlessGloves: {
    id: "fingerlessGloves",
    nameKey: "fingerlessGloves",
    type: "clothing",
    category: "clothing",
    equipSlot: "hands",
    imageSrc: "img/fingerlessGloves.png",
    weight: 0.3,
    maxStack: 1,
    extraSlots: 0,
    extraWeight: 1
  },
  winterGloves: {
    id: "winterGloves",
    nameKey: "winterGloves",
    type: "clothing",
    category: "clothing",
    equipSlot: "hands",
    imageSrc: "img/winterGloves.png",
    weight: 0.5,
    maxStack: 1,
    extraSlots: 0,
    extraWeight: 0
  },
  oldHat: {
    id: "oldHat",
    nameKey: "oldHat",
    type: "clothing",
    category: "clothing",
    equipSlot: "head",
    imageSrc: "img/oldHat.png",
    weight: 0.2,
    maxStack: 1,
    extraSlots: 0,
    extraWeight: 0
  },
  tshirt: {
    id: "tshirt",
    nameKey: "tshirt",
    type: "clothing",
    category: "clothing",
    equipSlot: "torso",
    imageSrc: "img/tshirt.png",
    weight: 0.3,
    maxStack: 1,
    extraSlots: 0,
    extraWeight: 0
  },
  hoodie: {
    id: "hoodie",
    nameKey: "hoodie",
    type: "clothing",
    category: "clothing",
    equipSlot: "torso",
    imageSrc: "img/hoodie.png",
    weight: 0.7,
    maxStack: 1,
    extraSlots: 1,
    extraWeight: 1
  },
  wornShoes: {
    id: "wornShoes",
    nameKey: "wornShoes",
    type: "clothing",
    category: "clothing",
    equipSlot: "feet",
    imageSrc: "img/wornShoes.png",
    weight: 0.5,
    maxStack: 1,
    extraSlots: 0,
    extraWeight: 0
  },
  schoolBag: {
    id: "schoolBag",
    nameKey: "schoolBag",
    type: "bag",
    category: "bag",
    equipSlot: "bag",
    imageSrc: "img/schoolBag.png",
    weight: 0.8,
    maxStack: 1,
    extraSlots: 6,
    extraWeight: 4
  },
  hikingBag: {
    id: "hikingBag",
    nameKey: "hikingBag",
    type: "bag",
    category: "bag",
    equipSlot: "bag",
    imageSrc: "img/hikingBag.png",
    weight: 2,
    maxStack: 1,
    extraSlots: 14,
    extraWeight: 12
  },
  militaryBag: {
    id: "militaryBag",
    nameKey: "militaryBag",
    type: "bag",
    category: "bag",
    equipSlot: "bag",
    imageSrc: "img/militaryBag.png",
    weight: 1.5,
    maxStack: 1,
    extraSlots: 10,
    extraWeight: 8
  },
  bandage: {
    id: "bandage",
    nameKey: "bandage",
    type: "usable",
    category: "medical",
    imageSrc: "img/bandage.png",
    weight: 0.2,
    maxStack: 8,
    healAmount: 15
  },
  dirtyBandage: {
    id: "dirtyBandage",
    nameKey: "dirtyBandage",
    type: "usable",
    category: "medical",
    imageSrc: "img/dirtyBandage.png",
    weight: 0.15,
    maxStack: 5,
    healAmount: 8
  },
  sterileBandage: {
    id: "sterileBandage",
    nameKey: "sterileBandage",
    type: "usable",
    category: "medical",
    imageSrc: "img/sterileBandage.png",
    weight: 0.2,
    maxStack: 6,
    healAmount: 25
  },
  herbalPaste: {
    id: "herbalPaste",
    nameKey: "herbalPaste",
    type: "usable",
    category: "medical",
    imageSrc: "img/herbalPaste.png",
    weight: 0.25,
    maxStack: 5,
    healAmount: 12
  },
  stoneAxe: {
    id: "stoneAxe",
    nameKey: "stoneAxe",
    type: "tool",
    category: "tool",
    imageSrc: "img/stoneAxe.png",
    weight: 1,
    maxStack: 1,
    damage: 8,
    durability: 40
  },
  stonePickaxe: {
    id: "stonePickaxe",
    nameKey: "stonePickaxe",
    type: "tool",
    category: "tool",
    imageSrc: "img/stonePickaxe.png",
    weight: 1.2,
    maxStack: 1,
    damage: 10,
    durability: 35
  },
  stoneKnife: {
    id: "stoneKnife",
    nameKey: "stoneKnife",
    type: "tool",
    category: "tool",
    imageSrc: "img/stoneKnife.png",
    weight: 0.5,
    maxStack: 1,
    damage: 6,
    durability: 30
  },
  stoneShovel: {
    id: "stoneShovel",
    nameKey: "stoneShovel",
    type: "tool",
    category: "tool",
    imageSrc: "img/stoneShovel.png",
    weight: 1.5,
    maxStack: 1,
    damage: 5,
    durability: 45
  },
  woodenSpear: {
    id: "woodenSpear",
    nameKey: "woodenSpear",
    type: "weapon",
    category: "weapon",
    imageSrc: "img/woodenSpear.png",
    weight: 1.2,
    maxStack: 1,
    damage: 10,
    durability: 25
  },
  clothScrap: {
    id: "clothScrap",
    nameKey: "clothScrap",
    type: "material",
    category: "material",
    imageSrc: "img/clothScrap.png",
    weight: 0.1,
    maxStack: 16
  },
  stick: {
    id: "stick",
    nameKey: "stick",
    type: "material",
    category: "natural",
    imageSrc: "img/stick.png",
    weight: 0.5,
    maxStack: 8
  },
  wildHerb: {
    id: "wildHerb",
    nameKey: "wildHerb",
    type: "material",
    category: "medical",
    imageSrc: "img/wildHerb.png",
    weight: 0.05,
    maxStack: 16
  },
  plantFiber: {
    id: "plantFiber",
    nameKey: "plantFiber",
    type: "material",
    category: "natural",
    imageSrc: "img/plantFiber.png",
    weight: 0.03,
    maxStack: 32
  },
  smallFlower: {
    id: "smallFlower",
    nameKey: "smallFlower",
    type: "material",
    category: "natural",
    imageSrc: "img/smallFlower.png",
    weight: 0.02,
    maxStack: 32
  },
  bark: {
    id: "bark",
    nameKey: "bark",
    type: "material",
    category: "natural",
    imageSrc: "img/bark.png",
    weight: 0.1,
    maxStack: 15
  },
  pineCone: {
    id: "pineCone",
    nameKey: "pineCone",
    type: "material",
    category: "natural",
    imageSrc: "img/pineCone.png",
    weight: 0.08,
    maxStack: 20
  },
  feather: {
    id: "feather",
    nameKey: "feather",
    type: "material",
    category: "natural",
    imageSrc: "img/feather.png",
    weight: 0.01,
    maxStack: 64
  },
  flint: {
    id: "flint",
    nameKey: "flint",
    type: "material",
    category: "resource",
    imageSrc: "img/flint.png",
    weight: 0.25,
    maxStack: 12
  },
  copperOre: {
    id: "copperOre",
    nameKey: "copperOre",
    type: "material",
    category: "resource",
    imageSrc: "img/copperOre.png",
    weight: 1.0,
    maxStack: 1
  },
  salt: {
    id: "salt",
    nameKey: "salt",
    type: "material",
    category: "resource",
    imageSrc: "img/salt.png",
    weight: 0.5,
    maxStack: 8
  },
  oldFishNet: {
    id: "oldFishNet",
    nameKey: "oldFishNet",
    type: "tool",
    category: "tool",
    imageSrc: "img/oldFishNet.png",
    weight: 0.8,
    maxStack: 1
  },
  honeycomb: {
    id: "honeycomb",
    nameKey: "honeycomb",
    type: "usable",
    category: "food",
    imageSrc: "img/honeycomb.png",
    weight: 0.15,
    maxStack: 4,
    hungerRestore: 10
  },
  dryLeaf: {
    id: "dryLeaf",
    nameKey: "dryLeaf",
    type: "material",
    category: "natural",
    imageSrc: "img/dryLeaf.png",
    weight: 0.02,
    maxStack: 64
  },
  resin: {
    id: "resin",
    nameKey: "resin",
    type: "material",
    category: "natural",
    imageSrc: "img/resin.png",
    weight: 0.1,
    maxStack: 8
  },
  animalBone: {
    id: "animalBone",
    nameKey: "animalBone",
    type: "material",
    category: "natural",
    imageSrc: "img/animalBone.png",
    weight: 0.3,
    maxStack: 4
  },
  obsidianShard: {
    id: "obsidianShard",
    nameKey: "obsidianShard",
    type: "material",
    category: "resource",
    imageSrc: "img/obsidianShard.png",
    weight: 0.35,
    maxStack: 6
  },
  plasticBottle: {
    id: "plasticBottle",
    nameKey: "plasticBottle",
    type: "material",
    category: "container",
    imageSrc: "img/plasticBottle.png",
    weight: 0.25,
    maxStack: 1
  },
  tinCan: {
    id: "tinCan",
    nameKey: "tinCan",
    type: "material",
    category: "container",
    imageSrc: "img/tinCan.png",
    weight: 0.18,
    maxStack: 8
  },
  worm: {
    id: "worm",
    nameKey: "worm",
    type: "material",
    category: "natural",
    imageSrc: "img/worm.png",
    weight: 0.02,
    maxStack: 16
  },
  snail: {
    id: "snail",
    nameKey: "snail",
    type: "material",
    category: "natural",
    imageSrc: "img/snail.png",
    weight: 0.06,
    maxStack: 12
  }
};

const areasDatabase = {
  meadow: {
    nameKey: "meadow",
    loot: [
      { itemId: "blackberry", chance: 25 },
      { itemId: "insect", chance: 20 },
      { itemId: "dryGrass", chance: 20 },
      { itemId: "pebble", chance: 10 }
    ]
  },
  lake: {
    nameKey: "lake",
    loot: [
      { itemId: "fish", chance: 5 },
      { itemId: "freshWater", chance: 30 },
      { itemId: "reed", chance: 25 },
      { itemId: "frog", chance: 10 },
      { itemId: "clay", chance: 10 },
      { itemId: "pebble", chance: 10 }
      
    ]
  },
  trail: {
    nameKey: "trail",
    loot: [
      { itemId: "branch", chance: 20 },
      { itemId: "dryWood", chance: 15 },
      { itemId: "stick", chance: 20 },
      { itemId: "mushroom", chance: 15 },
      { itemId: "sharpStone", chance: 15 },
      { itemId: "pebble", chance: 10 },
      { itemId: "blackberry", chance: 15 },
      { itemId: "insect", chance: 15 }
    ]
  },
  mountain: {
    nameKey: "mountain",
    loot: [
      { itemId: "sharpStone", chance: 35 },
      { itemId: "pebble", chance: 30 },
      { itemId: "ironOre", chance: 10 },
      { itemId: "coal", chance: 10 },
      { itemId: "rope", chance: 2 }
    ]
  },
  abadonedVillage: {
    nameKey: "abadonedVillage",
    loot: [
      { itemId: "basicPants", chance: 15 },
      { itemId: "oldJacket", chance: 15 },
      { itemId: "wornShoes", chance: 15 },
      { itemId: "oldPants", chance: 10 },
      { itemId: "oldHat", chance: 5 },
      { itemId: "tshirt", chance: 20 },
      { itemId: "hoodie", chance: 10 },
      { itemId: "cargoPants", chance: 10 },
      { itemId: "shorts", chance: 10 },
      { itemId: "sandals", chance: 10 },
      { itemId: "sneakers", chance: 10 },
      { itemId: "workBoots", chance: 5 },
      { itemId: "leatherJacket", chance: 5 },
      { itemId: "fingerlessGloves", chance: 5 },
      { itemId: "winterGloves", chance: 5 },
      { itemId: "schoolBag", chance: 6 },
      { itemId: "hikingBag", chance: 2 },
      { itemId: "militaryBag", chance: 3 },
      { itemId: "rope", chance: 10 }
    ]
  }
};

const recipesDatabase = {
  rope: {
    id: "rope",
    nameKey: "rope",
    resultItemId: "rope",
    resultQuantity: 1,
    isPublic: true,
    category: "basic",
    ingredients: {
      reed: 3,
      dryGrass: 1
    }
  },
   bandage: {
    id: "bandage",
    nameKey: "bandage",
    resultItemId: "bandage",
    resultQuantity: 1,
    isPublic: true,
    category: "medical",
    ingredients: {
      clothScrap: 1,
      freshWater: 1
    }
  },
  sterileBandage: {
    id: "sterileBandage",
    nameKey: "sterileBandage",
    resultItemId: "sterileBandage",
    resultQuantity: 1,
    isPublic: false,
    category: "medical",
    ingredients: {
      clothScrap: 1,
      boiledWater: 1
    }
  },
  boiledWater: {
    id: "boiledWater",
    nameKey: "boiledWater",
    resultItemId: "boiledWater",
    resultQuantity: 1,
    isPublic: false,
    category: "natural",
    ingredients: {
      freshWater: 1,
      dryWood: 1
    }
  },
  stoneAxe: {
    id: "stoneAxe",
    nameKey: "stoneAxe",
    resultItemId: "stoneAxe",
    resultQuantity: 1,
    isPublic: false,
    category: "tools",
    ingredients: {
      branch: 2,
      sharpStone: 2,
      rope: 2
    }
  },
  stoneKnife: {
    id: "stoneKnife",
    nameKey: "stoneKnife",
    resultItemId: "stoneKnife",
    resultQuantity: 1,
    isPublic: false,
    category: "tools",
    ingredients: {
      branch: 1,
      sharpStone: 2,
      stick: 1
    }
  },
  stonePickaxe: {
    id: "stonePickaxe",
    nameKey: "stonePickaxe",
    resultItemId: "stonePickaxe",
    resultQuantity: 1,
    isPublic: false,
    category: "tools",
    ingredients: {
      branch: 2,
      sharpStone: 3,
      rope: 2
    }
  },
  stoneShovel: {
    id: "stoneShovel",
    nameKey: "stoneShovel",
    resultItemId: "stoneShovel",
    resultQuantity: 1,
    isPublic: false,
    category: "tools",
    ingredients: {
      branch: 1,
      sharpStone: 1,
      rope: 1
    }
  },
  woodenSpear: {
    id: "woodenSpear",
    nameKey: "woodenSpear",
    resultItemId: "woodenSpear",
    resultQuantity: 1,
    isPublic: false,
    category: "tools",
    ingredients: {
      branch: 2,
      sharpStone: 2,
      rope: 1
    }
  }
};