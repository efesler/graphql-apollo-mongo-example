const { ApolloServer, gql } = require('apollo-server');
const { CustomerModel } = require('./customer');
const connectDB = require("./db");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Customer {
    firstName: String,
    lastName: String,
    company: String,
    connectInfo: ContactInfoSchema
  }

  type ContactInfoSchema {
    tel: [String],
    email: [String],
    address: AddressSchema
  }

  type AddressSchema {
    city: String,
    street: String,
    houseNumber: String
  }


  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    customers: [Customer]
    customer(firstName: String): Customer
  }

`;


// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        customers:  () => {
          return new Promise((resolve,reject)=>{
            CustomerModel.find((err,customers)=>{
                if(err) reject(err);
                else resolve(customers);
            })
          })
    
        }
    },
};

const {
  ApolloServerPluginLandingPageLocalDefault
} = require('apollo-server-core');

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  // introspection: true,
  // mocks: true, // TODO: Remove in PROD.
  // mockEntireSchema: false, // TODO: Remove in PROD.
  // playground: true,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  /**
   * What's up with this embed: true option?
   * These are our recommended settings for using AS;
   * they aren't the defaults in AS3 for backwards-compatibility reasons but
   * will be the defaults in AS4. For production environments, use
   * ApolloServerPluginLandingPageProductionDefault instead.
  **/
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});

connectDB();

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});