import { builder } from "@builder.io/sdk";
import { BuilderModels } from "../../builder/constants/models";
import { mapFaqsToCategories } from "./map-faqs-to-categories";

export const getFaqCategoryById = async (id: string) => {
  const faqs = await builder.getAll(BuilderModels.FAQ, {
    apiKey: process.env.BUILDER_API_KEY,
  });

  const normalizedFaqs = mapFaqsToCategories(faqs);

  return normalizedFaqs.find((faq) => faq.id === id);
};
