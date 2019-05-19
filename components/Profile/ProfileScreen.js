import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import { withApollo } from 'react-apollo';
import navStyles from '../../styles/navStyles';
import { signOut } from '../../utils/loginUtils';

class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'selfguru',
    ...navStyles
  };
  handleClick = () => {
    signOut();
    this.props.client.resetStore();
  };
  render() {
    return (
      <View>
        <Button title="Logout" onPress={this.handleClick} />
      </View>
    );
  }
}

export default withApollo(ProfileScreen);
