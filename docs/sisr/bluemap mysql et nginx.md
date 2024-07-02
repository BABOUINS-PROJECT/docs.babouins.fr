# TP: M.SAGNARD : MySQL, Minecraft et Reverse Proxy NGINX

## Objectifs

- Installer et configurer un serveur MySQL en Master-Slave.
- Configurer un serveur Minecraft avec BlueMap.
- Configurer un Reverse Proxy NGINX pour accéder à la carte du serveur Minecraft.
- Vérifier le bon fonctionnement de la carte sur le navigateur.
- Vérifier la création des tables dans la base de données MySQL.
- Vérifier la synchronisation des données entre le Master et le Slave.
  
## Définitions

- **Master-Slave** : Architecture de base de données où un serveur (Master) est responsable de l'écriture des données et de leur réplication vers un ou plusieurs serveurs (Slave) pour la lecture.
- **BlueMap** : Plugin Minecraft permettant de générer des cartes interactives du serveur.
- **Reverse Proxy** : Serveur intermédiaire qui reçoit les requêtes des clients et les transmet aux serveurs appropriés.
- **Différence entre Proxy et Reverse Proxy** : Un Proxy est un serveur qui agit en tant qu'intermédiaire entre les clients et les serveurs, tandis qu'un Reverse Proxy agit en tant qu'intermédiaire entre les serveurs et les clients.
*Exemple un serveur dans un restaurant qui prend les commandes des clients et les transmet à la cuisine est un Proxy, tandis qu'un serveur qui reçoit les plats de la cuisine et les apporte aux clients est un Reverse Proxy.*

## Prérequis

Avant de commencer, assurez-vous d'avoir téléchargé les fichiers nécessaires dans le répertoire `/tmp` :

```bash
cd /tmp
```

**Sur le serveur Minecraft** :
```bash
wget https://public.babouins.fr/assets/bluemap-mysql-nginx/server.jar
wget https://public.babouins.fr/assets/bluemap-mysql-nginx/bluemap-spigot.jar
wget https://public.babouins.fr/assets/bluemap-mysql-nginx/minecraft-client.jar
```
**Sur le serveur Proxy** :
```bash
wget https://public.babouins.fr/assets/bluemap-mysql-nginx/default.conf
```

## Partie 1: Installation de MySQL

### Serveur MySQL 1

1. **Installation de MariaDB** :
    ```bash
    apt install mariadb-server mariadb-client -y
    ```

2. **Configuration de MariaDB** :
    ```bash
    nano /etc/mysql/mariadb.conf.d/50-server.cnf
    ```
    - Modifier `bind-address` en `::`
    - Retirer le `#` devant `server-id = 1`
    - Supprimer `log_bin = /var/log/mysql/mysql-bin.log`

3. **Création du répertoire de logs** :
    ```bash
    mkdir /var/log/mysql
    chown mysql:mysql /var/log/mysql
    systemctl restart mariadb.service
    ```

4. **Configuration de l'utilisateur et de la base de données** :
    ```sql
    mysql
    CREATE USER "admin"@"%" IDENTIFIED BY "P@ssw0rd";
    GRANT ALL PRIVILEGES ON *.* TO "admin"@"%";
    FLUSH PRIVILEGES;
    CREATE DATABASE bluemap;
    GRANT ALL PRIVILEGES ON bluemap.* TO "admin"@"%";
    FLUSH PRIVILEGES;
    ```

5. **Vérification du statut du master** :
    ```sql
    SHOW MASTER STATUS;
    ```
    ```
    +------------------+----------+--------------+------------------+
    | File             | Position | Binlog_Do_DB | Binlog_Ignore_DB |
    +------------------+----------+--------------+------------------+
    | mysql-bin.000001 |      328 |              |                  |
    +------------------+----------+--------------+------------------+
    1 row in set (0,000 sec)
    ```

### Serveur MySQL 2

1. **Installation de MariaDB** :
    ```bash
    apt install mariadb-server mariadb-client -y
    ```

2. **Configuration de MariaDB** :
    ```bash
    nano /etc/mysql/mariadb.conf.d/50-server.cnf
    ```
    - Modifier `bind-address` en `::`
    - Retirer le `#` devant `server-id = 2`
    - Supprimer `log_bin = /var/log/mysql/mysql-bin.log`

3. **Création du répertoire de logs** :
    ```bash
    mkdir /var/log/mysql
    chown mysql:mysql /var/log/mysql
    systemctl restart mariadb.service
    ```

4. **Configuration de l'utilisateur et de la base de données** :
    ```sql
    mysql
    CREATE USER "admin"@"%" IDENTIFIED BY "P@ssw0rd";
    GRANT ALL PRIVILEGES ON *.* TO "admin"@"%";
    FLUSH PRIVILEGES;
    CREATE DATABASE bluemap;
    ```

5. **Configuration du Slave** :
    ```sql
    CHANGE MASTER TO MASTER_HOST='IPMYSQL1', MASTER_USER='admin', MASTER_PASSWORD='P@ssw0rd', MASTER_LOG_FILE='mysql-bin.000001', MASTER_LOG_POS=IDPosition;
    START SLAVE;
    SHOW SLAVE STATUS \G;
    ```
    - Vérifier le message "Slave has read all relay log; waiting for more updates"

## Partie 2: Configuration du Serveur Minecraft

1. **Informations** :
    - Le serveur utilise un template préconfiguré avec Minecraft installé (sio1-gw-posix).
    - **Si le redémarrage de Minecraft échoue** :
    - Utiliser `htop`, appuyer sur `F5` pour voir l'arborescence des processus.
    - Sélectionner le processus Minecraft, appuyer sur `F9` et choisir `SIGKILL` pour tuer le processus.

2. **Gestion des processus Minecraft** :
    ```bash
    systemctl stop minecraft-*
    ```
    ```bash
    mv /tmp/server.jar /srv/mc/alice/server.jar
    chown -R alice:alice /srv/mc/alice
    ```
    ```bash
    systemctl start minecraft-alice
    journalctl -u minecraft-alice -f
    systemctl stop minecraft-alice
    ```
    ```bash
    mv /tmp/bluemap-spigot.jar /srv/mc/alice/plugins/
    chown -R alice:alice /srv/mc/alice
    ```
    ```bash
    systemctl start minecraft-alice
    journalctl -u minecraft-alice -f
    ```

3. **Configuration de BlueMap** :
    ```bash
    nano /srv/mc/alice/plugins/BlueMap/core.conf
    ```
    - Mettre `accept-download` à `true`
    ```bash
    mv /tmp/minecraft-client.jar /srv/mc/alice/bluemap/
    ```

4. **Configuration SQL pour BlueMap** :
    ```bash
    apt install mariadb-client -y
    nano /srv/mc/alice/plugins/BlueMap/storages/sql.conf
    ```
    - Modifier l'adresse localhost par l'IP de votre serveur et les identifiants de connexion :
        ```plaintext
        connection-url: "jdbc:mysql://[IPMYSQL1]:3306/bluemap?permitMysqlScheme"
        connection-properties: {
            user: "admin",
            password: "P@ssw0rd"
        }
        ```

5. **Redémarrage de Minecraft** :
    ```bash
    systemctl restart minecraft-alice
    journalctl -u minecraft-alice -f
    ```

6. **Modification des fichiers de configuration des maps** :
    ```bash
    cd /srv/mc/alice/plugins/BlueMap/maps
    ```
    - Modifier `alice.conf`, `alice_nether.conf`, `alice_the_end.conf` :
        ```plaintext
        storage: "file" à remplacer par storage: "sql"
        ```

7. **Rechargement de BlueMap via mcrcon** :
    ```bash
    mcrcon -P 40001 -p alice_OVWBokqwGGLHZdByLgYf0hIlPkTPLMkfyO1v+VPC/n4
    ```
    - Tapez `bluemap reload` puis `q` pour sortir

8. **Vérification de la MAP sur le navigateur** :
    - Se rendre sur [http://[IP SRV MC]:8100] pour vérifier l'apparition de la carte du serveur.

9. **Vérification sur le serveur MySQL 1** :
    ```sql
    mysql
    USE bluemap;
    SHOW TABLES;
    ```

    Le résultat doit être similaire à :
    ```sql
    MariaDB [bluemap]> SHOW TABLES;
    +------------------------------+
    | Tables_in_bluemap            |
    +------------------------------+
    | bluemap_map                  |
    | bluemap_map_meta             |
    | bluemap_map_tile             |
    | bluemap_map_tile_compression |
    | bluemap_storage_meta         |
    +------------------------------+
    5 rows in set (0,000 sec)
    ```

## Partie 3: Configuration du Reverse Proxy NGINX

1. **Installation et génération des certificats TLS via Certbot** :
    ```bash
    apt update && apt upgrade -y
    apt install certbot -y
    certbot certonly --standalone -d fqdn
    ```
    Remplacer `fqdn` par le nom de domaine.

2. **Installation de NGINX** :
    ```bash
    apt install nginx -y
    ```

3. **Configuration de NGINX** :

    ```bash
    mv /tmp/default.conf /etc/nginx/sites-available/default.conf
    ```
    - Remplacer `IPV6-MC` par l'adresse IP V6 du serveur Minecraft.
    - Remplacer `fqdn` par le nom de domaine.

4. **Vérification et redémarrage de NGINX** :
    ```bash
    nginx -t
    systemctl restart nginx
    ```