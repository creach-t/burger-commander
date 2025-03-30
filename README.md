# Burger Commander

Un jeu de commande de burger en 2D créé avec Phaser 3. Préparez les burgers avec précision pour satisfaire vos clients et gagner des points!

## Description

Burger Commander est un jeu de simulation où vous jouez le rôle d'un employé de restaurant de burgers. Les clients passent des commandes et vous devez assembler les ingrédients dans le bon ordre pour créer le burger parfait. Plus vous êtes rapide et précis, plus vous gagnez de points!

## Fonctionnalités

- Interface graphique 2D créée avec Phaser 3
- Drag & drop des ingrédients pour assembler les burgers
- Plusieurs niveaux de difficulté
- Système de score et de temps
- Effets sonores et animations

## Captures d'écran

![Capture d'écran du jeu](screenshots/gameplay.png)

## Prérequis

- Un navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Pour le développement : Node.js et npm

## Installation et lancement

### Pour jouer

1. Clonez ce dépôt sur votre machine locale
```bash
git clone https://github.com/creach-t/burger-commander.git
```

2. Ouvrez le fichier `index.html` dans votre navigateur
```bash
cd burger-commander
# Ouvrez index.html dans votre navigateur préféré
```

### Pour développer

1. Installez les dépendances
```bash
npm install
```

2. Lancez le serveur de développement
```bash
npm start
```

## Structure du projet

```
burger-commander/
├── assets/             # Images, sons et autres ressources
│   ├── images/         # Sprites et images du jeu
│   ├── audio/          # Effets sonores et musiques
│   └── fonts/          # Polices personnalisées
├── src/                # Code source du jeu
│   ├── scenes/         # Scènes Phaser (Menu, Jeu, GameOver, etc.)
│   ├── objects/        # Objets du jeu (Ingrédients, Clients, etc.)
│   └── config.js       # Configuration de Phaser
├── index.html          # Page HTML principale
├── style.css           # Styles CSS
└── main.js             # Point d'entrée JavaScript
```

## Comment jouer

1. Les clients passent leur commande en haut de l'écran
2. Sélectionnez les ingrédients dans l'ordre (bas -> haut)
3. Déposez-les dans la zone de préparation
4. Validez la commande quand vous avez terminé
5. Soyez rapide pour obtenir un bonus de temps!

## Licence

Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.

## Auteur

- Créé par creach-t
