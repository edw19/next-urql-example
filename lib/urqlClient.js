import { createClient, ssrExchange, dedupExchange, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";

const isServerSide = typeof window === "undefined";
const ssrCache = ssrExchange({ isClient: !isServerSide });

const client = createClient({
  url: "http://localhost:3000/api/graphql",
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          createProduct: (result, args, cache, info) => {
            const products = cache.resolve("Query", "getProducts");
            if (Array.isArray(products)) {
              products.push(result.createProduct);
              cache.link("Query", "getProducts", products);
            }
          },
        },
      },
    }),
    ssrCache,
    fetchExchange,
  ],
  fetchOptions: () => {
    return { headers: {} };
  },
});

export { client, ssrCache };
