import { builder } from "@builder.io/sdk";

import { BuilderModels } from "../../builder/constants/models";
import { mapFaqsToCategories } from "./map-faqs-to-categories";

export const getFaqCategoryBySlug = async (slug: string) => {
  console.log("SLUG", slug);
  const faqs = await builder.getAll(BuilderModels.FAQ, {
    apiKey: process.env.BUILDER_API_KEY,
  });
  const normalizedFaqs = mapFaqsToCategories(faqs);

  return normalizedFaqs.find((faq) => faq.slug === slug);
};
