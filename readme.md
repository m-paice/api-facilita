# API - Facilita

## Requisitos

* Nodejs
* Docker and Docker-compose
* Yarn

## Instalação

Copiar arquivo .env.example para .env
```bash
cp .env.example .env
```

Criar containers docker
```bash
docker-compose up -d
```

Criar tabelas
```bash
yarn sequelize db:migrate
```

Instalar dependencias 
```bash
yarn install
```

## Inicar

```bash
yarn dev
```