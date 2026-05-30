const itemsDatabase = {
  blackberry: {
    id: "blackberry",
    nameKey: "blackberry",
    type: "food",
    imageSrc: "img/blackberry.png",
    weight: 0.05,
    maxStack: 64,
    hungerRestore: 8
  },
  pebble: {
    id: "pebble",
    nameKey: "pebble",
    type: "material",
    imageSrc: "img/pebble.png",
    weight: 0.2,
    maxStack: 4,
  },
  dryWood: {
    id: "dryWood",
    nameKey: "dryWood",
    type: "material",
    imageSrc: "img/dryWood.png",
    weight: 0.7,
    maxStack: 1
  },
  insect: {
    id: "insect",
    nameKey: "insect",
    type: "material",
    imageSrc: "img/insect.png",
    weight: 0.1,
    maxStack: 16 
  },
  reed: {
    id: "reed",
    nameKey: "reed",
    type: "material",
    imageSrc: "img/reed.png",
    weight: 0.2,
    maxStack: 4
  },
  sharpStone: {
    id: "sharpStone",
    nameKey: "sharpStone",
    type: "material",
    imageSrc: "img/sharpStone.png",
    weight: 0.4,
    maxStack: 8
  },
  fish: {
    id: "fish",
    nameKey: "fish",
    type: "food",
    imageSrc: "img/fish.png",
    weight: 0.5,
    maxStack: 1,
    hungerRestore: 20
  },
  freshWater: {
    id: "freshWater",
    nameKey: "freshWater",
    type: "food",
    imageSrc: "img/freshWater.png",
    weight: 0.5,
    maxStack: 1,
    hungerRestore: 2
  },
  frog: {
    id: "frog",
    nameKey: "frog",
    type: "food",
    imageSrc: "img/frog.png",
    weight: 0.2,
    maxStack: 3,
    hungerRestore: 12
  },
  clay: {
    id: "clay",
    nameKey: "clay",
    type: "material",
    imageSrc: "img/clay.png",
    weight: 0.3,
    maxStack: 4
  },
  branch: {
    id: "branch",
    nameKey: "branch",
    type: "material",
    imageSrc: "img/branch.png",
    weight: 1,
    maxStack: 2
   },
  mushroom: {
    id: "mushroom",
    nameKey: "mushroom",
    type: "food",
    imageSrc: "img/mushroom.png",
    weight: 0.1,
    maxStack: 16,
    hungerRestore: 5
  },
  rope: {
    id: "rope",
    nameKey: "rope",
    type: "material",
    imageSrc: "img/rope.png",
    weight: 1.5,
    maxStack: 1
  },
  pebble: {
    id: "pebble",
    nameKey: "pebble",
    type: "material",
    imageSrc: "img/pebble.png",
    weight: 0.2,
    maxStack: 4
  },
  dryGrass: {
    id: "dryGrass",
    nameKey: "dryGrass",
    type: "material",
    imageSrc: "img/dryGrass.png",
    weight: 0.1,
    maxStack: 32
   },
   ironOre: {
    id: "ironOre",
    nameKey: "ironOre",
    type: "material",
    imageSrc: "img/ironOre.png",
    weight: 2,
    maxStack: 1
   },
   coal: {
    id: "coal",
    nameKey: "coal",
    type: "material",
    imageSrc: "img/coal.png",
    weight: 1,
    maxStack: 2
   },
   oldPants: {
    id: "oldPants",
    nameKey: "oldPants",
    type: "clothing",
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
    equipSlot: "bag",
    imageSrc: "img/hikingBag.png",
    weight: 1.5,
    maxStack: 1,
    extraSlots: 10,
    extraWeight: 8
   },
   militaryBag: {
    id: "militaryBag",
    nameKey: "militaryBag",
    type: "bag",
    equipSlot: "bag",
    imageSrc: "img/militaryBag.png",
    weight: 2,
    maxStack: 1,
    extraSlots: 14,
    extraWeight: 12
   }
};

const areasDatabase = {
  meadow: {
    nameKey: "meadow",
    loot: [
      { itemId: "blackberry", chance: 25 },
      { itemId: "insect", chance: 20 },
      { itemId: "dryWood", chance: 15 },
      { itemId: "dryGrass", chance: 20 },
      { itemId: "reed", chance: 15 },
      { itemId: "pebble", chance: 10 }
    ]
  },
  lake: {
    nameKey: "lake",
    loot: [
      { itemId: "fish", chance: 15 },
      { itemId: "freshWater", chance: 30 },
      { itemId: "reed", chance: 25 },
      { itemId: "frog", chance: 10 },
      { itemId: "clay", chance: 10 }
    ]
  },
  trail: {
    nameKey: "trail",
    loot: [
      { itemId: "branch", chance: 20 },
      { itemId: "mushroom", chance: 15 },
      { itemId: "sharpStone", chance: 15 },
      { itemId: "blackberry", chance: 15 },
      { itemId: "insect", chance: 15 }
    ]
  },
  mountain: {
    nameKey: "mountain",
    loot: [
      { itemId: "sharpStone", chance: 25 },
      { itemId: "pebble", chance: 30 },
      { itemId: "ironOre", chance: 10 },
      { itemId: "coal", chance: 10 },
      { itemId: "rope", chance: 2 },
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
      { itemId: "schoolBag", chance: 5 },
      { itemId: "hikingBag", chance: 3 },
      { itemId: "militaryBag", chance: 2 },
      { itemId: "rope", chance: 10 },
      { itemId: "insect", chance: 15 },
    ]
  }
};
