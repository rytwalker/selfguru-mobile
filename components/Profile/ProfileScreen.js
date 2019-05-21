import React, { Component } from 'react';
import { Button, ScrollView, StyleSheet } from 'react-native';
import { withApollo } from 'react-apollo';
import navStyles from '../../styles/navStyles';
import { signOut } from '../../utils/loginUtils';
import ProfileContactForm from './ProfileContactForm';
import ProfileHeader from './ProfileHeader';
import ProfilePasswordForm from './ProfilePasswordForm';
import Alert from '../../utils/Alert';

class ProfileScreen extends Component {
  state = { alertMsg: '', alert: false };

  static navigationOptions = {
    title: 'selfguru',
    ...navStyles
  };

  handleClick = () => {
    signOut();
    this.props.client.resetStore();
  };

  handleAlert = msg => {
    this.setState({ alert: true, alertMsg: msg });
    setTimeout(() => this.setState({ alert: false, alertMsg: '' }), 3000);
  };
  render() {
    const { alert, alertMsg } = this.state;
    const { user } = this.props.screenProps;
    return (
      <ScrollView style={styles.container}>
        {alert && <Alert>{alertMsg}</Alert>}
        <ProfileHeader user={user} />
        <ProfileContactForm user={user} handleAlert={this.handleAlert} />
        <ProfilePasswordForm />
        <Button
          title="Logout"
          onPress={this.handleClick}
          style={{ marginBottom: 20 }}
        />
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
