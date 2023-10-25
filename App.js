// import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import SignUp from './src/pages/SignUp'
import Login from './src/pages/Login'
import UserHome from './src/pages/UserHome';
import DoctorDetails from './src/pages/DoctorDetails';
const Stack = createNativeStackNavigator();


function App() {
  return (
        <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}}/>
        <Stack.Screen name="UserHome" component={UserHome} options={{headerShown:false}}/>
        <Stack.Screen name="DoctorDetails" component={DoctorDetails} options={{headerShown:false}}/>

      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App;