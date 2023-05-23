import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../pages/Login';

const routes = [{name: 'Login', component: Login}];

export default function AuthRoutes() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      {routes.map((item, i) => {
        return (
          <Stack.Screen
            key={i}
            name={item.name}
            component={item.component}
            options={{headerShown: false}}
          />
        );
      })}
    </Stack.Navigator>
  );
}
