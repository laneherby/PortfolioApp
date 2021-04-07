import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { 
  NavigationContainer,
  DefaultTheme as NavDefaultTheme,
  DarkTheme as NavDarkTheme 
} from '@react-navigation/native';
import TabNavigation from './routers/TabNavigation';
import { 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
  Provider as PaperProvider,
  Appbar
} from 'react-native-paper';
import merge from 'deepmerge';
import TitleBar from "./components/layouts/TitleBar";

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavDarkTheme);

CombinedDarkTheme.colors = {
  ...CombinedDarkTheme.colors,
  background: "#212121",
  primary: "#39c9bb",
  accent: "#8e0072"
};

CombinedDefaultTheme.colors = {
  ...CombinedDefaultTheme.colors,
  background: "#f9f1f1",
  primary: "#5b2c97",
  accent: "#CC5500"
};

console.log(CombinedDarkTheme);

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [appBarTitle, setAppBarTitle] = useState("Home");

  return (
    <PaperProvider theme={isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme}>
      <TitleBar titleText={appBarTitle} />
      <NavigationContainer theme={isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme}>
        <TabNavigation getPageName={setAppBarTitle} />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;