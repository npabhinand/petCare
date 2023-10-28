// import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import SignUp from './src/pages/SignUp'
import Login from './src/pages/Login'
import UserHome from './src/pages/UserHome';
import DoctorDetails from './src/pages/DoctorDetails';
import DoctorHome from './src/pages/DoctorHome';
import Appointments from './src/pages/Appointments';
import Profile from './src/pages/Profile';
import Notification from './src/pages/Notification';
import AddSchedule from './src/pages/AddSchedule';
import EditSchedule from './src/pages/EditSchedule';
import EditDetails from './src/pages/EditDetails';
const Stack = createNativeStackNavigator();


function App() {
  return (
        <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}}/>
        <Stack.Screen name="UserHome" component={UserHome} options={{headerShown:false}}/>
        <Stack.Screen name="DoctorDetails" component={DoctorDetails} options={{headerShown:false}}/>
        <Stack.Screen name="DoctorHome" component={DoctorHome} options={{headerShown:false}}/>
        <Stack.Screen name="Appointments" component={Appointments} options={{headerShown:false}}/>
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="Notification" component={Notification} options={{headerShown:false}}/>
        <Stack.Screen name="AddSchedule" component={AddSchedule} options={{headerShown:false}}/>
        <Stack.Screen name="EditSchedule" component={EditSchedule} options={{headerShown:false}}/>
        <Stack.Screen name="EditDetails" component={EditDetails} options={{headerShown:false}}/>

      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App;