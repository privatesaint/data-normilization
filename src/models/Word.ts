import { Model } from "objection";
import path from "path";
import License from "./License";
import Phonetic from "./Phonetic";
import SourceUrl from "./SourceUrl";
import WordMeaning from "./WordMeaning";

export default class Word extends Model {
  id!: number;
  userId!: number;
  word!: string;
  phonetic!: string;
  origin!: string;
  phonetics!: Phonetic[];
  sourceUrls!: SourceUrl[];
  license!: License;
  wordMeanings!: WordMeaning[];
  created_at!: string;
  updated_at!: string;

  static tableName = "words";

  async $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  static get relationMappings() {
    return {
      // word to user relationship
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, "User"),
        join: {
          from: "words.userId",
          to: "user.id",
        },
      },

      // word to phonetics relationship
      phonetics: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, "Phonetic"),
        join: {
          from: "words.id",
          to: "phonetics.wordId",
        },
      },

      // word to sourceUrls relationship
      sourceUrls: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, "SourceUrl"),
        join: {
          from: "words.id",
          to: "sourceUrls.wordId",
        },
      },

      // word to license relationship
      license: {
        relation: Model.HasOneRelation,
        modelClass: path.join(__dirname, "License"),
        join: {
          from: "words.id",
          to: "licenses.wordId",
        },
      },

      // word to wordMeanings relationship
      wordMeanings: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, "WordMeaning"),
        join: {
          from: "words.id",
          to: "wordMeanings.wordId",
        },
      },
    };
  }
}
