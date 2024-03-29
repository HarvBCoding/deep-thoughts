const express = require('express');
// import ApolloServer
const { ApolloServer } = require('apollo-server-express');
const path = require('path');


// import the typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async () => {
  // create a new apollo server and pass in schema data
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });

  // start the apollo server
  await server.start();

  //integrate apollo server w/ the express application as middleware
  server.applyMiddleware({ app });

  // log where we can go to test GQL API
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

// initialize apollo server
startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// serve up static assets
// check to see if the Node environment is in production, 
// if so the Express.js server is to serve any files in the build directory in the client folder
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// a wildcard GET route for the server
// if we make a GET request to any location on the server that doesn't have an explicit route defined, 
// respond with the production-ready React front-end code
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
