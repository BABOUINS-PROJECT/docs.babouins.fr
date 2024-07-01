---
sidebar_position: 1
---

Bienvenue dans le projet **Babouins - Docusaurus** pour la classe **BTS SIO** ! Ce projet a pour but de centraliser toutes nos procédures, commandes et documentations apprises en cours et de les structurer correctement. Grâce à ce dépôt, nous pourrons tous contribuer à la documentation et la valider ensemble en utilisant un système de fork avec GitHub et l'intégration continue (CI/CD).

## 🎉 Présentation

Ce projet a été créé par **Dimitri Chassignol** pour faciliter la gestion et la validation de notre documentation technique. Chaque membre de la classe peut participer en proposant des modifications, des ajouts et des améliorations, qui seront ensuite validés par les autres membres de la classe sur ce repo. 

## 🚀 Fonctionnalités

- **Centralisation** de toutes les procédures, commandes et documentations.
- **Collaboration** via des forks et des pull requests sur GitHub.
- **Validation** de la documentation par toute la classe.
- **Déploiement automatique** grâce à un pipeline CI/CD.

## 📝 Contribution

Pour contribuer au projet :

1. **Forkez** le dépôt. 

> Un **fork** est une copie du projet d'un dépôt GitHub sur votre compte GitHub personnel. Cela vous permet de travailler sur le projet <u>sans affecter l'original</u>. Une fois vos modifications terminées, vous pouvez demander à intégrer vos changements dans le projet principal (main) via une pull request.

2. **Clonez** votre fork sur votre machine :
    ```bash
    git clone https://github.com/BABOUINS-PROJECT/docs.babouins.fr.git
    ```
3. **Créez** une nouvelle branche pour vos modifications :
    ```bash
    git checkout -b <branch>
    ```
4. **Effectuez** vos modifications et **committez** :
    ```bash
    git commit -m "ajout_nouvelle_procédure"
    ```
5. **Pushez** vers votre fork :
    ```bash
    git push 
    ```
6. **Ouvrez** une pull request sur le dépôt principal afin qu'elle soit validée par l'équipe d'administration de la classe.

## ✅ Validation des Contributions

Toutes les contributions doivent être validées par au moins deux personnes de la classe. Les pull requests seront examinées et testées avant d'être fusionnées (merge). Utilisez le système de commentaires pour suggérer des améliorations et assurer la qualité de la documentation.

## 📦 Déploiement

Pour chaque modification apportée au projet, créez une nouvelle branch et soumettez une pull request. Une fois la pull request validée et fusionnée dans la branche main, le déploiement du site sera automatique grâce à notre pipeline CI/CD.