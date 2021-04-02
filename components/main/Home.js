import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme, Card } from 'react-native-paper';
import { color } from 'react-native-reanimated';

const Home = () => {
  const { colors } = useTheme();
  //console.log(colors);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });

  return (
    <View style={styles.container}>
      <Text style={{color: colors.text}}>
        Home Page
      </Text>
    </View>
  );
}

export default Home;