import { Model } from "objection";
import path from "path";

export default class Phonetic extends Model {
  id!: number;
  wordId!: number;
  text!: string;
  audio!: string;
  created_at!: string;
  updated_at!: string;

  static tableName = "phonetics";

  async $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  static get relationMappings() {
    return {
      // word to phonetics relationship
      word: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, "Word"),
        join: {
          from: "phonetics.wordId",
          to: "words.id",
        },
      },
    };
  }
}
