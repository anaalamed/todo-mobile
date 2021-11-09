import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, Image, Button, View } from 'react-native';

import useColorScheme from '../hooks/useColorScheme';
import NotFoundScreen from '../screens/NotFoundScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TodosScreen from '../screens/TodosScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import { RootState } from '../state/root.reducer';
import { useSelector } from 'react-redux';
import HelloUser from '../components/HelloUser';
import LogIn from '../screens/LogIn';
import SignUp from '../screens/SignUp';
import UpdateProfile from '../screens/UpdateProfile';


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
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="LogIn" component={LogIn} options={{
        title: 'Log In',
        headerStyle: {
          backgroundColor: 'greenyellow',
        },
        headerTintColor: 'navy',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }} />

      <Stack.Screen name="SignUp" component={SignUp} options={{
        title: 'Registration',
        headerStyle: {
          backgroundColor: 'greenyellow',
        },
        headerTintColor: 'navy',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }} />

      <Stack.Screen name="UpdateProfile" component={UpdateProfile} options={{
        title: 'Update Profile',
        headerStyle: {
          backgroundColor: 'greenyellow',
        },
        headerTintColor: 'navy',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }} />


      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const { me } = useSelector((state: RootState) => state.users);

  return (
    <BottomTab.Navigator
      initialRouteName="Profile"
      screenOptions={{
        tabBarActiveTintColor: "navy",
        tabBarInactiveTintColor: "gray",
        tabBarActiveBackgroundColor: "greenyellow",
        tabBarInactiveBackgroundColor: "#6CBF40"
      }}>

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
                    style={{ marginLeft: 15 }}
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
            <Image style={{ width: 30, height: 30, borderRadius: 50, margin: 10 }} source={require('../assets/images/todo.png')} />
          ),

          headerRight: () => (
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
                    style={{ marginLeft: 15 }}
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

