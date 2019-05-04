FROM node:11.4.0

ARG context_path=src

# instala um servidor http simples para servir conteúdo estático
# RUN apt-get update
RUN npm install -g http-server
RUN npm install -g @vue/cli

# faz da pasta 'app' o diretório atual de trabalho
WORKDIR /var/www/nuxt-app

# copia os arquivos 'package.json' e 'package-lock.json' (se disponível)
COPY ${context_path}/nuxt-app/package.json ./

# instala dependências do projeto
RUN npm install
RUN node -r esm
# copia arquivos e pastas para o diretório atual de trabalho (pasta 'app')
# COPY . .

# compila a aplicação de produção com minificação
# RUN npm run build
ENV HOST 0.0.0.0
EXPOSE 3000
# CMD [ "http-server", "dist" ]
CMD [ "npm", "run",  "dev"]