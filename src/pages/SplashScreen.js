import { View, Text,Image } from 'react-native'
import React,{useEffect} from 'react'

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Login");
    }, 2000); // Delay of 1 second

    return () => clearTimeout(timer);
  }, []);
  return (
    <View style={ {flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
    }}>
       <Image source={require('../assets/petcare1.png')} style={{
        width: 200,
        height: 200,
        resizeMode: 'contain',
      }} />
    </View>
  )
}

export default SplashScreen