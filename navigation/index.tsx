import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { ColorSchemeName, Pressable, Image, View } from 'react-native';

import useColorScheme from '../hooks/useColorScheme';
import NotFoundScreen from '../screens/NotFoundScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TodosScreen from '../screens/TodosScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import { RootState } from '../state/root.reducer';
import { useDispatch, useSelector } from 'react-redux';
import HelloUser from '../components/HelloUser';
import LogIn from '../screens/LogIn';
import SignUp from '../screens/SignUp';
import UpdateProfile from '../screens/UpdateProfile';
import { ButtonText, Title, Button } from '../constants/StyledComponents';
import ModalAddTodo from '../components/TodosScreen/ModalAddTodo';
import { useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { loggedOut } from '../state/slices/users.slice';
import { removeTodos } from '../state/slices/todos.slice';


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer >
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'greenyellow',
        },
        headerTintColor: 'navy',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }}>

      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />

      <Stack.Screen name="LogIn" component={LogIn} options={{ title: 'Log In' }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Registration' }} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} options={{ title: 'Update Profile' }} />

      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />

      <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
        <Stack.Screen name="ModalAddTodo" component={ModalAddTodo} options={{ title: 'Create new Todo!' }} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

// ----------------------------------- Bottom Tab Navigator -----------------------------------

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const { me } = useSelector((state: RootState) => state.users);
  const [isModalAddVisible, setModalAddVisible] = useState(false);

  // const handleLogOut = () => {
  //   const dispatch = useDispatch();
  //   const auth = getAuth();

  //   signOut(auth).then(() => {
  //     dispatch(loggedOut());
  //     dispatch(removeTodos());
  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // }


  return (
    <BottomTab.Navigator
      initialRouteName="Profile"
      screenOptions={{
        tabBarActiveTintColor: "navy",
        tabBarInactiveTintColor: "gray",
        tabBarActiveBackgroundColor: "greenyellow",
        tabBarInactiveBackgroundColor: "#6CBF40"
      }}
    >

      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }: RootTabScreenProps<'Profile'>) => ({
          title: 'Profile',
          headerStyle: { backgroundColor: 'greenyellow' },
          tabBarIcon: ({ }) => <TabBarIcon name="user" color='navy' />,
          headerTitle: '',

          headerLeft: () => (
            <Image style={{ width: 30, height: 30, borderRadius: 50, margin: 10 }} source={require('../assets/images/todo.png')} />
          ),

          headerRight: () => (
            // menu? 
            <Pressable
              onPress={() => navigation.navigate('Profile')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
                flexDirection: 'row'
              })}>
              <HelloUser></HelloUser>
              {me.photoURL ? (
                <Image style={{ width: 30, height: 30, borderRadius: 50, margin: 10 }} source={{ uri: me.photoURL }} />
              ) : (
                  <FontAwesome
                    name="user-circle"
                    size={25}
                    style={{ marginRight: 15, marginLeft: 10 }}
                  />
                )}
            </Pressable>
          ),
        })}

      />
      <BottomTab.Screen
        name="Todos"
        component={TodosScreen}
        options={({ navigation }: RootTabScreenProps<'Todos'>) => ({
          title: 'Todos',
          headerTitle: '',
          headerStyle: { backgroundColor: 'greenyellow' },
          tabBarIcon: ({ }) => <TabBarIcon name="list" color='navy' />,

          headerLeft: () => (
            me.email ?
              <Pressable
                onPress={() => navigation.navigate("ModalAddTodo")}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                  flexDirection: 'row'
                })}>

                <FontAwesome name='plus' style={{ fontSize: 20, marginLeft: 10 }} />
              </Pressable>
              :
              <Image style={{ width: 30, height: 30, borderRadius: 50, margin: 10 }} source={require('../assets/images/todo.png')} />
          ),

          headerRight: () => (
            // menu
            <Pressable
              onPress={() => navigation.navigate('Profile')}

              // onPress={handleLogOut}

              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
                flexDirection: 'row'
              })}>
              <HelloUser></HelloUser>
              {me.photoURL ? (
                <Image style={{ width: 30, height: 30, borderRadius: 50, margin: 10 }} source={{ uri: me.photoURL }} />
              ) : (
                  <FontAwesome
                    name="user-circle"
                    size={25}
                    style={{ marginRight: 15, marginLeft: 10 }}
                  />
                )}
            </Pressable>
          ),

        })}
      />
    </BottomTab.Navigator >
  );
}




function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

