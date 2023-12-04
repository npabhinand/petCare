import { View, Text ,StyleSheet, ScrollView} from 'react-native'
import React,{useState,useEffect} from 'react'
import { Avatar } from '@rneui/base';
import firestore from '@react-native-firebase/firestore';

const Notification = ({navigation,route}) => {
  const userD=route.params
  const [bookingData, setBookingData] = useState([]);
  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const doctorBookingRef = firestore().collection('bookings').where('doctorId', '==', userD.email);
        const userBookingRef = firestore().collection('bookings').where('userId', '==', userD.email);
  
        const doctorBookingQuery = await doctorBookingRef.get();
        const userBookingQuery = await userBookingRef.get();
  
        if (!doctorBookingQuery.empty || !userBookingQuery.empty) {
          const bookings = [];
  
          doctorBookingQuery.forEach(documentSnapshot => {
            bookings.push(documentSnapshot.data());
          });
  
          userBookingQuery.forEach(documentSnapshot => {
            bookings.push(documentSnapshot.data());
          });
  
          setBookingData(bookings);
        } else {
          console.log('Bookings not found');
        }
      } catch (error) {
        console.error('Error fetching booking data:', error);
      }
    };
  
    fetchBookingData();
  }, []);
  return (
    <View style={styles.container}>
      <Avatar source={require('../assets/doctor1.jpg')} rounded size={50} containerStyle={styles.profileIcon}
      onPress={()=>{navigation.navigate('Profile',userD)}}>
      </Avatar>
      <Text style={styles.heading} >Notifications</Text>
      <ScrollView>
      <View style={styles.cards}>
        
      {bookingData.map((booking, index) => (
        <View style={styles.contentView} key={index}>
          <Avatar source={require('../assets/doctor1.jpg')} rounded size={40}></Avatar>
        <Text style={styles.content}>Appointment successfully completed  at {booking.slot} on {booking.date}</Text>
        </View> 
         ))}         
      </View>
      </ScrollView>
    </View>
  )
}

export default Notification

const styles=StyleSheet.create({
  container:{
    backgroundColor:'#E6F3EA',
    flex:1,
  },
  profileIcon:{
    alignSelf:'flex-end',
    margin:20
  },
  heading:{
    fontSize:30,
    color:'black',
    fontWeight:'700',
    marginLeft:20
  },
  cards:{
    width:'95%',
    height:1000,
    backgroundColor:'white',
    alignSelf:'flex-end',
    marginTop:10,
    borderTopLeftRadius:30
  },
  contentView:{
    marginTop:30,
    marginLeft:20,
    marginRight:10,
    flexDirection:'row',
    alignItems:'center',
    borderBottomWidth:.5,
    borderBottomColor:'gray',
    height:80,
    width:350
  },
  content:{
    color:'black',
    fontSize:16 ,
    marginLeft:10,
    marginRight:20,
    textAlign:'justify'
  },
})