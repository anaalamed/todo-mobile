import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ColorSchemeName, Pressable, Image } from 'react-native';
import * as React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { Provider } from 'react-native-paper';

import useColorScheme from '../hooks/useColorScheme';

import { RootState } from '../state/root.reducer';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import ProfileScreen from '../screens/ProfileScreen';
import TodosScreen from '../screens/TodosScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import SignUp from '../screens/SignUp';
import LogIn from '../screens/LogIn';
import UpdateProfile from '../screens/UpdateProfile';
import HelloUser from '../components/HelloUser';
import ModalAddTodo from '../components/TodosScreen/ModalAddTodo';
import CustomMenu from './Menu'


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <Provider>
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      >
        <RootNavigator />
      </NavigationContainer >
    </Provider>
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
      }}
    >

      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />

      <Stack.Screen name="LogIn" component={LogIn} options={{ title: 'Log In' }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Registration' }} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} options={{ title: 'Update Profile' }} />

      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />

      <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
        <Stack.Screen name="ModalAddTodo" component={ModalAddTodo} options={{ title: 'Create new Todo!' }} />
      </Stack.Group>
    </Stack.Navigator >
  );
}

// ----------------------------------- Bottom Tab Navigator -----------------------------------

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

          headerLeft: () => (<Image style={{ width: 30, height: 30, borderRadius: 50, margin: 10 }} source={require('../assets/images/todo.png')} />),

          // headerRight: () => (
          //   <Pressable
          //     onPress={() => navigation.navigate('Profile')}
          //     style={({ pressed }) => ({
          //       opacity: pressed ? 0.5 : 1,
          //       flexDirection: 'row'
          //     })}>
          //     <HelloUser></HelloUser>
          //     {me.photoURL ? (
          //       <Image style={{ width: 30, height: 30, borderRadius: 50, margin: 10 }} source={{ uri: me.photoURL }} />
          //     ) : (
          //         <FontAwesome
          //           name="user-circle"
          //           size={25}
          //           style={{ marginRight: 15, marginLeft: 10 }}
          //         />
          //       )}
          //   </Pressable>
          // ),
          headerRight: () => <CustomMenu navigation={navigation} />,
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

          headerRight: () => <CustomMenu navigation={navigation} />,
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

