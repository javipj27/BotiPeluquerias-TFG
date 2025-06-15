#imagen de node 20 alpine
FROM node:20-alpine

#DIRECTORIO DE TRABAJO
WORKDIR /app

# Copiar archivos de configuración y código fuente
COPY package*.json ./
COPY . .

# Instalar dependencias
RUN npm install

# Instalar dependencias de desarrollo
RUN npm run build

# Exponer el puerto en el que la aplicación escucha
EXPOSE 5173

# Comando para iniciar la aplicación
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]