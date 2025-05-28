# Utiliser une image Node.js légère pour la construction
FROM node:18-alpine AS builder

# Définir le répertoire de travail pour la construction
WORKDIR /app

# Set environment variables for the build process
ENV NODE_ENV=${NODE_ENV}
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
ENV STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
ENV PORT=3000

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
ENV NODE_ENV=${NODE_ENV}
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
ENV STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
ENV PORT=3000

# Commande par défaut pour démarrer l'application
CMD ["node", "dist/index.js"]
