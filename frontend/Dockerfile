# Utiliser une image Node.js légère pour la construction
FROM node:18-alpine AS builder

# Définir le répertoire de travail pour la construction
WORKDIR /app


# Copier le contenu du répertoire frontend dans le conteneur
COPY ./frontend/ ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application pour la production
RUN npm run build

# Utiliser une image Node.js légère pour l'exécution
FROM node:18-alpine

# Définir le répertoire de travail pour l'exécution
WORKDIR /app

# Copier uniquement les fichiers nécessaires pour exécuter l'application
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Exposer le port utilisé par l'application
EXPOSE 3000

# Définir les variables d'environnement par défaut (modifiable via Coolify)
ENV NODE_ENV=production
ENV PORT=3000

# Commande par défaut pour démarrer l'application
CMD ["node", "dist/index.js"]
