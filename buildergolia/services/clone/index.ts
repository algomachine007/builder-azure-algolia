import { NnoxxError } from "../../../error/nnoxx-error";
import { AlgoliaService } from "../algolia";
import { ENVIRONMENT, FAQ_INDEX } from "./enum";
import { fetchFaqCategory } from "./helpers/get-faq-category";
import { getFaqCategoryById } from "./helpers/get-faq-category-by-id";
import {
  IAlgoliaObjectCommand,
  ICloneService,
  IDataToTransformToAlgolia,
  IUpdateDataInAlgolia,
} from "./types";

export class CloneService implements ICloneService {
  private getFaqIndex() {
    switch (process.env.AZURE_FUNCTIONS_ENVIRONMENT) {
      case ENVIRONMENT.DEVELOPMENT:
        return FAQ_INDEX.DEV;

      case ENVIRONMENT.STAGING:
        return FAQ_INDEX.STAGING;

      case ENVIRONMENT.PRODUCTION:
        return FAQ_INDEX.PRODUCTION;
    }
  }

  private transformFaqToAlgoliaFormat = async (
    data: IDataToTransformToAlgolia,
  ): Promise<IAlgoliaObjectCommand[]> => {
    const faqOfCategory = await fetchFaqCategory(data);

    const result = [];

    if (faqOfCategory) {
      const response = {
        objectID: faqOfCategory.id,
        title: faqOfCategory.title,
        slug: faqOfCategory.slug,
        questions: faqOfCategory.questions,
      };
      result.push(response);
    }
    return result;
  };

  public async cloneFaqToAlgolia(command: IDataToTransformToAlgolia) {
    try {
      // const index = this.getFaqIndex();

      const index = "faq_test";

      const algoliaService = new AlgoliaService();

      const transformedDataToAlgoliaFormat =
        await this.transformFaqToAlgoliaFormat(command);

      await algoliaService.saveFaqCategoryToAlgolia(
        transformedDataToAlgoliaFormat,
        index,
      );
    } catch (error) {
      throw new NnoxxError(`[AlgoliaService] ${error} `);
    }
  }

  public async deleteFaqCategoryInAlgolia(command: IDataToTransformToAlgolia) {
    try {
      const index = this.getFaqIndex();

      console.log("item to delete", command);
      // const index = "faq_test";
      const algoliaService = new AlgoliaService();
      const transformedDataToAlgoliaFormat =
        await this.transformFaqToAlgoliaFormat(command);

      for (const faqCategory of transformedDataToAlgoliaFormat) {
        console.log("to delete ❌", faqCategory);
        await algoliaService.deleteFaqCategory(faqCategory.objectID, index);
      }
    } catch (error) {
      throw new NnoxxError(`[AlgoliaService] ${error} `);
    }
  }

  public async updateFaqCategoryInAlgolia(command: IUpdateDataInAlgolia) {
    try {
      const index = this.getFaqIndex();
      // const index = "faq_test";
      const algoliaService = new AlgoliaService();

      const categoryId = command.category.id;

      console.log("command", command);

      // if it includes category, then update the title and slug with command data

      console.log("categoryId", categoryId);

      const faqOfCategory = await getFaqCategoryById(categoryId);

      console.log("Actual faq to update", faqOfCategory);

      const questionToUpdate = faqOfCategory.questions.find(
        (question) => question.question,
      );

      const updateFieldInAlgolia = {
        id: questionToUpdate.id,
        question: command.question,
        answer: command.answer,
      };

      const updatedFaqCategory = faqOfCategory?.questions.map((question) => {
        if (question?.id === questionToUpdate.id) {
          return updateFieldInAlgolia;
        }
        return question;
      });

      await algoliaService.updateFaqCategory(
        { objectID: categoryId, questions: [updatedFaqCategory] },
        index,
      );
    } catch (error) {
      throw new NnoxxError(`[AlgoliaService] ${error} `);
    }
  }
}
