import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation';
import ProfileScreen from './components/Profile/ProfileScreen';
import MessagesScreen from './components/Messages/MessagesScreen';

const MessageStack = createStackNavigator({
  Messages: { screen: MessagesScreen }
});

const ProfileStack = createStackNavigator({
  Profile: { screen: ProfileScreen }
});

const TabNavigator = createBottomTabNavigator(
  {
    Messages: { screen: MessageStack },
    Profile: { screen: ProfileStack }
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
          iconName = `ios-options`;
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
