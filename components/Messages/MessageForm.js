import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Form, Item, Input, Label, Button, Picker } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { labelColors } from './MessageLabels';
import DateTimePicker from 'react-native-modal-datetime-picker';
import formatDateTime from '../../utils/formatDateTime';

class MessageForm extends Component {
  state = {
    message: '',
    label: 'heart',
    sendDate: new Date(),
    isDateTimePickerVisible: false
  };
  handleLableChange = value => this.setState({ label: value });
  setDate = newDate => this.setState({ sendDate: newDate });
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    this.setDate(date);
    this.hideDateTimePicker();
  };

  submitForm = () => {
    const { message, label, sendDate } = this.state;
    const { handleSubmit } = this.props;
    handleSubmit({
      content: message,
      label: label,
      sendtime: sendDate
    });
  };

  render() {
    const { label, message, sendDate } = this.state;
    let formattedDate = formatDateTime(sendDate);
    return (
      <Form style={styles.form}>
        <View style={styles.prompt}>
          <Text style={styles.promptText}>
            {message.length === 0 ? 'What do you need to hear?' : message}
          </Text>
          <View style={styles.addLabel}>
            <Ionicons
              name={`ios-${label}`}
              size={30}
              color={labelColors[label]}
            />
            {/* <Text style={styles.addLabelText}>+ Add Label</Text> */}
          </View>
        </View>
        <Item stackedLabel>
          <Label style={styles.label}>Message:</Label>
          <Input
            onChangeText={message => this.setState({ message })}
            value={this.state.message}
            placeholder="Add a message"
          />
        </Item>
        <Item stackedLabel>
          <Label style={styles.label}>Send:</Label>
          <Button transparent onPress={this.showDateTimePicker}>
            <Ionicons name={`ios-calendar`} size={30} color="#46494C" />
            <Text style={styles.dateText}>{formattedDate}</Text>
          </Button>
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
            mode="datetime"
          />
        </Item>

        <Item stackedLabel>
          <Label style={styles.label}>Add Label:</Label>
          <Picker
            note
            mode="dropdown"
            placeholder="+ Add Label"
            // style={{ width: 120 }}
            selectedValue={label}
            onValueChange={this.handleLableChange}
          >
            <Picker.Item label="Love" value="heart" />
            <Picker.Item label="Fitness" value="fitness" />
            <Picker.Item label="Health" value="medkit" />
            <Picker.Item label="Motivation" value="flash" />
            <Picker.Item label="Work" value="time" />
            <Picker.Item label="Medatation" value="infinite" />
            <Picker.Item label="Fun" value="pint" />
            <Picker.Item label="Sleep" value="bed" />
            <Picker.Item label="Creative" value="bulb" />
            <Picker.Item label="Generosity" value="cash" />
            <Picker.Item label="Sustainability" value="leaf" />
            <Picker.Item label="Eat" value="restaurant" />
            <Picker.Item label="Achievement" value="ribbon" />
            <Picker.Item label="Study" value="school" />
          </Picker>
        </Item>
        <Button block style={styles.addButton} onPress={this.submitForm}>
          <Text style={styles.addButtonText}>Add</Text>
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
