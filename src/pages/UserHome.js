import {View, Text, StyleSheet, TouchableOpacity,Image, ScrollView} from 'react-native';
import React from 'react';
import {Avatar, Card} from '@rneui/base';

export default function UserHome({navigation,route}) {
  const userD=route.params;
  console.log(userD)
  return (
    <View  style={{ backgroundColor: 'white',width:'100%',height:'100%'}}>
      <View style={styles.row1}>
        <TouchableOpacity onPress={()=>{navigation.navigate('Profile',userD)}}>
        <Avatar source={require('../assets/profile.png')} />
        </TouchableOpacity>
       
        <Text style={styles.heading}>Location</Text>
        <TouchableOpacity>
        <Avatar source={require('../assets/bell.png')} />
        </TouchableOpacity>
      </View>
      <ScrollView>
      <View style={styles.card1}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{flexDirection: 'column', margin: 30}}>
            <Text style={styles.font1}>Find Your best </Text>
            <Text style={styles.font1}>pet Clinic</Text>
            <TouchableOpacity style={styles.btn1}>
              <Text style={styles.font2}>Community</Text>
            </TouchableOpacity>
          </View>
          <Image source={require("../assets/pet1.png")} style={{width:140,height:175,marginTop:10,marginRight:10}}/>
        </View>
      </View>
      <View style={[styles.row1,{marginTop:10,marginBottom:-10}]}>
      <Text style={styles.font3}>Nearby Veterinary</Text>
      <TouchableOpacity>
      <Text style={[styles.font3,{color:"#bfbfbf"}]}>See All</Text>
      </TouchableOpacity>
      </View>
     

        <Card containerStyle={styles.card}>
          <TouchableOpacity onPress={()=>{navigation.navigate('DoctorDetails')}}>
          <View style={styles.row}>
            <Avatar source={require('../assets/doctor.png')} size={100} />
            <View style={{flexDirection:'column',marginTop:-10,marginLeft:20}}>
              <Text style={styles.font3}>Dr.Abhinand</Text>
              <Text style={[styles.font4,{marginTop:5}]}>Veterinary Doctor</Text>
              <Text style={styles.font4}>place</Text>
              <View style={styles.row}>
              <Text style={styles.font3}>4.5 </Text>
              <Text>star</Text>
              </View>
            </View>
          </View>
          </TouchableOpacity>
        </Card>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
   
  },
  heading: {
    color: 'black',
    fontSize: 25,
    fontWeight: '600',
    // fontStyle:'italic',
  },
  card1: {
    backgroundColor: '#8a7ffe',
    width: '95%',
    alignSelf: 'center',
    height: 200,
    borderRadius: 20,
    // borderwidth:1
  },
  font1: {
    fontSize: 25,
    fontWeight: '600',
    // padding:5,
    color: 'white',
  },
  btn1: {
    width: 120,
    backgroundColor: '#fc9340',
    height: 40,
    marginTop: 20,
    borderRadius: 10,
    justifyContent: 'center',
  },
  font2: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 18,
  },
  font3:{
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },
  font4:{
    color: 'gray',
    fontSize: 18,
    fontWeight: '600',
  },
  card:{
    borderRadius:20,
    alignSelf:'center'
    ,width:'95%',
    marginBottom:10
  },
  row:{
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent:'space-between'
  }
});
