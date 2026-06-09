let health = 100;
let hunger = 100;
let energy = 100;

let isSleeping = false;
let sleepIntervalId = null;
let activeSleepSlotIndex = null;

let discoveredRecipes = [];

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