import React, { Component } from 'react';
import { Text, View, ListView, StyleSheet } from 'react-native';
import { Button, List, ListItem } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import formatDateTime from '../../utils/formatDateTime';
import { labelColors } from './MessageLabels';

class Messages extends Component {
  render() {
    const { navigation, screenProps } = this.props;
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    return (
      <View>
        <List
          contentContainerStyle={styles.list}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          rightOpenValue={-75}
          dataSource={ds.cloneWithRows(screenProps.user.messages)}
          renderRow={item => {
            let formattedTime = formatDateTime(item.sendtime);
            return (
              <ListItem
                style={styles.listItem}
                onPress={() =>
                  navigation.navigate('Message', {
                    id: item.id
                  })
                }
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
          renderRightHiddenRow={() => (
            <Button full style={{ backgroundColor: '#D33F49' }}>
              <Ionicons name="ios-trash" size={30} color="#fff" />
            </Button>
          )}
          keyExtractor={item => item.id}
        />
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

export default Messages;
