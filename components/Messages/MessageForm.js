import React, { Component } from 'react';
// import { TextInput } from 'react-native';
import { Form, Item, Input, Label } from 'native-base';

class MessageForm extends Component {
  state = { message: '' };
  render() {
    return (
      <Form>
        <Item floatingLabel>
          <Label>Message:</Label>
          <Input
            onChangeText={message => this.setState({ message })}
            value={this.state.message}
          />
        </Item>
      </Form>
    );
  }
}

export default MessageForm;
