import { useQuery } from "urql";
import { client, ssrCache } from "../lib/urqlClient";

export const GET_PRODUCTS = `
    query getProducts {
    getProducts {
      id
      name
      stock
    }
  }
`;

export const useProducts = () => {
  const [{ data, error, fetching }, reexecuteQuery] = useQuery({
    query: GET_PRODUCTS,
  });

  const refresh = () => {
    // reexecuteQuery({ requestPolicy: "network-only" });
  };

  return {
    products: data?.getProducts,
    loading: fetching,
    refresh,
  };
};
