// Scène principale du jeu
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }
    
    init() {
        // Initialiser les variables de jeu
        this.score = 0;
        this.level = this.registry.get('level') || 0;
        this.ordersCompleted = 0;
        this.maxOrders = gameLevels[this.level].maxOrders;
        this.remainingTime = gameLevels[this.level].orderTime;
        this.preparedIngredients = [];
        this.currentOrder = null;
        this.currentClient = null;
        this.isGameOver = false;
    }
    
    create() {
        // Ajouter le fond d'écran
        this.add.image(0, 0, 'bg_game').setOrigin(0).setScale(
            config.width / 800,
            config.height / 600
        );
        
        // Ajouter le comptoir
        const counter = this.add.image(config.width / 2, config.height * 0.75, 'counter');
        counter.setScale(1.2);
        
        // Créer l'interface utilisateur
        this.createUI();
        
        // Créer la zone des ingrédients disponibles
        this.createIngredientsArea();
        
        // Créer la zone de préparation du burger
        this.createPreparationArea();
        
        // Lancer la musique de jeu
        this.music = this.sound.add('game_music', { loop: true, volume: 0.4 });
        this.music.play();
        
        // Charger les effets sonores
        this.loadSoundEffects();
        
        // Démarrer la première commande
        this.startNewOrder();
        
        // Démarrer le timer principal du jeu
        this.createGameTimer();
    }
    
    update() {
        // Mettre à jour le timer
        if (this.orderTimer && !this.isGameOver) {
            this.updateOrderTimer();
        }
    }
    
    createUI() {
        // Panneau de score en haut à gauche
        const scorePanel = this.add.image(120, 50, 'score_panel');
        scorePanel.setScale(0.8);
        
        // Texte du score
        this.scoreText = this.add.text(
            120,
            50,
            '0',
            {
                fontSize: '28px',
                fill: '#fff',
                fontFamily: 'Arial, sans-serif',
                stroke: '#000',
                strokeThickness: 4
            }
        );
        this.scoreText.setOrigin(0.5);
        
        // Étiquette du score
        const scoreLabel = this.add.text(
            120,
            25,
            'SCORE',
            {
                fontSize: '18px',
                fill: '#fff',
                fontFamily: 'Arial, sans-serif',
                stroke: '#000',
                strokeThickness: 3
            }
        );
        scoreLabel.setOrigin(0.5);
        
        // Panneau du nombre de commandes
        const ordersPanel = this.add.image(680, 50, 'score_panel');
        ordersPanel.setScale(0.8);
        
        // Texte du nombre de commandes
        this.ordersText = this.add.text(
            680,
            50,
            `${this.ordersCompleted}/${this.maxOrders}`,
            {
                fontSize: '24px',
                fill: '#fff',
                fontFamily: 'Arial, sans-serif',
                stroke: '#000',
                strokeThickness: 4
            }
        );
        this.ordersText.setOrigin(0.5);
        
        // Étiquette des commandes
        const ordersLabel = this.add.text(
            680,
            25,
            'COMMANDES',
            {
                fontSize: '16px',
                fill: '#fff',
                fontFamily: 'Arial, sans-serif',
                stroke: '#000',
                strokeThickness: 3
            }
        );
        ordersLabel.setOrigin(0.5);
        
        // Timer pour la commande actuelle
        this.timerBg = this.add.image(config.width / 2, 50, 'timer_bg');
        this.timerBg.setScale(0.8, 0.6);
        
        this.timerFill = this.add.image(
            this.timerBg.x - this.timerBg.displayWidth * 0.5 * 0.8,
            50,
            'timer_fill'
        );
        this.timerFill.setOrigin(0, 0.5);
        this.timerFill.setScale(0.8, 0.6);
        
        // Bouton de validation de la commande
        this.validateButton = this.add.image(
            config.width / 2,
            config.height - 60,
            'button'
        );
        this.validateButton.setScale(0.8);
        
        const validateText = this.add.text(
            this.validateButton.x,
            this.validateButton.y,
            'VALIDER',
            {
                fontSize: '20px',
                fill: '#000',
                fontFamily: 'Arial, sans-serif'
            }
        );
        validateText.setOrigin(0.5);
        
        // Rendre le bouton interactif
        this.validateButton.setInteractive();
        
        this.validateButton.on('pointerover', () => {
            this.validateButton.setTexture('button_hover');
        });
        
        this.validateButton.on('pointerout', () => {
            this.validateButton.setTexture('button');
        });
        
        this.validateButton.on('pointerdown', () => {
            this.clickSound.play();
            this.validateOrder();
        });
        
        // Bouton de retour au menu
        const backButton = this.add.image(50, config.height - 30, 'button');
        backButton.setScale(0.5);
        
        const backText = this.add.text(
            backButton.x,
            backButton.y,
            'MENU',
            {
                fontSize: '16px',
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
            this.clickSound.play();
            this.music.stop();
            this.scene.start('MenuScene');
        });
    }
    
    createIngredientsArea() {
        // Conteneur principal pour les ingrédients
        this.ingredientsContainer = this.add.container(0, 0);
        
        // Position de départ à gauche
        const startX = 80;
        const endX = config.width - 80;
        const ingredientsY = config.height - 120;
        
        // Organiser les ingrédients par catégorie
        let x = startX;
        const categoriesCount = Object.keys(ingredients).length;
        const spacing = (endX - startX) / (categoriesCount - 1);
        
        // Créer des ingrédients pour chaque catégorie
        Object.keys(ingredients).forEach((category, catIndex) => {
            const items = ingredients[category];
            
            // Créer un panneau pour la catégorie
            const panel = this.add.image(x, ingredientsY - 60, 'panel');
            panel.setScale(0.4, 0.3);
            
            // Titre de la catégorie
            const categoryTitle = this.add.text(
                x,
                ingredientsY - 60,
                category.charAt(0).toUpperCase() + category.slice(1),
                {
                    fontSize: '14px',
                    fill: '#fff',
                    fontFamily: 'Arial, sans-serif',
                    stroke: '#000',
                    strokeThickness: 2
                }
            );
            categoryTitle.setOrigin(0.5);
            
            // Ajouter les ingrédients de cette catégorie
            items.forEach((item, itemIndex) => {
                const itemX = x;
                const itemY = ingredientsY + itemIndex * 40;
                
                // Créer l'ingrédient et le rendre interactif
                const ingredient = new Ingredient(
                    this,
                    itemX,
                    itemY,
                    item.key,
                    category,
                    item.name,
                    true
                );
                
                this.ingredientsContainer.add(ingredient);
            });
            
            // Passer à la position de la prochaine catégorie
            x += spacing;
        });
    }
    
    createPreparationArea() {
        // Créer une assiette pour assembler le burger
        this.plate = this.add.image(config.width / 2, config.height / 2 + 50, 'plate');
        this.plate.setScale(0.8);
        
        // Zone pour déposer les ingrédients
        this.dropZone = this.add.zone(
            this.plate.x,
            this.plate.y,
            this.plate.displayWidth * 0.8,
            this.plate.displayHeight * 0.8
        );
        this.dropZone.setRectangleDropZone(
            this.plate.displayWidth * 0.8,
            this.plate.displayHeight * 0.8
        );
        
        // Visualiser la zone de drop (seulement pour le debug)
        if (config.physics.arcade.debug) {
            const graphics = this.add.graphics();
            graphics.lineStyle(2, 0xffff00);
            graphics.strokeRect(
                this.dropZone.x - this.dropZone.input.hitArea.width / 2,
                this.dropZone.y - this.dropZone.input.hitArea.height / 2,
                this.dropZone.input.hitArea.width,
                this.dropZone.input.hitArea.height
            );
        }
    }
    
    loadSoundEffects() {
        this.clickSound = this.sound.add('click', { volume: 0.8 });
        this.successSound = this.sound.add('success', { volume: 0.8 });
        this.errorSound = this.sound.add('error', { volume: 0.8 });
        this.dropSound = this.sound.add('ingredient_drop', { volume: 0.5 });
        this.timeWarningSound = this.sound.add('time_warning', { volume: 0.6 });
    }
    
    startNewOrder() {
        // Créer une nouvelle commande
        this.currentOrder = new Order(this, this.level);
        
        // Créer un nouveau client
        if (this.currentClient) {
            this.currentClient.exit(() => {
                this.createNewClient();
            });
        } else {
            this.createNewClient();
        }
        
        // Réinitialiser les ingrédients préparés
        this.preparedIngredients = [];
        
        // Réinitialiser le timer
        this.remainingTime = gameLevels[this.level].orderTime;
        this.createOrderTimer();
    }
    
    createNewClient() {
        this.currentClient = new Client(this, 200, config.height * 0.3);
        this.currentClient.enter();
        
        // Afficher la commande du client
        this.time.delayedCall(1000, () => {
            this.currentClient.displayOrder(this.currentOrder);
            
            // Créer une représentation visuelle de la commande
            const orderVisual = this.currentOrder.createVisualRepresentation(
                250,
                config.height * 0.23,
                280,
                150
            );
            
            // Stocker la référence pour pouvoir la supprimer plus tard
            this.currentOrderVisual = orderVisual;
        });
    }
    
    createOrderTimer() {
        // Arrêter le timer existant s'il y en a un
        if (this.orderTimer) {
            this.orderTimer.remove();
        }
        
        // Réinitialiser la barre de timer
        this.timerFill.scaleX = 0.8;
        
        // Créer un nouveau timer
        this.orderTimer = this.time.addEvent({
            delay: 1000,  // 1 seconde
            callback: this.decrementTimer,
            callbackScope: this,
            loop: true
        });
        
        // Démarrer le timer de patience du client
        if (this.currentClient) {
            this.currentClient.startPatienceTimer(this.remainingTime);
        }
    }
    
    decrementTimer() {
        if (this.remainingTime > 0) {
            this.remainingTime--;
            
            // Jouer le son d'avertissement quand il reste peu de temps
            if (this.remainingTime <= 5 && this.remainingTime > 0) {
                this.timeWarningSound.play();
            }
            
            // Si le temps est écoulé, marquer la commande comme ratée
            if (this.remainingTime <= 0) {
                this.orderTimedOut();
            }
        }
    }
    
    updateOrderTimer() {
        // Mettre à jour la barre de progression du timer
        const timeRatio = this.remainingTime / gameLevels[this.level].orderTime;
        this.timerFill.scaleX = timeRatio * 0.8;
        
        // Changer la couleur en fonction du temps restant
        if (timeRatio > 0.6) {
            this.timerFill.setTint(0x00ff00); // Vert
        } else if (timeRatio > 0.3) {
            this.timerFill.setTint(0xffff00); // Jaune
        } else {
            this.timerFill.setTint(0xff0000); // Rouge
        }
    }
    
    orderTimedOut() {
        // Arrêter le timer
        if (this.orderTimer) {
            this.orderTimer.remove();
            this.orderTimer = null;
        }
        
        // Rendre le client mécontent
        if (this.currentClient) {
            this.currentClient.reactToIncorrectOrder();
        }
        
        // Jouer un son d'erreur
        this.errorSound.play();
        
        // Afficher un message d'échec
        this.showFeedback(false, "Temps écoulé !");
        
        // Passer à la prochaine commande après un délai
        this.time.delayedCall(2000, () => {
            this.nextOrder();
        });
    }
    
    checkIngredientPlacement(ingredient, pointer) {
        // Vérifier si l'ingrédient est déposé dans la zone de l'assiette
        const dropZoneBounds = this.dropZone.getBounds();
        
        if (Phaser.Geom.Rectangle.Contains(
            dropZoneBounds,
            pointer.x,
            pointer.y
        )) {
            // Créer une copie de l'ingrédient dans l'assiette
            const copy = ingredient.createCopy(
                this.plate.x,
                this.plate.y - 20 * this.preparedIngredients.length,
                false
            );
            
            // Ajouter l'ingrédient à la pile dans l'assiette
            this.preparedIngredients.push(copy);
            
            // Jouer l'animation et le son
            copy.playDropAnimation();
            this.dropSound.play();
            
            // Retourner l'ingrédient original à sa position initiale
            ingredient.x = ingredient.input.dragStartX;
            ingredient.y = ingredient.input.dragStartY;
            
            return true;
        } else {
            // Retourner l'ingrédient à sa position initiale
            ingredient.x = ingredient.input.dragStartX;
            ingredient.y = ingredient.input.dragStartY;
            
            return false;
        }
    }
    
    validateOrder() {
        if (this.preparedIngredients.length === 0) {
            // Pas d'ingrédients à valider
            return;
        }
        
        // Arrêter le timer
        if (this.orderTimer) {
            this.orderTimer.remove();
            this.orderTimer = null;
        }
        
        // Vérifier si la commande est correcte
        const result = this.currentOrder.checkOrder(this.preparedIngredients);
        
        if (result.correct) {
            // Commande correcte
            this.successSound.play();
            
            // Calculer les points en fonction du temps restant
            const points = this.currentOrder.calculatePoints(this.remainingTime, true);
            this.score += points;
            
            // Mettre à jour l'affichage du score
            this.scoreText.setText(this.score.toString());
            
            // Rendre le client content
            if (this.currentClient) {
                this.currentClient.reactToCorrectOrder();
            }
            
            // Afficher un message de succès
            this.showFeedback(true, `+${points} points !`);
            
            // Incrémenter le compteur de commandes
            this.ordersCompleted++;
            this.ordersText.setText(`${this.ordersCompleted}/${this.maxOrders}`);
        } else {
            // Commande incorrecte
            this.errorSound.play();
            
            // Rendre le client mécontent
            if (this.currentClient) {
                this.currentClient.reactToIncorrectOrder();
            }
            
            // Afficher un message d'erreur
            this.showFeedback(false, result.message);
        }
        
        // Passer à la prochaine commande après un délai
        this.time.delayedCall(2000, () => {
            this.nextOrder();
        });
    }
    
    showFeedback(isSuccess, message) {
        // Créer un panneau de feedback
        const panel = this.add.image(
            config.width / 2,
            config.height / 2 - 50,
            'panel'
        );
        panel.setScale(0.6, 0.4);
        panel.setAlpha(0.9);
        
        // Ajouter une icône de succès ou d'échec
        const icon = this.add.image(
            panel.x - 80,
            panel.y,
            isSuccess ? 'check' : 'cross'
        );
        icon.setScale(0.5);
        
        // Ajouter le message
        const text = this.add.text(
            panel.x + 20,
            panel.y,
            message,
            {
                fontSize: '20px',
                fill: isSuccess ? '#00ff00' : '#ff0000',
                fontFamily: 'Arial, sans-serif',
                stroke: '#000',
                strokeThickness: 2
            }
        );
        text.setOrigin(0, 0.5);
        
        // Animation du panneau
        this.tweens.add({
            targets: [panel, icon, text],
            y: '-=30',
            alpha: { from: 0, to: 1 },
            duration: 500,
            ease: 'Back.easeOut',
            yoyo: true,
            hold: 1000,
            onComplete: () => {
                panel.destroy();
                icon.destroy();
                text.destroy();
            }
        });
    }
    
    nextOrder() {
        // Nettoyer les ingrédients préparés
        this.preparedIngredients.forEach(ingredient => {
            ingredient.destroy();
        });
        this.preparedIngredients = [];
        
        // Nettoyer la représentation visuelle de la commande précédente
        if (this.currentOrderVisual) {
            this.currentOrderVisual.clear(true, true);
            this.currentOrderVisual = null;
        }
        
        // Vérifier si le jeu est terminé
        if (this.ordersCompleted >= this.maxOrders) {
            this.endGame();
        } else {
            // Démarrer une nouvelle commande
            this.startNewOrder();
        }
    }
    
    createGameTimer() {
        // Ce timer gère la durée totale du jeu si nécessaire
    }
    
    endGame() {
        this.isGameOver = true;
        
        // Arrêter la musique
        this.music.stop();
        
        // Sauvegarder le meilleur score
        const highScore = this.registry.get('high_score') || 0;
        if (this.score > highScore) {
            this.registry.set('high_score', this.score);
        }
        
        // Passer à l'écran de fin de jeu
        this.scene.start('GameOverScene', {
            score: this.score,
            ordersCompleted: this.ordersCompleted,
            level: this.level
        });
    }
}
