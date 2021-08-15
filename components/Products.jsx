import React from "react";
import { useProducts } from "../repositories/useProducts";
import { useProductsSale } from "./context/ProductsSaleProvider";

function Products() {
  const { products, loading } = useProducts();

  const { dispatch } = useProductsSale();
  if (loading) return <h1>Loading...</h1>;


  return (
    <div>
      Tus Productos {products?.length}
      <ul>
        {products?.map((product) => (
          <li key={product.id}>
            {product.name} stock: <span className="stock">{product.stock}</span>{" "}
            <button
              onClick={() =>
                dispatch({ type: "ADD_PRODUCT_TO_SALE", product })
              }
            >
              Agregar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
