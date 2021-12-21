import * as React from 'react';
import { useState, useEffect } from 'react';
import moment from 'moment';
import {
  Text,
  View,
  StyleSheet,
  Button,
} from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';


 
export default function App() {
  var pass = 'you pass! ' + moment().format('MMM Do YYYY, h:mm a')
  var fail = 'you failed ' + moment().format('MMM Do YYYY, h:mm a')
  const [load, setLoad] = useState('');

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
      alert('saved');
      getData()
    } catch (e) {
      console.log(e);
    }
  };

  const storeData_fail = async () => {

    try {
      await AsyncStorage.setItem('results', fail);
      alert('saved');
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
      if (load != null) {
      var value = await AsyncStorage.removeItem('results');
      setLoad(value)
      alert('deleted data');
      } else {
        alert('error, there is nothing to reset.')
      }
    } catch (e) {
      console.log(e);
    }
  };
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
      <Button title="Reset results!" onPress={deleteData}></Button>
 
      <Text>{load}</Text>
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
 
