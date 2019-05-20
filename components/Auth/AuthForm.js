import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button, Form, Item, Input, Label } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../../styles/formStyles';

class AuthForm extends Component {
  state = { email: '', password: '' };
  submitForm = () => {
    const { email, password } = this.state;
    this.props.onSubmit({ email, password });
  };
  render() {
    const { email, password } = this.state;
    return (
      <Form style={styles.form}>
        <View style={styles.prompt}>
          <Text style={styles.promptText}>{this.props.type}</Text>
          <View style={styles.addLabel}>
            <Ionicons name={`ios-log-in`} size={30} color={'#46494C'} />
          </View>
        </View>
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
        <Button full onPress={this.submitForm} style={styles.authButton}>
          <Text style={styles.authButtonText}>{this.props.type}</Text>
        </Button>
      </Form>
    );
  }
}

export default AuthForm;
