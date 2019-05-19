import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import MessageForm from './MessageForm';

class Message extends Component {
  render() {
    const { handleSubmit, loading, Message } = this.props;
    if (loading) return null;
    return <MessageForm Message={Message} handleSubmit={handleSubmit} />;
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
