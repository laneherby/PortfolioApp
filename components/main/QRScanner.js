import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert, View, Linking, ToastAndroid } from 'react-native';
import { useTheme, Text, TextInput, Button, Title } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Clipboard from 'expo-clipboard';
import { vh, vw } from 'react-native-expo-viewport-units';
import { color } from 'react-native-reanimated';

const QRScanner = () => {
  const { colors } = useTheme();
  const [hasPermission, setHasPermission] = useState(null);
  const [hasScan, setHasScan] = useState(false);
  const [qrData, setQRData] = useState(null);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    titleText: {
      color: colors.text,
      textAlign: 'center',
      fontSize: vw(3.5),
      paddingHorizontal: vw(10)
    },
    scannerContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: vw(100),
      maxHeight: vh(50),
      backgroundColor: 'red',
      borderColor: colors.primary,
      borderWidth: 5
    },
    infoContainer: {
      flex: 0,
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'row',
    },
    buttonContainer: {
      flex: 0,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      width: vw(80)
    },
    buttonPadding: {
      marginHorizontal: vw(5)
    }
  });

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleScan = ({ data }) => {
    setHasScan(true);
    setQRData(data);
  }

  const openLink = () => {
    if (!qrData) return;

    Linking.openURL(qrData).catch((err) => {
      Alert.alert("Error", "Cannot open URL from QR code.",
        [
          { text: 'OK' },
        ],
      );
    })
  }

  const copyLink = () => {    
    Clipboard.setString(qrData);
    ToastAndroid.showWithGravity("Copied!", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
  }

  const clearLink = () => {
    setHasScan(false);
    setQRData(null);

  }

  return (
    <View style={styles.container}>
      <View>
        <Title style={styles.titleText}>
          QR codes can be used to share content.{"\n"}
          (Requires camera access)
        </Title>
      </View>
      
      <View style={styles.scannerContainer}>
        <BarCodeScanner
          onBarCodeScanned={(hasScan) ? undefined : handleScan}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
          style={[StyleSheet.absoluteFillObject]}
        />
      </View>

      <View style={styles.infoContainer}>
        <TextInput
          mode='outlined'
          disabled={false}
          placeholder="QR Code Data"
          value={qrData}
          editable={false}
          selection={{start:0}}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode='contained'
          style={styles.buttonPadding}
          onPress={openLink}
        >
          Open
        </Button>
        <Button
          mode='contained'
          style={styles.buttonPadding}
          onPress={copyLink}
        >
          Copy
        </Button>
        <Button
          mode='contained'
          style={styles.buttonPadding}
          onPress={clearLink}
        >
          Clear
        </Button>
      </View>

    </View>
  );
}

export default QRScanner;