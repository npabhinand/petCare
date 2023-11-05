import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';

const AddDetails = ({ route, navigation }) => {
  const userD = route.params;
  const [hospitalName, setHospitalName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        const hospitalRef = firestore()
        .collection('hospital')
        .where('doctorId', '==', userD.email);

        const hospitalQuery = await hospitalRef.get();

        if (!hospitalQuery.empty) {
          const hospitalDoc = hospitalQuery.docs[0];
          const hospitalData = hospitalDoc.data();
          setHospitalName(hospitalData.HospitalName || '');
          setLocation(hospitalData.location || '');
          setPrice(hospitalData.price || '');
          setImageURL(hospitalData.image || '');
        } else {
          console.warn('Hospital not found');
        }
      } catch (error) {
        console.error('Error fetching hospital data:', error);
      }
    };

    fetchHospitalData();
  }, []);

  const handleImageSelection = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((image) => {
        setSelectedImage(image);
        uploadImageToFirebaseStorage(image.path);
      })
      .catch((error) => {
        console.log('ImagePicker Error: ', error);
      });
  };

  const uploadImageToFirebaseStorage = async (imagePath) => {
    const imageRef = storage().ref(`hospital_images/${hospitalName}`);
    try {
      await imageRef.putFile(imagePath);
      const imageUrl = await imageRef.getDownloadURL();
      setImageURL(imageUrl);
      ToastAndroid.show('Image uploaded successfully', ToastAndroid.SHORT);
    } catch (error) {
      console.error(error.message);
    }
  };

  const onSubmit = async () => {
    const hospitalData = {
      HospitalName: hospitalName,
      price: price,
      location: location,
      doctorName: userD.name,
      doctorId: userD.email,
      image: imageURL,
    };

    try {
      const hospitalRef = firestore()
        .collection('hospital')
        .where('doctorId', '==', userD.email);

      const hospitalQuery = await hospitalRef.get();

      if (!hospitalQuery.empty) {
        const hospitalDoc = hospitalQuery.docs[0];
        await hospitalDoc.ref.update(hospitalData);
        ToastAndroid.show('Hospital data updated successfully', ToastAndroid.SHORT);
      } else {
        await firestore().collection('hospital').add(hospitalData);
        ToastAndroid.show('Hospital data added successfully', ToastAndroid.SHORT);
      }

      navigation.navigate('DoctorHome', { userD });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View style={{ marginBottom: 100 }}>
      <View style={styles.mainheadingview}>
        <Text style={styles.mainheading}>Add Details</Text>
      </View>
      <Text style={styles.mainheading}>Enter Details of Hospital</Text>
      <TextInput
        value={hospitalName}
        onChangeText={setHospitalName}
        style={styles.inputs}
        placeholder="Enter Hospital name"
        placeholderTextColor="black"
      />
      <TextInput
        value={location}
        onChangeText={setLocation}
        style={styles.inputs}
        placeholder="Enter Location"
        placeholderTextColor="black"
      />
      <TextInput
        value={price}
        onChangeText={setPrice}
        style={styles.inputs}
        placeholder="Enter the price for consultation"
        placeholderTextColor="black"
      />

      <Text style={styles.heading}>Upload Photo of Hospital</Text>
      <TouchableOpacity style={styles.add} onPress={handleImageSelection}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage.path }} style={{ width: 100, height: 100 }} />
        ) : (
          <>
            <Image source={require('../assets/plus.png')} style={{ width: 50, height: 50 }} />
            <Text style={{ color: 'black', fontSize: 18 }}>Upload</Text>
          </>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={onSubmit} style={styles.btn2}>
        <Text style={styles.btnText}>Submit Details</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddDetails;

const styles = StyleSheet.create({
  mainheadingview: {
    height: 70,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  mainheading: {
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  inputs: {
    color: 'black',
    padding: 10,
    marginTop: 5,
    borderWidth: 1,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  btn2: {
    width: '95%',
    height: 50,
    marginTop: 20,
    backgroundColor: 'black',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  heading: {
    color: 'black',
    marginTop: 30,
    fontSize: 18,
    alignSelf: 'center',
  },
  add: {
    height: 100,
    width: 100,
    borderWidth: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 10,
    borderColor: '#466A8F',
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
  },
});
