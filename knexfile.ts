import type { Knex } from "knex";

require("dotenv").config();

const config: { [key: string]: Knex.Config } = {
  main: {
    client: "postgres",
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: __dirname + "/src/database/migrations",
    },
    seeds: {
      directory: __dirname + "/src/database/seeds",
    },
  },
};

export default config;
