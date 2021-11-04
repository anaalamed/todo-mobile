import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import store from "./state/configure.store";
import { Provider } from "react-redux";
import { initializeApp } from 'firebase/app';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

const firebaseConfig = {
  apiKey: "AIzaSyCbtjWerogpa2Xm2JGLZRE6yLh_7Hz7tTo",
  authDomain: "anaalamed-todo-mobile.firebaseapp.com",
  projectId: "anaalamed-todo-mobile",
  storageBucket: "anaalamed-todo-mobile.appspot.com",
  messagingSenderId: "417992404319",
  appId: "1:417992404319:web:0ecfb930a803b6f26c5aea",
  measurementId: "G-GESCRP0W54"
};

const app = initializeApp(firebaseConfig);

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
          <StatusBar />
        </Provider>
      </SafeAreaProvider>
    );
  }
}
