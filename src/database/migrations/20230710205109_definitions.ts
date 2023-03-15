import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("definitions", function (table) {
    table.increments("id");
    table
      .integer("wordMeaningId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("wordMeanings")
      .onDelete("cascade");
    table.string("definition").nullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("definitions");
}
