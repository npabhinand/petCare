import { View, Text,StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { Avatar } from '@rneui/base'
export default function AddSchedule() {
  return (
    <View style={{marginBottom:100}}>
      <View style={styles.mainheadingview}>
      <Text style={styles.mainheading }>Schedules</Text>
      </View>
      <ScrollView>
      <Text style={styles.heading}>Today</Text>
      <View style={styles.contentView}>
          <Avatar source={require('../assets/doctor1.jpg')} rounded size={40} containerStyle={{marginLeft:20}}></Avatar>
          <Text style={styles.content}>Abhinand</Text>
          <Text style={styles.content}>9048407795</Text>
          <Text style={styles.content}>10.00-10.30</Text>
        </View>

        <Text style={[styles.heading,{marginTop:10}]}>Tommorow</Text>
        <View style={[styles.contentView,]}>
          <Avatar source={require('../assets/doctor1.jpg')} rounded size={40} containerStyle={{marginLeft:20}}></Avatar>
          <Text style={styles.content}>Abhinand</Text>
          <Text style={styles.content}>9048407795</Text>
        <Text style={styles.content}>10.00-10.30</Text>
        </View>
        
        
        </ScrollView>
    </View>
  )
}
const styles=StyleSheet.create({
    mainheadingview:{
      height:70,
      width:'100%',
      backgroundColor:'white',
      justifyContent:'center',
      marginBottom:10
    },
    mainheading:{
      fontSize:25,
      color:'black',
      textAlign:'center'
    },
    heading:{
      fontSize:20,
      color:'black',
      marginLeft:20,
      marginBottom:10
    },
    contentView:{
      // marginLeft:20,
      marginRight:10,
      flexDirection:'row',
      alignItems:'center',
      borderBottomWidth:.5,
      borderBottomColor:'gray',
      height:80,
      width:'100%',
      backgroundColor:'white',
    },
    content:{
      color:'black',
      fontSize:16 ,
      marginLeft:20,
      marginRight:20,
      textAlign:'justify'
    },
})