import React, { Component } from 'react';
import { View } from 'react-native';
import MessageForm from './MessageForm';
import { compose, graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import navStyles from '../../styles/navStyles';

class MessageUpdate extends Component {
  static navigationOptions = {
    title: 'selfguru',
    ...navStyles
  };
  handleSubmit = async ({ content, label, sendtime }) => {
    const { Message, navigation, screenProps, updateMessage } = this.props;
    try {
      await updateMessage({
        variables: {
          id: Message.id,
          content,
          label,
          sendtime,
          userId: screenProps.user.id
        }
      });
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { loading, Message } = this.props;
    if (loading) return null;
    return (
      <View>
        <MessageForm Message={Message} handleSubmit={this.handleSubmit} />
      </View>
    );
  }
}

const updateMessage = gql`
  mutation updateMessage(
    $id: ID!
    $content: String!
    $label: String
    $sendtime: DateTime!
    $userId: ID!
  ) {
    updateMessage(
      id: $id
      content: $content
      label: $label
      sendtime: $sendtime
      userId: $userId
    ) {
      id
    }
  }
`;

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

export default compose(
  graphql(updateMessage, {
    name: 'updateMessage',
    options: {
      refetchQueries: ['Message']
    }
  }),
  graphql(messageQuery, {
    props: ({ data }) => ({ ...data }),
    options: ({ navigation }) => ({
      variables: {
        id: navigation.state.params.id
      }
    })
  })
)(MessageUpdate);
