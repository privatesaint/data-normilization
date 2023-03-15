import { Model } from "objection";
import path from "path";
import Antonym from "./Antonym";
import Definition from "./Definition";
import Synonym from "./Synonym";

export default class WordMeaning extends Model {
  id!: number;
  wordId!: number;
  partOfSpeech!: string;
  definitions!: Definition[];
  synonyms!: Synonym[];
  antonyms!: Antonym[];
  created_at!: string;
  updated_at!: string;

  static tableName = "wordMeanings";

  async $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  static get relationMappings() {
    return {
      // word to wordMeanings relationship
      word: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, "Word"),
        join: {
          from: "wordMeanings.wordId",
          to: "words.id",
        },
      },

      // wordMeaning to definitions relationship
      definitions: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, "Definition"),
        join: {
          from: "wordMeanings.id",
          to: "definitions.wordMeaningId",
        },
      },

      // wordMeaning to synonyms relationship
      synonyms: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, "Synonym"),
        join: {
          from: "wordMeanings.id",
          to: "synonyms.wordMeaningId",
        },
      },

      // wordMeaning to antonyms relationship
      antonyms: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, "Antonym"),
        join: {
          from: "wordMeanings.id",
          to: "antonyms.wordMeaningId",
        },
      },
    };
  }
}
