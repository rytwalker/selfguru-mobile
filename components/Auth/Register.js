import React, { Component } from 'react';
import { View } from 'react-native';
import { compose, graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import AuthForm from './AuthForm';
import { signIn } from '../../utils/loginUtils';

class Register extends Component {
  registerUser = async ({ email, password }) => {
    try {
      const user = await this.props.createUser({
        variables: { email, password }
      });
      const signin = await this.props.signinUser({
        variables: { email, password }
      });
      signIn(signin.data.signinUser.token);
      this.props.client.resetStore();
    } catch (error) {
      console.dir(error);
    }
  };
  render() {
    return (
      <View>
        <AuthForm onSubmit={this.registerUser} type="Register" />
      </View>
    );
  }
}

const createUser = gql`
  mutation createUser($email: String!, $password: String!) {
    createUser(
      authProvider: { email: { email: $email, password: $password } }
    ) {
      id
    }
  }
`;

const signinUser = gql`
  mutation signinUser($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password }) {
      token
    }
  }
`;

export default compose(
  graphql(signinUser, { name: 'signinUser' }),
  graphql(createUser, { name: 'createUser' })
)(Register);
