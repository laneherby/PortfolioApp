import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import {
    Home,
    Comments,
    Contact,
    PushNotifications,
    QRScanner
} from '../components/main';

const Tab = createBottomTabNavigator();

const tabIcons = {
  HomeIcon: ({color, size}) => <MaterialIcons name="home" size={size} color={color} />,
  QRIcon: ({color, size}) => <MaterialIcons name="qr-code-scanner" size={size} color={color} />,
  NotificationIcon: ({color, size}) => <MaterialIcons name="notifications-active" size={size} color={color} />,
  CommentIcon: ({color, size}) => <MaterialIcons name="comment" size={size} color={color} />,
  ContactIcon: ({color, size}) => <MaterialIcons name="contact-page" size={size} color={color} />
}

const TabNavigation = ({ getPageName }) => {
  return (
    <Tab.Navigator >
        <Tab.Screen name="Home" component={Home} options={{tabBarIcon: tabIcons.HomeIcon}} listeners={{tabPress: () => {getPageName("Home")}}} />
        <Tab.Screen name="QR Scanner" component={QRScanner} options={{tabBarIcon: tabIcons.QRIcon}} listeners={{tabPress: () => {getPageName("QR Scanner")}}} />
        <Tab.Screen name="Notifications" component={PushNotifications} options={{tabBarIcon: tabIcons.NotificationIcon}} listeners={{tabPress: () => {getPageName("Push Notifications")}}} />
        <Tab.Screen name="Comments" component={Comments} options={{tabBarIcon: tabIcons.CommentIcon}} listeners={{tabPress: () => {getPageName("Comments")}}} />
        <Tab.Screen name="Contact" component={Contact} options={{tabBarIcon: tabIcons.ContactIcon}} listeners={{tabPress: () => {getPageName("Contact Me")}}} />
    </Tab.Navigator>
  );
}

export default TabNavigation;