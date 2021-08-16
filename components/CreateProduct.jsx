import { useState } from "react";
import { useCreateProduct } from "../repositories/useCreateProduct";

function CreateProduct() {
  const [product, setProduct] = useState({
    name: "Gráfica 1660 ti",
    stock: 10,
  });
  const { createProduct, loading, error } = useCreateProduct();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // e.stopPropagation();
    if (!product.name || !product.stock) {
      return alert("ingres un nuevo producto");
    }

    try {
      createProduct(product);
      // clear form
    } catch (error) {
      // catch the error
    }
  };

  return (
    <div>
      <h1>Crear Producto</h1>
      <form className="grid-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="nombre del producto"
          className="inputs"
        />
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          placeholder="stock del producto"
          className="inputs"
        />
        {error && <p>{error.message.replace("[GraphQL]", "")}</p>}
        {loading ? (
          "loading...."
        ) : (
          <input type="submit" className="button" value="Registrar" />
        )}
      </form>
    </div>
  );
}

export default CreateProduct;
