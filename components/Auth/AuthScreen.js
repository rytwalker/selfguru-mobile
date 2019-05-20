import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'native-base';
import { withApollo } from 'react-apollo';
import Login from './Login';
import Register from './Register';

class AuthScreen extends Component {
  state = {
    register: true
  };
  toggleRegister = () => this.setState({ register: !this.state.register });
  render() {
    const { register } = this.state;
    return (
      <View style={styles.container}>
        {register ? <Register {...this.props} /> : <Login {...this.props} />}
        <View style={styles.authToggle}>
          <Text>{register ? 'Already Signed up?' : 'Not signed up?'}</Text>
          <Button
            style={styles.toggleBtn}
            transparent
            onPress={this.toggleRegister}
          >
            <Text style={styles.toggleBtnText}>
              {register ? 'Log in' : 'Sign up'}
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F6F6F6'
  },
  authToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  toggleBtn: {
    marginLeft: 10
  },
  toggleBtnText: {
    color: '#3E92CC'
  }
});

export default withApollo(AuthScreen);
