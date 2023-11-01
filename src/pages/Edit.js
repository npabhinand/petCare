import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Card } from '@rneui/base';
import { ScrollView } from 'react-native';

export default function Edit() {
  const [timeSlots, setTimeSlots] = useState([
    '10.30-11.30',
    '11.00-11.30',
    '12.00-12.30',
    '13.30-14.00',
    '14.00-14.30',
    '15.00-15.30',
  ]);

  const handleDelete = (time) => {
    setTimeSlots((prevTimeSlots) =>
      prevTimeSlots.filter((selectedTime) => selectedTime !== time)
    );
  };

  const handleSaveChanges = () => {
    if (timeSlots.length === 0) {
      Alert.alert(
        'No Changes Made',
        'No appointments were selected for removal.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        'Confirm Update',
        'Are you sure to update the appointments?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Proceed',
            onPress: () => {
              // Handle the update logic here
              // You can use the timeSlots array to know which appointments to remove
              setTimeSlots([]);
              Alert.alert(
                'Update Successful',
                'Appointments have been updated.',
                [{ text: 'OK' }],
                { cancelable: false }
              );
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <View style={{ marginBottom: 100 }}>
      <ScrollView>
        <View style={styles.mainheadingview}>
          <Text style={styles.mainheading}>Edit Schedule</Text>
        </View>

        <Card containerStyle={styles.cards}>
          <Text style={styles.heading}>Tomorrow</Text>
          {timeSlots.length > 0 && (
            <Text style={styles.selectedText}>
              Selected: {timeSlots.join(', ')}
            </Text>
          )}
          {timeSlots.map((time, index) => (
            <View key={index} style={styles.row}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>{time}</Text>
                <TouchableOpacity onPress={() => handleDelete(time)}>
                  <Text style={styles.deleteText}> X</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <TouchableOpacity style={styles.btn1} onPress={handleSaveChanges}>
            <Text style={styles.btnText}>Save Changes</Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainheadingview: {
    height: 70,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    marginBottom: 10,
  },
  mainheading: {
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
    fontWeight: '600',
  },
  cards: {
    borderRadius: 20,
  },
  heading: {
    fontSize: 20,
    color: 'black',
    marginLeft: 20,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    justifyContent: 'space-evenly',
  },
  btn: {
    height: 40,
    width: 110,
    borderRadius: 10,
    backgroundColor: '#466A8F',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
  },
  btn1: {
    height: 50,
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: 'black',
    borderRadius: 10,
    justifyContent: 'center',
  },
  deleteText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  selectedText: {
    fontSize: 14,
    color: 'red',
    marginLeft: 20,
  },
});
