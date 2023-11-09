import { View, Text ,Image,TouchableOpacity,StyleSheet} from 'react-native'
import React from 'react'
import { color } from '@rneui/base'

export default function Success({route,navigation}) {
    const userD=route.params
  return (
    <View style={styles.container}>
      <Image source={require('../assets/success.png')}/>
      <Text style={styles.heading}>Your appointment successfully booked</Text>
      <TouchableOpacity onPress={()=>{navigation.navigate('UserHome',{userD})}} 
      style={styles.btn}><Text style={{color:'black'}}>Go To Home</Text></TouchableOpacity>
    </View>
  )
}

const styles=StyleSheet.create({
    heading:{
        fontSize:20,
        color:'black',
        textAlign:'center'
    },
    container:{
        justifyContent:'center',
        alignItems:'center',
        flex:1
    },
    btn:{
        marginTop:10,
        borderWidth:1,
        height:40,
        width:100,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10

    }
})