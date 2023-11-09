import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import React, { useState, useEffect } from 'react'; // Import useEffect
import { StyleSheet } from 'react-native';
import { Avatar } from '@rneui/base/dist/Avatar';
import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const auth = getAuth(); // Get the authentication object

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  useEffect(() => {
    const checkAuthentication = async () => {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      const userDString = await AsyncStorage.getItem('userD');

      if (isLoggedIn === 'true' && userDString) {
        const userD = JSON.parse(userDString);

        if (userD.userType == "doctor") {
          console.log(userD, "userD PASSED");
          navigation.reset({
            index: 0,
            routes: [{ name: "DoctorHome", params: { userD: userD } }],
          });
        } else {
          console.log("true1", userD.userType);
          navigation.reset({
            index: 0,
            routes: [{ name: "UserHome", params: { userD: userD } }],
          });}
      }
    };

    checkAuthentication();
  }, [navigation]);


  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "App requires access to your location",
          buttonNeutral: "Ask Me Later",
          buttonNegative: 'Cancel',
          buttonPositive: 'OK'
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log('Latitude:', latitude);
            console.log('Longitude:', longitude);
           // Store the location in AsyncStorage
           AsyncStorage.setItem('userLocation', JSON.stringify({ latitude, longitude }));
          },
          (error) => {
            console.log('Error getting location:', error);
          },
          { enableHighAccuracy: true,  timeout: 60000, maximumAge: 1000 },
        );
      } else {
        Alert.alert('Location permission denied');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);
 
  
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Invalid Login', 'Please enter both email and password.');
      return;
    }
  
    // Inside handleLogin function
try {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Query Firestore to get user data
  const userQuerySnapshot = await firestore()
    .collection('users')
    .where('email', '==', user.email)
    .get();

  if (!userQuerySnapshot.empty) {
    const userDoc = userQuerySnapshot.docs[0];
    const userD = userDoc.data();
    await AsyncStorage.setItem('isLoggedIn', 'true');
    await AsyncStorage.setItem('userD', JSON.stringify(userD));
    await AsyncStorage.setItem('userType', userD.userType); // Store user type

    if (userD.userType == "doctor") {
      console.log(userD, "userD PASSED");
      navigation.reset({
        index: 0,
        routes: [{ name: "DoctorHome", params: { userD: userD } }],
      });
    } else {
      console.log("true1", userD.userType);
      navigation.reset({
        index: 0,
        routes: [{ name: "UserHome", params: { userD: userD } }],
      });
    }
  } else {
    Alert.alert('User not found', 'Please check your credentials.');
  }
} catch (error) {
  Alert.alert('Invalid email or password');
}

  };
  
  
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <View>
      <ScrollView>
      <View>
        <Text style={styles.heading}>Login to your account</Text>
        <Image
          source={require('../assets/pet.png')}
          style={{ width: '95%', height: 300, marginBottom: 50 }}
        />
        
          <View style={styles.form1}>
            <Avatar
              size={32}
              source={require('../assets/email.png')}
              containerStyle={{
                marginLeft: 10,
                marginTop: 5,
                width: 30,
                height: 30,
              }}
            />
            <TextInput
              placeholder="Enter Email"
              onChangeText={setEmail}
              style={styles.inputs}
              placeholderTextColor="black"
            ></TextInput>
          </View>
          <View style={styles.form1}>
            <Avatar source={require('../assets/password.png')} containerStyle={{ marginLeft: 5 }} />
            <TextInput
              placeholder="Enter Password"
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={styles.inputs}
              placeholderTextColor="black"
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 10,
                right: 30,
              }}
              onPress={togglePasswordVisibility}
            >
              <Image
                source={
                  showPassword
                    ? require('../assets/eye.png')
                    : require('../assets/blind.png')
                }
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.Button, { marginTop: 20 }]}>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginTop: 30,
              fontSize: 18,
              marginBottom: 20,
            }}
          >
            <Text style={{ color: 'black', fontSize: 15 }}>Don't have an account? </Text>
            <Text
              style={{ color: '#747cfb', fontSize: 15 }}
              onPress={() => {
                navigation.navigate('SignUp');
              }}
            >
              Sign up
            </Text>
          </View>
        
      </View>
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  heading: {
    marginTop: 20,
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
    padding: 10,
    fontWeight: '600',
  },
  container: {
    borderRadius: 30,
    // width:
  },
  form1: {
    flexDirection: 'row',
    borderColor: '#ccc',
    alignItems: 'center',
    borderBottomWidth: 1,
    width: '95%',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 10,
  },
  inputs: {
    color: 'black',
    padding: 10,
    marginTop: 5,
  },
  Button: {
    width: '95%',
    height: 50,
    backgroundColor: '#747cfb',
    borderRadius: 10,
    alignSelf: 'center',
  },
  buttonText: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10,
    color: 'white',
  },
});
