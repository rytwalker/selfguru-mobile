import React, { Component } from 'react';
import { View } from 'react-native';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import AuthForm from './AuthForm';
import { signIn } from '../../utils/loginUtils';

class Login extends Component {
  loginUser = async ({ email, password }) => {
    try {
      const signin = await this.props.signinUser({
        variables: { email, password }
      });
      signIn(signin.data.signinUser.token);
    } catch (error) {
      console.dir(error);
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
