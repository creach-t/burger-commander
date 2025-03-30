// Scène de fin de jeu
class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }
    
    init(data) {
        // Récupérer les données de fin de jeu
        this.score = data.score || 0;
        this.ordersCompleted = data.ordersCompleted || 0;
        this.level = data.level || 0;
        this.highScore = this.registry.get('high_score') || 0;
        
        // Vérifier si c'est un nouveau record
        this.isNewHighScore = this.score > this.highScore && this.score > 0;
    }
    
    create() {
        // Ajouter le fond d'écran
        this.add.image(0, 0, 'bg_gameover').setOrigin(0).setScale(
            config.width / 800,
            config.height / 600
        );
        
        // Jouer un son en fonction du résultat
        const sound = this.sound.add(
            this.score > 0 ? 'success' : 'error',
            { volume: 0.7 }
        );
        sound.play();
        
        // Effet sonore pour les boutons
        this.clickSound = this.sound.add('click', { volume: 0.8 });
        
        // Créer l'interface de fin de jeu
        this.createGameOverUI();
        
        // Ajouter les boutons de navigation
        this.createNavigationButtons();
    }
    
    createGameOverUI() {
        // Titre de fin de jeu
        const gameOverTitle = this.add.text(
            config.width / 2,
            80,
            'Partie Terminée!',
            {
                fontSize: '40px',
                fill: '#fff',
                fontFamily: 'Arial, sans-serif',
                stroke: '#000',
                strokeThickness: 6
            }
        );
        gameOverTitle.setOrigin(0.5);
        
        // Afficher un message en fonction du score
        let message = '';
        if (this.score >= 800) {
            message = 'Chef Burger Extraordinaire!';
        } else if (this.score >= 500) {
            message = 'Excellent travail!';
        } else if (this.score >= 300) {
            message = 'Bien joué!';
        } else if (this.score >= 100) {
            message = 'Pas mal du tout!';
        } else {
            message = 'Tu peux faire mieux!';
        }
        
        const messageText = this.add.text(
            config.width / 2,
            140,
            message,
            {
                fontSize: '30px',
                fill: '#fff',
                fontFamily: 'Arial, sans-serif',
                stroke: '#000',
                strokeThickness: 4
            }
        );
        messageText.setOrigin(0.5);
        
        // Panneau de statistiques
        const statsPanel = this.add.image(config.width / 2, config.height / 2, 'panel');
        statsPanel.setScale(1.2, 1);
        
        // Texte du score
        const scoreText = this.add.text(
            config.width / 2,
            config.height / 2 - 70,
            `Score: ${this.score}`,
            {
                fontSize: '32px',
                fill: '#fff',
                fontFamily: 'Arial, sans-serif',
                stroke: '#000',
                strokeThickness: 4
            }
        );
        scoreText.setOrigin(0.5);
        
        // Si c'est un nouveau record
        if (this.isNewHighScore) {
            const newHighScoreText = this.add.text(
                config.width / 2 + 150,
                config.height / 2 - 70,
                'NOUVEAU RECORD!',
                {
                    fontSize: '20px',
                    fill: '#ffff00',
                    fontFamily: 'Arial, sans-serif',
                    stroke: '#000',
                    strokeThickness: 3,
                    angle: 10
                }
            );
            newHighScoreText.setOrigin(0.5);
            
            // Animation du texte
            this.tweens.add({
                targets: newHighScoreText,
                scale: { from: 1, to: 1.2 },
                duration: 500,
                yoyo: true,
                repeat: -1
            });
        }
        
        // Commandes complétées
        const ordersText = this.add.text(
            config.width / 2,
            config.height / 2 - 25,
            `Commandes complétées: ${this.ordersCompleted}/${gameLevels[this.level].maxOrders}`,
            {
                fontSize: '24px',
                fill: '#fff',
                fontFamily: 'Arial, sans-serif',
                stroke: '#000',
                strokeThickness: 3
            }
        );
        ordersText.setOrigin(0.5);
        
        // Niveau de difficulté
        const difficultyNames = ['Facile', 'Normal', 'Difficile'];
        const levelText = this.add.text(
            config.width / 2,
            config.height / 2 + 20,
            `Difficulté: ${difficultyNames[this.level]}`,
            {
                fontSize: '24px',
                fill: '#fff',
                fontFamily: 'Arial, sans-serif',
                stroke: '#000',
                strokeThickness: 3
            }
        );
        levelText.setOrigin(0.5);
        
        // Meilleur score
        const highScoreText = this.add.text(
            config.width / 2,
            config.height / 2 + 65,
            `Meilleur score: ${this.highScore}`,
            {
                fontSize: '24px',
                fill: '#ffff00',
                fontFamily: 'Arial, sans-serif',
                stroke: '#000',
                strokeThickness: 3
            }
        );
        highScoreText.setOrigin(0.5);
    }
    
    createNavigationButtons() {
        // Bouton pour rejouer
        const replayButton = this.add.image(
            config.width / 2 - 120,
            config.height - 100,
            'button'
        );
        replayButton.setScale(0.8);
        
        const replayText = this.add.text(
            replayButton.x,
            replayButton.y,
            'REJOUER',
            {
                fontSize: '20px',
                fill: '#000',
                fontFamily: 'Arial, sans-serif'
            }
        );
        replayText.setOrigin(0.5);
        
        // Rendre le bouton interactif
        replayButton.setInteractive();
        
        replayButton.on('pointerover', () => {
            replayButton.setTexture('button_hover');
        });
        
        replayButton.on('pointerout', () => {
            replayButton.setTexture('button');
        });
        
        replayButton.on('pointerdown', () => {
            this.clickSound.play();
            this.scene.start('GameScene');
        });
        
        // Bouton pour retourner au menu
        const menuButton = this.add.image(
            config.width / 2 + 120,
            config.height - 100,
            'button'
        );
        menuButton.setScale(0.8);
        
        const menuText = this.add.text(
            menuButton.x,
            menuButton.y,
            'MENU',
            {
                fontSize: '20px',
                fill: '#000',
                fontFamily: 'Arial, sans-serif'
            }
        );
        menuText.setOrigin(0.5);
        
        // Rendre le bouton interactif
        menuButton.setInteractive();
        
        menuButton.on('pointerover', () => {
            menuButton.setTexture('button_hover');
        });
        
        menuButton.on('pointerout', () => {
            menuButton.setTexture('button');
        });
        
        menuButton.on('pointerdown', () => {
            this.clickSound.play();
            this.scene.start('MenuScene');
        });
    }
}
