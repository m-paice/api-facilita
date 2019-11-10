# API - Facilita

## Requisitos

* Nodejs
* Docker and Docker-compose
* Yarn

## Instalação

Instalar dependencias 
```bash
yarn install
```

Copiar arquivo .env.example para .env
```bash
cp .env.example .env
```

Criar containers docker
```bash
docker-compose up -d
```

## Banco de dados

Criar tabelas
```bash
yarn sequelize db:migrate
```

Criar seeds
```bash
yarn sequelize db:seed:all
```

## Inicar

```bash
yarn dev
```