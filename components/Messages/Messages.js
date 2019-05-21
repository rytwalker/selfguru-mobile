import React, { Component } from 'react';
import { Text, View, ListView, StyleSheet } from 'react-native';
import { Button, List, ListItem } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import formatDateTime from '../../utils/formatDateTime';
import { labelColors } from './MessageLabels';

class Messages extends Component {
  state = { dataSource: null };

  componentDidMount() {
    const { messages } = this.props.screenProps.user;
    this.setState({ dataSource: messages });
  }

  componentDidUpdate(prevProps) {
    const { messages } = this.props.screenProps.user;
    if (prevProps.screenProps.user.messages !== messages) {
      console.log('hello');
      this.setState({ dataSource: messages });
    }
  }

  deleteRow = (secId, rowId, rowMap) => {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.dataSource];
    newData.splice(rowId, 1);
    this.setState({ dataSource: newData });
  };

  handleMessageDelete = async (id, secId, rowId, rowMap) => {
    const { deleteMessage } = this.props;
    this.deleteRow(secId, rowId, rowMap);
    try {
      await deleteMessage({
        variables: {
          id: id
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  hanldeMessageNavigate = id =>
    this.props.navigation.navigate('Message', { id });

  render() {
    const { dataSource } = this.state;
    const { screenProps } = this.props;
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    return (
      <View>
        {dataSource && (
          <List
            contentContainerStyle={styles.list}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            rightOpenValue={-75}
            dataSource={ds.cloneWithRows(dataSource)}
            renderRow={item => {
              let formattedTime = formatDateTime(item.sendtime);
              return (
                <ListItem
                  style={styles.listItem}
                  onPress={() => this.hanldeMessageNavigate(item.id)}
                >
                  <Ionicons name={'ios-mail'} size={30} color="#46494C" />
                  <View style={styles.itemText}>
                    <Text style={styles.messageText}>{item.content}</Text>
                    <Text style={styles.messageDate}>{formattedTime}</Text>
                  </View>
                  <Ionicons
                    name={`ios-${item.label}`}
                    size={30}
                    color={labelColors[item.label]}
                  />
                </ListItem>
              );
            }}
            renderRightHiddenRow={(item, secId, rowId, rowMap) => (
              <Button
                full
                onPress={() =>
                  this.handleMessageDelete(item.id, secId, rowId, rowMap)
                }
                style={{ backgroundColor: '#D33F49' }}
              >
                <Ionicons name="ios-trash" size={30} color="#fff" />
              </Button>
            )}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    justifyContent: 'space-between'
  },
  listItem: {
    backgroundColor: '#fff',
    padding: 20,
    marginLeft: 0
  },
  itemText: {
    marginRight: 'auto',
    marginLeft: 10
  },
  messageText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#46494C',
    fontStyle: 'italic'
  },
  messageDate: {
    fontSize: 12,
    color: '#46494C'
  }
});

const deleteMessage = gql`
  mutation deleteMessage($id: ID!) {
    deleteMessage(id: $id) {
      id
    }
  }
`;

export default graphql(deleteMessage, {
  name: 'deleteMessage',
  options: {
    refetchQueries: ['Message']
  }
})(Messages);
