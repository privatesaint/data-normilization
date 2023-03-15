import { Model } from "objection";
import path from "path";
import Word from "./Word";

export default class User extends Model {
  id!: number;
  userName!: string;
  words!: Word[];
  created_at!: string;
  updated_at!: string;

  static tableName = "users";

  async $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  static get relationMappings() {
    return {
      // user to word relationship
      words: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, "Word"),
        join: {
          from: "users.id",
          to: "words.userId",
        },
      },
    };
  }
}
