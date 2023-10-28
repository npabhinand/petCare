import { View, Text,StyleSheet,TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'

export default function Appointments() {
  return (
    <View>
      <View style={styles.headingbox}>
      <Text style={styles.heading}>Appointments</Text>
      </View>
      <ScrollView style={{marginBottom:70}}>
      <View style={styles.card}>
        <View style={styles.card1}>
        <Text style={styles.heading1}> Your Booking Date & Time!</Text>
        <View style={styles.row}>
        <TouchableOpacity style={styles.btn}><Text style={styles.font1}>24 Sep, 2021</Text></TouchableOpacity>
        <TouchableOpacity style={styles.btn}><Text style={styles.font1}>09.00-09.30</Text></TouchableOpacity>
        <TouchableOpacity style={styles.btn}><Text style={styles.font1}>Monday</Text></TouchableOpacity>
        </View>
        <Text style={styles.font2}>Abhinand want to consult thier pet</Text>
        <TouchableOpacity style={styles.btn2}><Text style={[styles.font1,{marginTop:6}]}>$2000</Text></TouchableOpacity>
        </View>
        <Text style={styles.btnText}>Done</Text>
      </View>
      </ScrollView>
    </View>
  )
}

const styles=StyleSheet.create({
    headingbox:{
      backgroundColor:'white',
      height:70,
    },
    heading:{
      textAlign:'center',
      marginTop:5,
      color:'black',
      fontSize:25
    },
    card:{
      backgroundColor:'#466A8F',
      height:220,
      width:'95%',
      alignSelf:'center',
      marginTop:20,
      borderRadius:10
    },
    card1:{
      backgroundColor:'#c7c9cc',
      height:180,
      borderRadius:10
    },
    row:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-evenly'
        
    },
    heading1:{
      textAlign:'center',
      fontSize:20,
      marginTop:10,
      color:'black'
    },
    btn:{
        width: 100,
        height: 35,
        borderRadius: 10,
        backgroundColor: '#466A8F',
        alignItems: 'center',
        justifyContent: 'center',
        // marginRight:10,
        marginTop:20
    },
    font1:{
      textAlign:'center',
      color:'white',
      fontSize:15
      
    },
    font2:{
      textAlign:'center',
      margin:10,
      fontSize:18,
      marginTop:10,
      color:'black'
    },
    btn2:{
      width: 100,
        height: 35,
        borderRadius: 10,
        backgroundColor: 'black',
        alignItems: 'center',
        alignSelf:'flex-end',
        marginRight:30
    },
    btnText:{
        color:'white',
        textAlign:'center',
        fontSize:20,
        fontWeight:'600',
        marginTop:5
    }
})