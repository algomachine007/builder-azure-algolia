import { builder } from "@builder.io/sdk";

import { BuilderModels } from "../../builder/constants/models";
import { mapFaqsToCategories } from "./map-faqs-to-categories";

export const getFaqCategoryBySlug = async (slug: string) => {
  const faqs = await builder.getAll(BuilderModels.FAQ, {
    apiKey: process.env.NEXT_PUBLIC_BUILDER_API_KEY,
  });
  const normalizedFaqs = mapFaqsToCategories(faqs);

  return normalizedFaqs.find((faq) => faq.slug === slug);
};
