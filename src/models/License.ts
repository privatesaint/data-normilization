import { Model } from "objection";
import path from "path";

export default class License extends Model {
  id!: number;
  wordId!: number;
  name!: string;
  url!: string;
  created_at!: string;
  updated_at!: string;

  static tableName = "licenses";

  async $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  static get relationMappings() {
    return {
      // word to licenses relationship
      word: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, "Word"),
        join: {
          from: "licenses.wordId",
          to: "words.id",
        },
      },
    };
  }
}
