import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {Avatar} from '@rneui/base';

export default function DoctorHome({navigation, route}) {
  const userD = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity>
          <Avatar
            source={require('../assets/profile.png')}
            containerStyle={{marginLeft: 10}}
            onPress={() => {
              navigation.navigate('Profile', userD);
            }}></Avatar>
        </TouchableOpacity>
        <Text style={styles.heading}>Dr.Abhinand</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Notification', userD);
          }}>
          <Avatar
            source={require('../assets/bell.png')}
            containerStyle={{marginRight: 10}}
          />
        </TouchableOpacity>
      </View>

      <Image
        source={require('../assets/doctor.png')}
        style={{width: 300, height: 300, alignSelf: 'center'}}></Image>

      <View style={styles.row1}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate('Appointments', userD);
          }}>
          <Image source={require('../assets/appointment.png')} />
          <Text style={styles.btnText}>Appointments</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate('Schedule', userD);
          }}>
          <Image source={require('../assets/schedule1.png')} />
          <Text style={styles.btnText}>Schedule</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row1}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate('ViewFeedback', userD);
          }}>
          <Avatar source={require('../assets/feedback.png')} size={70}/>
          <Text style={styles.btnText}>View feedback</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate('AddDetails', userD);
          }}>
          <Image source={require('../assets/edit.png')} />
          <Text style={styles.btnText}>Add Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#466A8F',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: 'white',
    height: 80,
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
  heading: {
    color: 'black',
    fontSize: 25,
    fontWeight: '600',
  },
  btnText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },
});
