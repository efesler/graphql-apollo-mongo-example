# graphql-apollo-mongo-example

## Development Environment

### Dev Container
This repository is using Dev Container feature for Visual Studio Code. Simply open the repository within Visual Studio Code with Dev Container capabilities and your development environment will be setup.

### Dependencies installation
Just type
````
npm install
`````
Thiw will install all the dependencies.

### Seed the database
Just type
`````
$ node seed.js
`````
This will seed the database.

> **_TODO_** the seed script should be defined as a task for npm

## Start the server
Just type
`````
node index.js
`````
A graphQL playgroud is available through `http://localhost:4000`


## To go further

- [x] Use graphql-compose-mongoose to have a more generic approach to create resolvers
- [ ] Review seed code for better usage of Promise
- [ ] Work on security with API Gateway

