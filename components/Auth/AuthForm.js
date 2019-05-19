import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { Form, Item, Input, Label } from 'native-base';
class AuthForm extends Component {
  state = { email: '', password: '' };
  submitForm = () => {
    const { email, password } = this.state;
    this.props.onSubmit({ email, password });
  };
  render() {
    const { email, password } = this.state;
    return (
      <Form>
        <Item>
          <Label>Email</Label>
          <Input
            keyboardType="email-address"
            value={email}
            onChangeText={text => this.setState({ email: text })}
          />
        </Item>
        <Item>
          <Label>Password</Label>
          <Input
            secureTextEntry
            value={password}
            onChangeText={text => this.setState({ password: text })}
          />
        </Item>
        <Button title={this.props.type} onPress={this.submitForm} />
      </Form>
    );
  }
}

export default AuthForm;
