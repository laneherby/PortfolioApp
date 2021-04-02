import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import {
    Home,
    Comments,
    Contact,
    PushNotifications,
    QRScanner
} from '../components/main';

const Tab = createBottomTabNavigator();

const tabIcons = {
  HomeIcon: ({color, size}) => <FontAwesome name="home" size={size} color={color} />,
  QRIcon: ({color, size}) => <FontAwesome name="qrcode" size={size} color={color} />,
  NotificationIcon: ({color, size}) => <FontAwesome name="exclamation" size={size} color={color} />,
  CommentIcon: ({color, size}) => <FontAwesome name="comment" size={size} color={color} />,
  ContactIcon: ({color, size}) => <FontAwesome name="at" size={size} color={color} />
}

const TabNavigation = ({ theme }) => {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} options={{tabBarIcon: tabIcons.HomeIcon}} />
        <Tab.Screen name="QR Scanner" component={QRScanner} options={{tabBarIcon: tabIcons.QRIcon}} />
        <Tab.Screen name="Notifications" component={PushNotifications} options={{tabBarIcon: tabIcons.NotificationIcon}} />
        <Tab.Screen name="Comments" component={Comments} options={{tabBarIcon: tabIcons.CommentIcon}} />
        <Tab.Screen name="Contact" component={Contact} options={{tabBarIcon: tabIcons.ContactIcon}} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default TabNavigation;