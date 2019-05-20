import React, { Component } from 'react';
import { Button, Image, StyleSheet, View } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';

class ProfileHeader extends Component {
  state = { profileImg: this.props.user.profileImg || null };

  handleImageSelect = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1]
      });
      if (!result.cancelled) {
        this.setState({ profileImg: result.uri });
        await this.updateAPI();
      }
    } else {
      throw new Error('Camera roll permission not granted');
    }
  };

  updateAPI = async () => {
    const { profileImg } = this.state;
    const { updateUser, user } = this.props;
    try {
      await updateUser({
        variables: {
          id: user.id,
          profileImg
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { profileImg } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.imgPlaceholder}>
          {profileImg && (
            <Image
              source={{ uri: profileImg }}
              style={{ width: 100, height: 100, borderRadius: 100 / 2 }}
            />
          )}
        </View>
        <Button title="Update Profile Image" onPress={this.handleImageSelect} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  imgPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#DCDCDD',
    borderRadius: 100 / 2
  }
});

const updateUser = gql`
  mutation updateUser($id: ID!, $profileImg: String) {
    updateUser(id: $id, profileImg: $profileImg) {
      id
    }
  }
`;

export default graphql(updateUser, {
  name: 'updateUser',
  options: {
    refetchQueries: ['User']
  }
})(ProfileHeader);
