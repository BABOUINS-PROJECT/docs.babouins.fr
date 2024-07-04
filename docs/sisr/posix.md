# Droits POSIX

🔗 **Supports** : [Guide des permissions POSIX](https://fr.wikipedia.org/wiki/Permissions_UNIX)

## 🌟 Introduction
Les <u>droits POSIX</u> définissent les permissions d'accès aux fichiers et répertoires sur les systèmes Unix et Linux. Ils sont exprimés sous la forme de trois ensembles de trois bits représentant les permissions pour le propriétaire, le groupe, et les autres.

### 🔒 Structure des droits
Les droits POSIX se décomposent ainsi :
- **RWX (Owner)** : Permissions pour le propriétaire du fichier.
- **RWX (Group)** : Permissions pour le groupe associé au fichier.
- **RWX (Other)** : Permissions pour les autres utilisateurs.

### 🛠️ Types de permissions
- **R** (Read) 📖 : Droit de lecture.
- **W** (Write) ✏️ : Droit d'écriture.
- **X** (Execute) 🚀 : Droit d'exécution.

### 🔢 Calcul des permissions
Les permissions sont calculées en additionnant les valeurs suivantes :
- **R = 4** 🟢
- **W = 2** 🟡
- **X = 1** 🔴

### 📊 Exemple de calcul
Pour définir les permissions `RWX` pour le propriétaire, `RW` pour le groupe, et `R` pour les autres :
- **Propriétaire** : `RWX` = `4 + 2 + 1` = `7` 🌟
- **Groupe** : `RW` = `4 + 2` = `6` 🟢
- **Autres** : `R` = `4` 🟣

Ainsi, les permissions seront notées : `760`.

## 🏷️ Exemple concret
Supposons que nous avons le fichier `/usr/local/bin/motd.sh` et nous voulons définir les permissions suivantes :
- **Propriétaire** : Lecture, écriture, exécution (`RWX`) = `7` 🌟
- **Groupe** : Lecture et écriture (`RW`) = `6` 🟢
- **Autres** : Pas de permissions (`---`) = `0` ⚪

La commande à utiliser est :
```bash
chmod 760 /usr/local/bin/motd.sh
```

## 🔍 Vérification des permissions
Pour vérifier les permissions d'un fichier, utilisez la commande ls -l :
```bash
ls -l /usr/local/bin/motd.sh
```
Vous verrez une sortie semblable à celle-ci :
```bash
-rwxrw---- 1 owner group 1234 Jul  4 12:34 /usr/local/bin/motd.sh
```