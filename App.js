import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React, { useEffect } from 'react';
import SignUp from './src/pages/SignUp';
import Login from './src/pages/Login';
import UserHome from './src/pages/UserHome';
import DoctorDetails from './src/pages/DoctorDetails';
import DoctorList from './src/pages/DoctorList';
import DoctorHome from './src/pages/DoctorHome';
import Appointments from './src/pages/Appointments';
import Profile from './src/pages/Profile';
import Notification from './src/pages/Notification';
import Schedule from './src/pages/Schedule';
import ViewFeedback from './src/pages/ViewFeedback';
import AddDetails from './src/pages/AddDetails';
import Edit from './src/pages/Edit';
import Success from './src/pages/Success';
import SplashScreen from "./src/pages/SplashScreen";
import Feedback from './src/pages/Feedback';

const Stack = createNativeStackNavigator();

function App() {

 
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserHome"
          component={UserHome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DoctorDetails"
          component={DoctorDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DoctorList"
          component={DoctorList}
          // options={{headerShown: false}}
        />
        <Stack.Screen
          name="DoctorHome"
          component={DoctorHome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Appointments"
          component={Appointments}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Schedule"
          component={Schedule}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ViewFeedback"
          component={ViewFeedback}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddDetails"
          component={AddDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Edit"
          component={Edit}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="Success"
          component={Success}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="Feedback"
          component={Feedback}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
