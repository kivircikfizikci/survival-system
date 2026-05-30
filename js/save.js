const SAVE_KEY = "survivalSystemSave";

// ── KAYDET ─────────────────────────────────────────────────────────────────

function saveGame() {
  const saveData = {
    // Karakter istatistikleri
    health: health,
    hunger: hunger,
    energy: energy,

    // Oyuncu bilgileri
    playerNickname: playerNickname,
    playerRegion: playerRegion,
    playerProfession: playerProfession,
    playerXP: playerXP,

    // Dil tercihi
    currentLanguage: currentLanguage,

    // Envanter: null'ları koruyarak tüm slotları kaydet
    inventory: {
      baseSlots: inventory.baseSlots,
      baseMaxWeight: inventory.baseMaxWeight,
      items: inventory.items.map(function (item) {
        if (item === null) return null;
        // Sadece kaydedilmesi gereken alanları tut
        return {
          id: item.id,
          quantity: item.quantity
        };
      })
    },

    // Ekipman: her slot için item id'sini kaydet
    equipment: (function () {
      const saved = {};
      for (let slot in equipment) {
        saved[slot] = equipment[slot] ? equipment[slot].id : null;
      }
      return saved;
    })()
  };

  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
  } catch (e) {
    console.warn("Kayıt yapılamadı:", e);
  }
}

// ── YÜKLEYİCİ YARDIMCISI ──────────────────────────────────────────────────

// Item id'sinden tam item nesnesini bul ve quantity ekle
function resolveItem(id, quantity) {
  const base = itemsDatabase[id];
  if (!base) return null;
  return Object.assign({}, base, { quantity: quantity });
}

// ── YÜKLE ──────────────────────────────────────────────────────────────────

function hasSaveData() {
  return localStorage.getItem(SAVE_KEY) !== null;
}

function loadGame() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return false;

  let saveData;
  try {
    saveData = JSON.parse(raw);
  } catch (e) {
    console.warn("Kayıt dosyası bozuk:", e);
    return false;
  }

  // Karakter istatistikleri
  if (typeof saveData.health === "number") health = saveData.health;
  if (typeof saveData.hunger === "number") hunger = saveData.hunger;
  if (typeof saveData.energy === "number") energy = saveData.energy;

  // Oyuncu bilgileri
  if (saveData.playerNickname) playerNickname = saveData.playerNickname;
  if (saveData.playerRegion)   playerRegion   = saveData.playerRegion;
  if (saveData.playerProfession) playerProfession = saveData.playerProfession;
  if (typeof saveData.playerXP === "number") playerXP = saveData.playerXP;

  // Dil tercihi
  if (saveData.currentLanguage) {
    setLanguage(saveData.currentLanguage);
  }

  // Envanter
  if (saveData.inventory) {
    inventory.baseSlots     = saveData.inventory.baseSlots     || inventory.baseSlots;
    inventory.baseMaxWeight = saveData.inventory.baseMaxWeight || inventory.baseMaxWeight;

    const loadedItems = saveData.inventory.items || [];
    inventory.items = loadedItems.map(function (entry) {
      if (entry === null) return null;
      return resolveItem(entry.id, entry.quantity);
    });
  }

  // Ekipman
  if (saveData.equipment) {
    for (let slot in saveData.equipment) {
      const itemId = saveData.equipment[slot];
      if (itemId && itemsDatabase[itemId]) {
        equipment[slot] = Object.assign({}, itemsDatabase[itemId], { quantity: 1 });
      } else {
        equipment[slot] = null;
      }
    }
  }

  // Envanter kapasitesini ekipmanlardan yeniden hesapla
  updateInventoryCapacityFromEquipment();

  // Bölge seçicisini kayıtlı bölgeyle eşleştir
  if (areaSelect && saveData.playerRegion) {
    areaSelect.value = saveData.playerRegion;
  }

  return true;
}

// ── KAYDI SİL ──────────────────────────────────────────────────────────────

function deleteSave() {
  localStorage.removeItem(SAVE_KEY);
}
