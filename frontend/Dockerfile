# Utiliser une image Node.js légère pour la construction
FROM node:18-alpine AS builder

# Définir le répertoire de travail pour la construction
WORKDIR /app

# Définir les arguments de build
ARG NODE_ENV
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ARG STRIPE_SECRET_KEY
ARG NEXT_PUBLIC_APP_URL

# Exporter les arguments comme variables d'environnement
ENV NODE_ENV=${NODE_ENV}
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
ENV STRIPE_KEY=${STRIPE_KEY}
ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}

# Copier le contenu du répertoire frontend dans le conteneur
COPY ./frontend/ ./

# Installer les dépendances
RUN npm install

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

# Commande par défaut pour démarrer l'application
CMD ["node", "dist/index.js"]
