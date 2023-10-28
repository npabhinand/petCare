import {View, Text, StyleSheet, TouchableOpacity,Image} from 'react-native';
import React from 'react';
import {Avatar} from '@rneui/base';

export default function DoctorHome({navigation}) {
  return (
    <View style={styles.container}>

      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile');
          }} >
          <Avatar source={require('../assets/profile.png')} 
          containerStyle={{marginLeft:10}}></Avatar>
        </TouchableOpacity>
        <Text style={styles.heading}>Dr.Abhinand</Text>
        <TouchableOpacity onPress={() => {navigation.navigate('Notification');}}>
          <Avatar source={require('../assets/bell.png')} containerStyle={{marginRight:10}}/>
        </TouchableOpacity>
      </View>

      <Image source={require('../assets/doctor.png')} style={{width:300,height:300,alignSelf:'center'}}></Image>

      <View style={styles.row1}>
        <TouchableOpacity style={styles.btn}
          onPress={() => {navigation.navigate('Appointments');}}>
          <Image source={require('../assets/appointment.png')}/>
          <Text style={styles.btnText}>Appointments</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn}
        onPress={() => {navigation.navigate('AddSchedule');}}>
        <Image source={require('../assets/schedule1.png')}/>
          <Text style={styles.btnText}>Add Schedule</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.row1}>
      <TouchableOpacity style={styles.btn}
          onPress={() => {navigation.navigate('EditSchedule');}}>
          <Image source={require('../assets/editschedule.png')}/>
          <Text style={styles.btnText}>Edit Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}
          onPress={() => {navigation.navigate('EditDetails')}}>
          <Image source={require('../assets/edit.png')}/>
          <Text style={styles.btnText}>Edit Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#466A8F"
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor:'white',
    height:80,
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  btn: {
    width: 170,
    height: 170,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading:{
    color: 'black',
    fontSize: 25,
    fontWeight:'600',

  },
  btnText: {
    color: 'black',
    fontSize: 18,
    fontWeight:'600',

  },
});
