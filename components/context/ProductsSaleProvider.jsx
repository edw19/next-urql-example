import { createContext, useContext, useReducer } from "react";

const ProductsSaleContext = createContext();

const reducer = (prevState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT_TO_SALE":

      // if exist in productsSale
      const indexProduct = prevState.findIndex(product => product.id === action.product.id);


      if(indexProduct !== -1 && prevState[indexProduct].units >= action.product.stock ){
        // alert('the store dont have enough stock')
        console.log("no tienes")
        return [...prevState]
      } 

      if(indexProduct !== -1){
        prevState[indexProduct].units += 1;
        console.log("add units ?")
        return [...prevState]        
      }
      // if dont exist in productsSale
      action.product.units = 1;

      return [...prevState, action.product];

    default:
      break;
  }
};

function ProductsSaleProvider({ children }) {
  const [productsSale, dispatch] = useReducer(reducer, []);
  return (
    <ProductsSaleContext.Provider value={{ productsSale, dispatch }}>
      {children}
    </ProductsSaleContext.Provider>
  );
}

export const useProductsSale = () => useContext(ProductsSaleContext);

export default ProductsSaleProvider;
