import React, { Component } from 'react';
import { View } from 'react-native';
import MessageForm from './MessageForm';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';

class MessageNew extends Component {
  handleSubmit = async ({ content, label, sendtime }) => {
    const { newMessage, toggleNewMessage } = this.props;
    try {
      toggleNewMessage();
      await newMessage({
        variables: {
          content,
          label,
          sendtime
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <View>
        <MessageForm handleSubmit={this.handleSubmit} />
      </View>
    );
  }
}

const newMessage = gql`
  mutation newMessage($content: String!, $label: String, $sendtime: DateTime!) {
    createMessage(content: $content, label: $label, sendtime: $sendtime) {
      id
    }
  }
`;

export default graphql(newMessage, {
  name: 'newMessage',
  options: {
    refetchQueries: ['messagesQuery']
  }
})(MessageNew);
