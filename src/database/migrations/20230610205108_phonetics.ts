import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("phonetics", function (table) {
    table.increments("id");
    table
      .integer("wordId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("words")
      .onDelete("cascade");
    table.string("text").nullable();
    table.string("audio").nullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("phonetics");
}
