import React, { Component } from 'react';
import { Text, View } from 'react-native';
import navStyles from '../../styles/navStyles';

class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'selfguru',
    ...navStyles
  };
  render() {
    return (
      <View>
        <Text>Profile!</Text>
      </View>
    );
  }
}

export default ProfileScreen;
