import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useMemo, useState} from 'react';
import { StyleSheet, View } from 'react-native';
import {useFonts} from 'expo-font';
import {Ionicons} from '@expo/vector-icons'
import AppNavigator from './routes/AppNavigator';
import {AppLoading} from 'expo';
import {AuthContext} from './components/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'mydroplist_token'

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);

  const authContext = useMemo(() => ({
    signIn: async (token) => {
      try {
        const jsonToken = JSON.stringify({token});
        setIsLoading(false);
        setToken(token);
        await AsyncStorage.setItem(STORAGE_KEY, jsonToken);
      } catch (error) {
        console.error(error);
      }
    },
    signUp: async (token) => {
      try {
        const jsonToken = JSON.stringify({token});
        setIsLoading(false);
        setToken(token);
        await AsyncStorage.setItem(STORAGE_KEY, jsonToken);
      } catch (error) {
        console.error(error);
      }
    },
    signOut: async () => {
      try {
        setIsLoading(false);
        setToken(token);
        await AsyncStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        console.error(error);
      }
    }
  }), []);

  useEffect(() => {
    async function getStorageToken(){
      try {
        const token = await AsyncStorage.getItem(STORAGE_KEY);
        setToken(token);
      } catch (error) {
        setToken(null);
      }
      setIsLoading(true);
    }
    setIsLoading(false);
    getStorageToken();
  }, [token])

  const handleToken = (t) =>{
    setToken(t);
  }

  const [loaded] = useFonts({
    Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
  });


  return (
    <>
      { !loaded ? (<AppLoading/>) : (
      <AuthContext.Provider value={authContext}>
          <AppNavigator token={token}/>
        </AuthContext.Provider>
        )
      }
    </>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
