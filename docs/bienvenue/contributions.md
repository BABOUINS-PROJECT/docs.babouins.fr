---
sidebar_position: 2
---

# Contributions

Pour contribuer au projet :

1. **Forkez** le dépôt.

> Un **fork** est une copie d'un projet GitHub sur votre propre compte. Cela vous permet de travailler sur le projet sans toucher à l'original. Une fois vos modifications terminées, vous pouvez demander à les ajouter au projet principal via une pull request.

2. **Clonez** votre fork sur votre machine :
    ```bash
    git clone https://github.com/votre-utilisateur/docs.babouins.fr.git
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

6. **Créez** une pull request sur le dépôt principal :
    - Rendez-vous sur le dépôt principal du projet sur GitHub.
    - Cliquez sur le bouton **"New pull request"**.
    - Sélectionnez la branche de votre fork contenant vos modifications.
    - Comparez avec la branche principale (main) du dépôt original.
    - Ajoutez un titre et une description détaillée de vos modifications.
    - Cliquez sur **"Create pull request"** pour soumettre votre pull request.

## ✅ Validation des Contributions

Toutes les contributions doivent être validées par au moins deux personnes de la classe. Les pull requests seront examinées et testées avant d'être fusionnées (merge). Utilisez le système de commentaires pour suggérer des améliorations et assurer la qualité de la documentation.

## 📦 Déploiement

Pour chaque modification apportée au projet, créez une nouvelle branche et soumettez une pull request. Une fois la pull request validée et fusionnée dans la branche main, le déploiement du site sera automatique grâce à notre pipeline CI/CD.