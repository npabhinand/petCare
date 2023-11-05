// import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import SignUp from './src/pages/SignUp';
import Login from './src/pages/Login';
import UserHome from './src/pages/UserHome';
import DoctorDetails from './src/pages/DoctorDetails';
import DoctorHome from './src/pages/DoctorHome';
import Appointments from './src/pages/Appointments';
import Profile from './src/pages/Profile';
import Notification from './src/pages/Notification';
import Schedule from './src/pages/Schedule';
import EditSchedule from './src/pages/EditSchedule';
import AddDetails from './src/pages/AddDetails';
import Edit from './src/pages/Edit';
import Success from './src/pages/Success';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
          name="EditSchedule"
          component={EditSchedule}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
