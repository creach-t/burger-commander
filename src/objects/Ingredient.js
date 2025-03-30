// Classe représentant un ingrédient dans le jeu
class Ingredient extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, type, name, draggable = true) {
        super(scene, x, y, texture);
        
        // Ajouter l'ingrédient à la scène
        scene.add.existing(this);
        
        // Propriétés de l'ingrédient
        this.type = type; // par ex. 'pain', 'viande', etc.
        this.name = name; // nom spécifique, par ex. 'Pain normal'
        
        // Config d'affichage
        this.setOrigin(0.5);
        this.setScale(0.8);
        
        // Activer la physique pour cet objet
        scene.physics.world.enable(this);
        
        // Rendre l'ingrédient interactif s'il est draggable
        if (draggable) {
            this.setInteractive({ draggable: true });
            
            // Gestionnaire d'événements
            this.on('dragstart', (pointer) => {
                this.setTint(0xaaaaaa); // Légère teinte grise pendant le drag
                this.body.setAllowGravity(false); // Désactiver la gravité pendant le drag
                scene.children.bringToTop(this); // Amener l'ingrédient au premier plan
            });
            
            this.on('drag', (pointer, dragX, dragY) => {
                this.x = dragX;
                this.y = dragY;
            });
            
            this.on('dragend', (pointer) => {
                this.clearTint();
                // La logique de placement dans l'assiette sera gérée par la scène
                scene.checkIngredientPlacement(this, pointer);
            });
        }
    }
    
    // Méthode pour créer une copie de cet ingrédient
    createCopy(x, y, draggable = true) {
        return new Ingredient(
            this.scene,
            x,
            y,
            this.texture.key,
            this.type,
            this.name,
            draggable
        );
    }
    
    // Méthode pour animer l'ingrédient
    playDropAnimation() {
        this.scene.tweens.add({
            targets: this,
            y: this.y + 10, // Légère chute
            duration: 200,
            ease: 'Bounce.easeOut',
            yoyo: false
        });
    }
    
    // Méthode pour l'animation de succès
    playSuccessAnimation() {
        this.scene.tweens.add({
            targets: this,
            scaleX: 1.2,
            scaleY: 1.2,
            duration: 150,
            yoyo: true,
            repeat: 1
        });
    }
    
    // Méthode pour l'animation d'erreur
    playErrorAnimation() {
        this.scene.tweens.add({
            targets: this,
            angle: { from: -5, to: 5 },
            duration: 100,
            yoyo: true,
            repeat: 3
        });
    }
}
