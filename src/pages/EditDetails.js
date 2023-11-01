import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const EditDetails = ({ route, navigation }) => {
  const userD = route.params;
  const [hospitalName, setHospitalName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [schedule, setSchedule] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState('');

  const handleScheduleSelection = (time) => {
    if (selectedSchedule === time) {
      // If the same schedule is clicked again, deselect it
      setSelectedSchedule('');
    } else {
      // Otherwise, select the new schedule
      setSelectedSchedule(time);
    }
  };

  const onSubmit = async () => {
    const hospitalData = {
      HospitalName: hospitalName,
      price: price,
      location: location,
      image: images, // Corrected variable name
      schedule: selectedSchedule,
    };

    try {
      // You can add hospitalData to the Firestore collection here
      // Make sure you have a valid Firestore setup
      await firestore().collection('hospital').add(hospitalData);

      ToastAndroid.show('Property added successfully', ToastAndroid.SHORT);
      navigation.navigate('Tabs', { userD });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View style={{ marginBottom: 100 }}>
      <View style={styles.mainheadingview}>
        <Text style={styles.mainheading}>Add Details</Text>
      </View>
      <Text style={styles.mainheading}>Enter Details of Hospital</Text>
      <TextInput
        onChangeText={setHospitalName}
        style={styles.inputs}
        placeholder="Enter Hospital name"
        placeholderTextColor="black"
      />
      <TextInput
        onChangeText={setLocation}
        style={styles.inputs}
        placeholder="Enter Location"
        placeholderTextColor="black"
      />
      <TextInput
        onChangeText={setPrice}
        style={styles.inputs}
        placeholder="Enter the price for consultation"
        placeholderTextColor="black"
      />
      <Text style={styles.mainheading}>Enter the schedule of consultation</Text>
      <View style={styles.row}>
        {['09.00-10.00', '10.00-10.30', '10.30-11.00', '11.00-11.30'].map((time) => (
          <TouchableOpacity
            key={time}
            style={[
              styles.btn,
              selectedSchedule === time ? { backgroundColor: 'green' } : null,
            ]}
            onPress={() => handleScheduleSelection(time)}
          >
            <Text style={styles.btnText}>{time}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Add more schedule buttons here as needed */}
      <TouchableOpacity onPress={onSubmit} style={styles.btn2}>
        <Text style={styles.btnText}>Submit Details</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditDetails;

const styles = StyleSheet.create({
  mainheadingview: {
    height: 70,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  mainheading: {
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  btn: {
    width: 110,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#466A8F',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  inputs: {
    color: 'black',
    padding: 10,
    marginTop: 5,
    borderWidth: 1,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  btn2: {
    width: '95%',
    height: 50,
    marginTop: 40,
    backgroundColor: 'black',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});
