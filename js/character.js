let health = 100;
let hunger = 100;
let energy = 100;

let isSleeping = false;
let activeSleepSlotIndex = null;
let sleepIntervalId = null;
let sleepSession = null;

let discoveredRecipes = [];
let discoveredItems = [];
let completedGoals = [];
let activeGoalsStage = "starter";
let starterGoalsRewardClaimed = false;
let isGrantingStarterGoalsReward = false;
let trailGoalsRewardClaimed = false;
let isGrantingTrailGoalsReward = false;
let buriedStash = null;


let playerShelter = null;

function normalizeStat(value) {
  return Math.max(0, Math.min(100, Number(value.toFixed(2))));
}

function changeHealth(amount) {
  health = normalizeStat(health + amount);
}

function changeHunger(amount) {
  hunger = normalizeStat(hunger + amount);
}

function changeEnergy(amount) {
  energy = normalizeStat(energy + amount);
}