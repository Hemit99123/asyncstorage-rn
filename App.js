import * as React from 'react';
import { useState, useEffect } from 'react';
import moment from 'moment';
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RadioGroup,{Radio} from "react-native-radio-input";
 
export default function App() {
  let now = moment().format('MMM Do YYYY, h:mm a');
 
  const [status, setStatus] = useState('');
  const [load, setLoad] = useState('');

  const setData = (value) => {
    setStatus(value)
  }
 
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
 
  const storeData = async () => {
    try {
      await AsyncStorage.setItem('results', status);
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
      setStatus('')
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
      <Text>Press on the apporiate option!</Text>
      <Text>
        Also make sure to press Save or else the results will not come!
      </Text>
      <Text> </Text>
      <Text>Check the correct box!</Text>
      <RadioGroup getChecked={setData}>
        <Radio iconName={"lens"} label={"I have at least 1 of these symptoms"} value={"you fail " + now}/>
        <Radio iconName={"lens"} label={"I have no symptoms"} value={"you pass " + now}/>
    </RadioGroup>
      <Text> </Text>
      <Text> </Text>
      <Button title="Enter" onPress={storeData}></Button>
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
 
