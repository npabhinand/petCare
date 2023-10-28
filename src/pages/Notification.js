import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'
import { Avatar } from '@rneui/base'

const Notification = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Avatar source={require('../assets/doctor1.jpg')} rounded size={50} containerStyle={styles.profileIcon}
      onPress={()=>{navigation.navigate('Profile')}}>
      </Avatar>
      <Text style={styles.heading} >Notifications</Text>
      <View style={styles.cards}>

        <View style={styles.contentView}>
          <Avatar source={require('../assets/doctor1.jpg')} rounded size={40}></Avatar>
        <Text style={styles.content}>Appointment successfully completed at the ABC hospital at 09.00-09.30 on May 29, 2023</Text>
        </View> 
        {/*  */}
        <View style={styles.contentView}>
          <Avatar source={require('../assets/doctor1.jpg')} rounded size={40}></Avatar>
        <Text style={styles.content}>Appointment successfully completed at the ABC hospital at 09.00-09.30 on May 29, 2023</Text>
        </View> 
        <View style={styles.contentView}>
          <Avatar source={require('../assets/doctor1.jpg')} rounded size={40}></Avatar>
        <Text style={styles.content}>Appointment successfully completed at the ABC hospital at 09.00-09.30 on May 29, 2023</Text>
        </View> 
         {/*  */}
      </View>
    </View>
  )
}

export default Notification

const styles=StyleSheet.create({
  container:{
    backgroundColor:'#E6F3EA',
    flex:1
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
    height:'100%',
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