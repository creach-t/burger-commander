// Scène de démarrage qui initialise le jeu
class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }
    
    preload() {
        // Charger les éléments essentiels pour l'écran de chargement
        this.load.image('logo', 'assets/images/ui/logo.png');
        this.load.image('loading_bar_bg', 'assets/images/ui/loading_bar_bg.png');
        this.load.image('loading_bar_fill', 'assets/images/ui/loading_bar_fill.png');
    }
    
    create() {
        // Définir les dimensions du jeu
        this.scale.setGameSize(config.width, config.height);
        
        // Configurer le système de physique
        this.physics.world.setBounds(0, 0, config.width, config.height);
        
        // Activer l'entrée sur tout l'écran de jeu
        this.input.setDefaultCursor('default');
        
        // Définir des constantes globales
        this.registry.set('score', 0);
        this.registry.set('level', 0);
        this.registry.set('orders_completed', 0);
        this.registry.set('high_score', 0);
        
        // Passer à la scène de préchargement
        this.scene.start('PreloadScene');
    }
}
