import { ApolloServer, gql } from "apollo-server-micro";
import { v4 } from "uuid";

const products = [
  { id: v4(), name: "disco solido", stock: 1 },
  { id: v4(), name: "disco duro", stock: 2 },
  { id: v4(), name: "fuente básica", stock: 2 },
  { id: v4(), name: "fuente evga", stock: 2 },
  { id: v4(), name: "cpu", stock: 2 },
  { id: v4(), name: "ram", stock: 2 },
];

const typeDefs = gql`
  type Product {
    id: String
    name: String
    stock: Int
  }

  input InputProduct {
    name: String!
    stock: Int!
  }

  type Query {
    hello: String
    getProducts: [Product]
  }
  type Mutation {
    createProduct(product: InputProduct): Product
    # createSale(): [String]
  }
`;

const resolvers = {
  Query: {
    hello() {
      return "hola hola";
    },
    getProducts: () => products,
  },
  Mutation: {
    createProduct: (_, { product }) => {
      product.id = v4();
      products.push(product);
      // throw new Error("product is registed")
      return product;
    },
    // createSale: (_, args) => {

    // }
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

export default apolloServer.createHandler({ path: "/api/graphql" });

export const config = {
  api: {
    bodyParser: false,
  },
};
