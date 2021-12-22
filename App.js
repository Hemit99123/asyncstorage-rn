import * as React from 'react';
import { useState, useEffect } from 'react';
import moment from 'moment';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert
} from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

var title = 'COVID19 CHECKER'
 
export default function App() {
  let now = moment().format('MMM Do YYYY, h:mm a')
  var msg = 'Nothing saved in this session '
  var now2 = moment().format('LT');  
  var pass = 'you pass! ' + now
  var fail = 'you failed ' + now

  const [load, setLoad] = useState('No results have been found');
  const [now_, setNow_] = useState(msg);

  const getData = async () => {
    try {
      var value = await AsyncStorage.getItem('results');
      if (value !== null) {
        setLoad(value);
      }
    } catch (e) {
      console.log(e);
    }
  };
 
  const storeData_pass = async () => {
    try {
      await AsyncStorage.setItem('results', pass);
      let now = 'saved at ' + now2
      Alert.alert(
        title,
        now
      )
      setNow_('Last time ' + now + ' in this session.')
      getData()
    } catch (e) {
      console.log(e);
    }
  };

  const storeData_fail = async () => {

    try {
      await AsyncStorage.setItem('results', fail);
      let now = 'saved at ' + now2
     Alert.alert(
       title,
       now
     )
      setNow_('Last time ' + now + ' in this session.')
      getData()
    } catch (e) {
      console.log(e);
    }

  };
  
  useEffect(() => {
    getData();
  });
 
  const deleteData = async () => {
    try {
      if (load === 'No results have been found') {
        alert('error, nothing to reset')
      } else {
          await AsyncStorage.removeItem('results');
          setLoad('No results have been found')
          setNow_(msg)
          alert('deleted data');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const deleteAlert = () => {
        Alert.alert(
      title,
      "Are you sure you want to reset all data?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: deleteData }
      ]
        )
  }
  return (
    <View style={styles.container}>
      <Text>COVID-19 SYMPTOMS</Text>
      <Text> </Text>
      <Text>cough</Text>
      <Text>dry throat </Text>
      <Text>difficulty breathing</Text>
      <Text></Text>
      <Text> </Text>
      <Button style={styles.appButtonContainer} title="I don't have any of these symptoms" onPress={storeData_pass}></Button>
      <Button style={styles.appButtonContainer}title="I do have at least one of these symptoms" onPress={storeData_fail}></Button>
      <Text> </Text>
      <Button title="Reset logs!" onPress={deleteAlert}></Button>
 
      <Text>{load}</Text>
      <Text> </Text>
      <Text>Saved logs:</Text>
      <Text> </Text>
      <Text>{now_}</Text>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,

  },
});
 
