import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React from 'react';
import {} from '@rneui/themed';
import {Avatar} from '@rneui/base';

export default function DoctorDetails() {
  return (
    <View>
      <View style={{backgroundColor: '#8a7ffe', height: 350}}>
        <Image source={require('../assets/doctor.png')} style={styles.image} />
      </View>
        
      <View
        style={{
          width: '100%',
          backgroundColor: 'white',
          height: '100%',
          borderTopLeftRadius: 70,
          marginTop: -60,
        }}>
            <ScrollView>
        <View style={styles.row1}>
          <View>
            <Text>Dr.Arjun Babu</Text>
            <Text>Veterinary Doctor</Text>
          </View>
          <TouchableOpacity style={styles.callbox}>
            <Avatar source={require('../assets/phone.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.card1}>
          <Text>Experience</Text>
          <Text>Rate</Text>
          <Text>Ratings</Text>
        </View>
        <Text style={styles.heading}>About Veterinary</Text>
        <Text
          style={{
            textAlign: 'justify',
            marginLeft: 10,
            marginRight: 20,
            fontSize: 18,
          }}>
          A veterinarian, also known as a veterinarian surgeon or veterinary
          physician, is a
        </Text>
        <Text style={styles.heading}>Date</Text>

        <TextInput placeholder="Date DD-MM-YYYY" style={{borderWidth:1,width:'95%',alignSelf:'center',padding:10,borderRadius:10}}/>
        </ScrollView>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 300,
    alignSelf: 'center',
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    padding: 20,
    justifyContent: 'space-between',
  },
  callbox: {
    width: 50,
    height: 50,
    backgroundColor: '#8a7ffe',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  card1: {
    width: '95%',
    height: 50,
    borderWidth: 0.5,
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // backgroundColor:'green'
  },
  heading: {
    padding: 10,
    marginTop: 10,
    fontSize: 25,
  },
});
