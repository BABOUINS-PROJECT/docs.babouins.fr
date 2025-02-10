#  Créer une route static facilement sur un routeur cisco


## Attention cette documentation reprend le TP debug avec Monsieur Provost 

### Mise en situation 

Le but est d'accéder a un autre réseau depuis un pc.
Donc depuis laptop 0 je veut accéder a laptop1 qui n’est pas dans le même réseau 
Dans ce cas il faut que je crée des routes statiques sur les routeurs pour pourvoir y accéder. 

## Configuration 

Sur le routeur 2 je tape cette commande qui dit que :
Pour accéder au réseau 192.168.0.0 qui est l’adresse réseau de mon pc ou je veux accéder avec ce masque de sous réseau en 255.255.254.0 car ce masque englobe le réseau 192.168.0.0 jusqu’à 192.168.1.255 comme sa je peux englober l’autre réseau ou est mon imprimante. 
Je configure l'adresse de la passerelle, qui est l'interface par laquelle je vais passer, donc via le routeur 1, car c'est le chemin le plus court. Il est important de choisir l'interface à laquelle le routeur sur lequel j'ajoute la route est directement connecté.
 Voici le raisonnement à voir pour se type de problème.