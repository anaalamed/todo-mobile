import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from "react-redux";
import { StatusBar } from 'expo-status-bar';
import Navigation from './navigation';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import store from "./state/configure.store";
import './initializeApp';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar style="dark" />
        </Provider>
      </SafeAreaProvider>
    );
  }
}
