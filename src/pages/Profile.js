import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';;
import { getAuth, signOut } from '@react-native-firebase/auth';

const auth = getAuth(); // Get the authentication object
const Profile = ({route,navigation}) => {
  const userD=route.params
  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear(); 
      navigation.reset({
        index: 0,
        routes: [{ name: "Login",}],
      });// Clear all AsyncStorage data
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };
  
  
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../assets/doctor1.jpg')}
            style={{width: 140, height: 140, borderRadius: 100, marginTop: 50}}
          />
        </View>
        <View style={styles.box}>
          <Image
            source={require('../assets/profile.png')}
            style={styles.boxImage}
          />
          <Text style={styles.heading}>{userD.name}</Text>
        </View>

        <View style={styles.box}>
          <Image
            source={require('../assets/email.png')}
            style={styles.boxImage}
          />
          <Text style={styles.heading}>{userD.email}</Text>
        </View>
        <View style={styles.box}>
          <Image
            source={require('../assets/phone.png')}
            style={styles.boxImage}
          />
          <Text style={styles.heading}>{userD.phone}</Text>
        </View>
        {userD.userType=='user' &&(
        <TouchableOpacity style={styles.box} onPress={()=>{navigation.navigate('Appointments',userD)}}>
          <Image
            source={require('../assets/schedule1.png')}
            style={styles.boxImage}
          />
          <Text style={styles.heading}>Bookings</Text>
        </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.box, {backgroundColor: '#466A8F'}]}
          onPress={clearAsyncStorage}
          >
          <Text style={{color: '#FFFFFF', fontSize: 20}}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
    width:'100%',
    height:'100%'
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'black',
  },
  box: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: '90%',
    padding: 20,
    paddingBottom: 22,
    borderRadius: 10,
    shadowOpacity: 80,
    elevation: 15,
    marginTop: 40,
    // alignItems:'center'
  },
  boxImage: {
    width: 20,
    height: 20,
    marginTop: 5,
  },
});

export default Profile;
