import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("wordMeanings", function (table) {
    table.increments("id");
    table
      .integer("wordId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("words")
      .onDelete("cascade");
    table.string("partOfSpeech").nullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("wordMeanings");
}
