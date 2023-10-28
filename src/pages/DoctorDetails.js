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
import {Avatar} from '@rneui/base';

export default function DoctorDetails() {
  return (
    <View>
      <ScrollView>
        <View style={{backgroundColor: '#8a7ffe', height: 350}}>
          <Image
            source={require('../assets/doctor.png')}
            style={styles.image}
          />
        </View>

        <View style={styles.container}>
          <View style={styles.row1}>
            <View>
              <Text style={styles.font1}>Dr.Arjun Babu</Text>
              <Text style={styles.font1}>Veterinary Doctor</Text>
            </View>
            <TouchableOpacity style={styles.callbox}>
              <Avatar source={require('../assets/phone.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.card1}>
            <Avatar
              source={require('../assets/experience.png')}
              containerStyle={{marginLeft: 10}}
            />
            <View>
              <Text style={styles.font2}>Experience</Text>
              <Text style={styles.font2}>4+ Yrs</Text>
            </View>
            <Avatar
              source={require('../assets/price.png')}
              containerStyle={{marginLeft: 10}}
            />
            <View>
              <Text style={styles.font2}>Rate</Text>
              <Text style={styles.font2}>2000</Text>
            </View>
            <Avatar
              source={require('../assets/star.png')}
              containerStyle={{marginLeft: 10}}
            />
            <View>
              <Text style={styles.font2}>Rating</Text>
              <Text style={styles.font2}>4.5</Text>
            </View>
          </View>
          <Text style={styles.heading}>About Veterinary</Text>
          <Text style={styles.para}>
            A veterinarian, also known as a veterinarian surgeon or veterinary
            physician, is a
          </Text>
          <Text style={styles.heading}>Pet Name</Text>
          <TextInput placeholder="Enter Pet Name" style={styles.input} />

          <Text style={styles.heading}>Date</Text>
          <TextInput placeholder="Date DD-MM-YYYY" style={styles.input} />
          <Text style={styles.heading}>Time</Text>

          <View style={styles.row2}>
            <TouchableOpacity style={styles.btn1}>
              <Text style={styles.font3}>09.00-09.30</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn1}>
              <Text style={styles.font3}>10.00-10.30</Text>
            </TouchableOpacity>
            {/* </View>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-evenly'}}> */}
            <TouchableOpacity style={styles.btn1}>
              <Text style={styles.font3}>11.00-11.30</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn1}>
              <Text style={styles.font3}>13.00-15.30</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.btn2}>
            <Text style={{textAlign: 'center', fontSize: 20, color: 'white'}}>
              Book Appointment
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 300,
    alignSelf: 'center',
  },
  container: {
    width: '100%',
    backgroundColor: 'white',
    height: '100%',
    borderTopLeftRadius: 70,
    marginTop: -60,
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    padding: 20,
    justifyContent: 'space-between',
  },
  font1: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
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
    // justifyContent: 'space-between',
    // backgroundColor:'green'
  },
  font2: {
    color: '#5068BE',
    marginLeft: 10,
    marginRight: 10,
  },
  heading: {
    padding: 10,
    marginTop: 10,
    fontSize: 25,
    color: 'black',
  },
  para: {
    textAlign: 'justify',
    marginLeft: 10,
    marginRight: 20,
    fontSize: 18,
    color: 'gray',
  },
  input: {
    borderWidth: 1,
    width: '95%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  btn1: {
    height: 40,
    width: 90,
    backgroundColor: '#e4e9f9',
    justifyContent: 'center',
    borderRadius: 10,
  },
  font3: {
    textAlign: 'center',
    color: '#5068BE',
  },
  btn2: {
    width: '95%',
    height: 50,
    backgroundColor: '#8a7ffe',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
});
