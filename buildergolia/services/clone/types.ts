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

export interface IDataToTransformToAlgolia {
  id: string;
  title: string;
  slug: string;
  questions: IFaqQuestion[];
  data?: IBuilderAlgoliaData;
}
export type TFaqCategory = {
  id: string;
  title: string;
  slug: string;
  questions: {
    id: string;
    question: string;
    answer: string;
  }[];
};

export interface IBuilderAlgoliaData {
  category: TFaqCategory;
  slug: string;
}
export interface IUpdateDataInAlgolia {
  category: TFaqCategory;
  question: string;
  answer: string;
}

export interface ICloneService {
  cloneFaqToAlgolia: (command: IDataToTransformToAlgolia) => Promise<void>;
}
