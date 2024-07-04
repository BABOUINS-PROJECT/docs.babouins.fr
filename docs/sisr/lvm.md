# 🌟 LVM 🌟
 
🔗 **Supports**: [LVM sous Linux - Volumes Logiques](https://www.linuxtricks.fr/wiki/lvm-sous-linux-volumes-logiques)

## 📌 Créer une partition

```
fdisk /dev/nom_de_la_partition

Bienvenue dans fdisk (util-linux 2.23.2). 

Les modifications resteront en mémoire jusqu'à écriture. 
Soyez prudent avant d'utiliser la commande d'écriture. 

Le périphérique ne contient pas de table de partitions reconnue 
Construction d'une nouvelle étiquette pour disque de type DOS avec identifiant de disque 0x2660dada. 

Commande (m pour l'aide) : n 
Type de partition : 
p   primaire (0 primaire(s), 0 étendue(s), 4 libre(s)) 
e   étendue 

Sélection (p par défaut) : p 

Premier secteur (2048-2097151, 2048 par défaut) : 
Utilisation de la valeur 2048 par défaut 
Dernier secteur, +secteur ou +taille{K,M,G} (2048-2097151, 2097151 par défaut) : 
Utilisation de la valeur 2097151 par défaut 
La partition 1 de type Linux et de taille 1023 MiB est configurée 

Commande (m pour l'aide) : w 
```

## 🛠️ Créer un PV

```bash
pvcreate /dev/nom_de_la_partition
```

## 🌐 Étendre un VG

```bash
vgextend nom_du_vg /dev/nom_du_vda_à_ajouter_au_vg
```

## 🏗️ Créer un LV

```bash
lvcreate -L taille --name nom nom_du_vg

Exemple : lvcreate -L 2G --name mc_alice debian-vg
```

## 🗄️ Ajouter le file system

```bash
mkfs.ext4 /dev/nom_du_vg/nom_du_lv
```

## 🔗 Assigner un chemin

```bash
vim /etc/fstab

/dev/mapper/debian--vg-mcAlice /srv/mc/alice            ext4    defaults              0       0
/dev/mapper/debian--vg-mcDylan /srv/mc/dylan            ext4    defaults              0       0
/dev/mapper/debian--vg-mcCamille /srv/mc/camille            ext4    defaults              0       0
/dev/mapper/debian--vg-mcBob /srv/mc/bob            ext4    defaults              0       0
/dev/mapper/debian--vg-mcMargaux /srv/mc/margaux            ext4    defaults              0       0
/dev/mapper/debian--vg-mcNathan /srv/mc/nathan           ext4    defaults              0       0  

systemctl daemon-reload
mount -a -o remount
mount /srv/mc/alice/
mount /srv/mc/bob/
mount /srv/mc/dylan/
mount /srv/mc/nathan/
mount /srv/mc/camille/
mount /srv/mc/margaux/
```

## 📸 Créer / Étendre / Supprimer une snapshot

```bash
lvcreate --snapshot -L 500M --name bob_save2106 /dev/debian-vg/mc_bob

lvs

systemctl stop minecraft-bob

umount /srv/mc/bob

lvconvert --merge /dev/debian-vg/mcBobAvantExplosion

mount /srv/mc/bob

systemctl start minecraft-bob

lv remove
```