import { useMutation } from "urql";

const CREATE_PRODUCT = `
    mutation createProduct($product: InputProduct) {
        createProduct(product:$product) {
            id
            name
            stock
        }
    }
`;

export const useCreateProduct = () => {
  const [{ fetching, error }, executeMutation] = useMutation(CREATE_PRODUCT);

  console.log(error)
  const createProduct = (product) => {
      executeMutation({ product });
  };

  return { createProduct, loading: fetching, error };
};
