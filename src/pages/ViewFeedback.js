import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from '@rneui/base';
import firestore from '@react-native-firebase/firestore';
import { Rating } from 'react-native-ratings';

export default function ViewFeedback({ navigation, route }) {
  const userD = route.params;
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const hospitalRef = firestore()
          .collection('hospital')
          .where('doctorId', '==', userD.email);
        const hospitalQuery = await hospitalRef.get();

        if (!hospitalQuery.empty) {
          // Assuming there's only one hospital per doctor
          const hospitalDoc = hospitalQuery.docs[0];
          const hospitalData = hospitalDoc.data();
          const HospitalName = hospitalData.HospitalName; // Retrieve the hospital name

          const feedbackRef = firestore()
            .collection('feedback')
            .where('HospitalName', '==', HospitalName);
          const feedbackQuery = await feedbackRef.get();

          if (!feedbackQuery.empty) {
            const feedbacks = feedbackQuery.docs.map((doc) => doc.data());
            setFeedbackData(feedbacks);
          } else {
            console.warn('No feedback found for the hospital');
          }
        } else {
          console.warn('No hospital found for the doctor');
        }
      } catch (error) {
        console.error('Error fetching feedback data:', error);
      }
    };

    fetchFeedbackData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mainHeadingView}>
        <Text style={styles.mainHeading}>View Feedback</Text>
      </View>
      <ScrollView>
        {feedbackData.map((feedback, index) => (
          <Card containerStyle={styles.card} key={index}>
            <Text style={styles.heading}>Hospital: {feedback.hospitalName}</Text>
            <Rating
              type="star"
              ratingCount={5}
              imageSize={30}
              ratingColor="#3498db"
              ratingBackgroundColor="#c8c7c8"
              readonly
              startingValue={feedback.rating} // Use the "rating" value from your data
            />
            <Text style={styles.feedbackText}>{feedback.feedback}</Text>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainHeadingView: {
    height: 70,
    width: '100%',
    backgroundColor: '#3498db',
    justifyContent: 'center',
  },
  mainHeading: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  card: {
    borderRadius: 20,
    margin: 10,
    padding: 10,
  },
  heading: {
    fontSize: 20,
    color: 'black',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: '600',
  },
  feedbackText: {
    color: 'black',
    textAlign: 'justify',
    marginTop: 10,
  },
});
