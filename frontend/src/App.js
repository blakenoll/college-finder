import React from "react";
import Form from "./components/form";
import { GlobalStyle } from "./components/globalStyle";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:4000/"
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <header className="App-header">
        <Form />
      </header>
    </ApolloProvider>
  );
};

export default App;
