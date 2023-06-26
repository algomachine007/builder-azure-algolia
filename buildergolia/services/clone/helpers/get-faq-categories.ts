import { builder } from "@builder.io/sdk";
import { BuilderModels } from "../../builder/constants/models";
import { TFaqCategory } from "../types";
import { mapFaqsToCategories } from "./map-faqs-to-categories";

export const getFaqCategories = async (): Promise<TFaqCategory[]> => {
  const faqs = await builder.getAll(BuilderModels.FAQ, {
    apiKey: process.env.BUILDER_API_KEY,
  });

  return mapFaqsToCategories(faqs);
};
