# TP Docker - Grégory WALLON

## 1️⃣ Préparer le stockage

1. 🖥️ **Créer une nouvelle partition sur le disque :**
   ```bash
   fdisk /dev/vda4 (n / p / w)
   ```

2. 🛠️ **Initialiser le volume physique :**
   ```bash
   pvcreate /dev/vda4
   ```

3. 📦 **Étendre le groupe de volumes `ubuntu-vg` avec la nouvelle partition :**
   ```bash
   vgextend ubuntu-vg /dev/vda4
   ```

4. 📈 **Étendre le volume logique `ubuntu-lv` de 5 Go et redimensionner le système de fichiers :**
   ```bash
   lvextend -L +5G -r /dev/ubuntu-vg/ubuntu-lv
   ```

5. 🔍 **Vérifier les changements sur les volumes :**
   ```bash
   lsblk
   df -h
   ```

## 2️⃣ Installer Docker

1. 🛠️ **Installer Docker :**
   ```bash
   apt install docker.io
   ```

2. 📥 **Télécharger l'image Docker de Code Server :**
   ```bash
   docker pull linuxserver/code-server
   ```

3. 🗂️ **Vérifier les images Docker disponibles :**
   ```bash
   docker image ls
   ```

4. 🔄 **Vérifier les conteneurs en cours d'exécution :**
   ```bash
   docker container ls
   ```

5. 🛠️ **Utiliser une autre commande pour vérifier les processus Docker :**
   ```bash
   docker ps
   ```


## 3️⃣ Exécuter Code Server dans Docker

🚀 **Lancer le conteneur Docker avec les paramètres spécifiés :**
```bash
docker run -d --name=code-server -e PASSWORD="test" -p 8443:8443 lscr.io/linuxserver/code-server:latest
```

🌐 **Accéder à VS Code via le navigateur :**
```bash
http://[IPV6]:8443
```