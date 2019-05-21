import React, { Component } from 'react';
import { Button } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

class DeleteButton extends Component {
  handlePress = () => {
    const { id, secId, rowId, rowMap } = this.props.deleteProps;
    const { handleMessageDelete } = this.props;
    handleMessageDelete(id, secId, rowId, rowMap);
  };
  render() {
    return (
      <Button
        full
        onPress={this.handlePress}
        style={{ backgroundColor: '#D33F49' }}
      >
        <Ionicons name="ios-trash" size={30} color="#fff" />
      </Button>
    );
  }
}

export default DeleteButton;
