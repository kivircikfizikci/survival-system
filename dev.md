// Bunu çalıştırınca bütün gizli recipe’ler açılır.
discoveredItems = Object.keys(itemsDatabase);
discoveredRecipes = Object.keys(recipesDatabase);

updateRecipesScreen();
autoSave();

console.log("Tüm itemlar öğrenildi:", discoveredItems);
console.log("Tüm recipeler öğrenildi:", discoveredRecipes);



