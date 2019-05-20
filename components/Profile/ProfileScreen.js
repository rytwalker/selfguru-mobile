import React, { Component } from 'react';
import { Button, ScrollView, StyleSheet } from 'react-native';
import { withApollo } from 'react-apollo';
import navStyles from '../../styles/navStyles';
import { signOut } from '../../utils/loginUtils';
import ProfileContactForm from './ProfileContactForm';
import ProfileHeader from './ProfileHeader';
import ProfilePasswordForm from './ProfilePasswordForm';

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
    const { user } = this.props.screenProps;
    return (
      <ScrollView style={styles.container}>
        <ProfileHeader user={user} />
        <ProfileContactForm user={user} />
        <ProfilePasswordForm />
        <Button title="Logout" onPress={this.handleClick} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F6F6F6'
  }
});

export default withApollo(ProfileScreen);
