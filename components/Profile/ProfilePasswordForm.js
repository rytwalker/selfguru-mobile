import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Form, Item, Input, Label, Button } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

class MessageForm extends Component {
  state = {
    password: ''
  };

  submitForm = () => {
    const { password } = this.state;
    const { handleSubmit } = this.props;
    handleSubmit({
      password
    });
  };

  render() {
    const { password } = this.state;
    return (
      <Form style={styles.form}>
        <View style={styles.prompt}>
          <Text style={styles.promptText}>Update Password</Text>
          <View style={styles.addLabel}>
            <Ionicons name={`ios-unlock`} size={30} color={'#46494C'} />
          </View>
        </View>
        <Item stackedLabel>
          <Label style={styles.label}>Password:</Label>
          <Input
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            placeholder="Update password"
            secureTextEntry
          />
        </Item>

        <Button block style={styles.addButton} onPress={this.submitForm}>
          <Text style={styles.addButtonText}>Update</Text>
        </Button>
      </Form>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 5,
    padding: 10
  },
  prompt: {
    padding: 10,
    borderBottomColor: '#C5C3C6',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  promptText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  addLabel: {
    alignItems: 'center'
  },
  addLabelText: {
    fontSize: 10
  },
  formGroup: {
    flexDirection: 'column'
  },
  label: {
    fontSize: 12,
    fontStyle: 'italic'
  },
  dateText: {
    marginLeft: 10
  },
  addButton: {
    backgroundColor: '#2EC4B6',
    marginTop: 10
  },
  addButtonText: {
    fontSize: 20,
    color: '#fff',
    textTransform: 'uppercase'
  }
});

export default MessageForm;
