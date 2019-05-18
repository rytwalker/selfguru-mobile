import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Messages from './Messages';
import MessageNew from './MessageNew';
import navStyles from '../../styles/navStyles';

class MessagesScreen extends Component {
  state = { newMessage: true };
  static navigationOptions = {
    title: 'selfguru',
    ...navStyles
  };
  toggleNewMessage = () =>
    this.setState({ newMessage: !this.state.newMessage });
  render() {
    const { newMessage } = this.state;
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.addButton}
          onPress={() => this.setState({ newMessage: !newMessage })}
        >
          <Text style={styles.addButtonText}>+ Add New Message</Text>
        </TouchableHighlight>
        {newMessage && <MessageNew toggleNewMessage={this.toggleNewMessage} />}
        <Messages />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F6F6F6',
    display: 'flex',
    flex: 1
  },
  addButton: {
    backgroundColor: '#3E92CC',
    padding: 20,
    borderRadius: 5,
    marginBottom: 10
  },
  addButtonText: {
    textAlign: 'center',
    fontSize: 32,
    color: '#fff'
  }
});

export default MessagesScreen;
