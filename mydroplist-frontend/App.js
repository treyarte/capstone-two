import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import {useFonts} from 'expo-font';
import {Ionicons} from '@expo/vector-icons'
import AppNavigator from './routes/AppNavigator';
import {AppLoading} from 'expo'



export default function App() {

  const [token, setToken] = useState(null);

  const handleToken = (t) =>{
    setToken(t);
  }

  const [loaded] = useFonts({
    Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
  });


  return !loaded ? <AppLoading/> : <AppNavigator token={token} handleToken={handleToken}/>

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
