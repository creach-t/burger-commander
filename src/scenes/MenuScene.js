// Scène du menu principal
class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }
    
    create() {
        // Ajouter le fond d'écran
        this.add.image(0, 0, 'bg_menu').setOrigin(0).setScale(
            config.width / 800,
            config.height / 600
        );
        
        // Son de clic pour les boutons - gestion silencieuse des erreurs
        try {
            this.clickSound = this.sound.add('click', { volume: 0.8 });
        } catch (e) {
            // Créer un son vide si le son n'existe pas
            this.clickSound = { play: function() {} };
            console.log("Son 'click' non disponible");
        }
        
        // Ajouter le logo
        const logo = this.add.image(config.width / 2, config.height * 0.25, 'logo');
        logo.setScale(0.7);
        
        // Animation du logo
        this.tweens.add({
            targets: logo,
            y: logo.y - 15,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        // Créer le panneau des options de jeu
        this.createGameOptions();
        
        // Afficher le meilleur score
        const highScore = this.registry.get('high_score') || 0;
        const highScoreText = this.add.text(
            config.width / 2,
            config.height * 0.85,
            `Meilleur score: ${highScore}`,
            {
                fontSize: '24px',
                fill: '#fff',
                fontFamily: 'Arial, sans-serif',
                stroke: '#000',
                strokeThickness: 4
            }
        );
        highScoreText.setOrigin(0.5);
        
        // Ajouter les crédits
        const creditsText = this.add.text(
            config.width - 10,
            config.height - 10,
            'Burger Commander v1.0 - © 2025',
            {
                fontSize: '14px',
                fill: '#fff',
                fontFamily: 'Arial, sans-serif',
                stroke: '#000',
                strokeThickness: 2
            }
        );
        creditsText.setOrigin(1);
        
        // Ajouter du texte de debug pour aider
        const debugText = this.add.text(
            10,
            10,
            'Placeholders activés - Les assets sont générés dynamiquement',
            {
                fontSize: '14px',
                fill: '#FFFFFF',
                fontFamily: 'Arial, sans-serif',
                backgroundColor: '#333333',
                padding: { x: 5, y: 5 }
            }
        );
    }
    
    createGameOptions() {
        const panelY = config.height * 0.55;
        
        // Panneau pour les options
        const panel = this.add.image(config.width / 2, panelY, 'panel');
        panel.setScale(0.8);
        
        // Titre du panneau
        const titleText = this.add.text(
            config.width / 2,
            panelY - 85,
            'SÉLECTIONNEZ UN MODE DE JEU',
            {
                fontSize: '20px',
                fill: '#fff',
                fontFamily: 'Arial, sans-serif',
                stroke: '#000',
                strokeThickness: 3
            }
        );
        titleText.setOrigin(0.5);
        
        // Créer les boutons pour chaque niveau de difficulté
        this.createLevelButton(config.width / 2, panelY - 40, 'Facile', 0);
        this.createLevelButton(config.width / 2, panelY, 'Normal', 1);
        this.createLevelButton(config.width / 2, panelY + 40, 'Difficile', 2);
        
        // Bouton pour les tutoriels
        const tutorialButton = this.add.image(config.width / 2, panelY + 90, 'button');
        tutorialButton.setScale(0.7);
        
        const tutorialText = this.add.text(
            config.width / 2,
            panelY + 90,
            'Comment jouer',
            {
                fontSize: '18px',
                fill: '#000',
                fontFamily: 'Arial, sans-serif'
            }
        );
        tutorialText.setOrigin(0.5);
        
        // Rendre le bouton interactif
        tutorialButton.setInteractive();
        
        tutorialButton.on('pointerover', () => {
            tutorialButton.setTexture('button_hover');
        });
        
        tutorialButton.on('pointerout', () => {
            tutorialButton.setTexture('button');
        });
        
        tutorialButton.on('pointerdown', () => {
            console.log("Bouton tutoriel cliqué!");
            try {
                this.clickSound.play();
            } catch (e) {
                console.log("Erreur lors de la lecture du son");
            }
            this.showTutorial();
        });
    }
    
    createLevelButton(x, y, text, level) {
        // Créer le bouton avec l'image
        const button = this.add.image(x, y, 'button');
        button.setScale(0.7);
        
        // Texte du bouton
        const buttonText = this.add.text(
            x,
            y,
            text,
            {
                fontSize: '18px',
                fill: '#000',
                fontFamily: 'Arial, sans-serif'
            }
        );
        buttonText.setOrigin(0.5);
        
        // Rendre le bouton interactif
        button.setInteractive();
        
        button.on('pointerover', () => {
            button.setTexture('button_hover');
        });
        
        button.on('pointerout', () => {
            button.setTexture('button');
        });
        
        button.on('pointerdown', () => {
            console.log("Bouton niveau cliqué:", level);
            try {
                this.clickSound.play();
            } catch (e) {
                console.log("Erreur lors de la lecture du son");
            }
            this.startGamePlaceholder(level);
        });
        
        return button;
    }
    
    startGame(level) {
        console.log("Démarrage du jeu au niveau:", level);
        // Définir le niveau dans le registre global
        this.registry.set('level', level);
        
        // Démarrer la scène de jeu
        this.scene.start('GameScene');
    }
    
    startGamePlaceholder(level) {
        console.log("Démarrage du mode placeholder au niveau:", level);
        // Définir le niveau dans le registre global
        this.registry.set('level', level);
        
        // Créer un écran de remplacement pour GameScene
        const fullScreenCover = this.add.rectangle(
            config.width / 2, 
            config.height / 2,
            config.width,
            config.height,
            0x000000,
            0.7
        );
        
        // Panneau d'information
        const infoPanel = this.add.image(config.width / 2, config.height / 2, 'panel');
        infoPanel.setScale(1.2);
        
        // Titre
        const title = this.add.text(
            config.width / 2,
            config.height / 2 - 100,
            'MODE DE JEU PRÉLIMINAIRE',
            {
                fontSize: '24px',
                fill: '#FFFFFF',
                fontFamily: 'Arial, sans-serif',
                stroke: '#000000',
                strokeThickness: 3
            }
        );
        title.setOrigin(0.5);
        
        // Message explicatif
        const messageText = this.add.text(
            config.width / 2,
            config.height / 2,
            [
                "Cette version utilise des placeholders graphiques",
                "pour permettre le développement sans tous les assets.",
                "",
                "GameScene n'est pas encore complètement adaptée",
                "aux placeholders. Pour continuer le développement,",
                "vous pouvez créer les assets manquants ou adapter",
                "GameScene pour utiliser les placeholders."
            ],
            {
                fontSize: '18px',
                fill: '#FFFFFF',
                fontFamily: 'Arial, sans-serif',
                align: 'center'
            }
        );
        messageText.setOrigin(0.5);
        
        // Bouton de retour
        const backButton = this.add.image(config.width / 2, config.height / 2 + 120, 'button');
        
        const backText = this.add.text(
            config.width / 2,
            config.height / 2 + 120,
            'Retour au menu',
            {
                fontSize: '18px',
                fill: '#000',
                fontFamily: 'Arial, sans-serif'
            }
        );
        backText.setOrigin(0.5);
        
        // Rendre le bouton interactif
        backButton.setInteractive();
        
        backButton.on('pointerover', () => {
            backButton.setTexture('button_hover');
        });
        
        backButton.on('pointerout', () => {
            backButton.setTexture('button');
        });
        
        backButton.on('pointerdown', () => {
            // Supprimer tous les éléments
            fullScreenCover.destroy();
            infoPanel.destroy();
            title.destroy();
            messageText.destroy();
            backButton.destroy();
            backText.destroy();
        });
    }
    
    showTutorial() {
        console.log("Affichage du tutoriel");
        // Créer un panneau pour le tutoriel
        const tutorialPanel = this.add.image(config.width / 2, config.height / 2, 'panel');
        tutorialPanel.setScale(1.2);
        
        // Titre du tutoriel
        const tutorialTitle = this.add.text(
            config.width / 2,
            config.height / 2 - 150,
            'COMMENT JOUER',
            {
                fontSize: '24px',
                fill: '#fff',
                fontFamily: 'Arial, sans-serif',
                stroke: '#000',
                strokeThickness: 3
            }
        );
        tutorialTitle.setOrigin(0.5);
        
        // Instructions
        const instructions = [
            '1. Les clients commandent des burgers spécifiques',
            '2. Glissez les ingrédients dans la zone de préparation',
            '3. Empilez-les dans le bon ordre (de bas en haut)',
            '4. Validez la commande une fois terminée',
            '5. Soyez rapide pour gagner des points bonus!'
        ];
        
        const instructionsY = config.height / 2 - 80;
        let instructionTexts = [];
        
        instructions.forEach((instruction, index) => {
            const text = this.add.text(
                config.width / 2 - 180,
                instructionsY + index * 35,
                instruction,
                {
                    fontSize: '18px',
                    fill: '#000',
                    fontFamily: 'Arial, sans-serif'
                }
            );
            text.setOrigin(0, 0.5);
            instructionTexts.push(text);
        });
        
        // Bouton pour fermer le tutoriel
        const closeButton = this.add.image(config.width / 2, config.height / 2 + 130, 'button');
        closeButton.setScale(0.7);
        
        const closeText = this.add.text(
            config.width / 2,
            config.height / 2 + 130,
            'Compris!',
            {
                fontSize: '18px',
                fill: '#000',
                fontFamily: 'Arial, sans-serif'
            }
        );
        closeText.setOrigin(0.5);
        
        // Rendre le bouton interactif
        closeButton.setInteractive();
        
        closeButton.on('pointerover', () => {
            closeButton.setTexture('button_hover');
        });
        
        closeButton.on('pointerout', () => {
            closeButton.setTexture('button');
        });
        
        closeButton.on('pointerdown', () => {
            console.log("Fermeture du tutoriel");
            try {
                this.clickSound.play();
            } catch (e) {
                console.log("Erreur lors de la lecture du son");
            }
            tutorialPanel.destroy();
            tutorialTitle.destroy();
            instructionTexts.forEach(text => text.destroy());
            closeButton.destroy();
            closeText.destroy();
        });
    }
}
