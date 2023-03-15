import { Model } from "objection";
import path from "path";

export default class Synonym extends Model {
  id!: number;
  definitionId!: number;
  wordMeaningId!: number;
  name!: string;
  created_at!: string;
  updated_at!: string;

  static tableName = "synonyms";

  async $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  static get relationMappings() {
    return {
      // synonyms to definition relationship
      definition: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, "Definition"),
        join: {
          from: "synonyms.definitionId",
          to: "definitions.id",
        },
      },

      // synonyms to wordMeaning relationship
      wordMeaning: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, "WordMeaning"),
        join: {
          from: "synonyms.wordMeaningId",
          to: "wordMeanings.id",
        },
      },
    };
  }
}
