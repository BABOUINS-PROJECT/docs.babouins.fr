# Introduction Docker

 ## Objectifs de cette documentation :
 * Installer une première image
 * Lancer son premier conteneur
 * Déployer un conteneur


**ATTENTION : Bien penser a être connecté en root pour exécuter ces commandes.**

 ### Installation de docker Docker

 Pour commencer j'installe docker.io grace a cette commande :
 ``` 
 apt install docker.io
 ```

 ### Mise en place de NGINX

 J'installe l'image ngnix pour Docker :
 ``` 
 docker pull nginx:stable-alpine3.20-perl
 ````

 Une fois l'image installé je peut voir celle qui sont installer avec cette commande :
 ````
 docker image ls
 ````

 Pour ensuite lancer le démarrage pour la première fois je lance cette commande : 
 ````
 docker run --name web1 -d -p 80:80 nginx
 ````
- Les arguments :
**--name** pour donner un nom au conteneur 
**-d** pour qu'il tourne en arrière plan 
**-p** pour lui attribuer ce port d'écoute

 Il suffit maintenant de tapper l'adresse IP de votre machine sur un navigateur pour voir si le conteneur fonctionne.

 ### Mise en place de VS CODE

 Pour utiliser maintenant un vs code sur mon serveur docker je vais utiliser cette commande pour télécharger l’image :

 ````
 docker pull linuxserver/code-server
 ````

 Et ensuite cette commande pour le lancer attribuer le port tout ça :

 ````
 docker run -d   --name=code-server   -e PUID=1000   -e PGID=1000   -e TZ=Etc/UTC   -e PASSWORD="test"  -p 8443:8443   lscr.io/linuxserver/code-server:latest
 `````

 Et pour voir si il fonctionne il faut donc taper l’ip puis mettre le port qu’on a attribuer là c’est 8443