// Point d'entrée principal du jeu
window.addEventListener('load', () => {
    // Créer une instance du jeu avec la configuration
    const game = new Phaser.Game(config);
    
    // Ajouter les scènes au gestionnaire de scènes
    game.scene.add('BootScene', BootScene);
    game.scene.add('PreloadScene', PreloadScene);
    game.scene.add('MenuScene', MenuScene);
    game.scene.add('GameScene', GameScene);
    game.scene.add('GameOverScene', GameOverScene);
    
    // Démarrer avec la scène de chargement
    game.scene.start('BootScene');
});
