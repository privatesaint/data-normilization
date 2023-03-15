import { Model } from "objection";
import path from "path";

export default class Antonym extends Model {
  id!: number;
  definitionId!: number;
  wordMeaningId!: number;
  name!: string;
  created_at!: string;
  updated_at!: string;

  static tableName = "antonyms";

  async $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  static get relationMappings() {
    return {
      // antonyms to definition relationship
      definition: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, "Definition"),
        join: {
          from: "antonyms.definitionId",
          to: "definitions.id",
        },
      },

      // antonyms to wordMeaning relationship
      wordMeaning: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, "WordMeaning"),
        join: {
          from: "antonyms.wordMeaningId",
          to: "wordMeanings.id",
        },
      },
    };
  }
}
