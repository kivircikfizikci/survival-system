const experienceTypes = [
  "general",
  "explorer",
  "fighter",
  "crafter",
  "tailor",
  "fisher",
  "lumberjack",
  "miner",
  "blacksmith",
  "cooking"
];

let playerExperience = createDefaultExperienceState();

function createDefaultExperienceState() {
  const defaultExperience = {};

  experienceTypes.forEach(function (type) {
    defaultExperience[type] = {
      level: 1,
      current: 0,
      total: 0
    };
  });

  return defaultExperience;
}

function getRequiredExperience(level) { 
    return Math.floor(50 * Math.pow(level, 1.5)); 
}

function normalizeExperienceState(savedExperience) {
  const normalizedExperience =
    createDefaultExperienceState();

  if (
    !savedExperience ||
    typeof savedExperience !== "object"
  ) {
    return normalizedExperience;
  }

  experienceTypes.forEach(function (type) {
    const savedTypeExperience =
      savedExperience[type];

    if (
      !savedTypeExperience ||
      typeof savedTypeExperience !== "object"
    ) {
      return;
    }

    normalizedExperience[type] = {
      level:
        typeof savedTypeExperience.level === "number"
          ? Math.max(1, savedTypeExperience.level)
          : 1,

      current:
        typeof savedTypeExperience.current === "number"
          ? Math.max(0, savedTypeExperience.current)
          : 0,

      total:
        typeof savedTypeExperience.total === "number"
          ? Math.max(0, savedTypeExperience.total)
          : 0
    };
  });

  return normalizedExperience;
}

function experience(rewards) {
  if (
    !rewards ||
    typeof rewards !== "object"
  ) {
    return;
  }

  Object.keys(rewards).forEach(function (type) {
    addExperienceToType(
      type,
      rewards[type]
    );
  });

  if (typeof updateExperiencePanel === "function") {
    updateExperiencePanel();
  }

  if (typeof autoSave === "function") {
    autoSave();
  }
}

function addExperienceToType(type, amount) {
  if (!experienceTypes.includes(type)) {
    console.warn(
      "Unknown experience type:",
      type
    );
    return;
  }

  if (
    typeof amount !== "number" ||
    amount <= 0
  ) {
    return;
  }

  if (!playerExperience[type]) {
    playerExperience[type] = {
      level: 1,
      current: 0,
      total: 0
    };
  }

  const typeExperience =
    playerExperience[type];

  typeExperience.current += amount;
  typeExperience.total += amount;

  let requiredExperience =
    getRequiredExperience(
      typeExperience.level
    );

  while (
    typeExperience.current >= requiredExperience
  ) {
    typeExperience.current -= requiredExperience;
    typeExperience.level += 1;

    if (typeof addLog === "function") {
      addLog(
        t("experienceLevelUp", {
          type: t(type + "Experience"),
          level: typeExperience.level
        })
      );
    }

    requiredExperience =
      getRequiredExperience(
        typeExperience.level
      );
  }
}

function getExperienceDisplayText(type) {
  if (
    !playerExperience ||
    !playerExperience[type]
  ) {
    return "";
  }

  const typeExperience =
    playerExperience[type];

  const requiredExperience =
    getRequiredExperience(
      typeExperience.level
    );

  return (
    t("levelShort") +
    " " +
    typeExperience.level +
    " · " +
    typeExperience.current +
    "/" +
    requiredExperience +
    " " +
    t("xpShort")
  );
}

function updateExperiencePanel() {
  if (!experienceText) {
    return;
  }

  experienceText.textContent =
    getExperienceDisplayText(
      "general"
    );
}