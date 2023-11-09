import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ToastAndroid,
  Alert
} from 'react-native';
import React, {useState} from 'react';
import {Avatar} from '@rneui/base';
import {RadioButton} from 'react-native-paper';
import {Card} from '@rneui/themed';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'; // Import Firestore
// import firebase from '@react-native-firebase/app';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [name,setName]=useState();
  const [checked, setChecked] = useState('user');
  
  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };
  
  const handleSignUp = async () => {
    if (!email || !password || !name || !phone) {
      // Check if any required field is empty
      Alert.alert('Error', 'Please fill in all the required fields');
      return; // Exit the function
    }
  
    try {
      // Check if the email is already in use
      const emailExists = await auth().fetchSignInMethodsForEmail(email);
  
      if (emailExists && emailExists.length > 0) {
        // Email is already registered
        Alert.alert('Error', 'This email address is already in use.');
        return;
      }
  
      // If the email is not in use, proceed with registration
      const userCredentials = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredentials.user;
      console.log(user.email);
  
      // Store user data in Firestore
      await firestore()
        .collection('users')
        .doc(user.uid) // Use user's UID as the document ID
        .set({
          userType: checked,
          email: email,
          phone: phone,
          name: name,
        });
  
      ToastAndroid.show('SignUp successful', ToastAndroid.SHORT);
      navigation.navigate('Login');
    } catch (error) {
      console.log(error.message);
      Alert.alert('Error', 'This email address is already in use.');
      // Handle other errors as needed
    }
  };
  

  return (
    <View>
      <Text style={styles.heading}>Create a new account</Text>
      <ScrollView>
      <Image
        source={require('../assets/pet.png')}
        style={{width: '95%', height: 280, alignSelf: 'center'}}
      />

      
        <Card containerStyle={styles.container}>
          <View style={styles.radio}>
            <RadioButton
              value="user"
              status={checked === 'user' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('user')}
            />
            <Text style={styles.radioText}>User</Text>
            <RadioButton
              value="doctor"
              status={checked === 'doctor' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('doctor')}
            />
            <Text style={styles.radioText}>Doctor</Text>
          </View>
          <View style={styles.form1}>
            <Avatar
              size={32}
              source={require('../assets/profile.png')}
              containerStyle={{
                marginLeft: 10,
                marginTop: 5,
                width: 30,
                height: 30,
              }}
            />
            <TextInput
              placeholder="Enter Name"
              onChangeText={setName}
              style={styles.inputs}
              placeholderTextColor="black"></TextInput>
          </View>

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
              placeholderTextColor="black"></TextInput>
          </View>
          {/*  */}
          <View style={styles.form1}>
            <Avatar
              size={32}
              source={require('../assets/phone.png')}
              containerStyle={{marginLeft: 5, marginTop: 5}}
            />
            <TextInput
              placeholder="Enter Phone Number"
              style={styles.inputs}
              placeholderTextColor="black"
              onChangeText={setPhone}></TextInput>
          </View>

          {/*  */}
          <View style={styles.form1}>
            <Avatar
              source={require('../assets/password.png')}
              containerStyle={{marginLeft: 5}}
            />
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
              onPress={togglePasswordVisibility}>
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
          {/*  */}
          <View style={[styles.Button, {marginTop: 20}]}>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={styles.buttonText}>SignUp</Text>
            </TouchableOpacity>
          </View>
          {/*  */}
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginTop: 30,
              fontSize: 18,
              marginBottom: 20,
            }}>
            <Text style={{color: 'black', fontSize: 15}}>
              You already have an account?{' '}
            </Text>
            <Text
              style={{color: '#747cfb', fontSize: 15}}
              onPress={() => {
                navigation.navigate('Login');
              }}>
              Login
            </Text>
          </View>
          {/*  */}
        </Card>
      </ScrollView>
    </View>
  );
};

export default SignUp;

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
    justifyContent: 'flex-start',
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
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: -10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginTop: 10,
  },
  radioText: {
    marginRight: 20,
    fontSize: 18,
    color: 'black',
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
