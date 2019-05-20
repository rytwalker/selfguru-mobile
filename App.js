import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import { Font } from 'expo';
import { Root } from 'native-base';
import Navigator from './Navigator';
import { getToken } from './utils/loginUtils';
// import Alert from '../../utils/Alert';

const authLink = setContext(async (req, { headers }) => {
  const token = await getToken();
  return {
    ...headers,
    headers: {
      authorization: token ? `Bearer ${token}` : null
    }
  };
});

const httpLink = new HttpLink({
  uri: 'https://api.graph.cool/simple/v1/cjvscykmz3wur0164s5uc3fwr'
});

const link = authLink.concat(httpLink);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export default class App extends Component {
  state = { fontLoaded: false };
  async componentDidMount() {
    await Font.loadAsync({
      'arvo-bold': require('./assets/fonts/Arvo-Bold.ttf')
    });
    this.setState({ fontLoaded: true });
  }
  render() {
    const { fontLoaded } = this.state;
    return (
      <ApolloProvider client={client}>
        <Root>{fontLoaded && <Navigator />}</Root>
      </ApolloProvider>
    );
  }
}
