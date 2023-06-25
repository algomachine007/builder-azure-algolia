export interface IFaqQuestion {
  question: string;
  answer: string;
  url?: string;
}

export interface IAlgoliaObjectCommand {
  objectID: string;
  title: string;
  questions: IFaqQuestion[];
}

export interface IAlgoliaService {
  saveFaqCategoryToAlgolia(
    data: IAlgoliaObjectCommand,
    index: string,
  ): Promise<void>;
  deleteFaqCategory(categoryObjectID: string, index: string): Promise<void>;
}
