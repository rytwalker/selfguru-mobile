import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Form, Item, Input, Label, Button } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';

class ProfileContactForm extends Component {
  state = {
    firstName: this.props.user.firstName || '',
    lastName: this.props.user.lastName || ''
  };

  submitForm = async () => {
    const { firstName, lastName } = this.state;
    const { updateUser, user } = this.props;
    try {
      await updateUser({
        variables: {
          id: user.id,
          firstName,
          lastName
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { firstName, lastName } = this.state;
    return (
      <Form style={styles.form}>
        <View style={styles.prompt}>
          <Text style={styles.promptText}>Update Personal Info</Text>
          <View style={styles.addLabel}>
            <Ionicons name={`ios-person`} size={30} color={'#46494C'} />
          </View>
        </View>
        <Item stackedLabel>
          <Label style={styles.label}>First Name:</Label>
          <Input
            onChangeText={firstName => this.setState({ firstName })}
            value={this.state.firstName}
            placeholder="Add you first name"
          />
        </Item>
        <Item stackedLabel>
          <Label style={styles.label}>Last Name:</Label>
          <Input
            onChangeText={lastName => this.setState({ lastName })}
            value={this.state.lastName}
            placeholder="Add you last name"
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

const updateUser = gql`
  mutation updateUser($id: ID!, $firstName: String, $lastName: String) {
    updateUser(id: $id, firstName: $firstName, lastName: $lastName) {
      id
    }
  }
`;

export default graphql(updateUser, {
  name: 'updateUser',
  options: {
    refetchQueries: ['User']
  }
})(ProfileContactForm);
