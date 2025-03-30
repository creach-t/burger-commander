// Scène de préchargement des ressources
class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }
    
    preload() {
        // Créer un écran de chargement
        this.createLoadingScreen();
        
        // Charger les images d'interface utilisateur
        this.loadUIAssets();
        
        // Charger les images des ingrédients
        this.loadIngredientAssets();
        
        // Charger les sons et la musique
        this.loadAudioAssets();
        
        // Charger les sprites des personnages
        this.loadCharacterAssets();
        
        // Charger les fonds d'écran
        this.loadBackgroundAssets();
    }
    
    create() {
        // Créer les animations
        this.createAnimations();
        
        // Passer à la scène de menu après un court délai
        this.time.delayedCall(500, () => {
            this.scene.start('MenuScene');
        });
    }
    
    createLoadingScreen() {
        // Afficher le logo du jeu
        const logo = this.add.image(config.width / 2, config.height / 3, 'logo');
        logo.setScale(0.5);
        
        // Créer une barre de chargement
        const progressBarBg = this.add.image(
            config.width / 2,
            config.height * 0.65,
            'loading_bar_bg'
        );
        
        const progressBar = this.add.image(
            config.width / 2 - progressBarBg.width / 2,
            config.height * 0.65,
            'loading_bar_fill'
        );
        progressBar.setOrigin(0, 0.5);
        
        // Texte de chargement
        const loadingText = this.add.text(
            config.width / 2,
            config.height * 0.75,
            'Chargement...',
            {
                fontSize: '24px',
                fill: '#fff',
                fontFamily: 'Arial, sans-serif'
            }
        );
        loadingText.setOrigin(0.5);
        
        // Mettre à jour la barre de progression pendant le chargement
        this.load.on('progress', (value) => {
            progressBar.scaleX = value;
        });
        
        // Mettre à jour le texte avec les ressources chargées
        this.load.on('fileprogress', (file) => {
            loadingText.setText(`Chargement: ${file.key}`);
        });
        
        // Nettoyer les événements une fois terminé
        this.load.on('complete', () => {
            loadingText.setText('Chargement terminé!');
        });
    }
    
    loadUIAssets() {
        // Éléments d'interface
        this.load.image('button', 'assets/images/ui/button.png');
        this.load.image('button_hover', 'assets/images/ui/button_hover.png');
        this.load.image('panel', 'assets/images/ui/panel.png');
        this.load.image('speech_bubble', 'assets/images/ui/speech_bubble.png');
        this.load.image('score_panel', 'assets/images/ui/score_panel.png');
        this.load.image('timer_bg', 'assets/images/ui/timer_bg.png');
        this.load.image('timer_fill', 'assets/images/ui/timer_fill.png');
        this.load.image('plate', 'assets/images/ui/plate.png');
        this.load.image('check', 'assets/images/ui/check.png');
        this.load.image('cross', 'assets/images/ui/cross.png');
    }
    
    loadIngredientAssets() {
        // Pains
        this.load.image('pain_normal', 'assets/images/ingredients/pain_normal.png');
        this.load.image('pain_complet', 'assets/images/ingredients/pain_complet.png');
        this.load.image('pain_brioche', 'assets/images/ingredients/pain_brioche.png');
        
        // Viandes
        this.load.image('viande_boeuf', 'assets/images/ingredients/viande_boeuf.png');
        this.load.image('viande_poulet', 'assets/images/ingredients/viande_poulet.png');
        this.load.image('viande_vege', 'assets/images/ingredients/viande_vege.png');
        
        // Fromages
        this.load.image('fromage_cheddar', 'assets/images/ingredients/fromage_cheddar.png');
        this.load.image('fromage_emmental', 'assets/images/ingredients/fromage_emmental.png');
        this.load.image('fromage_bleu', 'assets/images/ingredients/fromage_bleu.png');
        
        // Sauces
        this.load.image('sauce_ketchup', 'assets/images/ingredients/sauce_ketchup.png');
        this.load.image('sauce_mayo', 'assets/images/ingredients/sauce_mayo.png');
        this.load.image('sauce_bbq', 'assets/images/ingredients/sauce_bbq.png');
        
        // Légumes
        this.load.image('legume_salade', 'assets/images/ingredients/legume_salade.png');
        this.load.image('legume_tomate', 'assets/images/ingredients/legume_tomate.png');
        this.load.image('legume_oignon', 'assets/images/ingredients/legume_oignon.png');
    }
    
    loadAudioAssets() {
        // Effets sonores
        this.load.audio('click', 'assets/audio/click.mp3');
        this.load.audio('success', 'assets/audio/success.mp3');
        this.load.audio('error', 'assets/audio/error.mp3');
        this.load.audio('ingredient_drop', 'assets/audio/ingredient_drop.mp3');
        this.load.audio('time_warning', 'assets/audio/time_warning.mp3');
        
        // Musique de fond
        this.load.audio('menu_music', 'assets/audio/menu_music.mp3');
        this.load.audio('game_music', 'assets/audio/game_music.mp3');
    }
    
    loadCharacterAssets() {
        // Sprites des clients
        this.load.image('client', 'assets/images/characters/client.png');
        this.load.image('client_angry', 'assets/images/characters/client_angry.png');
        this.load.image('client_happy', 'assets/images/characters/client_happy.png');
        
        // Sprite du joueur/chef
        this.load.image('chef', 'assets/images/characters/chef.png');
    }
    
    loadBackgroundAssets() {
        // Fonds d'écran
        this.load.image('bg_menu', 'assets/images/backgrounds/bg_menu.png');
        this.load.image('bg_game', 'assets/images/backgrounds/bg_game.png');
        this.load.image('bg_gameover', 'assets/images/backgrounds/bg_gameover.png');
        this.load.image('counter', 'assets/images/backgrounds/counter.png');
    }
    
    createAnimations() {
        // Animation pour les ingrédients
        this.anims.create({
            key: 'ingredient_bounce',
            frames: this.anims.generateFrameNumbers('ingredient_sheet', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: 0
        });
        
        // Animation pour le chef
        this.anims.create({
            key: 'chef_idle',
            frames: this.anims.generateFrameNumbers('chef_sheet', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
    }
}
