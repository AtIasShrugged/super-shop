## Description

E-shop Pet Project on Nestjs

## Installation

```bash
$ yarn install
```

## Setup db

docker-compose.yml:

```yml
version: '3.9'
services:
  db:
    container_name: super_shop
    image: postgres:15.1-alpine
    restart: always
    environment:
      - POSTGRES_DB=%YOUR_DB_NAME%
      - POSTGRES_USER=%YOUR_POSTGRES_USER$
      - POSTGRES_PASSWORD=$YOUR_POSTGRES_PASSWORD%
      - PGDATA=/var/lib/postgresql/data/pgdata
    ports:
      - '5432:5432'
    volumes:
      - .:/var/lib/postgresql/data
      - ../2. Init Database:/docker-entrypoint-initdb.d
  pgadmin:
    container_name: pgadmin_container
    image: dpage/pgadmin4:latest
    environment:
      PGADMIN_DEFAULT_EMAIL: 'YOUR_EMAIL'
      PGADMIN_DEFAULT_PASSWORD: 'YOUR_PASSWORD'
      PGADMIN_CONFIG_SERVER_MODE: 'False'
    volumes:
      - ./pgadmin:/var/lib/pgadmin
    ports:
      - '5050:80'
    restart: unless-stopped
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 1G
    networks:
      - postgres

networks:
  postgres:
    driver: bridge
```

## Seed db

```bash
yarn prisma db seed
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
