// Configuration principale du jeu Phaser
const config = {
    type: Phaser.AUTO, // Phaser décidera d'utiliser WebGL ou Canvas selon la compatibilité du navigateur
    width: 800,
    height: 600,
    backgroundColor: '#f8d8a8', // Couleur de fond
    parent: 'game-container', // ID du div qui contiendra le jeu
    pixelArt: false, // Pas de pixel art pour ce jeu
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, // Pas de gravité par défaut
            debug: false // Activer à true pour voir les hitbox et vecteurs de vitesse
        }
    },
    // Les scènes sont ajoutées dans main.js
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

// Configuration des ingrédients disponibles dans le jeu
const ingredients = {
    pains: [
        { key: 'pain_normal', name: 'Pain normal' },
        { key: 'pain_complet', name: 'Pain complet' },
        { key: 'pain_brioche', name: 'Pain brioche' }
    ],
    viandes: [
        { key: 'viande_boeuf', name: 'Steack de boeuf' },
        { key: 'viande_poulet', name: 'Poulet grillé' },
        { key: 'viande_vege', name: 'Galette végétarienne' }
    ],
    fromages: [
        { key: 'fromage_cheddar', name: 'Cheddar' },
        { key: 'fromage_emmental', name: 'Emmental' },
        { key: 'fromage_bleu', name: 'Bleu' }
    ],
    sauces: [
        { key: 'sauce_ketchup', name: 'Ketchup' },
        { key: 'sauce_mayo', name: 'Mayonnaise' },
        { key: 'sauce_bbq', name: 'Barbecue' }
    ],
    legumes: [
        { key: 'legume_salade', name: 'Salade' },
        { key: 'legume_tomate', name: 'Tomate' },
        { key: 'legume_oignon', name: 'Oignon' }
    ]
};

// Niveaux de difficulté
const gameLevels = [
    { 
        name: 'Facile', 
        orderTime: 60, 
        maxOrders: 5, 
        minIngredients: 3, 
        maxIngredients: 5 
    },
    { 
        name: 'Normal', 
        orderTime: 45, 
        maxOrders: 10, 
        minIngredients: 4, 
        maxIngredients: 6 
    },
    { 
        name: 'Difficile', 
        orderTime: 30, 
        maxOrders: 15, 
        minIngredients: 5, 
        maxIngredients: 7 
    }
];
