import React from 'react';
// import ApolloClient from 'apollo-boost';
import { ApolloClient } from 'apollo-client';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// // import { setContext } from 'apollo-link-context';
// import { createHttpLink } from 'apollo-link-http';
// // import { ApolloLink } from 'apollo-link';
// import { ApolloProvider } from 'react-apollo';
import { ApolloProvider } from 'react-apollo';
import { createBatchingNetworkInterface } from 'apollo-client';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppComponent from './components/App';

// const httpLink = createHttpLink({
//   uri: 'http://localhost:5000/graphql',
//   credentials: 'same-origin'
// });

// const cache = new InMemoryCache({
//   dataIdFromObject: o => o.id
// });

// use with apollo-client
// const link = afterwareLink.concat(httpLink);

const client = new ApolloClient({
  networkInterface: createBatchingNetworkInterface({
    uri: 'http://localhost:5000/graphql', // have to provide uri to interface!
    batchInterval: 100 // time in ms to throttle queries
  }),
  cache
});

// const client = new ApolloClient({
//   link: httpLink,
//   cache
// });

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Route exact path="/" component={AppComponent} />
      </Router>
    </ApolloProvider>
  );
}

export default App;
