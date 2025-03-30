// Scène de démarrage qui initialise le jeu
class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }
    
    preload() {
        // Créer des textures simples pour l'écran de chargement au lieu de charger des images
        this.createBasicLoadingAssets();
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
        
        // Afficher un message au centre de l'écran
        const loadingText = this.add.text(
            config.width / 2,
            config.height / 2,
            'Initialisation...',
            {
                fontSize: '24px',
                fill: '#fff',
                fontFamily: 'Arial, sans-serif'
            }
        );
        loadingText.setOrigin(0.5);
        
        // Passer à la scène de préchargement
        this.time.delayedCall(500, () => {
            this.scene.start('PreloadScene');
        });
    }
    
    createBasicLoadingAssets() {
        // Créer des rectangles colorés basiques pour l'écran de chargement
        this.createColoredRectTexture('logo', 0xff0000, 200, 100);
        this.createColoredRectTexture('loading_bar_bg', 0x333333, 300, 30);
        this.createColoredRectTexture('loading_bar_fill', 0x00ff00, 300, 30);
    }
    
    createColoredRectTexture(key, color, width, height) {
        // Créer une texture basique colorée
        const graphics = this.add.graphics();
        graphics.fillStyle(color, 1);
        graphics.fillRect(0, 0, width, height);
        
        // Ajouter un contour pour la visibilité
        graphics.lineStyle(2, 0x000000, 1);
        graphics.strokeRect(0, 0, width, height);
        
        // Générer une texture à partir du graphique
        graphics.generateTexture(key, width, height);
        graphics.destroy();
    }
}
