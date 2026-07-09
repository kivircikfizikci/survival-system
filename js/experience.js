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

  if (typeof saveExperienceState === "function") {
    saveExperienceState();
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
  const experienceText =
    document.getElementById("experience");

  if (experienceText) {
    experienceText.textContent =
      getExperienceDisplayText(
        "general"
      );
  }

  updateExperienceSkillsPanel();
}

function loadExperienceState() {
  if (typeof SAVE_KEY === "undefined") {
    console.warn("SAVE_KEY is not defined. Experience could not be loaded.");
    return false;
  }

  const savedData =
    localStorage.getItem(SAVE_KEY);

  if (!savedData) {
    playerExperience =
      createDefaultExperienceState();

    updateExperiencePanel();
    return false;
  }

  try {
    const saveData =
      JSON.parse(savedData);

    playerExperience =
      normalizeExperienceState(
        saveData.experience
      );

    updateExperiencePanel();
    return true;
  } catch (error) {
    console.error(
      "Experience state could not be loaded:",
      error
    );

    playerExperience =
      createDefaultExperienceState();

    updateExperiencePanel();
    return false;
  }
}

function saveExperienceState() {
  if (typeof SAVE_KEY === "undefined") {
    console.warn("SAVE_KEY is not defined. Experience could not be saved.");
    return false;
  }

  const savedData =
    localStorage.getItem(SAVE_KEY);

  let saveData = {};

  if (savedData) {
    try {
      saveData =
        JSON.parse(savedData);
    } catch (error) {
      console.error(
        "Save data could not be parsed while saving experience:",
        error
      );

      return false;
    }
  }

  saveData.experience =
    playerExperience;

  localStorage.setItem(
    SAVE_KEY,
    JSON.stringify(saveData)
  );

  return true;
}

function updateExperienceSkillsPanel() {
  const skillsList =
    document.getElementById("experienceSkillsList");

  if (!skillsList) {
    return;
  }

  skillsList.innerHTML = "";

  experienceTypes.forEach(function (type) {
    const typeExperience =
      playerExperience[type];

    if (!typeExperience) {
      return;
    }

    const requiredExperience =
      getRequiredExperience(
        typeExperience.level
      );

    const progressPercent =
      Math.min(
        100,
        Math.floor(
          (typeExperience.current / requiredExperience) * 100
        )
      );

    const row =
      document.createElement("div");

    row.className =
      "experience-skill-row";

    row.innerHTML = `
      <div class="experience-skill-header">
        <span class="experience-skill-name">
          ${getExperienceTypeName(type)}
        </span>

        <span class="experience-skill-value">
          ${t("levelShort")} ${typeExperience.level}
          ·
          ${typeExperience.current}/${requiredExperience} ${t("xpShort")}
        </span>
      </div>

      <div class="experience-skill-bar">
        <div
          class="experience-skill-fill"
          style="width: ${progressPercent}%"
        ></div>
      </div>
    `;

    skillsList.appendChild(row);
  });
}

function getExperienceTypeName(type) {
  const key =
    type + "Experience";

  const translatedName =
    t(key);

  if (translatedName && translatedName !== key) {
    return translatedName;
  }

  return type;
}

function setupExperiencePanel() {
  const toggleButton =
    document.getElementById("experienceToggle");

  const panel =
    document.getElementById("experiencePanel");

  if (!toggleButton || !panel) {
    return;
  }

  toggleButton.addEventListener("click", function (event) {
    event.stopPropagation();

    const isOpen =
      !panel.hidden;

    panel.hidden =
      isOpen;

    toggleButton.setAttribute(
      "aria-expanded",
      String(!isOpen)
    );

    if (!isOpen) {
      updateExperienceSkillsPanel();
    }
  });

  panel.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  document.addEventListener("click", function () {
    if (panel.hidden) {
      return;
    }

    panel.hidden = true;

    toggleButton.setAttribute(
      "aria-expanded",
      "false"
    );
  });
}

document.addEventListener("DOMContentLoaded", function () {
  setupExperiencePanel();
  updateExperiencePanel();
});