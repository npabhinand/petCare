import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import React, { useState, useEffect } from 'react'; // Import useEffect
import { StyleSheet } from 'react-native';
import { Avatar } from '@rneui/base/dist/Avatar';
import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// import Geolocation from '@react-native-community/geolocation';

const auth = getAuth(); // Get the authentication object

const Login = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  // useEffect(() => {
  //   // Request location permission here
  //   Geolocation.requestAuthorization("whenInUse").then(result => {
  //     if (result === 'granted') {
  //       // Permission granted
  //     } else {
  //       // Permission denied
  //       Alert.alert('Location permission denied');
  //     }
  //   }).catch(error => {
  //     console.error('Location permission error:', error);
  //   });
  // }, []); // Add an empty dependency array to run this effect only once

  const handleLogin = async () => {
    if (!email || !password) {
      // Check if any required field is empty
      Alert.alert('Invalid Login');
      return; // Exit the function
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      // Rest of your code...
      firestore()
        .collection('users')
        .where('email', '==', user.email)
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            const userD = querySnapshot.docs[0].data();

            console.log('User Type:', userD.userType);

            if (userD.userType === 'user') {
              navigation.navigate('UserHome', userD);
            } else {
              navigation.navigate('DoctorHome', userD);
            }
          }
        });
    } catch (error) {
      // Handle login error
      console.error('Login Error:', error);
      Alert.alert('Invalid email or password');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <View>
      <View>
        <Text style={styles.heading}>Login to your account</Text>
        <Image
          source={require('../assets/pet.png')}
          style={{ width: '95%', height: 300, marginBottom: 50 }}
        />
        <ScrollView>
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
        </ScrollView>
      </View>
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
