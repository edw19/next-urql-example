import CreateProduct from "../components/CreateProduct";
import Products from "../components/Products";
import Sales from "../components/Sales";
import { GET_PRODUCTS } from "../repositories/useProducts";
import { withUrqlClient, initUrqlClient } from "next-urql";
import { ssrExchange, dedupExchange, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import ProductsSaleProvider from "../components/context/ProductsSaleProvider";
import { gql } from "@urql/core";

const cache = cacheExchange({
  updates: {
    Mutation: {
      createProduct(result, args, cache, info) {
        cache.updateQuery(
          {
            query: gql`
              query getProducts {
                getProducts {
                  id
                  name
                  stock
                }
              }
            `,
          },
          (data) => {
            console.log(result.createProduct);
            data.getProducts.push(result.createProduct);
            return data;
          }
        );
        // const products = cache.resolve("Query", "getProducts");
        // if (Array.isArray(products)) {
        //   if (result.product) {
        //     products.push(result.createProduct);
        //     cache.updateQuery("Query", "getProducts", products);
        //   }
        // }
      },
    },
  },
});

const Home = () => {
  return (
    <ProductsSaleProvider>
      <div className="grid">
        <Products />
        <Sales />
        <CreateProduct />
      </div>
    </ProductsSaleProvider>
  );
};

export const getServerSideProps = async () => {
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient({
    url: "http://localhost:3000/api/graphql",
    exchanges: [dedupExchange, cache, ssrCache, fetchExchange],
  });

  await client.query(GET_PRODUCTS).toPromise();

  return { props: { urqlState: ssrCache.extractData() } };
};

export default withUrqlClient(
  (ssrCache, ctx) => ({
    // ...add your Client options here
    url: "http://localhost:3000/api/graphql",
    exchanges: [dedupExchange, cache, ssrCache, fetchExchange],
  }),
  { ssr: false }
)(Home);
