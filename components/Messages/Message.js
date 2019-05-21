import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { ListItem } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../../styles/messageStyles';
import { labelColors } from './MessageLabels';

class Message extends Component {
  handlePress = () => {
    const { item, handleMessageNavigate } = this.props;
    handleMessageNavigate(item.id);
  };
  render() {
    const { content, label } = this.props.item;
    const { listItem, listItemText, messageText, messageDate } = styles;
    return (
      <ListItem style={listItem} onPress={this.handlePress}>
        <Ionicons name={'ios-mail'} size={30} color="#46494C" />
        <View style={listItemText}>
          <Text style={messageText}>{content}</Text>
          <Text style={messageDate}>{this.props.formattedTime}</Text>
        </View>
        <Ionicons name={`ios-${label}`} size={30} color={labelColors[label]} />
      </ListItem>
    );
  }
}

export default Message;
