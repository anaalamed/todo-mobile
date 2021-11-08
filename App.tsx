import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from "react-redux";
import { StatusBar } from 'expo-status-bar';
import { getApp, initializeApp } from 'firebase/app';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import Navigation from './navigation';

// import '@firebase/firestore'

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import store from "./state/configure.store";

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

const functions = getFunctions(app);

// const functions = getFunctions(getApp());
// connectFunctionsEmulator(functions, "localhost", 5001);

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
