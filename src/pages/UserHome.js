import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Avatar, Card} from '@rneui/base';
import firestore from '@react-native-firebase/firestore';



export default function UserHome({navigation, route}) {
  const userD = route.params;
  const [hospitalData, setHospitalData] = useState([]);

  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        const hospitalRef = firestore().collection('hospital').limit(5);

        const hospitalQuery = await hospitalRef.get();

        if (!hospitalQuery.empty) {
          const hospitals = [];
          hospitalQuery.forEach(documentSnapshot => {
            hospitals.push(documentSnapshot.data());
          });
          setHospitalData(hospitals);
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


        <TouchableOpacity>
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
        <TouchableOpacity>
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
                    {item.price}
                  </Text>
                  {/* <Text style={styles.font4}>{item.location}</Text> */}
                  <View style={styles.row}>
                    <Text style={styles.font3}>{item.doctorRating} </Text>
                    <Text>star</Text>
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
