import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar } from '@rneui/base'
import firestore from '@react-native-firebase/firestore';

export default function Schedule({ navigation, route }) {
  const userD = route.params;
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1); // Get the date for tomorrow

  const [todaySchedule, setTodaySchedule] = useState([]);
  const [tomorrowSchedule, setTomorrowSchedule] = useState([]);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const bookingRef = firestore().collection('bookings').where('doctorId', '==', userD.email);
        const bookingQuery = await bookingRef.get();
        if (!bookingQuery.empty) {
          const bookings = [];
          bookingQuery.forEach((documentSnapshot) => {
            bookings.push(documentSnapshot.data());
          });

          // Filter schedules for today and tomorrow
          const todaySchedules = bookings.filter((booking) => new Date(booking.date).toDateString() === today.toDateString());
          const tomorrowSchedules = bookings.filter((booking) => new Date(booking.date).toDateString() === tomorrow.toDateString());

          setTodaySchedule(todaySchedules);
          setTomorrowSchedule(tomorrowSchedules);
        } else {
          console.log('Bookings not found');
        }
      } catch (error) {
        console.error('Error fetching booking data:', error);
      }
    };

    fetchBookingData();
  }, [userD.email]);

  return (
    <View style={{ marginBottom: 100 }}>
      <View style={styles.mainheadingview}>
        <Text style={styles.mainheading}>Schedules</Text>
      </View>
      <ScrollView>
        <Text style={styles.heading}>Today</Text>
        {todaySchedule.map((schedule, index) => (
          <View style={styles.contentView} key={index}>
            <Avatar source={require('../assets/doctor1.jpg')} rounded size={40} containerStyle={{ marginLeft: 20 }} />
            <Text style={styles.content}>{schedule.userName}</Text>
            <Text style={styles.content}>{schedule.phone}</Text>
            <Text style={styles.content}>{schedule.slot}</Text>
          </View>
        ))}

        <Text style={[styles.heading, { marginTop: 10 }]}>Tomorrow</Text>
        {tomorrowSchedule.map((schedule, index) => (
          <View style={styles.contentView} key={index}>
            <Avatar source={require('../assets/doctor1.jpg')} rounded size={40} containerStyle={{ marginLeft: 20 }} />
            <Text style={styles.content}>{schedule.userName}</Text>
            <Text style={styles.content}>{schedule.phone}</Text>
            <Text style={styles.content}>{schedule.slot}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
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
      height:100,
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