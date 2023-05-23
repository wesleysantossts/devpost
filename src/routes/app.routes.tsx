import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Feather from 'react-native-vector-icons/Feather';

import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Search from '../pages/Search';
import NewPost from '../pages/NewPost';
import PostsUser from '../pages/PostsUser';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function StackRoutes() {
  const routes = [
    {
      name: 'HomeTab',
      component: Home,
    },
    {
      name: 'NewPost',
      component: NewPost,
      options: {
        title: 'New Post',
        headerTintColor: '#fff',
        headerStyle: {backgroundColor: '#36393f'},
      },
    },
    {
      name: 'PostsUser',
      component: PostsUser,
      options: {
        title: 'Posts User',
        headerTintColor: '#fff',
        headerStyle: {backgroundColor: '#36393f'},
      },
    },
  ];
  return (
    <Stack.Navigator>
      {routes.map((item, index) => (
        <Stack.Screen
          key={index}
          name={item.name}
          component={item.component}
          options={item.options}
        />
      ))}
    </Stack.Navigator>
  );
}

export default function AppRoutes() {
  const routes = [
    {name: 'home', component: StackRoutes, icon: 'home'},
    {name: 'search', component: Search, icon: 'search'},
    {name: 'profile', component: Profile, icon: 'user'},
  ];

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#202225',
          borderTopWidth: 0,
        },
      }}>
      {routes.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={{
              tabBarIcon: ({color, size}) => {
                return <Feather name={item.icon} color={color} size={size} />;
              },
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}
