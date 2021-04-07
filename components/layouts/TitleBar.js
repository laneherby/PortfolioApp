import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Appbar, useTheme, Switch } from 'react-native-paper';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { vw, vh } from 'react-native-expo-viewport-units';

const TitleBar = ({ titleText }) => {
    const { colors } = useTheme();
    const menuIcon = ({color, size}) => {
        return <MaterialIcons name="menu" size={size} color={color} />
    }

    const styles = StyleSheet.create({
        appBar: {
            backgroundColor: colors.primary
        },
        menuIcon: {
            paddingBottom: vh(0.5)
        },
        switchContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingHorizontal: vw(5)
        },
        themeSwitch: {
            marginHorizontal: vw(2),
        }
    });

    return (        
        <View>
            <Appbar.Header style={styles.appBar}> 
                <Appbar.Action style={styles.menuIcon} icon={menuIcon} />
                <Appbar.Content titleStyle={styles.appBarTitle} title={titleText} />
                <View style={styles.switchContainer}>
                    <Ionicons name="sunny" size={16} color="black" />
                    <Switch style={styles.themeSwitch} />
                    <Ionicons name="moon" size={16} color="black" />
                </View>
            </Appbar.Header>
        </View>
    );
}

export default TitleBar;