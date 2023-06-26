import algoliasearch from "algoliasearch/lite";

export const usageClient = algoliasearch(
  process.env.ALGOLIA_APPLICATION_ID,
  process.env.ALGOLIA_ADMIN_APIKEY,
);
