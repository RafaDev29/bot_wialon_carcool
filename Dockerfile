FROM node:20-alpine

WORKDIR /app

# Copiamos dependencias primero
COPY package*.json ./
RUN npm install

# Copiamos el resto del proyecto (incluye .env)
COPY . .

# Compilamos TS
RUN npm run build

# Ejecutamos el bot
CMD ["node", "dist/main.js"]
