import { SearchIndex } from "algoliasearch";

import { NnoxxError } from "../../../error/nnoxx-error";
import { usageClient } from "./config";
import { IAlgoliaService } from "./types";
export class AlgoliaService implements IAlgoliaService {
  private createIndex(index) {
    console.log("Index, ", index);
    const indexx = "faq_test";
    // console.log("USAGE CLIENT", usageClient);
    return usageClient.initIndex(indexx);
  }

  async saveFaqCategoryToAlgolia(data, index) {
    try {
      const algoliaInstance = this.createIndex(index) as SearchIndex;
      await algoliaInstance.saveObjects(data);
    } catch (error) {
      throw new NnoxxError(`[AlgoliaService saveFaq] ${error.message}`);
    }
  }

  async deleteFaqCategory(categoryObjectID, index) {
    try {
      const algoliaInstance = this.createIndex(index) as SearchIndex;
      await algoliaInstance.deleteObject(categoryObjectID);
    } catch (error) {
      throw new NnoxxError(`[AlgoliaService deleteFaq] ${error.message}`);
    }
  }

  async updateFaqCategory(objectToUpdate, index) {
    console.log("objectToUpdate", objectToUpdate);
    try {
      const algoliaInstance = this.createIndex(index) as SearchIndex;
      await algoliaInstance
        .partialUpdateObject(objectToUpdate, {
          createIfNotExists: true,
        })
        .wait();
    } catch (error) {
      throw new NnoxxError(`[AlgoliaService updateFaq] ${error.message}`);
    }
  }
}
