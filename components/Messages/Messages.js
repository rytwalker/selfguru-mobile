import React, { Component } from 'react';
import { View, ListView } from 'react-native';
import { List, Spinner } from 'native-base';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import DeleteButton from '../Buttons/DeleteButton';
import Message from './Message';
import formatDateTime from '../../utils/formatDateTime';

class Messages extends Component {
  state = { dataSource: null };

  componentDidMount() {
    const { messages } = this.props.screenProps.user;
    this.setState({ dataSource: messages });
  }

  componentDidUpdate(prevProps) {
    const { messages } = this.props.screenProps.user;
    if (prevProps.screenProps.user.messages !== messages) {
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

  handleMessageNavigate = id =>
    this.props.navigation.navigate('Message', { id });

  render() {
    const { dataSource } = this.state;
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    return (
      <View style={{ justifyContent: `${!dataSource} ? 'center' : null` }}>
        {!dataSource ? (
          <Spinner color="#C5C3C6" />
        ) : (
          <List
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            rightOpenValue={-75}
            dataSource={ds.cloneWithRows(dataSource)}
            renderRow={item => {
              let formattedTime = formatDateTime(item.sendtime);
              return (
                <Message
                  formattedTime={formattedTime}
                  handleMessageNavigate={this.handleMessageNavigate}
                  item={item}
                />
              );
            }}
            renderRightHiddenRow={(item, secId, rowId, rowMap) => (
              <DeleteButton
                handleMessageDelete={this.handleMessageDelete}
                deleteProps={{ id: item.id, secId, rowId, rowMap }}
              />
            )}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    );
  }
}

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
