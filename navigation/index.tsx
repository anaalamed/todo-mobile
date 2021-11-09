/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, Image } from 'react-native';

import useColorScheme from '../hooks/useColorScheme';
import NotFoundScreen from '../screens/NotFoundScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TodosScreen from '../screens/TodosScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import { RootState } from '../state/root.reducer';
import { useSelector } from 'react-redux';
import HelloUser from '../components/HelloUser';
import { ButtonText } from '../constants/StyledComponents';
// import {setT} '../screens/ProfileScreen'



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

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
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

          headerLeft: () => (
            // <Image style={{ width: 30, height: 30, borderRadius: 50, margin: 10 }} source={require('../assets/images/todo.png')} />

            <Pressable
              onPress={() => {
                setStart(true);
                setLogIn(false);
                setProfile(false);
                setSignUp(false);
              }}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
                flexDirection: 'row'
              })}>
              <ButtonText style={{ marginLeft: 10 }}><FontAwesome name='arrow-left' /></ButtonText>
            </Pressable>
          )
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
            <Pressable
              onPress={() => navigation.navigate('Profile')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
                flexDirection: 'row'
              })}>
              {me.photoURL ? (
                <Image style={{ width: 30, height: 30, borderRadius: 50, margin: 10 }} source={{ uri: me.photoURL }} />
              ) : (
                  <FontAwesome
                    name="user-circle"
                    size={25}
                    style={{ marginLeft: 15 }}
                  />
                )}
              <HelloUser></HelloUser>
            </Pressable>
          ),

        })}
      />
    </BottomTab.Navigator >
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

