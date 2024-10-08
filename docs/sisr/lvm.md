# LVM (Logical Volume Manager) - Guide Snapshot

🔗 **Supports** : [LVM sous Linux - Volumes Logiques](https://www.linuxtricks.fr/wiki/lvm-sous-linux-volumes-logiques)

### 📚 Définitions
- **LVM**: **L**ogical **V**olume **M**anager, un système de gestion de stockage flexible pour Linux.
  - Permet de créer du cache sur un SSD pour les fichiers/programmes fréquemment utilisés.
  - Offre la possibilité de fragmenter et d'étendre un disque à un autre, dépassant les limites physiques traditionnelles.
  - Facilite la création et la gestion de snapshots. 
    - **PV**: **P**hysical **V**olume, un disque physique ou une partition utilisée par LVM.
    - **VG**: **V**olume **G**roup, un groupe de PVs combinés en un seul pool de stockage.
    - **LV**: **L**ogical **V**olume, une "partition virtuelle" créée à partir d'un VG.

- **Formatage**: Processus d'écriture d'un système de fichiers dans une partition.  
  - Permet la lecture/écriture des données sur le disque.
  - Exemples de systèmes de fichiers : NTFS, ext4, etc.
  - Crée des structures comme les superblocks.
- **PE (Physical Extent)**: Unité de base côté LVM, généralement équivalente à 400 secteurs physiques.
- **Fstab**: Fichier de configuration qui définit comment les systèmes de fichiers doivent être montés au démarrage.
- **Inodes**: Structures de données contenant des métadonnées sur les fichiers, incluant les emplacements des blocs de données. 
**Pour plus d'information :** [Notes supplémentaires](#-notes-supplémentaires-)

### 🔧 Création d'une partition LVM

Utilisez `fdisk` pour créer une partition de type LVM :

```bash
fdisk /dev/nom_de_la_partition
# Suivez les étapes : n (nouvelle partition), p (primaire), w (écrire les changements)
```

> 💡 ***"fdisk" est un outil de partitionnement de disque en ligne de commande.***

### 🏗️ Création d'un Physical Volume (PV)
```bash 
pvcreate /dev/nom_de_la_partition
```
> 💡 ***Cette commande initialise une partition ou un disque pour une utilisation avec LVM.***

### 🌐 Création/Extension d'un Volume Group (VG)
Créer un nouveau VG :
```bash
vgcreate mon_vg /dev/sdb1
```
Étendre un VG existant :
```bash
vgextend mon_vg /dev/sdc1
```

> 💡 ***Un VG agit comme un "disque virtuel" combinant plusieurs PVs.***

### 📦 Création d'un Logical Volume (LV)
```bash
vcreate -L taille --name nom -r nom_du_vg

Exemple : lvcreate -L 2G --name mc_alice -r debian-vg
```
> 💡 ***L’option -r assure que le système de fichiers est synchronisé lors de la création du LV.***

### 🗄️ Ajouter le file system
```bash
mkfs.ext4 /dev/nom_du_vg/nom_du_lv
```
> 💡 ***Cette étape prépare le LV pour le stockage de données.***

### 🔗 Montage permanent
Éditez /etc/fstab:
```bash
vim /etc/fstab

/dev/mapper/debian--vg-mcAlice /srv/mc/alice            ext4    defaults              0       0
/dev/mapper/debian--vg-mcDylan /srv/mc/dylan            ext4    defaults              0       0
/dev/mapper/debian--vg-mcCamille /srv/mc/camille            ext4    defaults              0       0
/dev/mapper/debian--vg-mcBob /srv/mc/bob            ext4    defaults              0       0
/dev/mapper/debian--vg-mcMargaux /srv/mc/margaux            ext4    defaults              0       0
/dev/mapper/debian--vg-mcNathan /srv/mc/nathan           ext4    defaults              0       0  
```
Puis
```bash
systemctl daemon-reload
mount -a -o remount
mount /srv/mc/alice/
mount /srv/mc/bob/
mount /srv/mc/dylan/
mount /srv/mc/nathan/
mount /srv/mc/camille/
mount /srv/mc/margaux/
```
> 💡 ***Cela assure que le LV soit monté automatiquement au démarrage.***

### 📸 Gestion des snapshots
Créer :
```bash
lvcreate --snapshot -L 500M --name bob_save2106 /dev/debian-vg/mcBobAvantExplosion
```
> Vous pouvez vérifier avec `lvs` si le snapshot a bien été créé. Ensuite, il faut démonter la partition avant de la fusionner avec `umount /srv/mc/bob`.

Restaurer :
```bash
lvconvert --merge /dev/debian-vg/mcBobAvantExplosion
```
> Vous pouvez ensuite la remonter `mount /srv/mc/bob`.

Supprimer :
```bash
lvremove /dev/debian-vg/mcBobAvantExplosion
```

> 💡 ***Les snapshots sont des "photos instantanées" de l'état d'un LV à un moment donné.***

#### 🔍 Commandes utiles
- `pvdisplay`: Affiche les infos des PVs
- `vgdisplay`: Affiche les infos des VGs
- `lvdisplay`: Affiche les infos des LVs
- `lvextend`: Agrandit un LV
- `lvreduce`: Réduit un LV (attention à la perte de données !)

> ⚠️ ***Toujours faire des sauvegardes avant de manipuler les volumes LVM !***

#### 💡 Notes supplémentaires :
- Le <u>formatage bas niveau</u> écrit des données sur chaque bloc du disque, supprimant ainsi physiquement toutes les données existantes, tandis que le <u>formatage rapide</u> se contente de réinitialiser les structures (index) du filesystem sans effacer toutes les données présentes.
- Les <u>superblocks</u> contiennent des informations cruciales dans le filesystem, y compris l'emplacement des sauvegardes.
- <u>LVM</u> offre une flexibilité exceptionnelle dans la gestion du stockage, permettant des opérations impossibles avec des partitions traditionnelles. (*Windows, a 15 ans de retard*)