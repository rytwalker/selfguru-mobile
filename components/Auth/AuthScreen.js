import React, { Component } from 'react';
import { Button, StyleSheet, View } from 'react-native';
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
        <Button onPress={this.toggleRegister} title="Toggle" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default withApollo(AuthScreen);
