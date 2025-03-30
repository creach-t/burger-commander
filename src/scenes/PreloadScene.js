// Scène de préchargement des ressources
class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }
    
    preload() {
        // Créer des textures basiques pour remplacer les assets manquants
        this.createPlaceholderTextures();
        
        // Afficher l'écran de chargement
        this.createLoadingScreen();
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
        
        // Simuler un chargement progressif
        let progress = 0;
        const loadingTimer = this.time.addEvent({
            delay: 50,
            callback: () => {
                progress += 0.01;
                if (progress > 1) {
                    progress = 1;
                    loadingTimer.remove();
                    loadingText.setText('Chargement terminé!');
                }
                progressBar.scaleX = progress;
            },
            callbackScope: this,
            loop: true
        });
    }
    
    createPlaceholderTextures() {
        // Créer des rectangles colorés basiques pour remplacer les images manquantes
        
        // Textures de base pour l'interface
        this.createColoredRectTexture('logo', 0xff6347, 200, 100, 'BURGER COMMANDER');
        this.createColoredRectTexture('loading_bar_bg', 0x333333, 300, 30);
        this.createColoredRectTexture('loading_bar_fill', 0x00ff00, 300, 30);
        this.createColoredRectTexture('button', 0x3498db, 200, 50);
        this.createColoredRectTexture('button_hover', 0x2980b9, 200, 50);
        this.createColoredRectTexture('panel', 0x2c3e50, 400, 300);
        this.createColoredRectTexture('speech_bubble', 0xf1c40f, 200, 150);
        this.createColoredRectTexture('score_panel', 0xff9900, 200, 100);
        this.createColoredRectTexture('timer_bg', 0x666666, 200, 30);
        this.createColoredRectTexture('timer_fill', 0xff0000, 200, 30);
        this.createColoredRectTexture('plate', 0xaaaaaa, 100, 100);
        this.createColoredRectTexture('check', 0x00ff00, 50, 50, '✓');
        this.createColoredRectTexture('cross', 0xff0000, 50, 50, '✗');
        
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
            this.createColoredRectTexture(key, color, 80, 20, key.split('_')[1]);
        }
        
        // Personnages
        this.createColoredRectTexture('client', 0x996633, 100, 200, 'CLIENT');
        this.createColoredRectTexture('client_angry', 0xff6633, 100, 200, 'ANGRY');
        this.createColoredRectTexture('client_happy', 0x66ff33, 100, 200, 'HAPPY');
        this.createColoredRectTexture('chef', 0xffffff, 100, 200, 'CHEF');
        
        // Fonds d'écran
        this.createColoredRectTexture('bg_menu', 0x2c3e50, config.width, config.height);
        this.createColoredRectTexture('bg_game', 0x27ae60, config.width, config.height);
        this.createColoredRectTexture('bg_gameover', 0xc0392b, config.width, config.height);
        this.createColoredRectTexture('counter', 0xe67e22, 800, 100, 'COUNTER');
        
        // Créer des sons vides pour éviter les erreurs
        this.createEmptySoundAsset('click');
        this.createEmptySoundAsset('success');
        this.createEmptySoundAsset('error');
        this.createEmptySoundAsset('ingredient_drop');
        this.createEmptySoundAsset('time_warning');
        this.createEmptySoundAsset('menu_music');
        this.createEmptySoundAsset('game_music');
    }
    
    createColoredRectTexture(key, color, width, height, text) {
        // Créer une texture basique colorée
        const graphics = this.add.graphics();
        graphics.fillStyle(color, 1);
        graphics.fillRect(0, 0, width, height);
        
        // Dessiner un texte simple sur la texture si fourni
        if (text) {
            // Ajouter une zone de texte temporaire pour déterminer la taille du texte
            const tempText = this.add.text(0, 0, text, {
                fontSize: Math.min(18, height / 2),
                fill: '#fff',
                fontFamily: 'Arial'
            });
            
            // Calculer la position pour centrer le texte
            const textX = (width - tempText.width) / 2;
            const textY = (height - tempText.height) / 2;
            
            // Nettoyer l'objet temporaire
            tempText.destroy();
            
            // Ajouter le texte au graphique
            graphics.fillStyle(0x000000, 0.3);
            graphics.fillRect(textX - 2, textY - 2, width - (textX - 2) * 2, height - (textY - 2) * 2);
            
            // Ajouter un texte dans la texture
            const textObj = this.add.text(textX, textY, text, {
                fontSize: Math.min(18, height / 2),
                fill: '#fff',
                fontFamily: 'Arial'
            });
            
            // Générer une texture à partir du graphique incluant le texte
            this.game.renderer.snapshot((snapshot) => {
                this.textures.addImage(key, snapshot);
            });
            
            // Nettoyer les objets après avoir généré la texture
            textObj.destroy();
        } else {
            // Dessiner un contour pour mieux distinguer les éléments
            graphics.lineStyle(2, 0x000000, 1);
            graphics.strokeRect(0, 0, width, height);
            
            // Générer une texture à partir du graphique sans texte
            graphics.generateTexture(key, width, height);
        }
        
        // Nettoyer le graphique
        graphics.destroy();
    }
    
    createEmptySoundAsset(key) {
        try {
            // Ajouter un audio vide pour éviter les erreurs
            this.cache.audio.add(key, { });
            
            // Alternative en créant un objet audio factice
            this.sound.add(key, {
                mute: true,
                volume: 0,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: false,
                delay: 0
            });
        } catch (e) {
            console.log(`Erreur lors de la création du son ${key}:`, e);
        }
    }
}
