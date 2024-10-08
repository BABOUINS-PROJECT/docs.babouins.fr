# TP : Installation de SQL Server

## Prérequis
- Système d'exploitation : Windows Server 2022 🪟
- Nom du serveur : **SQL-SERVER** 💻
- Groupe : **CFAI** 👥

## Définitions

- **Résilience :** 🔄 Capacité d’un système à s’auto-dépanner en cas de problème.
- **Robustesse :** 🛡️ Capacité d’un système à résister à des surcharges ou des attaques.
- **Workgroup :** 👨‍💻👩‍💻 Groupe de travail dans lequel plusieurs ordinateurs partagent des ressources sans serveur centralisé.

## 🛠️ Étapes de configuration

### 1. Renommer le serveur
- Ouvrir le **Panneau de configuration**.
- Accéder aux paramètres **Système** ⚙️.
- Cliquer sur **Modifier les paramètres** sous **Nom de l'ordinateur**.
- Renommer le serveur en : **SQL-SERVER** (groupe : **CFAI**).
- Redémarrer 🔄 le serveur pour appliquer les modifications.

### 2. Télécharger et installer SQL Server
- Télécharger SQL Server depuis le lien suivant : [Télécharger SQL Server](https://www.microsoft.com/fr-fr/sql-server/sql-server-downloads?msockid=3ba52c0bb6c468711a7838f2b78369cf) ⬇️.
- Lancer l'installateur de SQL Server 🚀.
- Choisir l'**installation par défaut** 🛠️.
- Suivre les instructions à l'écran pour compléter l'installation.

### 3. Télécharger et installer SSMS (SQL Server Management Studio)
- Télécharger SSMS depuis le lien suivant : [Télécharger SSMS](https://aka.ms/ssmsfullsetup) ⬇️.
- Installer le logiciel 📥.

### 4. Configuration initiale de SSMS
- Lancer SQL Server Management Studio (SSMS).
- Lors de la première connexion, il est possible que l'on vous demande de **modifier le chiffrement** 🔐 :
  - Sélectionner l'option **Optionnel**.
  - Cliquer sur **Connect** ✅.

---

## 📊 Gestion des bases de données

### 1. Créer une nouvelle base de données
- Ouvrir **SSMS**.
- Dans le volet de gauche, faire un **clic droit** sur **Databases** 🖱️.
- Sélectionner **New Database**.
- Nommer la base : `datacenter`.
- Cliquer sur **OK** pour créer la base 🗃️.

### 2. Importer le schéma de la base
- Faire un **clic droit** sur la base nouvellement créée 🖱️.
- Sélectionner **New Query** 📝.
- Copier le contenu du fichier `creationbasedatacenter.txt` dans la fenêtre de requête.
- Cliquer sur **Execute** ▶️ pour exécuter le schéma de création.

### 3. Restaurer une base de données
- Faire un **clic droit** sur **Databases** 🖱️.
- Sélectionner **Restore Database**.
- Cliquer sur **Device**, puis sur les **…** pour sélectionner le fichier `datacenter.bak` 🗄️.
- Sélectionner le fichier et cliquer sur **OK** pour restaurer 🔄 la base.

### 4. Supprimer une base de données
- Faire un **clic droit** sur la base à supprimer 🖱️.
- Sélectionner **Delete** ❌.
- Confirmer la suppression ✅.

---

## 📋 Requêtes SQL pour l'administration de la base

- Faire un **clic droit** sur la base 🖱️.
- Sélectionner **New Query** 📝.

### 1. 🧑‍💻 Liste des logiciels par utilisateurs
```sql
SELECT U.nom AS nom_utilisateur, U.prenom AS prenom_utilisateur, L.nom AS nom_logiciel
FROM Utilise UL
JOIN Utilisateur U ON UL.id_utilisateur = U.id_utilisateur
JOIN Logiciel L ON UL.id_logiciel = L.id_logiciel;
```

### 2. 📊 Nombre de licences occupées par logiciel
```sql
SELECT L.nom AS nom_logiciel, COUNT(UL.id_utilisateur) AS nb_licences_occupees
FROM Utilise UL
JOIN Logiciel L ON UL.id_logiciel = L.id_logiciel
GROUP BY L.nom;
```

### 3. 🖥️ Liste des serveurs hébergés par le datacenter
```sql
SELECT D.nom AS nom_datacenter, S.nom AS nom_serveur
FROM Serveur S
JOIN Datacenter D ON S.id_datacenter = D.id_datacenter;
```