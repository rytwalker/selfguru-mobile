import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import navStyles from '../../styles/navStyles';
import MessageForm from './MessageForm';

class Message extends Component {
  static navigationOptions = {
    title: 'selfguru',
    ...navStyles
  };
  render() {
    const { loading, Message } = this.props;
    if (loading) return null;
    return (
      <View>
        <MessageForm Message={Message} />
      </View>
    );
  }
}

const messageQuery = gql`
  query Message($id: ID!) {
    Message(id: $id) {
      id
      content
      sendtime
      label
    }
  }
`;

export default graphql(messageQuery, {
  props: ({ data }) => ({ ...data }),
  options: ({ navigation }) => ({
    variables: {
      id: navigation.state.params.id
    }
  })
})(Message);
