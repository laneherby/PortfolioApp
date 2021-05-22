import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme, Text, TextInput, Button, HelperText } from 'react-native-paper';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { vw } from 'react-native-expo-viewport-units';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const PushNotifications = () => {
  const { colors } = useTheme();

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [notiTitle, setNotiTitle] = useState("");
  const [notiBody, setNotiBody] = useState("");
  const [notiTimer, setNotiTimer] = useState("");
  const [titleLabel, setTitleLabel] = useState("Title");
  const [timerLabel, setTimerLabel] = useState("Timer (seconds)");
  const [titleError, setTitleError] = useState(false);
  const [timerError, setTimerError] = useState(false);
  

  const notificationListener = useRef();
  const responseListener = useRef();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'space-evenly',      
    },
    titleText: {
      color: colors.text,
      textAlign: 'center'
    },
    notificationForm: {
      flex: 0,
      alignItems: 'center',
      justifyContent: 'center',
      width: vw(80),
    },
    formTextInputs: {
      width: vw(70),
    },
    buttonPadding: {
      marginVertical: vw(5)
    }
  });

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const handleTitleError = (isError) => {
    if(isError){
      setTitleError(true);
      setTitleLabel("Notification title is required");
    }
    else{
      setTitleError(false);
      setTitleLabel("Title");
    }
  }

  const handleTimerError = (isError, tooLarge) => {
    if(isError){
      setTimerError(true);
      if(tooLarge) {
        setTimerLabel("Timer must less than 180 seconds");  
      }
      else {
        setTimerLabel("Timer must be a number");
      }
    }
    else{
      setTimerError(false);
      setTimerLabel("Timer (seconds)");
    }
  }

  const sendNotification = () => {    
    const parsedNotiTimer = parseInt(notiTimer);

    if (notiTitle.length === 0 && notiTimer.length === 0) {
      handleTitleError(true);
      handleTimerError(false);
    }
    else if (notiTitle.length === 0 && (typeof parsedNotiTimer !== "number" || isNaN(parsedNotiTimer))){
      handleTitleError(true);
      handleTimerError(true);
    }
    else if (notiTitle.length === 0 && (typeof parsedNotiTimer === "number" && parsedNotiTimer > 180)) {
      handleTitleError(true);
      handleTimerError(true, true);
      console.log("no title, timer too large")
    }
    else if (notiTitle.length === 0) {
      handleTitleError(true);
      handleTimerError(false);
    }
    else if (notiTitle.length > 0 && notiTimer.length === 0) {
      handleTitleError(false);
      handleTimerError(false);
      schedulePushNotification(notiTitle, notiBody);
    }
    else if (typeof parsedNotiTimer !== "number" || isNaN(parsedNotiTimer)) {
      handleTitleError(false);
      handleTimerError(true, false);
    }
    else if (typeof parsedNotiTimer === "number" && parsedNotiTimer > 180) {
      handleTitleError(false);
      handleTimerError(true, true);
    }
    else {
      handleTitleError(false);
      handleTimerError(false);
      schedulePushNotification(notiTitle, notiBody, parsedNotiTimer);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>
          Push Notifications are used to notify users that have the application installed. 
          They can recieve messages over a network connection and displayed on the device.
        </Text>
      </View>

      <View style={styles.notificationForm}>

        <TextInput
          mode='outlined'
          label={titleLabel}
          maxLength={100}
          error={titleError}
          style={styles.formTextInputs}
          value={notiTitle}
          onChangeText={titleInput => setNotiTitle(titleInput)}          
        />

        <TextInput
          mode='outlined'
          label="Body"
          style={styles.formTextInputs}
          value={notiBody}
          onChangeText={bodyInput => setNotiBody(bodyInput)}          
        />

        <TextInput
          mode='outlined'
          label={timerLabel}
          maxLength={3}
          error={timerError}
          keyboardType='numeric'
          onChangeText={timerInput => setNotiTimer(timerInput)}
          style={styles.formTextInputs}
          value={notiTimer}
        />

        <Button
          mode='contained'
          style={styles.buttonPadding}
          onPress={sendNotification}
        >
          Send Notification
        </Button>
      </View>
    </View>
  );
}

schedulePushNotification = async (dataTitle, dataBody, dataTimer = 3) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: dataTitle,
      body: dataBody,
    },
    trigger: { seconds: dataTimer },
  });
}

registerForPushNotificationsAsync = async () => {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      vibrate: true,
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export default PushNotifications;