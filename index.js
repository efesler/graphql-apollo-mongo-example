const { ApolloServer, gql } = require('apollo-server');
const {CustomerTC } = require('./customer');
const connectDB = require("./db");
const { schemaComposer } = require('graphql-compose');

schemaComposer.Query.addFields({
    customers: CustomerTC.mongooseResolvers.findMany({ lean: true }),  
    customer: CustomerTC.mongooseResolvers.findOne({ lean: true }),
    customerPagination: CustomerTC.mongooseResolvers.pagination({ lean: true }),
    customerCount: CustomerTC.mongooseResolvers.count({ lean: true }),
});

// Build graphql schema
const schema = schemaComposer.buildSchema();

// Create an apollo server
const {
  ApolloServerPluginLandingPageLocalDefault
} = require('apollo-server-core');

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  schema: schema,
  introspection: true,
  
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