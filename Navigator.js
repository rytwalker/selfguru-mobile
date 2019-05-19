import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation';
import AuthScreen from './components/Auth/AuthScreen';
import MessagesScreen from './components/Messages/MessagesScreen';
import Message from './components/Messages/Message';
import ProfileScreen from './components/Profile/ProfileScreen';

const MessageStack = createStackNavigator({
  Messages: { screen: MessagesScreen },
  Message: { screen: Message }
});

const ProfileStack = createStackNavigator({
  Profile: { screen: ProfileScreen }
});

const TabNavigator = createBottomTabNavigator(
  {
    Messages: { screen: MessageStack },
    Profile: { screen: ProfileStack },
    Login: { screen: AuthScreen }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Messages') {
          iconName = `ios-mail${focused ? '-open' : ''}`;
          // IconComponent = HomeIconWithBadge;
        } else if (routeName === 'Profile') {
          iconName = `ios-contact`;
        } else if (routeName === 'Login') {
          iconName = `ios-log-in`;
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: '#3E92CC',
      inactiveTintoColor: '#87898B'
    }
  }
);

export default createAppContainer(TabNavigator);
