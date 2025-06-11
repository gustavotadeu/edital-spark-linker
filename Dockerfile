FROM node:18-alpine

WORKDIR /app


# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Agora o restante do código-fonte
COPY . .

# Porta padrão do Vite (pode mudar no package.json)
EXPOSE 8080

# Permite acesso externo ao dev-server
ENV HOST 0.0.0.0

# Rodamos o Vite com host liberado
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
