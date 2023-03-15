import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("antonyms", function (table) {
    table.increments("id");
    table
      .integer("wordMeaningId")
      .unsigned()
      .nullable()
      .references("id")
      .inTable("wordMeanings")
      .onDelete("cascade");
    table
      .integer("definitionId")
      .unsigned()
      .nullable()
      .references("id")
      .inTable("definitions")
      .onDelete("cascade");
    table.string("name").nullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("antonyms");
}
