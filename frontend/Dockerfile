# Utiliser une image officielle de Node.js
FROM node:22.12.0

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour optimiser le cache Docker
COPY package*.json ./

# Installer les dépendances
RUN npm install --legacy-peer-deps

# Copier tout le code source dans le conteneur
COPY . .

# Exposer le port 3000
EXPOSE 3000

# Lancer l'application React
CMD ["npm", "start"]
