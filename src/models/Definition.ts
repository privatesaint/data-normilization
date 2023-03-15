import { Model } from "objection";
import path from "path";
import Antonym from "./Antonym";
import Synonym from "./Synonym";

export default class Definition extends Model {
  id!: number;
  wordMeaningId!: number;
  definition!: string;
  synonyms!: Synonym[];
  antonyms!: Antonym[];
  created_at!: string;
  updated_at!: string;

  static tableName = "definitions";

  async $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  static get relationMappings() {
    return {
      // wordMeaning to definitions relationship
      wordMeaning: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, "WordMeaning"),
        join: {
          from: "definitions.wordMeaningId",
          to: "wordMeanings.id",
        },
      },

      // definitions to synonyms relationship
      synonyms: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, "Synonym"),
        join: {
          from: "definitions.id",
          to: "synonyms.definitionId",
        },
      },

      // definitions to antonyms relationship
      antonyms: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, "Antonym"),
        join: {
          from: "definitions.id",
          to: "antonyms.definitionId",
        },
      },
    };
  }
}
