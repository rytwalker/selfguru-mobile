import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { List, ListItem } from 'native-base';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import Ionicons from 'react-native-vector-icons/Ionicons';
import formatDateTime from '../../utils/formatDateTime';

class Messages extends Component {
  render() {
    const { loading, allMessages } = this.props;
    if (loading) return null;
    return (
      <View>
        <List>
          <FlatList
            data={allMessages}
            renderItem={({ item }) => {
              let formattedTime = formatDateTime(item.sendtime);
              return (
                <ListItem style={styles.listItem}>
                  <Ionicons name={'ios-mail'} size={30} color="#46494C" />
                  <View style={styles.itemText}>
                    <Text style={styles.messageText}>{item.content}</Text>
                    <Text style={styles.messageDate}>{formattedTime}</Text>
                  </View>
                  <Ionicons name={'ios-heart'} size={30} color="#D33F49" />
                </ListItem>
              );
            }}
            keyExtractor={item => item.id}
          />
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  },
  listItem: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    marginLeft: 0,
    borderRadius: 5
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

const messagesQuery = gql`
  {
    allMessages {
      id
      content
      sendtime
    }
  }
`;

export default graphql(messagesQuery, {
  props: ({ data }) => ({ ...data })
})(Messages);
