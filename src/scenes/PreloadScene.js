// Scène de préchargement des ressources
class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }
    
    preload() {
        // Créer des textures basiques pour remplacer les assets manquants
        this.createPlaceholderTextures();
        
        // Passer à la scène de menu directement
        // Note: Nous sautons le chargement des assets pour éviter les erreurs
    }
    
    create() {
        // Afficher un message de chargement
        const loadingText = this.add.text(
            config.width / 2,
            config.height / 2,
            'Chargement terminé!',
            {
                fontSize: '24px',
                fill: '#fff',
                fontFamily: 'Arial, sans-serif'
            }
        );
        loadingText.setOrigin(0.5);
        
        // Passer à la scène de menu après un court délai
        this.time.delayedCall(1000, () => {
            this.scene.start('MenuScene');
        });
    }
    
    createPlaceholderTextures() {
        // Créer des rectangles colorés basiques pour remplacer les images manquantes
        
        // Textures de base pour l'interface
        this.createColoredRectTexture('logo', 0xff0000, 200, 100);
        this.createColoredRectTexture('loading_bar_bg', 0x333333, 300, 30);
        this.createColoredRectTexture('loading_bar_fill', 0x00ff00, 300, 30);
        this.createColoredRectTexture('button', 0x0000ff, 200, 50);
        this.createColoredRectTexture('button_hover', 0x00aaff, 200, 50);
        this.createColoredRectTexture('panel', 0x999999, 400, 300);
        this.createColoredRectTexture('speech_bubble', 0xffff00, 200, 150);
        this.createColoredRectTexture('score_panel', 0xff9900, 200, 100);
        this.createColoredRectTexture('timer_bg', 0x666666, 200, 30);
        this.createColoredRectTexture('timer_fill', 0xff0000, 200, 30);
        this.createColoredRectTexture('plate', 0xaaaaaa, 100, 100);
        this.createColoredRectTexture('check', 0x00ff00, 50, 50);
        this.createColoredRectTexture('cross', 0xff0000, 50, 50);
        
        // Ingrédients
        const ingredientColors = {
            'pain_normal': 0xddaa77, 
            'pain_complet': 0xbb7744, 
            'pain_brioche': 0xffcc88,
            'viande_boeuf': 0x884400, 
            'viande_poulet': 0xffddaa, 
            'viande_vege': 0x44aa44,
            'fromage_cheddar': 0xffbb22, 
            'fromage_emmental': 0xffffaa, 
            'fromage_bleu': 0xaaddff,
            'sauce_ketchup': 0xff0000, 
            'sauce_mayo': 0xffffdd, 
            'sauce_bbq': 0x883300,
            'legume_salade': 0x00dd00, 
            'legume_tomate': 0xff4444, 
            'legume_oignon': 0xffddff
        };
        
        for (const [key, color] of Object.entries(ingredientColors)) {
            this.createColoredRectTexture(key, color, 80, 20);
        }
        
        // Personnages
        this.createColoredRectTexture('client', 0x996633, 100, 200);
        this.createColoredRectTexture('client_angry', 0xff6633, 100, 200);
        this.createColoredRectTexture('client_happy', 0x66ff33, 100, 200);
        this.createColoredRectTexture('chef', 0xffffff, 100, 200);
        
        // Fonds d'écran
        this.createColoredRectTexture('bg_menu', 0x333333, config.width, config.height);
        this.createColoredRectTexture('bg_game', 0x227722, config.width, config.height);
        this.createColoredRectTexture('bg_gameover', 0x772222, config.width, config.height);
        this.createColoredRectTexture('counter', 0x664422, 800, 100);
        
        // Créer des sons vides pour éviter les erreurs
        this.createEmptySoundAsset('click');
        this.createEmptySoundAsset('success');
        this.createEmptySoundAsset('error');
        this.createEmptySoundAsset('ingredient_drop');
        this.createEmptySoundAsset('time_warning');
        this.createEmptySoundAsset('menu_music');
        this.createEmptySoundAsset('game_music');
    }
    
    createColoredRectTexture(key, color, width, height) {
        // Créer une texture basique colorée
        const graphics = this.add.graphics();
        graphics.fillStyle(color, 1);
        graphics.fillRect(0, 0, width, height);
        
        // Dessiner un texte simple sur la texture
        graphics.lineStyle(2, 0x000000, 1);
        graphics.strokeRect(0, 0, width, height);
        
        // Générer une texture à partir du graphique
        graphics.generateTexture(key, width, height);
        graphics.destroy();
    }
    
    createEmptySoundAsset(key) {
        // Ajouter un audio vide pour éviter les erreurs
        this.cache.audio.add(key, { });
    }
}
