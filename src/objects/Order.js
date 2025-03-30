// Classe représentant une commande de burger
class Order {
    constructor(scene, level = 0) {
        this.scene = scene;
        this.level = level;
        this.ingredients = [];
        this.timeLimit = gameLevels[level].orderTime;
        
        // Générer une commande aléatoire
        this.generateRandomOrder();
    }
    
    // Générer une commande aléatoire selon le niveau de difficulté
    generateRandomOrder() {
        // Réinitialiser les ingrédients
        this.ingredients = [];
        
        // Déterminer le nombre d'ingrédients selon le niveau
        const minIngredients = gameLevels[this.level].minIngredients;
        const maxIngredients = gameLevels[this.level].maxIngredients;
        
        const numIngredients = Phaser.Math.Between(minIngredients, maxIngredients);
        
        // Catégories disponibles
        const categories = Object.keys(ingredients);
        
        // Toujours inclure au moins un pain en bas et un pain en haut
        const bottomBunIndex = Phaser.Math.Between(0, ingredients.pains.length - 1);
        this.ingredients.push({
            type: 'pains',
            key: ingredients.pains[bottomBunIndex].key,
            name: ingredients.pains[bottomBunIndex].name,
            position: 'bottom'
        });
        
        // Ajouter des ingrédients aléatoires au milieu
        for (let i = 0; i < numIngredients - 2; i++) {
            // Choisir une catégorie aléatoire sauf les pains
            const categoryIndex = Phaser.Math.Between(1, categories.length - 1);
            const category = categories[categoryIndex];
            
            // Choisir un ingrédient aléatoire de cette catégorie
            const items = ingredients[category];
            const itemIndex = Phaser.Math.Between(0, items.length - 1);
            
            this.ingredients.push({
                type: category,
                key: items[itemIndex].key,
                name: items[itemIndex].name,
                position: 'middle'
            });
        }
        
        // Ajouter le pain du dessus
        const topBunIndex = Phaser.Math.Between(0, ingredients.pains.length - 1);
        this.ingredients.push({
            type: 'pains',
            key: ingredients.pains[topBunIndex].key,
            name: ingredients.pains[topBunIndex].name,
            position: 'top'
        });
    }
    
    // Créer une représentation graphique de la commande dans une bulle de dialogue
    createVisualRepresentation(x, y, width, height) {
        // Créer un groupe pour les ingrédients visuels
        const visualGroup = this.scene.add.group();
        
        // Calculer l'espacement vertical
        const spacing = height / (this.ingredients.length + 1);
        
        // Ajouter chaque ingrédient visuellement
        for (let i = 0; i < this.ingredients.length; i++) {
            const ingredient = this.ingredients[i];
            const yPos = y + spacing * (i + 1);
            
            // Créer un sprite miniature pour chaque ingrédient
            const sprite = this.scene.add.sprite(x, yPos, ingredient.key);
            sprite.setScale(0.4); // Plus petit pour tenir dans la bulle
            visualGroup.add(sprite);
            
            // Ajouter un texte descriptif à côté
            const text = this.scene.add.text(
                x + 30, 
                yPos, 
                ingredient.name, 
                { 
                    fontSize: '12px', 
                    fill: '#000' 
                }
            );
            text.setOrigin(0, 0.5);
            visualGroup.add(text);
        }
        
        return visualGroup;
    }
    
    // Vérifier si la commande préparée correspond à la commande demandée
    checkOrder(preparedIngredients) {
        // Si le nombre d'ingrédients est différent, la commande est incorrecte
        if (preparedIngredients.length !== this.ingredients.length) {
            return {
                correct: false,
                message: "Nombre d'ingrédients incorrect!"
            };
        }
        
        // Vérifier chaque ingrédient dans l'ordre
        for (let i = 0; i < this.ingredients.length; i++) {
            const expected = this.ingredients[i];
            const actual = preparedIngredients[i];
            
            // Si le type ou la clé de l'ingrédient ne correspond pas
            if (expected.type !== actual.type || expected.key !== actual.key) {
                return {
                    correct: false,
                    message: `Ingrédient incorrect: ${expected.name} attendu, mais ${actual.name} reçu.`
                };
            }
        }
        
        // Tous les ingrédients correspondent
        return {
            correct: true,
            message: "Commande parfaitement exécutée!"
        };
    }
    
    // Calculer les points obtenus pour cette commande
    calculatePoints(timeRemaining, isCorrect) {
        if (!isCorrect) {
            return 0;
        }
        
        // Points de base pour une commande correcte
        let points = 100;
        
        // Bonus pour la rapidité
        const timeBonus = Math.floor(timeRemaining / this.timeLimit * 100);
        
        // Bonus pour la difficulté
        const difficultyBonus = this.level * 50;
        
        // Total des points
        return points + timeBonus + difficultyBonus;
    }
    
    // Obtenir une description textuelle de la commande
    getTextDescription() {
        let description = "Commande: ";
        
        this.ingredients.forEach((ingredient, index) => {
            description += ingredient.name;
            if (index < this.ingredients.length - 1) {
                description += ", ";
            }
        });
        
        return description;
    }
}
