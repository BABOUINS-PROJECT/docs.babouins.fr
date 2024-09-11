# Sauvegarde et snapshot

AVANT DE COMMENCER FAIRE UNE BACKUP DES FICHIERS DES UTILISATEUR

## fdisk
<br></br>

Je vais donc lancer cette commande pour lancer fdisk :
<br></br>
````
fdisk /dev/vda

````

<br></br>




Fonction __p__ pour voir l’état du disque
<br></br>

Ensuite je fait __n__ pour crée une nouvelle partition, puis 2 fois entrer pour laisser par défault.

Enfin __w__ pour sauvegarder.

## pvcreate

<br></br>

Il faut maintenant qu'on formate la partition qu'on viens de crée avec :
<br></br>

````
pvcreate /dev/vda4

````
<br></br>

Ma partition est maintenant formaté.

Il faut maintenant l'ajouter dans notre vg grâce a cette commande : 

```` 
vgextend debian-vg /dev/vda4

````
<br></br>

Maintenant qu'il est ajouté je vais crée mes partition pour mes utilisateurs :

````
lvcreate --name mcAlice -L +2G debian-vg

````
<br></br>

Je vais maintenant formater les partitions que je crée pour chaque utilisateur :

````
mkfs /dev/debian-vg-mcAlice

````

<br></br>

je modifie le fstab pour que systemd puisse fonctionner on le trouve dans __/etc/fstab__ et je rentre cette ligne dans le fichier de config : 

````
/dev/mapper/debian--vg-mcAlice /srv/mc/alice ext4 defaults 0 0
````
<br></br>

Il faut ensuite redémaré les services avec cette commandes :

````
systemctl daemond-reload

````


<br></br>
## Montage des partitions
<br></br>

Il faut ensuite monté les partitions de nos utilisateurs :

````
mount alice

`````

<br></br>

Je donne ensuite le droit a Alice avec cette commande : (penser bien a vous trouvez dans ce chemin /srv/mc/alice)

````
chown alice:alice alice -R
````

<br></br>

Je peut maintenant relancer mon serveur Minecraft :

````
systemctl start minecraft-alice.service

````
<br></br>

## Snapshoot 

<br></br>

Pour faire maintenant un snapshot j'utilise cette commande : 

```
lvcreate -–name mcDylanAvantExplosion -L +512M ––snapshot /dev/debian-vg/mcAlice

````

<br></br>

Tout d'abord j'arrête le service Minecraft :

````

systemctl stop minecraft-alice.service

````
<br></br>

Je peut maintenant vérifier avec __lvs__ si mon snapshot c'est bien crée.


<br></br>

Je me met a la racine et je fait cette commande pour démonté la partition attaché D'Alice : 

````
umount /srv/mc/alice

````


<br></br>



Une fois la partition démonté je restaure mon snapshot :

```
lvconvert --merge /dev/debian-vg/mcAliceAvantExplosion

````

<br></br>

Je remonte enfin ma partition avec cette commande : 

````
mount /srv/mc/alice

<br></br>

Si on souhaite supprimer le snapshot on peut utiliser cette commande :

````
    lvremove /dev/debian-vg/mcAliceAvantExplosion

