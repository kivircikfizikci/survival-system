const itemsDatabase = {
  // Basic & Natural Items
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
    maxStack: 3
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
    maxStack: 16
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
    weight: 0.4,
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
  stick: {
    id: "stick",
    nameKey: "stick",
    type: "material",
    category: "natural",
    imageSrc: "img/stick.png",
    weight: 0.5,
    maxStack: 8
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
  },
  // Resource Items
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
    maxStack: 8
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
  obsidianShard: {
    id: "obsidianShard",
    nameKey: "obsidianShard",
    type: "material",
    category: "resource",
    imageSrc: "img/obsidianShard.png",
    weight: 0.35,
    maxStack: 6
  },
  woodLog: {
    id: "woodLog",
    nameKey: "woodLog",
    type: "material",
    category: "resource",
    imageSrc: "img/woodLog.png",
    weight: 2.5,
    maxStack: 1
  },
  charcoal: {
    id: "charcoal",
    nameKey: "charcoal",
    type: "material",
    category: "resource",
    imageSrc: "img/charcoal.png",
    weight: 1.5,
    maxStack: 8
  },
  // Clothing Items
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
  // Bags and Containers
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
  leatherPouch: {
    id: "leatherPouch",
    nameKey: "leatherPouch",
    type: "bag",
    category: "bag",
    equipSlot: "bag",
    imageSrc: "img/leatherPouch.png",
    weight: 0.5,
    maxStack: 1,
    extraSlots: 4,
    extraWeight: 3
    },
  // Medical Items
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
  wildHerb: {
    id: "wildHerb",
    nameKey: "wildHerb",
    type: "material",
    category: "medical",
    imageSrc: "img/wildHerb.png",
    weight: 0.05,
    maxStack: 16
  },
  // Tools and Weapons
  stoneAxe: {
    id: "stoneAxe",
    nameKey: "stoneAxe",
    type: "tool",
    category: "tool",
    imageSrc: "img/stoneAxe.png",
    weight: 1,
    maxStack: 1,
    damage: 8,
    durability: 40,
    maxDurability: 40,
    toolTags: ["axe"],
    toolTier: "stone"
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
    durability: 35,
    maxDurability: 35,
    toolTags: ["pickaxe"],
    toolTier: "stone"
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
    durability: 30,
    maxDurability: 30,
    toolTags: ["knife"],
    toolTier: "stone"
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
    durability: 45,
    maxDurability: 45,
    toolTags: ["shovel"],
    toolTier: "stone"
  },
  stoneSpear: {
    id: "stoneSpear",
    nameKey: "stoneSpear",
    type: "weapon",
    category: "weapon",
    imageSrc: "img/stoneSpear.png",
    weight: 1.2,
    maxStack: 1,
    damage: 10,
    durability: 25,
    maxDurability: 25,
    toolTags: ["spear"],
    toolTier: "stone"
  },
  obsidianKnife: {
    id: "obsidianKnife",
    nameKey: "obsidianKnife",
    type: "tool",
    category: "tool",
    imageSrc: "img/obsidianKnife.png",
    weight: 0.6,
    maxStack: 1,
    damage: 12,
    durability: 60,
    maxDurability: 60,
    toolTags: ["knife"],
    toolTier: "obsidian"
  },
  boneSpear: {
    id: "boneSpear",
    nameKey: "boneSpear",
    type: "weapon",
    category: "weapon",
    imageSrc: "img/boneSpear.png",
    weight: 1,
    maxStack: 1,
    damage: 15,
    durability: 35,
    maxDurability: 35,
    toolTags: ["spear"],
    toolTier: "bone"
  },
  boneKnife: {
    id: "boneKnife",
    nameKey: "boneKnife",
    type: "tool",
    category: "tool",
    imageSrc: "img/boneKnife.png",
    weight: 0.2,
    maxStack: 1,
    damage: 8,
    durability: 40,
    maxDurability: 40,
    toolTags: ["knife"],
    toolTier: "bone"
  },
  boneNeedle: {
    id: "boneNeedle",
    nameKey: "boneNeedle",
    type: "tool",
    category: "tool",
    imageSrc: "img/boneNeedle.png",
    weight: 0.1,
    maxStack: 1,
    durability: 20,
    maxDurability: 20
  },
  copperPickaxe: {
    id: "copperPickaxe",
    nameKey: "copperPickaxe",
    type: "tool",
    category: "tool",
    imageSrc: "img/copperPickaxe.png",
    weight: 1.2,
    maxStack: 1,
    damage: 10,
    durability: 56,
    maxDurability: 56,
    toolTags: ["pickaxe"],
    toolTier: "copper"
  },
  copperShovel: {
    id: "copperShovel",
    nameKey: "copperShovel",
    type: "tool",
    category: "tool",
    imageSrc: "img/copperShovel.png",
    weight: 1.5,
    maxStack: 1,
    damage: 5,
    durability: 72,
    maxDurability: 72,
    toolTags: ["shovel"],
    toolTier: "copper"
  },
  copperAxe: {
    id: "copperAxe",
    nameKey: "copperAxe",
    type: "tool",
    category: "tool",
    imageSrc: "img/copperAxe.png",
    weight: 1,
    maxStack: 1,
    damage: 8,
    durability: 64,
    maxDurability: 64,
    toolTags: ["axe"],
    toolTier: "copper"
  },
  copperKnife: {
    id: "copperKnife",
    nameKey: "copperKnife",
    type: "tool",
    category: "tool",
    imageSrc: "img/copperKnife.png",
    weight: 0.6,
    maxStack: 1,
    damage: 12,
    durability: 48,
    maxDurability: 48,
    toolTags: ["knife"],
    toolTier: "copper"
  },
  copperSpear: {
    id: "copperSpear",
    nameKey: "copperSpear",
    type: "weapon",
    category: "weapon",
    imageSrc: "img/copperSpear.png",
    weight: 1.2,
    maxStack: 1,
    damage: 10,
    durability: 40,
    maxDurability: 40,
    toolTags: ["spear"],
    toolTier: "copper"
  },
  // Scrap Materials
  clothScrap: {
    id: "clothScrap",
    nameKey: "clothScrap",
    type: "material",
    category: "material",
    imageSrc: "img/clothScrap.png",
    weight: 0.1,
    maxStack: 16
  },
  leatherScrap: {
    id: "leatherScrap",
    nameKey: "leatherScrap",
    type: "material",
    category: "material",
    imageSrc: "img/leatherScrap.png",
    weight: 0.3,
    maxStack: 8
  },
  // Survival Items
  boiledWater: {
    id: "boiledWater",
    nameKey: "boiledWater",
    type: "usable",
    category: "survival",
    imageSrc: "img/boiledWater.png",
    weight: 0.5,
    maxStack: 1,
    hungerRestore: 2
  },
  fishBait: {
    id: "fishBait",
    nameKey: "fishBait",
    type: "material",
    category: "survival",
    imageSrc: "img/fishBait.png",
    weight: 0.1,
    maxStack: 16
  },
  oldFishNet: {
    id: "oldFishNet",
    nameKey: "oldFishNet",
    type: "tool",
    category: "survival",
    imageSrc: "img/oldFishNet.png",
    weight: 0.8,
    maxStack: 1
  },
  fireStarter: {
    id: "fireStarter",
    nameKey: "fireStarter",
    type: "material",
    category: "survival",
    imageSrc: "img/fireStarter.png",
    weight: 0.2,
    maxStack: 1
  },
  simpleTorch: {
    id: "simpleTorch",
    nameKey: "simpleTorch",
    type: "tool",
    category: "survival",
    imageSrc: "img/simpleTorch.png",
    weight: 0.3,
    maxStack: 1
  },
  // Cooked Food
  cookedFish: {
    id: "cookedFish",
    nameKey: "cookedFish",
    type: "usable",
    category: "food",
    imageSrc: "img/cookedFish.png",
    weight: 0.4,
    maxStack: 4,
    hungerRestore: 20
  },
  cookedFrog: {
    id: "cookedFrog",
    nameKey: "cookedFrog",
    type: "usable",
    category: "food",
    imageSrc: "img/cookedFrog.png",
    weight: 0.3,
    maxStack: 4,
    hungerRestore: 15
  },
  cookedMushroom: {
    id: "cookedMushroom",
    nameKey: "cookedMushroom",
    type: "usable",
    category: "food",
    imageSrc: "img/cookedMushroom.png",
    weight: 0.2,
    maxStack: 4,
    hungerRestore: 10
  },
  cookedSnail: {
    id: "cookedSnail",
    nameKey: "cookedSnail",
    type: "usable",
    category: "food",
    imageSrc: "img/cookedSnail.png",
    weight: 0.1,
    maxStack: 4,
    hungerRestore: 8
  },
  // Smelting Items
  clayPickaxeMold: {
    id: "clayPickaxeMold",
    nameKey: "clayPickaxeMold",
    type: "material",
    category: "smelting",
    imageSrc: "img/clayPickaxeMold.png",
    weight: 0.5,
    maxStack: 1
  },
  clayShovelMold: {
    id: "clayShovelMold",
    nameKey: "clayShovelMold",
    type: "material",
    category: "smelting",
    imageSrc: "img/clayShovelMold.png",
    weight: 0.5,
    maxStack: 1
  },
  clayAxeMold: {
    id: "clayAxeMold",
    nameKey: "clayAxeMold",
    type: "material",
    category: "smelting",
    imageSrc: "img/clayAxeMold.png",
    weight: 0.5,
    maxStack: 1
  },
  clayKnifeMold: {
    id: "clayKnifeMold",
    nameKey: "clayKnifeMold",
    type: "material",
    category: "smelting",
    imageSrc: "img/clayKnifeMold.png",
    weight: 0.5,
    maxStack: 1
  },
  claySpearMold: {
    id: "claySpearMold",
    nameKey: "claySpearMold",
    type: "material",
    category: "smelting",
    imageSrc: "img/claySpearMold.png",
    weight: 0.5,
    maxStack: 1
  },
  copperPickaxeHead: {
    id: "copperPickaxeHead",
    nameKey: "copperPickaxeHead",
    type: "material",
    category: "smelting",
    imageSrc: "img/copperPickaxeHead.png",
    weight: 0.5,
    maxStack: 1
  },
  copperAxeHead: {
    id: "copperAxeHead",
    nameKey: "copperAxeHead",
    type: "material",
    category: "smelting",
    imageSrc: "img/copperAxeHead.png",
    weight: 0.5,
    maxStack: 1
  },
  copperShovelHead: {
    id: "copperShovelHead",
    nameKey: "copperShovelHead",
    type: "material",
    category: "smelting",
    imageSrc: "img/copperShovelHead.png",
    weight: 0.5,
    maxStack: 1
  },
  copperKnifeBlade: {
    id: "copperKnifeBlade",
    nameKey: "copperKnifeBlade",
    type: "material",
    category: "smelting",
    imageSrc: "img/copperKnifeBlade.png",
    weight: 0.5,
    maxStack: 1
  },
  copperSpearHead: {
    id: "copperSpearHead",
    nameKey: "copperSpearHead",
    type: "material",
    category: "smelting",
    imageSrc: "img/copperSpearHead.png",
    weight: 0.5,
    maxStack: 1
  },
};

const areasDatabase = {
  meadow: {
    nameKey: "meadow",
    loot: [
      { itemId: "dryGrass", chance: 35 },
      { itemId: "plantFiber", chance: 30 },
      { itemId: "blackberry", chance: 25 },
      { itemId: "insect", chance: 20 },
      { itemId: "dryLeaf", chance: 20 },
      { itemId: "pebble", chance: 15 },
      { itemId: "wildHerb", chance: 10 },
      { itemId: "smallFlower", chance: 15 },
      { itemId: "honeycomb", chance: 5 }
    ]
  },
  lake: {
    nameKey: "lake",
    loot: [
      { itemId: "freshWater", chance: 35 },
      { itemId: "reed", chance: 30 },
      { itemId: "clay", chance: 98, requiredToolGroups: "shovel", toolDurabilityCost: 1 },
      { itemId: "pebble", chance: 15 },
      { itemId: "frog", chance: 12 },
      { itemId: "fish", chance: 8 },
      { itemId: "oldFishNet", chance: 5 },
      { itemId: "plasticBottle", chance: 5 },
      { itemId: "worm", chance: 10, requiredToolGroups: "shovel", toolDurabilityCost: 1 },
      { itemId: "snail", chance: 10 }
    ]
  },
  trail: {
    nameKey: "trail",
    loot: [
      { itemId: "stick", chance: 35 },
      { itemId: "branch", chance: 28 },
      { itemId: "dryWood", chance: 22 },
      { itemId: "dryLeaf", chance: 20 },
      { itemId: "bark", chance: 18 },
      { itemId: "pebble", chance: 15 },
      { itemId: "mushroom", chance: 12 },
      { itemId: "sharpStone", chance: 10 },
      { itemId: "blackberry", chance: 10 },
      { itemId: "insect", chance: 10 },
      { itemId: "woodLog", chance: 10, requiredToolGroups: "axe", toolDurabilityCost: 1 },
      { itemId: "pineCone", chance: 15 },
      { itemId: "resin", chance: 6 },
      { itemId: "animalBone", chance: 5 },
      { itemId: "feather", chance: 5 }
    ]
  },
  mountain: {
    nameKey: "mountain",
    loot: [
      { itemId: "pebble", chance: 35 },
      { itemId: "sharpStone", chance: 30 },
      { itemId: "flint", chance: 18 },
      { itemId: "salt", chance: 10, requiredToolGroups: "shovel", toolDurabilityCost: 1 },
      { itemId: "obsidianShard", chance: 8, requiredToolGroups: "pickaxe", toolDurabilityCost: 1 },
      { itemId: "coal", chance: 14, requiredToolGroups: "pickaxe", toolDurabilityCost: 1 },
      { itemId: "ironOre", chance: 6, requiredToolGroups: "pickaxe", toolDurabilityCost: 2 },
      { itemId: "copperOre", chance: 5, requiredToolGroups: "pickaxe", toolDurabilityCost: 2 },
      { itemId: "rope", chance: 2 }
    ]
  },
  abandonedVillage: {
    nameKey: "abandonedVillage",
    loot: [
      { itemId: "tshirt", chance: 22 },
      { itemId: "wornShoes", chance: 18 },
      { itemId: "oldJacket", chance: 14 },
      { itemId: "oldPants", chance: 12 },
      { itemId: "clothScrap", chance: 12 },
      { itemId: "tinCan", chance: 12 },
      { itemId: "plasticBottle", chance: 10 },
      { itemId: "hoodie", chance: 8 },
      { itemId: "shorts", chance: 8 },
      { itemId: "sandals", chance: 8 },
      { itemId: "sneakers", chance: 7 },
      { itemId: "oldHat", chance: 6 },
      { itemId: "fingerlessGloves", chance: 5 },
      { itemId: "rope", chance: 10 },
      { itemId: "dirtyBandage", chance: 10 },
      { itemId: "workBoots", chance: 5 },
      { itemId: "leatherJacket", chance: 5 },
      { itemId: "winterGloves", chance: 6 },
      { itemId: "schoolBag", chance: 3 },
      { itemId: "cargoPants", chance: 8 },
      { itemId: "hikingBag", chance: 1 },
      { itemId: "militaryBag", chance: 2 }
    ]
  }
};

const recipeDiscoveryRules = {
  wildHerb: ["herbalPasteFromFlower"],
  honeycomb: ["herbalPasteFromHoneycomb"],
  dryWood: ["boiledWater"],
  sharpStone: ["stoneKnife", "stoneAxe", "stoneShovel", "stoneSpear", "stonePickaxe"],
  boiledWater: ["sterileBandage"],
  obsidianShard: ["obsidianKnife"],
  leatherScrap: ["leatherPouch"],
  animalBone: ["boneSpear", "boneKnife", "boneNeedle"],
  clay: ["clayPickaxeMold", "clayShovelMold", "clayAxeMold", "claySpearMold", "clayKnifeMold"],
  clayPickaxeMold: ["copperPickaxeHead"],
  clayShovelMold: ["copperShovelHead"],
  clayAxeMold: ["copperAxeHead"],
  claySpearMold: ["copperSpearHead"],
  clayKnifeMold: ["copperKnifeBlade"],
  copperPickaxeHead: ["copperPickaxe"],
  copperShovelHead: ["copperShovel"],
  copperSpearHead: ["copperSpear"],
  copperAxeHead: ["copperAxe"],
  copperKnifeBlade: ["copperKnife"]
};

const toolGroups = {
  knife: ["stoneKnife", "boneKnife", "obsidianKnife", "copperKnife"],
  pickaxe: ["stonePickaxe", "copperPickaxe"],
  axe: ["stoneAxe", "copperAxe"],
  shovel: ["stoneShovel", "copperShovel"],
  spear: ["stoneSpear", "boneSpear", "copperSpear"]
};

const recipesDatabase = {
  // Basic Recipes
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
  // Medical Recipes
  dirtyBandage: {
    id: "dirtyBandage",
    nameKey: "dirtyBandage",
    resultItemId: "dirtyBandage",
    resultQuantity: 1,
    isPublic: true,
    category: "medical",
    ingredients: {
      clothScrap: 1,
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
      dirtyBandage: 1,
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
      bandage: 1,
      boiledWater: 1
    }
  },
  herbalPasteFromFlower: {
    id: "herbalPasteFromFlower",
    nameKey: "herbalPaste",
    resultItemId: "herbalPaste",
    resultQuantity: 1,
    isPublic: false,
    category: "medical",
    ingredients: {
      wildHerb: 2,
      smallFlower: 1
    }
  },
  herbalPasteFromHoneycomb: {
    id: "herbalPasteFromHoneycomb",
    nameKey: "herbalPaste",
    resultItemId: "herbalPaste",
    resultQuantity: 1,
    isPublic: false,
    category: "medical",
    ingredients: {
      wildHerb: 1,
      honeycomb: 1
    }
  },
  // Tool Recipes
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
  stoneSpear: {
    id: "stoneSpear",
    nameKey: "stoneSpear",
    resultItemId: "stoneSpear",
    resultQuantity: 1,
    isPublic: false,
    category: "tools",
    ingredients: {
      branch: 2,
      sharpStone: 2,
      rope: 1
    }
  },
  obsidianKnife: {
    id: "obsidianKnife",
    nameKey: "obsidianKnife",
    resultItemId: "obsidianKnife",
    resultQuantity: 1,
    isPublic: false,
    category: "tools",
    ingredients: {
      obsidianShard: 2,
      stick: 1,
      rope: 1
    }
  },
  boneSpear: {
    id: "boneSpear",
    nameKey: "boneSpear",
    resultItemId: "boneSpear",
    resultQuantity: 1,
    isPublic: false,
    category: "tools",
    ingredients: {
      animalBone: 1,
      branch: 1,
      rope: 1
    }
  },
  boneKnife: {
    id: "boneKnife",
    nameKey: "boneKnife",
    resultItemId: "boneKnife",
    resultQuantity: 1,
    isPublic: false,
    category: "tools",
    ingredients: {
      animalBone: 1,
      stick: 1,
      rope: 1
    }
  },
  boneNeedle: {
    id: "boneNeedle",
    nameKey: "boneNeedle",
    resultItemId: "boneNeedle",
    resultQuantity: 1,
    isPublic: false,
    category: "tools",
    ingredients: {
      animalBone: 1,
      sharpStone: 1
    }
  },
  copperAxe: {
    id: "copperAxe",
    nameKey: "copperAxe",
    resultItemId: "copperAxe",
    resultQuantity: 1,
    isPublic: false,
    category: "tools",
    ingredients: {
      branch: 2,
      rope: 2,
      copperAxeHead: 1
    }
  },
  copperKnife: {
    id: "copperKnife",
    nameKey: "copperKnife",
    resultItemId: "copperKnife",
    resultQuantity: 1,
    isPublic: false,
    category: "tools",
    ingredients: {
      stick: 1,
      rope: 1,
      copperKnifeBlade: 1
    }
  },
  copperPickaxe: {
    id: "copperPickaxe",
    nameKey: "copperPickaxe",
    resultItemId: "copperPickaxe",
    resultQuantity: 1,
    isPublic: false,
    category: "tools",
    ingredients: {
      branch: 2,
      rope: 2,
      copperPickaxeHead: 1
    }
  },
  copperShovel: {
    id: "copperShovel",
    nameKey: "copperShovel",
    resultItemId: "copperShovel",
    resultQuantity: 1,
    isPublic: false,
    category: "tools",
    ingredients: {
      branch: 1,
      rope: 1,
      copperShovelHead: 1
    }
  },
  copperSpear: {
    id: "copperSpear",
    nameKey: "copperSpear",
    resultItemId: "copperSpear",
    resultQuantity: 1,
    isPublic: false,
    category: "tools",
    ingredients: {
      branch: 2,
      rope: 1,
      copperSpearHead: 1
    }
  },
  // Survival Recipes
  boiledWater: {
    id: "boiledWater",
    nameKey: "boiledWater",
    resultItemId: "boiledWater",
    resultQuantity: 1,
    isPublic: false,
    category: "survival",
    ingredients: {
      freshWater: 1,
      dryWood: 1
    }
  },
  fishBait: {
    id: "fishBait",
    nameKey: "fishBait",
    resultItemId: "fishBait",
    resultQuantity: 1,
    isPublic: true,
    category: "survival",
    ingredients: {
      worm: 1,
      insect: 1
    }
  },
  fireStarterFromResin: {
    id: "fireStarterFromResin",
    nameKey: "fireStarter",
    resultItemId: "fireStarter",
    resultQuantity: 1,
    isPublic: true,
    category: "survival",
    ingredients: {
      dryLeaf: 2,
      dryGrass: 2,
      resin: 1
    }
  },
  fireStarterFromPineCone: {
    id: "fireStarterFromPineCone",
    nameKey: "fireStarter",
    resultItemId: "fireStarter",
    resultQuantity: 1,
    isPublic: true,
    category: "survival",
    ingredients: {
      pineCone: 1,
      dryLeaf: 2
    }
  },
  simpleTorch: {
    id: "simpleTorch",
    nameKey: "simpleTorch",
    resultItemId: "simpleTorch",
    resultQuantity: 1,
    isPublic: true,
    category: "survival",
    ingredients: {
      stick: 1,
      dryLeaf: 3,
      resin: 1
    }
  },
  charcoal: {
    id: "charcoal",
    nameKey: "charcoal",
    resultItemId: "charcoal",
    resultQuantity: 1,
    isPublic: true,
    category: "survival",
    ingredients: {
      woodLog: 2,
      dryGrass: 4,
      fireStarter: 1
    }
  },
  // Cooking Recipes
  cookedFish: {
    id: "cookedFish",
    nameKey: "cookedFish",
    resultItemId: "cookedFish",
    resultQuantity: 1,
    isPublic: true,
    category: "cooking",
    ingredients: {
      fish: 1,
      dryWood: 1,
      fireStarter: 1
    }
  },
  cookedFrog: {
    id: "cookedFrog",
    nameKey: "cookedFrog",
    resultItemId: "cookedFrog",
    resultQuantity: 1,
    isPublic: true,
    category: "cooking",
    ingredients: {
      frog: 1,
      dryWood: 1,
      fireStarter: 1
    }
  },
  cookedMushroom: {
    id: "cookedMushroom",
    nameKey: "cookedMushroom",
    resultItemId: "cookedMushroom",
    resultQuantity: 1,
    isPublic: true,
    category: "cooking",
    ingredients: {
      mushroom: 1,
      dryWood: 1,
      fireStarter: 1
    }
  },
  cookedSnail: {
    id: "cookedSnail",
    nameKey: "cookedSnail",
    resultItemId: "cookedSnail",
    resultQuantity: 1,
    isPublic: true,
    category: "cooking",
    ingredients: {
      snail: 1,
      dryWood: 1,
      fireStarter: 1
    }
  },
  // Clothing to Scrap Recipes
  oldPantsToClothScrap: {
    id: "oldPantsToClothScrap",
    nameKey: "clothScrap",
    resultItemId: "clothScrap",
    resultQuantity: 3,
    isPublic: true,
    category: "clothing",
    ingredients: {
      oldPants: 1
    },
    requiredToolGroups: {
      knife: 1
    },
    toolDurabilityCost: {
      knife: 1
    }
  },
  oldJacketToClothScrap: {
    id: "oldJacketToClothScrap",
    nameKey: "clothScrap",
    resultItemId: "clothScrap",
    resultQuantity: 4,
    isPublic: true,
    category: "clothing",
    ingredients: {
      oldJacket: 1
    },
    requiredToolGroups: {
      knife: 1
    },
    toolDurabilityCost: {
      knife: 1
    }
  },
  wornShoesToLeatherScrap: {
    id: "wornShoesToLeatherScrap",
    nameKey: "leatherScrap",
    resultItemId: "leatherScrap",
    resultQuantity: 2,
    isPublic: true,
    category: "clothing",
    ingredients: {
      wornShoes: 1
    },
    requiredToolGroups: {
      knife: 1
    },
    toolDurabilityCost: {
      knife: 4
    }
  },
  cargoPantsToClothScrap: {
    id: "cargoPantsToClothScrap",
    nameKey: "clothScrap",
    resultItemId: "clothScrap",
    resultQuantity: 5,
    isPublic: true,
    category: "clothing",
    ingredients: {
      cargoPants: 1
    },
    requiredToolGroups: {
      knife: 1
    },
    toolDurabilityCost: {
      knife: 4
    }
  },
  shortsToClothScrap: {
    id: "shortsToClothScrap",
    nameKey: "clothScrap",
    resultItemId: "clothScrap",
    resultQuantity: 2,
    isPublic: true,
    category: "clothing",
    ingredients: {
      shorts: 1
    },
    requiredToolGroups: {
      knife: 1
    },
    toolDurabilityCost: {
      knife: 1
    }
  },
  sandalsToClothScrap: {
    id: "sandalsToClothScrap",
    nameKey: "clothScrap",
    resultItemId: "clothScrap",
    resultQuantity: 1,
    isPublic: true,
    category: "clothing",
    ingredients: {
      sandals: 1
    },
    requiredToolGroups: {
      knife: 1
    },
    toolDurabilityCost: {
      knife: 2
    }
  },
  sneakersToClothScrap: {
    id: "sneakersToClothScrap",
    nameKey: "clothScrap",
    resultItemId: "clothScrap",
    resultQuantity: 1,
    isPublic: true,
    category: "clothing",
    ingredients: {
      sneakers: 1
    },
    requiredToolGroups: {
      knife: 1
    },
    toolDurabilityCost: {
      knife: 2
    }
  },
  workBootsToLeatherScrap: {
    id: "workBootsToLeatherScrap",
    nameKey: "leatherScrap",
    resultItemId: "leatherScrap",
    resultQuantity: 2,
    isPublic: true,
    category: "clothing",
    ingredients: {
      workBoots: 1
    },
    requiredToolGroups: {
      knife: 1
    },
    toolDurabilityCost: {
      knife: 4
    }
  },
  leatherJacketToLeatherScrap: {
    id: "leatherJacketToLeatherScrap",
    nameKey: "leatherScrap",
    resultItemId: "leatherScrap",
    resultQuantity: 4,
    isPublic: true,
    category: "clothing",
    ingredients: {
      leatherJacket: 1
    },
    requiredToolGroups: {
      knife: 1
    },
    toolDurabilityCost: {
      knife: 4
    }
  },
  fingerlessGlovesToLeatherScrap: {
    id: "fingerlessGlovesToLeatherScrap",
    nameKey: "leatherScrap",
    resultItemId: "leatherScrap",
    resultQuantity: 1,
    isPublic: true,
    category: "clothing",
    ingredients: {
      fingerlessGloves: 1
    },
    requiredToolGroups: {
      knife: 1
    },
    toolDurabilityCost: {
      knife: 1
    }
  },
  winterGlovesToClothScrap: {
    id: "winterGlovesToClothScrap",
    nameKey: "clothScrap",
    resultItemId: "clothScrap",
    resultQuantity: 1,
    isPublic: true,
    category: "clothing",
    ingredients: {
      winterGloves: 1
    },
    requiredToolGroups: {
      knife: 1
    },
    toolDurabilityCost: {
      knife: 1
    }
  },
  oldHatToClothScrap: {
    id: "oldHatToClothScrap",
    nameKey: "clothScrap",
    resultItemId: "clothScrap",
    resultQuantity: 2,
    isPublic: true,
    category: "clothing",
    ingredients: {
      oldHat: 1
    }, 
    requiredToolGroups: {
      knife: 1
    },
    toolDurabilityCost: {
      knife: 1
    }
  },
  tshirtToClothScrap: {
    id: "tshirtToClothScrap",
    nameKey: "clothScrap",
    resultItemId: "clothScrap",
    resultQuantity: 2,
    isPublic: true,
    category: "clothing",
    ingredients: {
      tshirt: 1
    },
    requiredToolGroups: {
      knife: 1
    },
    toolDurabilityCost: {
      knife: 1
    }
  },
  hoodieToClothScrap: {
    id: "hoodieToClothScrap",
    nameKey: "clothScrap",
    resultItemId: "clothScrap",
    resultQuantity: 4,
    isPublic: true,
    category: "clothing",
    ingredients: {
      hoodie: 1
    },
    requiredToolGroups: {
      knife: 1
    },
    toolDurabilityCost: {
      knife: 4
    }
  },
  leatherPouch: {
    id: "leatherPouch",
    nameKey: "leatherPouch",
    resultItemId: "leatherPouch",
    resultQuantity: 1,
    isPublic: false,
    category: "survival",
    ingredients: {
      leatherScrap: 4,
      plantFiber: 1
    },
    requiredTools: {
      boneNeedle: 1
    },
    toolDurabilityCost: {
      boneNeedle: 2
    }
  },
  // Smelting Recipes
  clayPickaxeMold: {
    id: "clayPickaxeMold",
    nameKey: "clayPickaxeMold",
    resultItemId: "clayPickaxeMold",
    resultQuantity: 1,
    isPublic: false,
    category: "smelting",
    ingredients: {
      clay: 6,
    }
  },
  clayShovelMold: {
    id: "clayShovelMold",
    nameKey: "clayShovelMold",
    resultItemId: "clayShovelMold",
    resultQuantity: 1,
    isPublic: false,
    category: "smelting",
    ingredients: {
      clay: 4,
    }
  },
  clayAxeMold: {
    id: "clayAxeMold",
    nameKey: "clayAxeMold",
    resultItemId: "clayAxeMold",
    resultQuantity: 1,
    isPublic: false,
    category: "smelting",
    ingredients: {
      clay: 5,
    }
  },
  clayKnifeMold: {
    id: "clayKnifeMold",
    nameKey: "clayKnifeMold",
    resultItemId: "clayKnifeMold",
    resultQuantity: 1,
    isPublic: false,
    category: "smelting",
    ingredients: {
      clay: 2,
    }
  },
  claySpearMold: {
    id: "claySpearMold",
    nameKey: "claySpearMold",
    resultItemId: "claySpearMold",
    resultQuantity: 1,
    isPublic: false,
    category: "smelting",
    ingredients: {
      clay: 3,
    }
  },
  copperPickaxeHead: {
    id: "copperPickaxeHead",
    nameKey: "copperPickaxeHead",
    resultItemId: "copperPickaxeHead",
    resultQuantity: 1,
    isPublic: false,
    category: "smelting",
    ingredients: {
      copperOre: 3,
      charcoal: 1,
      clayPickaxeMold: 1
    },
    requiredTools: {
      fireStarter: 1
    }
  },
  copperAxeHead: {
    id: "copperAxeHead",
    nameKey: "copperAxeHead",
    resultItemId: "copperAxeHead",
    resultQuantity: 1,
    isPublic: false,
    category: "smelting",
    ingredients: {
      copperOre: 3,
      charcoal: 1,
      clayAxeMold: 1
    },
    requiredTools: {
      fireStarter: 1
    }
  },
  copperKnifeBlade: {
    id: "copperKnifeBlade",
    nameKey: "copperKnifeBlade",
    resultItemId: "copperKnifeBlade",
    resultQuantity: 1,
    isPublic: false,
    category: "smelting",
    ingredients: {
      copperOre: 1,
      charcoal: 1,
      clayKnifeMold: 1
    },
    requiredTools: {
      fireStarter: 1
    }
  },
  copperSpearHead: {
    id: "copperSpearHead",
    nameKey: "copperSpearHead",
    resultItemId: "copperSpearHead",
    resultQuantity: 1,
    isPublic: false,
    category: "smelting",
    ingredients: {
      copperOre: 1,
      charcoal: 1,
      claySpearMold: 1
    },
    requiredTools: {
      fireStarter: 1
    }
  },
  copperShovelHead: {
    id: "copperShovelHead",
    nameKey: "copperShovelHead",
    resultItemId: "copperShovelHead",
    resultQuantity: 1,
    isPublic: false,
    category: "smelting",
    ingredients: {
      copperOre: 2,
      charcoal: 1,
      clayShovelMold: 1
    },
    requiredTools: {
      fireStarter: 1
    }
  }
};