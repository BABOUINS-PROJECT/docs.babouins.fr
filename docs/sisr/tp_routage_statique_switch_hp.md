# TP : Routage statique switch HP

⬇️ **Télécharger TP** : [tp_routage_static.pkt](https://public.babouins.fr/assets/routage_static/tp.pkt)

# Mise en situation 🛠️

Vous êtes administrateur réseau dans une entreprise qui dispose de plusieurs secteurs répartis sur différents étages d'un bâtiment. Chaque secteur a besoin de communiquer avec les autres de manière sécurisée et efficace. Votre tâche consiste à configurer le routage statique sur les switches HP afin de permettre cette communication.

## Objectif du TP 🎯

- **Configurer les interfaces des switches** : Assigner les adresses IP appropriées aux interfaces.
- **Définir les VLANs** : Créer et configurer les VLANs pour segmenter le réseau selon les secteurs.
- **Configurer le routage statique** : Ajouter les routes statiques nécessaires pour permettre la communication inter-VLAN.
- **Tester la connectivité** : Utiliser des outils de diagnostic pour vérifier la connectivité entre les secteurs.

## Définitions 📚

- **Switch (commutateur)** : Un appareil réseau qui connecte des dispositifs au sein d'un réseau local (LAN) et utilise des tables de commutation pour déterminer le chemin des données.

- **Routage statique** : Une méthode de routage où les chemins de réseau sont prédéfinis et configurés manuellement sur les routeurs, contrairement au routage dynamique qui utilise des protocoles pour déterminer les chemins.

- **VLAN (Virtual Local Area Network)** : Une technique qui permet de segmenter un réseau physique en plusieurs réseaux logiques distincts pour améliorer la gestion et la sécurité.

- **Loopback** : Une interface virtuelle utilisée principalement pour les diagnostics et la gestion du réseau, souvent assignée à une adresse IP unique.

## Matériel requis 🧰

- Plusieurs switches HP A5120
- Câbles Ethernet
- Accès à un terminal de configuration (via console ou SSH)
- Adresses IP et schéma de VLAN fournis

## Schéma réseau 🌐

![tp_routage_static_hp_provost.drawio.png](https://public.babouins.fr/assets/routage_static/shema_provost.jpg)

# Réinitialisation 🔄

```
reboot

Au clavier appuyer sur la touche Ctrl + B
Appuyer sur '5' pour la réinitialisation en mode d'usinage
Appuyer sur '0' pour faire un reboot
```

# Configuration du switch 🔧

## Création VLAN 🚀

```
vlan 3
interface vlan-interface 3
ip address 192.168.0.10 255.255.255.252
(undo shutdown = pas nécéssaire car l'interface sera down)
interface GigabitEthernet 1/0/1
port access vlan 3

vlan 5
interface vlan-interface 5
ip address 192.168.2.1 255.255.255.252
(undo shutdown = pas nécéssaire car l'interface sera down)
interface GigabitEthernet 1/0/2
port access vlan 5

vlan 10
interface vlan-interface 10
ip address 10.3.0.1 255.255.0.0
(undo shutdown = pas nécéssaire car l'interface sera down)
interface GigabitEthernet 1/0/3
port access vlan 10

vlan 11
interface vlan-interface 11
ip address 172.16.3.1 255.255.255.0
(undo shutdown = pas nécéssaire car l'interface sera down)
interface GigabitEthernet 1/0/4
port access vlan 11

display vlan
```

## Création d’une interface Loopback 🔁

```bash
interface loopback 0
ip address 10.0.13.0 255.255.255.255
```

## Tableau des routes statiques 📋

| Destination   | Masque         | Prochain saut    |
| ------------- | -------------- | ---------------- |
| 10.0.0.0      | 255.255.0.0    | 192.168.0.9      |
| 10.0.0.0      | 255.255.0.0    | 192.168.2.2      |
| 10.0.10.0     | 255.255.255.255| 192.168.0.9      |
| 10.0.10.0     | 255.255.255.255| 192.168.2.2      |
| 10.0.12.0     | 255.255.255.255| 192.168.0.9      |
| 10.0.12.0     | 255.255.255.255| 192.168.2.2      |
| 10.2.0.0      | 255.255.0.0    | 192.168.0.9      |
| 10.2.0.0      | 255.255.0.0    | 192.168.2.2      |
| 192.168.0.4   | 255.255.255.252| 192.168.0.9      |
| 192.168.0.4   | 255.255.255.252| 192.168.2.2      |
| 192.168.1.0   | 255.255.255.252| 192.168.0.9      |
| 192.168.1.0   | 255.255.255.252| 192.168.2.2      |
| 192.168.0.0   | 255.255.255.252| 192.168.0.9      |
| 192.168.0.0   | 255.255.255.252| 192.168.2.2      |
| 10.1.0.0      | 255.255.0.0    | 192.168.0.9      |
| 10.1.0.0      | 255.255.0.0    | 192.168.2.2      |
| 172.16.1.0    | 255.255.255.0  | 192.168.0.9      |
| 172.16.1.0    | 255.255.255.0  | 192.168.2.2      |
| 10.0.11.0     | 255.255.255.255| 192.168.0.9      |
| 10.0.11.0     | 255.255.255.255| 192.168.2.2      |

### Création des routes 🛤️

```bash
ip route-static (DEST IP) (DEST MASK) (PROCHAIN SAUT)
undo ip route-static (DEST IP) (DEST MASK) (PROCHAIN SAUT)

exemple : ip route-static 10.0.12.0 255.255.255.255 192.168.2.2
```

# Sécurisation 🔐

## Création d’un utilisateur administrateur 👤

```bash
local-user [user]
password cipher [password]
authorization-attribute level 3
service-type terminal
```

## Test de connexion au serveur SSH 🔗

Les switches A5120 sont obsolètes, donc les commandes SSH sont à rallonge

```bash
ssh -oKexAlgorithms=+diffie-hellman-group14-sha1 -c aes128-cbc [user]@[IP]
```

# Teste de la connectivité

```bash
ping 192.168.2.1 
```

Nous pouvons voir que les packets sont bien reçus.

# Export de la configuration 📤

```bash
display current-config
```

```bash
#
 sysname HP
#
 irf mac-address persistent timer
 irf auto-update enable
 undo irf link-delay
#
 domain default enable system
#
 undo ip http enable
#
 password-recovery enable
#
vlan 1
#
vlan 3
#
vlan 5
#
vlan 10 to 11
#
domain system
 access-limit disable
 state active
 idle-cut disable
 self-service-url disable
#
user-group system
 group-attribute allow-guest
#
local-user admin
 password cipher $c$3$T1T97ZjZsiPevYeLJRvF60wdha3U6/DZ
 authorization-attribute level 3
 service-type ssh terminal
#
interface NULL0
#
interface LoopBack0
 ip address 10.0.13.0 255.255.255.255
#
interface Vlan-interface3
 ip address 192.168.0.10 255.255.255.252
#
interface Vlan-interface5
 ip address 192.168.2.1 255.255.255.252
#
interface Vlan-interface10
 ip address 10.3.0.1 255.255.0.0
#
interface Vlan-interface11
 ip address 172.16.3.1 255.255.255.0
#
interface GigabitEthernet1/0/1
 port access vlan 3
#
interface GigabitEthernet1/0/2
 port access vlan 5
#
interface GigabitEthernet1/0/3
 port access vlan 10
#
interface GigabitEthernet1/0/4
 port access vlan 11
#
interface GigabitEthernet1/0/5
#
interface GigabitEthernet1/0/6
#
interface GigabitEthernet1/0/7
#
interface GigabitEthernet1/0/8
#
interface GigabitEthernet1/0/9
#
interface GigabitEthernet1/0/10
#
interface GigabitEthernet1/0/11
#
interface GigabitEthernet1/0/12
#
interface GigabitEthernet1/0/13
#
interface GigabitEthernet1/0/14
#
interface GigabitEthernet1/0/15
#
interface GigabitEthernet1/0/16
#
interface GigabitEthernet1/0/17
#
interface GigabitEthernet1/0/18