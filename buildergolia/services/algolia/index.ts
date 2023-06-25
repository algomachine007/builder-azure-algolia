import { SearchIndex } from "algoliasearch";

import { NnoxxError } from "../../../error/nnoxx-error";
import { usageClient } from "./config";
import { IAlgoliaService } from "./types";
export class AlgoliaService implements IAlgoliaService {
  private createIndex(index) {
    return usageClient.initIndex(index);
  }

  async saveFaqCategoryToAlgolia(data, index) {
    try {
      const algoliaInstance = this.createIndex(index) as SearchIndex;
      await algoliaInstance.saveObjects(data);
    } catch (error) {
      throw new NnoxxError(`[AlgoliaService] ${error.message}`);
    }
  }

  async deleteFaqCategory(categoryObjectID, index) {
    try {
      const algoliaInstance = this.createIndex(index) as SearchIndex;
      await algoliaInstance.deleteObject(categoryObjectID);
    } catch (error) {
      throw new NnoxxError(`[AlgoliaService] ${error.message}`);
    }
  }

  async updateFaqCategory(objectToUpdate, index) {
    try {
      const algoliaInstance = this.createIndex(index) as SearchIndex;
      await algoliaInstance
        .partialUpdateObject(objectToUpdate, {
          createIfNotExists: true,
        })
        .wait();
    } catch (error) {
      throw new NnoxxError(`[AlgoliaService] ${error.message}`);
    }
  }
}
