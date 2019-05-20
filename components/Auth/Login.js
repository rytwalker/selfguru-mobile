import React, { Component } from 'react';
import { View } from 'react-native';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import { LocalAuthentication } from 'expo';
import AuthForm from './AuthForm';
import { signIn } from '../../utils/loginUtils';

class Login extends Component {
  componentDidMount() {
    this.localAuth();
  }

  localAuth = async () => {
    const isHardwareAvailable = await LocalAuthentication.hasHardwareAsync();
    const isHardwareUseable = await LocalAuthentication.isEnrolledAsync();
    if (isHardwareAvailable && isHardwareUseable) {
      // const hardwareTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
      const authenticated = await LocalAuthentication.authenticateAsync();

      console.log(authenticated);
    }
  };

  loginUser = async ({ email, password }) => {
    try {
      const signin = await this.props.signinUser({
        variables: { email, password }
      });
      signIn(signin.data.signinUser.token);
      this.props.client.resetStore();
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <View>
        <AuthForm onSubmit={this.loginUser} type="Login" />
      </View>
    );
  }
}

const signinUser = gql`
  mutation signinUser($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password }) {
      token
    }
  }
`;

export default graphql(signinUser, { name: 'signinUser' })(Login);
