#!/usr/bin/env python3

import random
import time
import os

class BurgerGame:
    def __init__(self):
        self.ingredients = {
            'pain': ['normal', 'complet', 'brioche'],
            'viande': ['boeuf', 'poulet', 'végétarien'],
            'fromage': ['cheddar', 'emmental', 'bleu'],
            'sauce': ['ketchup', 'mayonnaise', 'barbecue'],
            'légume': ['salade', 'tomate', 'oignon']
        }
        
        self.score = 0
        self.tours = 0
        self.max_tours = 10
        
    def clear_screen(self):
        os.system('cls' if os.name == 'nt' else 'clear')
        
    def afficher_titre(self):
        print("""
        ██████╗ ██╗   ██╗██████╗  ██████╗ ███████╗██████╗     ██████╗ ██████╗ ███╗   ███╗███╗   ███╗ █████╗ ███╗   ██╗██████╗ ███████╗██████╗ 
        ██╔══██╗██║   ██║██╔══██╗██╔════╝ ██╔════╝██╔══██╗    ██╔════╝██╔═══██╗████╗ ████║████╗ ████║██╔══██╗████╗  ██║██╔══██╗██╔════╝██╔══██╗
        ██████╔╝██║   ██║██████╔╝██║  ███╗█████╗  ██████╔╝    ██║     ██║   ██║██╔████╔██║██╔████╔██║███████║██╔██╗ ██║██║  ██║█████╗  ██████╔╝
        ██╔══██╗██║   ██║██╔══██╗██║   ██║██╔══╝  ██╔══██╗    ██║     ██║   ██║██║╚██╔╝██║██║╚██╔╝██║██╔══██║██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗
        ██████╔╝╚██████╔╝██║  ██║╚██████╔╝███████╗██║  ██║    ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║ ╚═╝ ██║██║  ██║██║ ╚████║██████╔╝███████╗██║  ██║
        ╚═════╝  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝     ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝
        """)
        print("\nBienvenue dans le jeu de commande de burger !\n")
        print("Préparez les commandes correctement pour gagner des points.\n")
    
    def generer_commande(self):
        commande = {}
        for categorie, options in self.ingredients.items():
            commande[categorie] = random.choice(options)
        return commande
    
    def afficher_commande(self, commande):
        print("\n📝 COMMANDE CLIENT:")
        print("--------------------")
        for categorie, choix in commande.items():
            print(f"{categorie.capitalize()}: {choix}")
        print("--------------------\n")
    
    def prendre_commande_joueur(self):
        commande_joueur = {}
        print("\n🍔 PRÉPARATION DU BURGER:")
        print("--------------------")
        
        for categorie, options in self.ingredients.items():
            print(f"\nOptions pour {categorie}:")
            for i, option in enumerate(options, 1):
                print(f"{i}. {option}")
                
            while True:
                try:
                    choix = int(input(f"\nChoisissez le {categorie} (1-{len(options)}): "))
                    if 1 <= choix <= len(options):
                        commande_joueur[categorie] = options[choix-1]
                        break
                    else:
                        print(f"Veuillez entrer un nombre entre 1 et {len(options)}.")
                except ValueError:
                    print("Veuillez entrer un nombre valide.")
                    
        return commande_joueur
    
    def verifier_commande(self, commande_client, commande_joueur):
        correct = 0
        total = len(commande_client)
        
        print("\n🔍 VÉRIFICATION:")
        print("--------------------")
        
        for categorie, choix_client in commande_client.items():
            choix_joueur = commande_joueur[categorie]
            if choix_client == choix_joueur:
                print(f"✅ {categorie.capitalize()}: {choix_joueur} - Correct!")
                correct += 1
            else:
                print(f"❌ {categorie.capitalize()}: {choix_joueur} - Incorrect! (Le client voulait {choix_client})")
        
        precision = (correct / total) * 100
        points = correct * 2
        
        print(f"\nPrécision: {precision:.1f}%")
        print(f"Points gagnés: {points}")
        
        return points
    
    def jouer_tour(self):
        self.tours += 1
        self.clear_screen()
        self.afficher_titre()
        
        print(f"\n🎮 TOUR {self.tours}/{self.max_tours}")
        print(f"🏆 SCORE ACTUEL: {self.score} points\n")
        
        commande_client = self.generer_commande()
        self.afficher_commande(commande_client)
        
        # Pause dramatique
        print("Le client attend sa commande...")
        time.sleep(1.5)
        
        commande_joueur = self.prendre_commande_joueur()
        points = self.verifier_commande(commande_client, commande_joueur)
        
        self.score += points
        
        input("\nAppuyez sur Entrée pour continuer...")
    
    def afficher_resultats(self):
        self.clear_screen()
        self.afficher_titre()
        
        print("\n🎯 FIN DE PARTIE!")
        print("--------------------")
        print(f"Score final: {self.score} points")
        
        if self.score >= 80:
            print("\n🏆 EXCELLENT! Vous êtes un chef burger de classe mondiale!")
        elif self.score >= 60:
            print("\n😎 BIEN JOUÉ! Vous êtes un bon préparateur de burgers!")
        elif self.score >= 40:
            print("\n😊 PAS MAL! Un peu plus de pratique et vous serez parfait!")
        else:
            print("\n😅 BESOIN DE PRATIQUE! Vos clients ont faim et sont confus!")
        
        print("\nMerci d'avoir joué à Burger Commander!")
    
    def demarrer(self):
        self.clear_screen()
        self.afficher_titre()
        
        input("Appuyez sur Entrée pour commencer...")
        
        while self.tours < self.max_tours:
            self.jouer_tour()
            
        self.afficher_resultats()

if __name__ == "__main__":
    jeu = BurgerGame()
    jeu.demarrer()
