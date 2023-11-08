import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Avatar, Card} from '@rneui/base';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

function calculateDistance(lat1, lon1, lat2, lon2) {
  const radlat1 = (Math.PI * lat1) / 180;
  const radlat2 = (Math.PI * lat2) / 180;
  const theta = lon1 - lon2;
  const radtheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515; // distance in miles
  dist = dist * 1.609344; // distance in kilometers
  return dist;
}

export default function UserHome({navigation, route}) {
  const userD = route.params;
  const [hospitalData, setHospitalData] = useState([]);


  async function getAverageRating(hospitalName) {
    try {
      const feedbackRef = firestore().collection('feedback');
      const querySnapshot = await feedbackRef.where('hospitalName', '==', hospitalName).get();
  
      let totalRating = 0;
      let totalFeedbackCount = 0;
  
      querySnapshot.forEach((doc) => {
        const feedback = doc.data();
        totalRating += feedback.rating;
        totalFeedbackCount++;
      });
  
      if (totalFeedbackCount === 0) {
        return 0; // No feedback found, return a default value
      }
  
      const averageRating = totalRating / totalFeedbackCount;
      return averageRating;
    } catch (error) {
      console.error('Error fetching average rating:', error);
      return 0; // Return a default value in case of an error
    }
  }

  
  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        const hospitalRef = firestore().collection('hospital').limit(5);
        const hospitalQuery = await hospitalRef.get();
  
        if (!hospitalQuery.empty) {
          const hospitals = [];
          const userLocation = JSON.parse(
            await AsyncStorage.getItem('userLocation')
          ); // Retrieve user location from AsyncStorage
  
          // Create an array of promises to fetch average ratings for all hospitals
          const fetchAverageRatingsPromises = hospitalQuery.docs.map(async (documentSnapshot) => {
            const hospital = documentSnapshot.data();
            const distance = calculateDistance(
              userLocation.latitude,
              userLocation.longitude,
              hospital.location.latitude,
              hospital.location.longitude
            );
            hospital.distance = distance;
  
            const averageRating = await getAverageRating(hospital.HospitalName);
            hospital.averageRating = averageRating;
  
            return hospital;
          });
  
          const hospitalsWithRatings = await Promise.all(fetchAverageRatingsPromises);
          setHospitalData(hospitalsWithRatings);
        } else {
          console.warn('Hospitals not found');
        }
      } catch (error) {
        console.error('Error fetching hospital data:', error);
      }
    };
  
    fetchHospitalData();
  }, []);
  

  return (
    <View style={styles.container}>
      <View style={styles.row1}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile', userD);
          }}>
          <Avatar source={require('../assets/profile.png')} />
        </TouchableOpacity>

        <Text style={styles.heading}>{userD.name}</Text>

        <TouchableOpacity onPress={()=>{navigation.navigate('Notification',userD)}}>
          <Avatar source={require('../assets/bell.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.card1}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'column', margin: 30}}>
            <Text style={styles.font1}>Find Your best </Text>
            <Text style={styles.font1}>pet Clinic</Text>
            <TouchableOpacity style={styles.btn1}>
              <Text style={styles.font2}>Community</Text>
            </TouchableOpacity>
          </View>
          <Image source={require('../assets/pet1.png')} style={styles.image} />
        </View>
      </View>
      <View style={[styles.row1, {marginTop: 10, marginBottom: -10}]}>
        <Text style={styles.font3}>Nearby Veterinary</Text>
        <TouchableOpacity onPress={()=>{navigation.navigate('DoctorList',userD)}}>
          <Text style={[styles.font3, {color: '#bfbfbf'}]}>See All</Text>
        </TouchableOpacity>
      </View>
     
      <FlatList
        data={hospitalData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <Card containerStyle={styles.card}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('DoctorDetails', {userD, item});
              }}>
              <View style={styles.row}>
                {item.image ? (
                  <Image
                    source={{uri: item.image}}
                    style={{width: 100, height: 100, borderRadius: 10}}
                    defaultSource={require('../assets/doctor.png')} // Specify the path to your alternate image
                  />
                ) : (
                  <Image
                    source={require('../assets/doctor.png')}
                    style={{width: 100, height: 100, borderRadius: 10}}
                  />
                )}
                <View
                  style={{
                    flexDirection: 'column',
                    marginTop: -10,
                    marginLeft: 20,
                  }}>
                  <Text style={styles.font3}>Dr.{item.doctorName}</Text>
                  <Text style={[styles.font4, {marginTop: 5}]}>
                   {item.HospitalName}
                  </Text>
                  <View style={styles.row}>
                  <Avatar source={require('../assets/location.png')} containerStyle={{marginLeft:-5}} size={25}/>
                  <Text style={styles.font4}>{item.distance.toFixed(2)} km</Text>
                  </View>
                  <View style={styles.row}>
                  <Avatar source={require('../assets/star.png')} containerStyle={{marginLeft:-5}} size={25}/>
                  <Text style={styles.font4}>Rating: {item.averageRating.toFixed(2)}</Text>
              {/* Display the average rating here */}
                    
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </Card>
        )}
      />
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
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
  },
  card1: {
    backgroundColor: '#8a7ffe',
    width: '95%',
    alignSelf: 'center',
    height: 200,
    borderRadius: 20,
  },
  font1: {
    fontSize: 25,
    fontWeight: '600',
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
  font3: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },
  font4: {
    color: 'gray',
    fontSize: 18,
    fontWeight: '600',
  },
  card: {
    borderRadius: 20,
    alignSelf: 'center',
    width: '95%',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 140,
    height: 175,
    marginTop: 10,
    marginRight: 10,
  },
});
