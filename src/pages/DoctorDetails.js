import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Linking,
} from 'react-native';
import {Avatar} from '@rneui/base';
import {LocaleConfig} from 'react-native-calendars';
import {Calendar} from 'react-native-calendars';
import firestore from '@react-native-firebase/firestore';

export default function DoctorDetails({route, navigation}) {
  const {item} = route.params;
  const {userD} = route.params;
  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [petName, setPetName] = useState('');
  const [selected, setSelected] = useState('');
  const today = new Date();
  const currentDayString = `${today.getFullYear()}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

  LocaleConfig.locales['fr'] = {
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    monthNamesShort: [
      'Jan.',
      'Feb.',
      'Mar.',
      'Apr.',
      'May',
      'Jun.',
      'Jul.',
      'Aug.',
      'Sep.',
      'Oct.',
      'Nov.',
      'Dec.',
    ],
    dayNames: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    dayNamesShort: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sat', 'Su'],
    today: 'Today',
  };

  LocaleConfig.defaultLocale = 'fr';

  // Implement the checkSlotAvailability function to check slot availability

  const checkSlotAvailability = async (date, timeSlot) => {
    try {
      const bookingRef = firestore()
        .collection('bookings')
        .where('date', '==', date)
        .where('slot', '==', timeSlot);

      const querySnapshot = await bookingRef.get();

      if (!querySnapshot.empty) {
        // A booking with the same date and time slot exists, so it's already booked
        return false;
      } else {
        // No booking found for the selected date and time slot; it's available
        return true;
      }
    } catch (error) {
      console.error('Error checking slot availability:', error);
      // Handle the error as needed
      return false;
    }
  };

  const handleBooking = async () => {
    if (selected && selectedTimeSlot) {
      const isSlotAvailable = checkSlotAvailability(selected, selectedTimeSlot);

      if (isSlotAvailable) {
        try {
          // Add a new booking to Firestore
          await firestore().collection('bookings').add({
            userId: userD.email,
            userName: userD.name,
            petName: petName,
            slot: selectedTimeSlot,
            doctorId: item.doctorId,
            doctorName: item.doctorName,
            date: selected,
            price: item.price,
          });

          // You can also navigate to a success page or show a confirmation message
          navigation.navigate('Success', userD);
        } catch (error) {
          console.error('Error adding booking to Firestore:', error);
        }
      } else {
        // The slot is already booked or not available
        // Display an error message or disable the "Book Appointment" button
      }
    } else {
      // No date or time slot is selected; display an error or prompt the user to select a date and time
    }
  };

  // Load booked slots for the selected date
  const loadBookedSlots = async date => {
    try {
      const bookingRef = firestore()
        .collection('bookings')
        .where('date', '==', date);

      const querySnapshot = await bookingRef.get();
      const bookedSlotsData = [];

      querySnapshot.forEach(doc => {
        bookedSlotsData.push(doc.data().slot);
      });

      setBookedSlots(bookedSlotsData);
    } catch (error) {
      console.error('Error loading booked slots:', error);
    }
  };

  // Function to check if a time slot is available
  const isSlotAvailable = timeSlot => {
    return !bookedSlots.includes(timeSlot);
  };

  // Function to handle the time slot selection
  const handleTimeSlotSelection = timeSlot => {
    setSelectedTimeSlot(timeSlot);
  };

  useEffect(() => {
    if (selected) {
      loadBookedSlots(selected);
    }
  }, [selected]);

  const handleDateSelection = day => {
    setSelected(day.dateString);
  };

  console.log(item.location);

  return (
    <View>
      <ScrollView>
        <View style={{backgroundColor: '#8a7ffe', height: 350}}>
          <Image
            source={require('../assets/doctor.png')}
            style={styles.image}
          />
        </View>

        <View style={styles.container}>
          <View style={styles.row1}>
            <View>
              <Text style={styles.font1}>Dr.{item.doctorName}</Text>
              <Text style={styles.font1}>Veterinary Doctor</Text>
            </View>
            <TouchableOpacity
              style={styles.callbox}
              onPress={() => {
                const phoneNumber = item.phone;
                Linking.openURL(`tel:${phoneNumber}`).catch(error => {
                  console.error('Error opening phone app:', error);
                });
              }}>
              <Avatar source={require('../assets/phone.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.card1}>
            <Avatar
              source={require('../assets/location.png')}
              containerStyle={{marginLeft: 10}}
            />
            <View>
              <TouchableOpacity
                onPress={() => {
                  const {latitude, longitude} = item.location;
                  const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
                  Linking.openURL(url).catch(error => {
                    console.error('Error opening Google Maps:', error);
                  });
                }}>
              <Text style={styles.font2}>Location</Text>
              </TouchableOpacity>
            </View>
            
            <Avatar
              source={require('../assets/price.png')}
              containerStyle={{marginLeft: 10}}
              size={30}
            />
           
            <View>
            <TouchableOpacity>
              <Text style={styles.font2}>Fee</Text>
              <Text style={styles.font2}>₹{item.price}</Text>
              </TouchableOpacity>
            </View>
           
            <Avatar
              source={require('../assets/star.png')}
              containerStyle={{marginLeft: 10}}
            />
            <View>
            <TouchableOpacity onPress={()=>{navigation.navigate('Feedback',{ userD, item })}}>
              <Text style={styles.font2}>Rating</Text>
              <Text style={styles.font2}>{item.averageRating.toFixed(2)}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.heading}>About Veterinary</Text>
          <Text style={styles.para}>
            A veterinarian, also known as a veterinarian surgeon or veterinary
            physician, is a
          </Text>
          <Text style={styles.heading}>Pet Name</Text>
          <TextInput
            placeholder="Enter Pet Name"
            style={styles.input}
            onChangeText={text => setPetName(text)}
          />
          <View style={{marginTop: 30}}>
            <Calendar
              onDayPress={day => {
                setSelected(day.dateString);
              }}
              markedDates={{
                [`2023-09-01/${currentDayString}`]: {
                  backgroundColor: 'yellow',
                  textColor: 'black',
                },
                [selected]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedDotColor: 'orange',
                },
                ...bookedSlots.reduce((acc, slot) => {
                  acc[slot] = {
                    selected: true,
                    marked: true,
                    disableTouchEvent: true,
                    selectedDotColor: 'red',
                  };
                  return acc;
                }, {}),
              }}
              style={{
                borderWidth: 0.2,
                borderRadius: 10,
                borderColor: '#98ff98',
                height: 350,
                width: '95%',
                alignSelf: 'center',
              }}
              theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: '#b6c1cd',
                selectedDayBackgroundColor: '#00adf5',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#00adf5',
                dayTextColor: '#2d4150',
                textDisabledColor: '#d9e',
                arrowColor: 'orange',
              }}
            />
          </View>
          <Text style={styles.heading}>Time</Text>
          <View style={styles.row2}>
            <TouchableOpacity
              style={[
                styles.btn1,
                {
                  backgroundColor:
                    selectedTimeSlot === '09.00-09.30' &&
                    isSlotAvailable('09.00-09.30')
                      ? 'blue'
                      : isSlotAvailable('09.00-09.30')
                      ? '#98ff98'
                      : 'gray',
                },
              ]}
              onPress={() => handleTimeSlotSelection('09.00-09.30')}
              disabled={!isSlotAvailable('09.00-09.30')}>
              <Text
                style={[
                  styles.font3,
                  {
                    color:
                      selectedTimeSlot === '09.00-09.30' &&
                      isSlotAvailable('09.00-09.30')
                        ? 'white'
                        : 'black',
                  },
                ]}>
                09.00-09.30
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.btn1,
                {
                  backgroundColor:
                    selectedTimeSlot === '09.30-10.00' &&
                    isSlotAvailable('09.30-10.00')
                      ? 'blue'
                      : isSlotAvailable('09.30-10.00')
                      ? '#98ff98'
                      : 'gray',
                },
              ]}
              onPress={() => handleTimeSlotSelection('09.30-10.00')}
              disabled={!isSlotAvailable('09.30-10.00')}>
              <Text
                style={[
                  styles.font3,
                  {
                    color:
                      selectedTimeSlot === '09.30-10.00' &&
                      isSlotAvailable('09.30-10.00')
                        ? 'white'
                        : 'black',
                  },
                ]}>
                09.30-10.00
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.btn1,
                {
                  backgroundColor:
                    selectedTimeSlot === '10.00-10.30' &&
                    isSlotAvailable('10.00-10.30')
                      ? 'blue'
                      : isSlotAvailable('10.00-10.30')
                      ? '#98ff98'
                      : 'gray',
                },
              ]}
              onPress={() => handleTimeSlotSelection('10.00-10.30')}
              disabled={!isSlotAvailable('10.00-10.30')}>
              <Text
                style={[
                  styles.font3,
                  {
                    color:
                      selectedTimeSlot === '10.00-10.30' &&
                      isSlotAvailable('10.00-10.30')
                        ? 'white'
                        : 'black',
                  },
                ]}>
                10.00-10.30
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.btn1,
                {
                  backgroundColor:
                    selectedTimeSlot === '10.30-11.00' &&
                    isSlotAvailable('10.30-11.00')
                      ? 'blue'
                      : isSlotAvailable('10.30-11.00')
                      ? '#98ff98'
                      : 'gray',
                },
              ]}
              onPress={() => handleTimeSlotSelection('10.30-11.00')}
              disabled={!isSlotAvailable('10.30-11.00')}>
              <Text
                style={[
                  styles.font3,
                  {
                    color:
                      selectedTimeSlot === '10.30-11.00' &&
                      isSlotAvailable('10.30-11.00')
                        ? 'white'
                        : 'black',
                  },
                ]}>
                10.30-11.00
              </Text>
            </TouchableOpacity>
          </View>

          {/* Repeat the pattern for other time slots */}
          <View style={styles.row2}>
            <TouchableOpacity
              style={[
                styles.btn1,
                {
                  backgroundColor:
                    selectedTimeSlot === '11.00-11.30' &&
                    isSlotAvailable('11.00-11.30')
                      ? 'blue'
                      : isSlotAvailable('11.00-11.30')
                      ? '#98ff98'
                      : 'gray',
                },
              ]}
              onPress={() => handleTimeSlotSelection('11.00-11.30')}
              disabled={!isSlotAvailable('11.00-11.30')}>
              <Text
                style={[
                  styles.font3,
                  {
                    color:
                      selectedTimeSlot === '11.00-11.30' &&
                      isSlotAvailable('11.00-11.30')
                        ? 'white'
                        : 'black',
                  },
                ]}>
                11.00-11.30
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.btn1,
                {
                  backgroundColor:
                    selectedTimeSlot === '11.30-12.00' &&
                    isSlotAvailable('11.30-12.00')
                      ? 'blue'
                      : isSlotAvailable('11.30-12.00')
                      ? '#98ff98'
                      : 'gray',
                },
              ]}
              onPress={() => handleTimeSlotSelection('11.30-12.00')}
              disabled={!isSlotAvailable('11.30-12.00')}>
              <Text
                style={[
                  styles.font3,
                  {
                    color:
                      selectedTimeSlot === '11.30-12.00' &&
                      isSlotAvailable('11.30-12.00')
                        ? 'white'
                        : 'black',
                  },
                ]}>
                11.30-12.00
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.btn1,
                {
                  backgroundColor:
                    selectedTimeSlot === '14.00-14.30' &&
                    isSlotAvailable('14.00-14.30')
                      ? 'blue'
                      : isSlotAvailable('14.00-14.30')
                      ? '#98ff98'
                      : 'gray',
                },
              ]}
              onPress={() => handleTimeSlotSelection('14.00-14.30')}
              disabled={!isSlotAvailable('14.00-14.30')}>
              <Text
                style={[
                  styles.font3,
                  {
                    color:
                      selectedTimeSlot === '14.00-14.30' &&
                      isSlotAvailable('14.00-14.30')
                        ? 'white'
                        : 'black',
                  },
                ]}>
                14.00-14.30
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.btn1,
                {
                  backgroundColor:
                    selectedTimeSlot === '14.30-15.00' &&
                    isSlotAvailable('14.30-15.00')
                      ? 'blue'
                      : isSlotAvailable('14.30-15.00')
                      ? '#98ff98'
                      : 'gray',
                },
              ]}
              onPress={() => handleTimeSlotSelection('14.30-15.00')}
              disabled={!isSlotAvailable('14.30-15.00')}>
              <Text
                style={[
                  styles.font3,
                  {
                    color:
                      selectedTimeSlot === '14.30-15.00' &&
                      isSlotAvailable('14.30-15.00')
                        ? 'white'
                        : 'black',
                  },
                ]}>
                14.30-15.00
              </Text>
            </TouchableOpacity>
          </View>
          {/*  */}

          <TouchableOpacity style={styles.btn2} onPress={handleBooking}>
            <Text style={{textAlign: 'center', fontSize: 20, color: 'white'}}>
              Book Appointment
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 300,
    alignSelf: 'center',
  },
  container: {
    width: '100%',
    backgroundColor: 'white',
    height: '100%',
    borderTopLeftRadius: 70,
    marginTop: -60,
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    padding: 20,
    justifyContent: 'space-between',
  },
  font1: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
  callbox: {
    width: 50,
    height: 50,
    backgroundColor: '#8a7ffe',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  card1: {
    width: '95%',
    height: 50,
    borderWidth: 0.5,
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent:'space-around'
  },
  font2: {
    color: '#5068BE',
    marginLeft: 5,
    marginRight: 30,
  },
  heading: {
    padding: 10,
    marginTop: 10,
    fontSize: 25,
    color: 'black',
  },
  para: {
    textAlign: 'justify',
    marginLeft: 10,
    marginRight: 20,
    fontSize: 18,
    color: 'gray',
  },
  input: {
    borderWidth: 1,
    width: '95%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  btn1: {
    height: 40,
    width: 90,
    backgroundColor: '#e4e9f9',
    justifyContent: 'center',
    borderRadius: 10,
  },
  font3: {
    textAlign: 'center',
    color: '#5068BE',
  },
  btn2: {
    width: '95%',
    height: 50,
    backgroundColor: '#8a7ffe',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
});
