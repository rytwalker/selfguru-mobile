import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'native-base';
import Messages from './Messages';
import MessageNew from './MessageNew';
import navStyles from '../../styles/navStyles';

class MessagesScreen extends Component {
  state = { newMessage: false };
  static navigationOptions = {
    title: 'selfguru',
    ...navStyles
  };
  toggleNewMessage = () =>
    this.setState({ newMessage: !this.state.newMessage });
  render() {
    const { newMessage } = this.state;
    const { user } = this.props.screenProps;
    console.log(this.props.screenProps);
    return (
      <View style={styles.container}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeSectionText}>
            Welcome {user.firstName ? user.firstName : user.email}!
          </Text>
        </View>
        <Button
          full
          style={styles.addButton}
          onPress={() => this.setState({ newMessage: !newMessage })}
        >
          <Text style={styles.addButtonText}>+ Add New Message</Text>
        </Button>
        {newMessage && (
          <MessageNew
            toggleNewMessage={this.toggleNewMessage}
            {...this.props}
          />
        )}
        <Messages {...this.props} />
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
  welcomeSection: {
    marginBottom: 20,
    alignItems: 'center'
  },
  welcomeSectionText: {
    fontSize: 12,
    fontFamily: 'arvo-bold',
    color: '#46494C'
  },
  addButton: {
    backgroundColor: '#3E92CC',
    padding: 20,
    borderRadius: 5,
    marginBottom: 10
  },
  addButtonText: {
    textAlign: 'center',
    fontSize: 26,
    color: '#fff'
  }
});

export default MessagesScreen;
