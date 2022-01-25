# ✨ NestJS project template

This is a NestJS template for initiate projects
What is included?

- TypeScript
- Husky
- Eslint
- Prettier
- Jest
- PrismaJS
- Class Transformer
- Class Validator
- Swagger ( User Branch )
- Passport ( User Branch )
- Bcrypt ( User Branch )


## 🧿 How to use
First you will need a docker postgresql database, for make it easer use `docker-compose` to run the `docker-compose.yml` file that will up a docker container with the already configured db

The default configurations is:
```yml
  database:
    image: postgres
    environment:
      POSTGRES_PASSWORD: 'docker'
      POSTGRES_USERNAME: 'postgres'
      POSTGRES_DB: 'nest-template'
    ports:
      - '5432:5432'
```
On the project root you can run:

```shell

docker-compose up -d

``` 

With the container up you can run the prisma command to migrate your database:

```shell
yarn prisma migrate dev
```

If everything is right you should have your project ready and to run  it on development enviroment use:

```shell

yarn dev

```
For production first you should compile it with:
```shell

yarn build

```


Then to run the production enviroment use:

```shell

yarn start

```

### 📕 Customizing

If you whant to change the db name you should alter the postgresql url on `.env` and apply the same changes to the `docker-compose.yml`

```env
# .env file
# Change the database name to dogDB

DATABASE_URL="postgresql://postgres:docker@localhost:5432/dogDB?schema=public"
```

```yml
# docker-compose.yml file
 environment:
      POSTGRES_PASSWORD: 'docker'
      POSTGRES_USERNAME: 'postgres'
      POSTGRES_DB: 'dogDB'
    ports:
...
```


## 🕹 Other Setups

This template has others configurations that use the main branch as base, to access it just go for the branch that implements what you need and use as template when creating your repository or clone it.

- User with clean architecture: `feat/user`
- User with nestj simple architecture: `feat/user-simple`
