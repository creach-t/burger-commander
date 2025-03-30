# Guide des ingrédients pour Burger Commander

Ce document explique comment ajouter, modifier ou supprimer des ingrédients dans le jeu Burger Commander.

## Structure des ingrédients

Les ingrédients sont définis dans le fichier `src/config.js` sous la forme d'un objet JavaScript structuré par catégorie.

```javascript
const ingredients = {
    pains: [
        { key: 'pain_normal', name: 'Pain normal' },
        { key: 'pain_complet', name: 'Pain complet' },
        { key: 'pain_brioche', name: 'Pain brioche' }
    ],
    // autres catégories...
};
```

## Catégories d'ingrédients

Le jeu comporte 5 catégories d'ingrédients :
1. **pains** - Les pains pour le haut et le bas du burger
2. **viandes** - Différents types de viande ou alternatives végétariennes
3. **fromages** - Variétés de fromages
4. **sauces** - Différentes sauces pour le burger
5. **legumes** - Légumes divers (salade, tomate, oignon, etc.)

## Ajouter un nouvel ingrédient

Pour ajouter un nouvel ingrédient :

1. Créez l'image de l'ingrédient et placez-la dans `assets/images/ingredients/`
2. Le nom du fichier doit suivre le format `categorie_nom.png` (ex: `pain_sesame.png`)
3. Ajoutez l'entrée correspondante dans `src/config.js` :

```javascript
viandes: [
    { key: 'viande_boeuf', name: 'Steack de boeuf' },
    { key: 'viande_poulet', name: 'Poulet grillé' },
    { key: 'viande_vege', name: 'Galette végétarienne' },
    { key: 'viande_poisson', name: 'Filet de poisson' } // Nouvel ingrédient
],
```

4. Assurez-vous d'ajouter le chargement de l'image dans `PreloadScene.js` :

```javascript
this.load.image('viande_poisson', 'assets/images/ingredients/viande_poisson.png');
```

## Supprimer un ingrédient

Pour supprimer un ingrédient, retirez-le simplement de l'objet `ingredients` dans `src/config.js`.

## Conseils pour la création d'images d'ingrédients

- Utilisez des images PNG avec fond transparent
- Taille recommandée : 200x100 pixels
- Style graphique cohérent avec les autres ingrédients
- Assurez-vous que l'ingrédient est centré horizontalement

## Tester vos ingrédients

Après avoir ajouté de nouveaux ingrédients, lancez le jeu et vérifiez que :
1. Les images se chargent correctement
2. Les ingrédients apparaissent dans l'interface
3. Ils peuvent être glissés et déposés
4. Les commandes incluant vos nouveaux ingrédients fonctionnent
