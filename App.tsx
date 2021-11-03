import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import store from "./state/configure.store";
import { Provider } from "react-redux";
import { initializeApp } from 'firebase/app';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

// the real one! overrequests
// const firebaseConfig = {
//   apiKey: "AIzaSyCbtjWerogpa2Xm2JGLZRE6yLh_7Hz7tTo",
//   authDomain: "anaalamed-todo-mobile.firebaseapp.com",
//   projectId: "anaalamed-todo-mobile",
//   storageBucket: "anaalamed-todo-mobile.appspot.com",
//   messagingSenderId: "417992404319",
//   appId: "1:417992404319:web:0ecfb930a803b6f26c5aea",
//   measurementId: "G-GESCRP0W54"
// };

const firebaseConfig = {
  apiKey: "AIzaSyAbz5qFDG3mlmzeSKwh8_gpUlr2uS-pNGI",
  authDomain: "anaalamed-todo.firebaseapp.com",
  databaseURL: "https://anaalamed-todo-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "anaalamed-todo",
  storageBucket: "anaalamed-todo.appspot.com",
  messagingSenderId: "93600046374",
  appId: "1:93600046374:web:ae5ff5f362ae3ecf7df5e7",
  measurementId: "G-J0X7BVDSKK"
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
