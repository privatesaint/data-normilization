import User from "../models/User";
import ErrorHandler from "../utils/ErrorHandler";
import axios from "axios";
import Word from "../models/Word";
import License from "../models/License";
import SourceUrl from "../models/SourceUrl";
import Phonetic from "../models/Phonetic";
import WordMeaning from "../models/WordMeaning";
import Definition from "../models/Definition";
import Synonym from "../models/Synonym";
import Antonym from "../models/Antonym";

class UserService {
  /**
   * Create User
   * @param data
   * @returns
   */
  static async create(data) {
    return User.query().insert({
      userName: data.userName,
    });
  }

  /**
   * Filter dictionary from external api and normalise the response in the db
   * @param query
   * @param userId
   * @returns
   */
  static async filterDictionary(query: string, userId: string) {
    // check if user exist in our db
    const user = await User.query().findById(userId);

    if (!user) {
      throw new ErrorHandler("User not found", 404);
    }

    const dict = await axios(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
    );

    for (const data of dict.data) {
      try {
        await Word.transaction(async (trx) => {
          // store the word
          const word = await Word.query(trx).insert({
            userId: user.id,
            word: data.word,
            phonetic: data.phonetic,
            origin: data.origin,
          });

          // store phonetics
          const phonetics = data.phonetics?.map((pt) => ({
            text: pt.text,
            audio: pt.audio,
            wordId: word.id,
          }));

          // only insert if there is phonetics
          phonetics.length && (await Phonetic.query(trx).insert(phonetics));

          // store all the available meanings
          await this.saveWordMeanings(data, trx, word);

          // store license
          await License.query(trx).insert({
            name: data.license?.name,
            url: data.license?.url,
            wordId: word.id,
          });

          // store sourceurl
          if (data.sourceUrls?.length) {
            const su = data.sourceUrls?.map((su) => ({
              url: su,
              wordId: word.id,
            }));

            await SourceUrl.query(trx).insert(su);
          }
        });
      } catch (error) {
        console.log(error);
        throw error;
      }
    }

    return dict.data;
  }

  /**
   * Handles saving of word's meaning
   * @param data
   * @param trx
   * @param word
   * @returns
   */
  private static saveWordMeanings(data: any, trx, word: Word) {
    const processingJob = data.meanings?.map(async (mn) => {
      const wordm = await WordMeaning.query(trx).insert({
        partOfSpeech: mn.partOfSpeech,
        wordId: word.id,
      });

      // data meaning definitions and definitions antonym and synonym
      await Promise.all(
        mn.definitions.map((df) => {
          return Definition.query(trx)
            .insert({
              wordMeaningId: wordm.id,
              definition: df.definition,
            })
            .then((createdDefinition) => {
              //   modify the data to support bulk import for both synonym and antonyms
              const synonymsOfDefinition = mn.synonyms?.map((synonym) => ({
                name: synonym,
                definitionId: createdDefinition.id,
              }));
              const antonymsOfDefinition = mn.antonyms?.map((antonym) => ({
                name: antonym,
                definitionId: createdDefinition.id,
              }));

              //   also handle scenario where there are no antonym/synonyms
              return Promise.all([
                synonymsOfDefinition.length
                  ? Synonym.query(trx).insert(synonymsOfDefinition)
                  : null,
                antonymsOfDefinition.length
                  ? Antonym.query(trx).insert(antonymsOfDefinition)
                  : null,
              ]);
            });
        })
      );

      //   store the synonyms and antonyms for word meanings
      // resolve the two jobs together
      const synonymsOfMeaning = mn.synonyms?.map((synonym) => ({
        name: synonym,
        wordMeaningId: wordm.id,
      }));
      const antonymsOfMeaning = mn.antonyms?.map((synonym) => ({
        name: synonym,
        wordMeaningId: wordm.id,
      }));

      return Promise.all([
        synonymsOfMeaning.length
          ? Synonym.query(trx).insert(synonymsOfMeaning)
          : null,
        antonymsOfMeaning.length
          ? Antonym.query(trx).insert(antonymsOfMeaning)
          : null,
      ]);
    });
    return Promise.all(processingJob);
  }
}

export default UserService;
