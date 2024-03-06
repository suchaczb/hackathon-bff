import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { mockData } from './mockdata.js';
import { StoresAPI } from './stores-api.js';

const typeDefs = `#graphql

  type Store {
    guid: String
    streetAddress: String
    city: String
    description: String
    storeCode: String # not part of schema we gave other teams
    mainStoreCode: String
    phoneNumber: String
    zipCode: String
    state: String
    facebookLink: String
  }

  type Query {
    stores(stateCode: String!): [Store]
  }
`;

// Mock Data Version
// const resolvers = {
//   Query: {
//     stores: () => mockData,
//   },
// };

// Real API version
const resolvers = {
  Query: {
    stores: async (_, { stateCode }, { dataSources }) => {
      return dataSources.storesAPI.getStoreDataByStateCode(stateCode);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// simple mock data version
// const { url } = await startStandaloneServer(server, {
//   listen: { port: 4000 },
// });

// Real API version
const { url } = await startStandaloneServer(server, {
  context: async () => {
    const { cache } = server;
    return {
      dataSources: {
        storesAPI: new StoresAPI({ cache }),
      },
    };
  },
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);