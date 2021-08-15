import { useProductsSale } from "./context/ProductsSaleProvider";

function Sales() {
  const { productsSale } = useProductsSale();

  if (productsSale?.length === 0)
    return <h1>No tienes productos para vender</h1>;

  return (
    <div>
      <ul>
        {productsSale.map((product, index) => (
          <li key={product.id + index}>
            {product.name} {product.stock} {product.units}
          </li>
        ))}
      </ul>
      <button className="button">Comprar</button>
    </div>
  );
}

export default Sales;
