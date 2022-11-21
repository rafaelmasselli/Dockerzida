<h1 align="center"> ⭐ Api dockerizada ⭐</h1>

## 🗒️ Requisitos para iniciar o projeto

### - [Node JS](https://nodejs.org/en/)

### - [IDE](https://code.visualstudio.com/)

### - [Docker](https://www.docker.com/products/docker-desktop/)

### - [PostgreSQL](https://www.postgresql.org/download/)

<hr>

## 👾 Documentação em Swagger

### - http://localhost:3333/documentation

![print documentation swagger](./.github/PrintDocumentationSwagger.png)

<hr>

## ☕ Iniciando o projeto

```bash
## Entre na pasta do back-end
$ cd server

## Instale as dependências
$ yarn && npm i

## Ja na pasta do projeto inicie o banco docker
$ docker compose up
```

### Verifique se o docker esta rodando

![Docker rodando](./.github/dockerRunning.png)

### Ja com o docker rodando crie as migrates do prisma

```bash
$ yarn prisma migrate dev
```

### Agora crie um arquivo .env na pasta SRC

![Print da pasta .env](./.github/printFile.env.png)

### Entre no arquivo .env e cole DATABASE_URL e JWT_KEY abaixo

```bash
DATABASE:
DATABASE_URL="postgresql://postgres:jklv1234@localhost:5432/postgres?schema=dockerizada"

SECRET:
JWT_KEY=582b17dc04221988a7309454e3b387bb
```

### Agora com o docker rodando e com o banco de dados do prisma pronto inicie o projeto

```bash
$ yarn dev

## O projeto ira rodar na porta 3333
## http://localhost:3333
```

<hr>

## ⭐ Dependências usadas no projeto

### - Node em TypeScript

### - Prisma ORM

### - jsonWebToken

### - Swagger
