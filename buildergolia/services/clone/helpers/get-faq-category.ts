import { IDataToTransformToAlgolia } from "../types";
import { getFaqCategories } from "./get-faq-categories";
import { getFaqCategoryBySlug } from "./get-faq-category-by-slug";

export const fetchFaqCategory = async (data: IDataToTransformToAlgolia) => {
  try {
    const categoryModelId = data.data.category.id;
    const categories = await getFaqCategories();
    const faqCategorySlug = categories.find(
      (el) => el.id === categoryModelId,
    ).slug;

    return await getFaqCategoryBySlug(faqCategorySlug);
  } catch (error) {
    throw new Error(`Builder Algolia integration failed with ${error.message}`);
  }
};
