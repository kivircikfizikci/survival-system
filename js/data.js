const regionBackgrounds = {
  meadow: "../img/meadow.png",
  lake: "../img/lake.png",
  trail: "../img/trail.png",
  mountain: "../img/mountain.png",
  mine: "../img/mine.png",
  abandonedVillage: "../img/abandonedVillage.png"
};

function getRegionNameById(regionId) {
  const regionNameKeys = {
    meadow: "meadow",
    trail: "trail",
    lake: "lake",
    mountain: "mountain",
    mine: "mine",
    abandonedVillage: "abandonedVillage"
  };

  const nameKey = regionNameKeys[regionId];

  if (nameKey) {
    return t(nameKey);
  }

  return regionId || t("unknownRegion");
}

const gameConfig = {
  sleepTickMs: 30000,

  actionCosts: {
    move: {
      energy: 0.2,
      hunger: 0.1
    },

    raftMove: {
      energy: 0.4,
      hunger: 0.15
    },

    hunt: {
      energy: 3,
      hunger: 2
    },

    fight: {
      energy: 6,
      hunger: 3
    },

    flee: {
      energy: 5,
      hunger: 2
    }
  }
};

function getSavedDiscoveryMapId() {
  const savedData = localStorage.getItem("survivalSystemDiscoverySave");

  if (!savedData) {
    return "meadow";
  }

  try {
    const discoveryData = JSON.parse(savedData);
    return discoveryData.currentMapId || "meadow";
  } catch (error) {
    return "meadow";
  }
}

function updateRegionBackground() {
  const currentMapId =
    typeof discoveryState !== "undefined"
      ? discoveryState.currentMapId
      : getSavedDiscoveryMapId();

  const imagePath = regionBackgrounds[currentMapId] || "";

  if (!imagePath) {
    document.body.style.setProperty("--region-image", "none");
    return;
  }

  document.body.style.setProperty(
    "--region-image",
    `url("${imagePath}")`
  );
}

const goalsDatabase = [
  {
    id: "craftGrassWrap",
    textKey: "goalCraftGrassWrap",
    type: "craftedItem",
    itemId: "grassWrap"
  },
  {
    id: "craftGrassTunic",
    textKey: "goalCraftGrassTunic",
    type: "craftedItem",
    itemId: "grassTunic"
  },
  {
    id: "craftGrassSatchel",
    textKey: "goalCraftGrassSatchel",
    type: "craftedItem",
    itemId: "grassSatchel"
  },
  {
    id: "craftStoneKnife",
    textKey: "goalCraftStoneKnife",
    type: "craftedItem",
    itemId: "stoneKnife"
  },
  {
    id: "craftStoneAxe",
    textKey: "goalCraftStoneAxe",
    type: "craftedItem",
    itemId: "stoneAxe"
  },
  {
    id: "craftLeafBed",
    textKey: "goalCraftLeafBed",
    type: "craftedItem",
    itemId: "leafBed"
  },
  {
    id: "reachTrail",
    textKey: "goalReachTrail",
    type: "reachedMap",
    mapId: "trail"
  }
];

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
    maxStack: 4
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
  fish: {
    id: "fish",
    nameKey: "fish",
    type: "usable",
    category: "food",
    imageSrc: "img/fish.png",
    weight: 0.4,
    maxStack: 4,
    hungerRestore: 20
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
    maxStack: 8
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
    weight: 0.25,
    maxStack: 8
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
    weight: 1,
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
    weight: 2,
    maxStack: 2
  },
  charcoal: {
    id: "charcoal",
    nameKey: "charcoal",
    type: "material",
    category: "resource",
    imageSrc: "img/charcoal.png",
    weight: 0.4,
    maxStack: 8
  },
  leather: {
    id: "leather",
    nameKey: "leather",
    type: "material",
    category: "resource",
    imageSrc: "img/leather.png",
    weight: 0.6,
    maxStack: 6
  },
  leatherStrip: {
    id: "leatherStrip",
    nameKey: "leatherStrip",
    type: "material",
    category: "resource",
    imageSrc: "img/leatherStrip.png",
    weight: 0.1,
    maxStack: 32
  },
  splitWood: {
    id: "splitWood",
    nameKey: "splitWood",
    type: "material",
    category: "resource",
    imageSrc: "img/splitWood.png",
    weight: 0.65,
    maxStack: 4
  },
  woodPlank: {
    id: "woodPlank",
    nameKey: "woodPlank",
    type: "material",
    category: "resource",
    imageSrc: "img/woodPlank.png",
    weight: 0.4,
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
  grassTunic: {
    id: "grassTunic",
    nameKey: "grassTunic",
    type: "clothing",
    category: "clothing",
    equipSlot: "torso",
    imageSrc: "img/grassTunic.png",
    weight: 0.6,
    maxStack: 1,
    extraSlots: 1,
    extraWeight: 1.5
  },
  grassWrap: {
  id: "grassWrap",
  nameKey: "grassWrap",
  type: "clothing",
  category: "clothing",
  equipSlot: "legs",
  imageSrc: "img/grassWrap.png",
  weight: 0.45,
  maxStack: 1,
  extraSlots: 1,
  extraWeight: 1
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
  grassSatchel: {
    id: "grassSatchel",
    nameKey: "grassSatchel",
    type: "bag",
    category: "bag",
    equipSlot: "bag",
    imageSrc: "img/grassSatchel.png",
    weight: 0.45,
    maxStack: 1,
    extraSlots: 3,
    extraWeight: 2.5
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
  ironPickaxe: {
    id: "ironPickaxe",
    nameKey: "ironPickaxe",
    type: "tool",
    category: "tool",
    imageSrc: "img/ironPickaxe.png",
    weight: 1.2,
    maxStack: 1,
    damage: 12,
    durability: 70,
    maxDurability: 70,
    toolTags: ["pickaxe"],
    toolTier: "iron"
  },
  ironShovel: {
    id: "ironShovel",
    nameKey: "ironShovel",
    type: "tool",
    category: "tool",
    imageSrc: "img/ironShovel.png",
    weight: 1.5,
    maxStack: 1,
    damage: 7,
    durability: 90,
    maxDurability: 90,
    toolTags: ["shovel"],
    toolTier: "iron"
  },
  ironAxe: {
    id: "ironAxe",
    nameKey: "ironAxe",
    type: "tool",
    category: "tool",
    imageSrc: "img/ironAxe.png",
    weight: 1,
    maxStack: 1,
    damage: 16,
    durability: 80,
    maxDurability: 80,
    toolTags: ["axe"],
    toolTier: "iron"
  },
  ironKnife: {
    id: "ironKnife",
    nameKey: "ironKnife",
    type: "tool",
    category: "tool",
    imageSrc: "img/ironKnife.png",
    weight: 0.6,
    maxStack: 1,
    damage: 18,
    durability: 60,
    maxDurability: 60,
    toolTags: ["knife"],
    toolTier: "iron"
  },
  ironSpear: {
    id: "ironSpear",
    nameKey: "ironSpear",
    type: "weapon",
    category: "weapon",
    imageSrc: "img/ironSpear.png",
    weight: 1.2,
    maxStack: 1,
    damage: 20,
    durability: 50,
    maxDurability: 50,
    toolTags: ["spear"],
    toolTier: "iron"
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
    maxStack: 16,
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
  leafBed: {
    id: "leafBed",
    nameKey: "leafBed",
    type: "usable",
    category: "sleep",
    imageSrc: "img/leafBed.png",
    weight: 1.5,
    maxStack: 1,
    durability: 5,
    maxDurability: 5,

    sleepData: {
      energyPerTick: 1,
      healthPerTick: 0.2,
      hungerCostPerTick: 1,
      durabilityCostOnSleepEnd: 1
    }
  },
  simpleBedroll: {
    id: "simpleBedroll",
    nameKey: "simpleBedroll",
    type: "usable",
    category: "sleep",
    imageSrc: "img/simpleBedroll.png",
    weight: 2.2,
    maxStack: 1,
    durability: 12,
    maxDurability: 12,

    sleepData: {
      energyPerTick: 2,
      healthPerTick: 0.4,
      hungerCostPerTick: 1,
      durabilityCostOnSleepEnd: 1
    }
  },
  warmBedroll: {
    id: "warmBedroll",
    nameKey: "warmBedroll",
    type: "usable",
    category: "sleep",
    imageSrc: "img/warmBedroll.png",
    weight: 3,
    maxStack: 1,
    durability: 20,
    maxDurability: 20,

    sleepData: {
      energyPerTick: 3,
      healthPerTick: 0.7,
      hungerCostPerTick: 1,
      durabilityCostOnSleepEnd: 1
    }
  },
  tent: {
    id: "tent",
    nameKey: "tent",
    type: "usable",
    category: "survival",
    imageSrc: "img/tent.png",
    weight: 5,
    stackable: false,
    usable: true,
    itemType: "shelter"
  },
  campfire: {
    id: "campfire",
    nameKey: "campfire",
    type: "usable",
    category: "workstation",
    imageSrc: "img/campfire.png",
    weight: 4,
    maxStack: 1,
    durability: 25,
    maxDurability: 25
  },
  tanningRack: {
    id:"tanningRack",
    nameKey: "tanningRack",
    type: "usable",
    category: "workstation",
    imageSrc: "img/tanningRack.png",
    weight: 3,
    maxStack: 1,
    durability: 40,
    maxDurability: 40
  },
  choppingBlock: {
    id: "choppingBlock",
    nameKey: "choppingBlock",
    type: "usable",
    category: "workstation",
    imageSrc: "img/choppingBlock.png",
    weight: 2,
    maxStack: 1,
    durability: 50,
    maxDurability: 50
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
  ironPickaxeHead: {
    id: "ironPickaxeHead",
    nameKey: "ironPickaxeHead",
    type: "material",
    category: "smelting",
    imageSrc: "img/ironPickaxeHead.png",
    weight: 0.5,
    maxStack: 1
  },
  ironAxeHead: {
    id: "ironAxeHead",
    nameKey: "ironAxeHead",
    type: "material",
    category: "smelting",
    imageSrc: "img/ironAxeHead.png",
    weight: 0.5,
    maxStack: 1
  },
  ironShovelHead: {
    id: "ironShovelHead",
    nameKey: "ironShovelHead",
    type: "material",
    category: "smelting",
    imageSrc: "img/ironShovelHead.png",
    weight: 0.5,
    maxStack: 1
  },
  ironKnifeBlade: {
    id: "ironKnifeBlade",
    nameKey: "ironKnifeBlade",
    type: "material",
    category: "smelting",
    imageSrc: "img/ironKnifeBlade.png",
    weight: 0.5,
    maxStack: 1
  },
  ironSpearHead: {
    id: "ironSpearHead",
    nameKey: "ironSpearHead",
    type: "material",
    category: "smelting",
    imageSrc: "img/ironSpearHead.png",
    weight: 0.5,
    maxStack: 1
  },
  // Animal Items
  rabbitMeat: {
    id: "rabbitMeat",
    nameKey: "rabbitMeat",
    type: "usable",
    category: "food",
    imageSrc: "img/rabbitMeat.png",
    weight: 0.35,
    maxStack: 5,
    hungerRestore: 8
  },
  rabbitFur: {
    id: "rabbitFur",
    nameKey: "rabbitFur",
    type: "material",
    category: "material",
    imageSrc: "img/rabbitFur.png",
    weight: 0.15,
    maxStack: 10
  },
  smallBones: {
    id: "smallBones",
    nameKey: "smallBones",
    type: "material",
    category: "material",
    imageSrc: "img/smallBones.png",
    weight: 0.08,
    maxStack: 24
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
  wolfPelt: {
    id: "wolfPelt",
    nameKey: "wolfPelt",
    type: "material",
    category: "material",
    imageSrc: "img/wolfPelt.png",
    weight: 1.2,
    maxStack: 5
  },
  wolfTooth: {
    id: "wolfTooth",
    nameKey: "wolfTooth",
    type: "material",
    category: "material",
    imageSrc: "img/wolfTooth.png",
    weight: 0.05,
    maxStack: 24
  },
  thickHide: {
    id: "thickHide",
    nameKey: "thickHide",
    type: "material",
    category: "material",
    imageSrc: "img/thickHide.png",
    weight: 1.4,
    maxStack: 5
  },
  animalFat: {
    id: "animalFat",
    nameKey: "animalFat",
    type: "material",
    category: "material",
    imageSrc: "img/animalFat.png",
    weight: 0.35,
    maxStack: 10
  },
  venomSac: {
    id: "venomSac",
    nameKey: "venomSac",
    type: "material",
    category: "material",
    imageSrc: "img/venomSac.png",
    weight: 0.1,
    maxStack: 16
  },
  snakeSkin: {
    id: "snakeSkin",
    nameKey: "snakeSkin",
    type: "material",
    category: "material",
    imageSrc: "img/snakeSkin.png",
    weight: 0.05,
    maxStack: 24
  },
  wool: {
    id: "wool",
    nameKey: "wool",
    type: "material",
    category: "material",
    imageSrc: "img/wool.png",
    weight: 0.25,
    maxStack: 10
  },
  beeswax: {
    id: "beeswax",
    nameKey: "beeswax",
    type: "material",
    category: "material",
    imageSrc: "img/beeswax.png",
    weight: 0.2,
    maxStack: 10
  },
  bearPelt: {
    id: "bearPelt",
    nameKey: "bearPelt",
    type: "material",
    category: "material",
    imageSrc: "img/bearPelt.png",
    weight: 2.5,
    maxStack: 3
  },
  bearClaw: {
    id: "bearClaw",
    nameKey: "bearClaw",
    type: "material",
    category: "material",
    imageSrc: "img/bearClaw.png",
    weight: 0.8,
    maxStack: 4
  },
  scalyHide: {
    id: "scalyHide",
    nameKey: "scalyHide",
    type: "material",
    category: "material",
    imageSrc: "img/scalyHide.png",
    weight: 1.6,
    maxStack: 5
  },
  fishMeat: {
    id: "fishMeat",
    nameKey: "fishMeat",
    type: "usable",
    category: "food",
    imageSrc: "img/fishMeat.png",
    weight: 0.4,
    maxStack: 5,
    hungerRestore: 10
  },
  fishOil: {
    id: "fishOil",
    nameKey: "fishOil",
    type: "material",
    category: "material",
    imageSrc: "img/fishOil.png",
    weight: 0.10,
    maxStack: 12
  },
  fishBone: {
    id: "fishBone",
    nameKey: "fishBone",
    type: "material",
    category: "material",
    imageSrc: "img/fishBone.png",
    weight: 0.05,
    maxStack: 20
  },
  spiderSilk: {
    id: "spiderSilk",
    nameKey: "spiderSilk",
    type: "material",
    category: "material",
    imageSrc: "img/spiderSilk.png",
    weight: 0.05,
    maxStack: 20
  },
  animalBone: {
    id: "animalBone",
    nameKey: "animalBone",
    type: "material",
    category: "animal",
    imageSrc: "img/animalBone.png",
    weight: 0.3,
    maxStack: 4
  },
  animalHide: {
    id: "animalHide",
    nameKey: "animalHide",
    type: "material",
    category: "animal",
    imageSrc: "img/animalHide.png",
    weight: 0.8,
    maxStack: 2
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
  rawMeat: {
    id: "rawMeat",
    nameKey: "rawMeat",
    type: "usable",
    category: "food",
    imageSrc: "img/rawMeat.png",
    weight: 0.6,
    maxStack: 4,
    hungerRestore: 8
  },
  // Vehicle
  makeshiftRaft: {
    id: "makeshiftRaft",
    nameKey: "makeshiftRaft",
    type: "material",
    category: "vehicle",
    imageSrc: "img/makeshiftRaft.png",
    weight: 8,
    maxStack: 1
  },
};

const toolGroups = {
  knife: ["stoneKnife", "boneKnife", "obsidianKnife", "copperKnife", "ironKnife"],
  pickaxe: ["stonePickaxe", "copperPickaxe", "ironPickaxe"],
  axe: ["stoneAxe", "copperAxe", "ironAxe"],
  shovel: ["stoneShovel", "copperShovel", "ironShovel"],
  spear: ["stoneSpear", "boneSpear", "copperSpear", "ironSpear"]
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
    ingredients: {},
    ingredientGroups: {
      ropeMaterial: {
        amount: 3,
        itemIds: ["reed", "plantFiber", "dryGrass"]
      }
    }
  },
  leatherStrip: {
    id: "leatherStrip",
    nameKey: "leatherStrip",
    resultItemId: "leatherStrip",
    resultQuantity: 4,
    isPublic: false,
    category: "basic",
    discoverByAny: ["leather"],
    ingredients: {
      leather: 1
    },
     requiredToolGroups: {
      knife: 1
    },
    toolDurabilityCost: {
      knife: 4
    }
  },
  woodPlank: {
    id: "woodPlank",
    nameKey: "woodPlank",
    resultItemId: "woodPlank",
    resultQuantity: 2,
    isPublic: false,
    requiredWorkstation: "choppingBlock",
    category: "basic",
    discoverByAny: ["splitWood", "stoneAxe"],
    ingredients: {
      woodLog: 1
    },
    requiredToolGroups: {
      axe: 1,
      knife: 1
    },
    toolDurabilityCost: {
      axe: 8,
      knife: 8
    }
  },
  splitWood: {
    id: "splitWood",
    nameKey: "splitWood",
    resultItemId: "splitWood",
    resultQuantity: 4,
    isPublic: false,
    requiredWorkstation: "choppingBlock",
    category: "basic",
    discoverByAny: ["woodLog", "stoneAxe"],
    ingredients: {
      woodLog: 1,
      rope: 1
    },
    requiredToolGroups: {
      axe: 1
    },
    toolDurabilityCost: {
      axe: 4
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
    discoverByAny: ["bandage", "boiledWater"],
    ingredients: {
      bandage: 1,
      boiledWater: 1
    }
  },
  herbalPaste: {
    id: "herbalPaste",
    nameKey: "herbalPaste",
    resultItemId: "herbalPaste",
    resultQuantity: 1,
    isPublic: false,
    category: "medical",
    discoverByAll: ["wildHerb", "smallFlower"],
    ingredients: {
      wildHerb: 2,
      smallFlower: 1
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
    discoverByAny: ["branch", "sharpStone", "rope"],
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
    discoverByAny: ["sharpStone", "stick", "branch"],
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
    discoverByAny: ["sharpStone", "branch", "rope"],
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
    discoverByAny: ["sharpStone", "branch", "rope"],
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
    discoverByAny: ["branch", "sharpStone", "rope"],
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
    discoverByAny: ["obsidianShard"],
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
    discoverByAny: ["animalBone", "smallBones"],
    ingredients: {
      branch: 1,
      rope: 1
    },
    ingredientGroups: {
      boneTip: {
        amount: 1,
        itemIds: ["animalBone", "smallBones"]
      }
    }
  },
  boneKnife: {
  id: "boneKnife",
  nameKey: "boneKnife",
  resultItemId: "boneKnife",
  resultQuantity: 1,
  isPublic: false,
  category: "tools",
  discoverByAny: ["animalBone", "smallBones"],
  ingredients: {
    stick: 1,
    rope: 1
  },
  ingredientGroups: {
    boneMaterial: {
      amount: 1,
      itemIds: ["animalBone", "smallBones"]
    }
  }
},
  boneNeedle: {
    id: "boneNeedle",
    nameKey: "boneNeedle",
    resultItemId: "boneNeedle",
    resultQuantity: 1,
    isPublic: false,
    category: "tools",
    discoverByAny: ["smallBones", "fishBone"],
    ingredients: {
      sharpStone: 1
    },
    ingredientGroups: {
      smallBoneMaterial: {
        amount: 1,
        itemIds: ["smallBones", "fishBone"]
      }
    }
  },
  copperAxe: {
    id: "copperAxe",
    nameKey: "copperAxe",
    resultItemId: "copperAxe",
    resultQuantity: 1,
    isPublic: false,
    category: "tools",
    discoverByAll: ["copperAxeHead", "stick"],
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
    discoverByAll: ["copperKnifeBlade", "stick"],
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
    discoverByAll: ["copperPickaxeHead", "stick"],
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
    discoverByAll: ["copperShovelHead", "stick"],
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
    discoverByAll: ["copperSpearHead", "stick"],
    ingredients: {
      branch: 2,
      rope: 1,
      copperSpearHead: 1
    }
  },
  ironAxe: {
    id: "ironAxe",
    nameKey: "ironAxe",
    resultItemId: "ironAxe",
    resultQuantity: 1,
    isPublic: false,
    category: "tools",
    discoverByAll: ["ironAxeHead", "stick"],
    ingredients: {
      branch: 2,
      rope: 2,
      ironAxeHead: 1
    }
  },
  ironKnife: {
    id: "ironKnife",
    nameKey: "ironKnife",
    resultItemId: "ironKnife",
    resultQuantity: 1,
    isPublic: false,
    category: "tools",
    discoverByAll: ["ironKnifeBlade", "stick"],
    ingredients: {
      stick: 1,
      rope: 1,
      ironKnifeBlade: 1
    }
  },
  ironPickaxe: {
    id: "ironPickaxe",
    nameKey: "ironPickaxe",
    resultItemId: "ironPickaxe",
    resultQuantity: 1,
    isPublic: false,
    category: "tools",
    discoverByAll: ["ironPickaxeHead", "stick"],
    ingredients: {
      branch: 2,
      rope: 2,
      ironPickaxeHead: 1
    }
  },
  ironShovel: {
    id: "ironShovel",
    nameKey: "ironShovel",
    resultItemId: "ironShovel",
    resultQuantity: 1,
    isPublic: false,
    category: "tools",
    discoverByAll: ["ironShovelHead", "stick"],
    ingredients: {
      branch: 1,
      rope: 1,
      ironShovelHead: 1
    }
  },
  ironSpear: {
    id: "ironSpear",
    nameKey: "ironSpear",
    resultItemId: "ironSpear",
    resultQuantity: 1,
    isPublic: false,
    category: "tools",
    discoverByAll: ["ironSpearHead", "stick"],
    ingredients: {
      branch: 2,
      rope: 1,
      ironSpearHead: 1
    }
  },
  // Survival Recipes
  boiledWater: {
    id: "boiledWater",
    nameKey: "boiledWater",
    resultItemId: "boiledWater",
    resultQuantity: 1,
    isPublic: false,
    requiredWorkstation: "campfire",
    category: "survival",
    discoverByAny: ["freshWater", "campfire"],
    ingredients: {
      freshWater: 1
    }
  },
  fishBait: {
    id: "fishBait",
    nameKey: "fishBait",
    resultItemId: "fishBait",
    resultQuantity: 1,
    isPublic: true,
    category: "survival",
    ingredients: {},
    ingredientGroups: {
      baitMaterial: {
        amount: 1,
        itemIds: ["worm", "insect", "snail"]
      }
    }
  },
  fireStarter: {
    id: "fireStarter",
    nameKey: "fireStarter",
    resultItemId: "fireStarter",
    resultQuantity: 1,
    isPublic: false,
    category: "survival",
    discoverByAll: ["flint", "dryGrass"],
    ingredients: { flint: 1, dryGrass: 2 }
  },
  leafBed: {
    id: "leafBed",
    nameKey: "leafBed",
    resultItemId: "leafBed",
    resultQuantity: 1,
    isPublic: true,
    category: "survival",
    discoverByAll: ["dryLeaf", "dryGrass"],
    ingredients: {
      dryLeaf: 6,
      dryGrass: 6
    }
  },
  simpleBedroll: {
    id: "simpleBedroll",
    nameKey: "simpleBedroll",
    resultItemId: "simpleBedroll",
    resultQuantity: 1,
    isPublic: false,
    category: "survival",
    discoverByAny: ["clothScrap", "dryGrass", "rope"],
    ingredients: {
      clothScrap: 4,
      dryGrass: 4,
      rope: 1
    }
  },
  warmBedroll: {
    id: "warmBedroll",
    nameKey: "warmBedroll",
    resultItemId: "warmBedroll",
    resultQuantity: 1,
    isPublic: false,
    category: "survival",
    discoverByAny: ["rabbitFur", "wolfPelt", "bearPelt", "wool"],
    discoverByAll: ["clothScrap", "rope"],
    ingredients: {
      clothScrap: 2,
      rope: 1
    },
    ingredientGroups: {
      warmMaterial: {
        amount: 3,
        itemIds: ["rabbitFur", "wool", "wolfPelt", "bearPelt"]
      }
    }
  },
  tent: {
    id: "tent",
    nameKey: "tent",
    resultItemId: "tent",
    resultQuantity: 1,
    isPublic: false,
    category: "survival",
    discoverByAny: [ "leather", "animalHide", "wolfPelt", "thickHide", "bearPelt", "scalyHide" ],
    ingredients: {
      rope: 6,
      branch: 6
    },
    ingredientGroups: {
      tentCoverMaterial: {
        amount: 4,
        itemIds: [ "leather", "animalHide", "wolfPelt", "thickHide", "bearPelt", "scalyHide" ]
      }
    }
  },
  campfire: {
    id: "campfire",
    nameKey: "campfire",
    resultItemId: "campfire",
    resultQuantity: 1,
    isPublic: false,
    category: "survival",
    discoverByAny: ["dryWood", "stick", "pebble"],
    ingredients: { 
      dryWood: 2, 
      stick: 2, 
      pebble: 2
    }
  },
  choppingBlock: {
    id: "choppingBlock",
    nameKey: "choppingBlock",
    resultItemId: "choppingBlock",
    resultQuantity: 1,
    isPublic: false,
    category: "survival",
    discoverByAny: ["woodLog", "stoneAxe"],
    ingredients: {
      woodLog: 1
    },
    requiredToolGroups: {
      axe: 1
    },
    toolDurabilityCost: {
      axe: 6
    }
  },
  tanningRack: {
    id: "tanningRack",
    nameKey: "tanningRack",
    resultItemId: "tanningRack",
    resultQuantity: 1,
    isPublic: false,
    category: "survival",
    discoverByAny: ["animalHide", "stick", "rope"],
    ingredients: {
      stick: 4,
      rope: 2
    },
    requiredToolGroups: {
      knife: 1
    },
    toolDurabilityCost: {
      knife: 12
    }
  },
  simpleTorch: {
    id: "simpleTorch",
    nameKey: "simpleTorch",
    resultItemId: "simpleTorch",
    resultQuantity: 1,
    isPublic: true,
    category: "survival",
    discoverByAny: ["stick", "resin"],
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
    isPublic: false,
    category: "survival",
    discoverByAll: ["campfire", "woodLog"],
    requiredWorkstation: "campfire",
    ingredients: {
      woodLog: 2,
      dryGrass: 4,
      fireStarter: 1
    }
  },
  leather: {
    id: "leather",
    nameKey: "leather",
    resultItemId: "leather",
    resultQuantity: 1,
    isPublic: false,
    requiredWorkstation: "tanningRack",
    category: "survival",
    discoverByAny: ["animalHide", "wolfPelt", "thickHide", "bearPelt", "scalyHide", "tanningRack"],
    ingredients: {},
    ingredientGroups: {
      hideMaterial: {
        amount: 1,
        itemIds: ["animalHide", "wolfPelt", "thickHide", "bearPelt", "scalyHide"]
      }
    },
    requiredToolGroups: {
      knife: 1
    },
    toolDurabilityCost: {
      knife: 4
    }
  },
  makeshiftRaft: {
    id: "makeshiftRaft",
    nameKey: "makeshiftRaft",
    resultItemId: "makeshiftRaft",
    resultQuantity: 1,
    isPublic: false,
    category: "survival",
    discoverByAll: ["woodLog", "rope"],
    ingredients: {
      woodLog: 4,
      stick: 4,
      rope: 8
    },

    requiredToolGroups: {
      axe: 1,
      knife: 1
    },

    toolDurabilityCost: {
      axe: 6,
      knife: 4
    }
  },
  // Clothing Items
  leatherPouch: {
    id: "leatherPouch",
    nameKey: "leatherPouch",
    resultItemId: "leatherPouch",
    resultQuantity: 1,
    isPublic: false,
    category: "clothing",
    discoverByAll: ["leather", "leatherStrip"],
    ingredients: { leather: 2, leatherStrip: 2 }
  },
  grassSatchel: {
    id: "grassSatchel",
    nameKey: "grassSatchel",
    resultItemId: "grassSatchel",
    resultQuantity: 1,
    isPublic: false,
    category: "clothing",
    discoverByAny: ["dryGrass", "plantFiber"],
    ingredients: {
      dryGrass: 5,
      plantFiber: 4,
      rope: 1
    }
  },
  grassTunic: {
    id: "grassTunic",
    nameKey: "grassTunic",
    resultItemId: "grassTunic",
    resultQuantity: 1,
    isPublic: false,
    category: "clothing",
    discoverByAll: ["dryGrass", "plantFiber"],
    ingredients: {
      dryGrass: 8,
      plantFiber: 4
    }
  },
  grassWrap: {
    id: "grassWrap",
    nameKey: "grassWrap",
    resultItemId: "grassWrap",
    resultQuantity: 1,
    isPublic: false,
    category: "clothing",
    discoverByAll: ["dryGrass", "plantFiber"],
    ingredients: {
      dryGrass: 6,
      plantFiber: 3
    }
  },
  // Cooking Recipes
  cookedFish: {
    id: "cookedFish",
    nameKey: "cookedFish",
    resultItemId: "cookedFish",
    resultQuantity: 1,
    isPublic: false,
    requiredWorkstation: "campfire",
    category: "cooking",
    discoverByAll: ["fish", "campfire"],
    ingredients: {
      fish: 1,
      dryWood: 1
    }
  },
  cookedFrog: {
    id: "cookedFrog",
    nameKey: "cookedFrog",
    resultItemId: "cookedFrog",
    resultQuantity: 1,
    isPublic: false,
    requiredWorkstation: "campfire",
    category: "cooking",
    discoverByAll: ["frog", "campfire"],
    ingredients: {
      frog: 1,
      dryWood: 1
    }
  },
  cookedMushroom: {
    id: "cookedMushroom",
    nameKey: "cookedMushroom",
    resultItemId: "cookedMushroom",
    resultQuantity: 1,
    isPublic: false,
    requiredWorkstation: "campfire",
    category: "cooking",
    discoverByAll: ["mushroom", "campfire"],
    ingredients: {
      mushroom: 1,
      dryWood: 1
    }
  },
  cookedSnail: {
    id: "cookedSnail",
    nameKey: "cookedSnail",
    resultItemId: "cookedSnail",
    resultQuantity: 1,
    isPublic: false,
    requiredWorkstation: "campfire",
    category: "cooking",
    discoverByAll: ["snail", "campfire"],
    ingredients: {
      snail: 1,
      dryWood: 1
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
    discoverByAny: ["clay"],
    ingredients: {
      clay: 6
    }
  },
  clayShovelMold: {
    id: "clayShovelMold",
    nameKey: "clayShovelMold",
    resultItemId: "clayShovelMold",
    resultQuantity: 1,
    isPublic: false,
    category: "smelting",
    discoverByAny: ["clay"],
    ingredients: {
      clay: 4
    }
  },
  clayAxeMold: {
    id: "clayAxeMold",
    nameKey: "clayAxeMold",
    resultItemId: "clayAxeMold",
    resultQuantity: 1,
    isPublic: false,
    category: "smelting",
    discoverByAny: ["clay"],
    ingredients: {
      clay: 5
    }
  },
  clayKnifeMold: {
    id: "clayKnifeMold",
    nameKey: "clayKnifeMold",
    resultItemId: "clayKnifeMold",
    resultQuantity: 1,
    isPublic: false,
    category: "smelting",
    discoverByAny: ["clay"],
    ingredients: {
      clay: 2
    }
  },
  claySpearMold: {
    id: "claySpearMold",
    nameKey: "claySpearMold",
    resultItemId: "claySpearMold",
    resultQuantity: 1,
    isPublic: false,
    category: "smelting",
    discoverByAny: ["clay"],
    ingredients: {
      clay: 3
    }
  },
  copperPickaxeHead: {
    id: "copperPickaxeHead",
    nameKey: "copperPickaxeHead",
    resultItemId: "copperPickaxeHead",
    resultQuantity: 1,
    isPublic: false,
    category: "smelting",
    discoverByAll: ["copperOre", "clayPickaxeMold"],
    requiredWorkstation: "campfire",
    ingredients: {
      copperOre: 3,
      charcoal: 1,
      clayPickaxeMold: 1
    }
  },
  copperAxeHead: {
    id: "copperAxeHead",
    nameKey: "copperAxeHead",
    resultItemId: "copperAxeHead",
    resultQuantity: 1,
    isPublic: false,
    category: "smelting",
    discoverByAll: ["copperOre", "clayAxeMold"],
    requiredWorkstation: "campfire",
    ingredients: {
      copperOre: 3,
      charcoal: 1,
      clayAxeMold: 1
    }
  },
  copperKnifeBlade: {
    id: "copperKnifeBlade",
    nameKey: "copperKnifeBlade",
    resultItemId: "copperKnifeBlade",
    resultQuantity: 1,
    isPublic: false,
    category: "smelting",
    discoverByAll: ["copperOre", "clayKnifeMold"],
    requiredWorkstation: "campfire",
    ingredients: {
      copperOre: 1,
      charcoal: 1,
      clayKnifeMold: 1
    }
  },
  copperSpearHead: {
    id: "copperSpearHead",
    nameKey: "copperSpearHead",
    resultItemId: "copperSpearHead",
    resultQuantity: 1,
    isPublic: false,
    category: "smelting",
    discoverByAll: ["copperOre", "claySpearMold"],
    requiredWorkstation: "campfire",
    ingredients: {
      copperOre: 1,
      charcoal: 1,
      claySpearMold: 1
    }
  },
  copperShovelHead: {
    id: "copperShovelHead",
    nameKey: "copperShovelHead",
    resultItemId: "copperShovelHead",
    resultQuantity: 1,
    isPublic: false,
    category: "smelting",
    discoverByAll: ["copperOre", "clayShovelMold"],
    requiredWorkstation: "campfire",
    ingredients: {
      copperOre: 2,
      charcoal: 1,
      clayShovelMold: 1
    }
  },
  ironPickaxeHead: {
    id: "ironPickaxeHead",
    nameKey: "ironPickaxeHead",
    resultItemId: "ironPickaxeHead",
    resultQuantity: 1,
    isPublic: false,
    category: "smelting",
    discoverByAll: ["ironOre", "clayPickaxeMold"],
    requiredWorkstation: "campfire",
    ingredients: {
      ironOre: 3,
      charcoal: 1,
      clayPickaxeMold: 1
    }
  },
  ironAxeHead: {
    id: "ironAxeHead",
    nameKey: "ironAxeHead",
    resultItemId: "ironAxeHead",
    resultQuantity: 1,
    isPublic: false,
    category: "smelting",
    discoverByAll: ["ironOre", "clayAxeMold"],
    requiredWorkstation: "campfire",
    ingredients: {
      ironOre: 3,
      charcoal: 1,
      clayAxeMold: 1
    }
  },
  ironKnifeBlade: {
    id: "ironKnifeBlade",
    nameKey: "ironKnifeBlade",
    resultItemId: "ironKnifeBlade",
    resultQuantity: 1,
    isPublic: false,
    category: "smelting",
    discoverByAll: ["ironOre", "clayKnifeMold"],
    requiredWorkstation: "campfire",
    ingredients: {
      ironOre: 1,
      charcoal: 1,
      clayKnifeMold: 1
    }
  },
  ironSpearHead: {
    id: "ironSpearHead",
    nameKey: "ironSpearHead",
    resultItemId: "ironSpearHead",
    resultQuantity: 1,
    isPublic: false,
    category: "smelting",
    discoverByAll: ["ironOre", "claySpearMold"],
    requiredWorkstation: "campfire",
    ingredients: {
      ironOre: 1,
      charcoal: 1,
      claySpearMold: 1
    }
  },
  ironShovelHead: {
    id: "ironShovelHead",
    nameKey: "ironShovelHead",
    resultItemId: "ironShovelHead",
    resultQuantity: 1,
    isPublic: false,
    category: "smelting",
    discoverByAll: ["ironOre", "clayShovelMold"],
    requiredWorkstation: "campfire",
    ingredients: {
      ironOre: 2,
      charcoal: 1,
      clayShovelMold: 1
    }
  },
};