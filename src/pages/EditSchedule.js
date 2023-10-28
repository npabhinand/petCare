import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Card} from '@rneui/base';
import { ScrollView } from 'react-native';

export default function EditSchedule() {
  return (
    <View style={{marginBottom: 100}}>
      <ScrollView>
      <View style={styles.mainheadingview}>
        <Text style={styles.mainheading}>Schedules</Text>
      </View>

      <Card containerStyle={styles.cards}>
        <Text style={styles.heading}>Tomorrow</Text>
          <Text style={styles.heading}>Appointment Time</Text>
          <View style={styles.row}>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>10.00-10.30</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>10.30-11.00</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>11.00-11.30</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>13.00-13.30</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>13.30-14.30</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>15.00-15.30</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.btn1}>
            <Text style={styles.btnText}>Edit Schedule</Text>
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
    fontWeight:'600'
  },
  cards:{
    borderRadius:20,
  },
  heading: {
    fontSize: 20,
    color: 'black',
    marginLeft: 20,
    marginBottom: 10,
    textAlign:'center',
    fontWeight:'600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-evenly',
    // marginTop:10
  },
  btn: {
    height: 40,
    width: 105,
    borderRadius: 10,
    backgroundColor: '#466A8F',
    justifyContent: 'center',
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  btn1:{
    height:50,
    width:'90%',
    alignSelf:'center',
    marginTop:10,
    backgroundColor:'black',
    borderRadius:10,
    justifyContent:'center'
  }
});
