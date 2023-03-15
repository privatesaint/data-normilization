import { Model } from "objection";
import path from "path";

export default class SourceUrl extends Model {
  id!: number;
  wordId!: number;
  url!: string;
  created_at!: string;
  updated_at!: string;

  static tableName = "sourceUrls";

  async $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  static get relationMappings() {
    return {
      // word to sourceUrls relationship
      word: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, "Word"),
        join: {
          from: "sourceUrls.wordId",
          to: "words.id",
        },
      },
    };
  }
}
