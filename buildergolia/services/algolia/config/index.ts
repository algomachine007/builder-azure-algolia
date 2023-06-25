import algoliasearch from "algoliasearch/lite";

export const usageClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
  process.env.ALGOLIA_SEARCH_ADMIN_KEY,
);
