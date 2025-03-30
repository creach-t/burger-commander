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
        
        // Son de clic pour les boutons
        // Note: Nous utilisons un son vide pour éviter les erreurs
        this.clickSound = this.sound.add('click', { volume: 0.8 });
        
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
            this.clickSound.play();
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
            this.clickSound.play();
            this.startGame(level);
        });
        
        return button;
    }
    
    startGame(level) {
        // Définir le niveau dans le registre global
        this.registry.set('level', level);
        
        // Afficher un message de démarrage
        const startingText = this.add.text(
            config.width / 2,
            config.height / 2,
            'Démarrage du jeu...',
            {
                fontSize: '30px',
                fontFamily: 'Arial, sans-serif',
                fill: '#fff',
                stroke: '#000',
                strokeThickness: 4
            }
        );
        startingText.setOrigin(0.5);
        startingText.depth = 1000;
        
        // Ajouter un message temporaire (puisque GameScene n'est pas encore implémentée)
        this.time.delayedCall(1000, () => {
            // Note: Nous redémarrons simplement MenuScene pour le moment
            // puisque GameScene n'est pas complètement implémentée
            this.registry.set('level', level);
            this.scene.start('MenuScene');
        });
    }
    
    showTutorial() {
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
            this.clickSound.play();
            tutorialPanel.destroy();
            tutorialTitle.destroy();
            instructionTexts.forEach(text => text.destroy());
            closeButton.destroy();
            closeText.destroy();
        });
    }
}
