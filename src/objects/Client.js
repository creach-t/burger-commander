// Classe représentant un client qui commande un burger
class Client extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        
        // Ajouter le conteneur à la scène
        scene.add.existing(this);
        
        // Propriétés d'état
        this.isHappy = true; // État initial
        this.patience = 100; // Niveau de patience (pourcentage)
        this.timer = null; // Timer pour la patience
        
        // Créer le sprite du client
        this.clientSprite = scene.add.sprite(0, 0, 'client');
        this.clientSprite.setOrigin(0.5);
        
        // Bulle de dialogue
        this.speechBubble = scene.add.sprite(50, -70, 'speech_bubble');
        this.speechBubble.setOrigin(0.5);
        this.speechBubble.setScale(0.8);
        this.speechBubble.setVisible(false);
        
        // Barre de patience
        this.patienceBarBackground = scene.add.rectangle(-40, 40, 80, 12, 0x000000);
        this.patienceBarBackground.setOrigin(0, 0.5);
        this.patienceBarBackground.setAlpha(0.3);
        
        this.patienceBar = scene.add.rectangle(-40, 40, 80, 12, 0x00ff00);
        this.patienceBar.setOrigin(0, 0.5);
        
        // Ajouter tous les éléments au conteneur
        this.add([
            this.clientSprite,
            this.speechBubble,
            this.patienceBarBackground,
            this.patienceBar
        ]);
        
        // Initialiser les animations
        this.initAnimations();
    }
    
    // Initialiser les animations du client
    initAnimations() {
        // Animation d'entrée
        this.entryAnimation = this.scene.tweens.add({
            targets: this,
            x: { from: -100, to: this.x },
            duration: 1000,
            ease: 'Power2',
            paused: true,
            onComplete: () => {
                this.showSpeechBubble();
            }
        });
        
        // Animation de sortie
        this.exitAnimation = this.scene.tweens.add({
            targets: this,
            x: { from: this.x, to: -100 },
            duration: 1000,
            ease: 'Power2',
            paused: true
        });
    }
    
    // Démarrer l'animation d'entrée
    enter() {
        this.entryAnimation.play();
    }
    
    // Démarrer l'animation de sortie
    exit(callback) {
        this.exitAnimation.play();
        this.exitAnimation.once('complete', callback);
    }
    
    // Afficher la bulle de dialogue
    showSpeechBubble() {
        this.speechBubble.setVisible(true);
        this.scene.tweens.add({
            targets: this.speechBubble,
            scaleX: { from: 0, to: 0.8 },
            scaleY: { from: 0, to: 0.8 },
            duration: 300,
            ease: 'Back.easeOut'
        });
    }
    
    // Masquer la bulle de dialogue
    hideSpeechBubble() {
        this.scene.tweens.add({
            targets: this.speechBubble,
            scaleX: { from: 0.8, to: 0 },
            scaleY: { from: 0.8, to: 0 },
            duration: 300,
            ease: 'Back.easeIn',
            onComplete: () => {
                this.speechBubble.setVisible(false);
            }
        });
    }
    
    // Afficher la commande du client
    displayOrder(order) {
        this.currentOrder = order;
        // Visualiser la commande dans la bulle de dialogue
        // Cette méthode sera complétée avec la classe Order
    }
    
    // Démarrer le timer de patience
    startPatienceTimer(duration) {
        this.patience = 100;
        this.updatePatienceBar();
        
        this.timer = this.scene.time.addEvent({
            delay: 100, // Mise à jour toutes les 100ms
            callback: () => {
                this.patience -= 100 / (duration * 10); // Diminution progressive
                if (this.patience <= 0) {
                    this.patience = 0;
                    this.becomeAngry();
                }
                this.updatePatienceBar();
            },
            repeat: duration * 10 // Nombre de répétitions pour couvrir la durée totale
        });
    }
    
    // Arrêter le timer de patience
    stopPatienceTimer() {
        if (this.timer) {
            this.timer.remove();
            this.timer = null;
        }
    }
    
    // Mettre à jour la barre de patience
    updatePatienceBar() {
        // Mettre à jour la largeur de la barre
        this.patienceBar.width = (this.patience / 100) * 80;
        
        // Mettre à jour la couleur en fonction du niveau de patience
        if (this.patience > 60) {
            this.patienceBar.fillColor = 0x00ff00; // Vert
        } else if (this.patience > 30) {
            this.patienceBar.fillColor = 0xffff00; // Jaune
        } else {
            this.patienceBar.fillColor = 0xff0000; // Rouge
        }
    }
    
    // Faire que le client devienne en colère
    becomeAngry() {
        if (this.isHappy) {
            this.isHappy = false;
            this.clientSprite.setTexture('client_angry');
            this.scene.events.emit('clientAngry', this);
        }
    }
    
    // Faire que le client soit heureux
    becomeHappy() {
        if (!this.isHappy) {
            this.isHappy = true;
            this.clientSprite.setTexture('client');
        }
    }
    
    // Réaction à une commande correcte
    reactToCorrectOrder() {
        this.stopPatienceTimer();
        this.becomeHappy();
        this.scene.tweens.add({
            targets: this.clientSprite,
            y: { from: 0, to: -10 },
            duration: 200,
            yoyo: true,
            repeat: 2
        });
    }
    
    // Réaction à une commande incorrecte
    reactToIncorrectOrder() {
        this.stopPatienceTimer();
        this.becomeAngry();
        this.scene.tweens.add({
            targets: this.clientSprite,
            angle: { from: -5, to: 5 },
            duration: 100,
            yoyo: true,
            repeat: 4
        });
    }
}
