import { groupBy } from "lodash";

import { BuilderContent } from "@builder.io/sdk";

export interface IFaqCategory {
  id: string;
  title: string;
  slug: string;
  questions: {
    id: string;
    question: string;
    answer: string;
  }[];
}

type TMapFaqsToCategories = (faqs: BuilderContent[]) => IFaqCategory[];

export const mapFaqsToCategories: TMapFaqsToCategories = (faqs) => {
  const normalizedFaqs = faqs.map((faq) => ({
    id: faq?.id,
    question: faq?.data?.question,
    answer: faq?.data?.answer,
    category: {
      id: faq?.data?.category?.id,
      title: faq?.data?.category?.value?.data?.title,
      slug: faq?.data?.category?.value?.data?.slug,
    },
  }));

  return Object.values(groupBy(normalizedFaqs, "category.id")).reduce<
    IFaqCategory[]
  >((acc, questions) => {
    acc.push({
      id: questions?.[0].category?.id,
      title: questions?.[0].category?.title,
      slug: questions?.[0].category?.slug,
      questions:
        Array.isArray(questions) &&
        questions.map((question) => ({
          id: question.id,
          question: question.question,
          answer: question.answer,
        })),
    });

    return acc;
  }, []);
};
