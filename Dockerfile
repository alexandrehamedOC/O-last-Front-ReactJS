# Utiliser l'image node:18 pour la version 18 de Node.js
FROM node:18

# Déclarer l'environnement
ENV NODE_ENV=development

# Configurer le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY ./package.json ./pnpm-lock.yaml* /app/

# Installer pnpm
RUN npm install -g pnpm

# Installer les dépendances avec pnpm
RUN pnpm install

# Copier tous les fichiers du projet
COPY . .

EXPOSE 5173

# Démarrer l'application
CMD ["pnpm", "dev"]