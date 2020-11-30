import React, {useEffect, useMemo, useState} from 'react';
import { StyleSheet, View } from 'react-native';
import {useFonts} from 'expo-font';
import {Ionicons} from '@expo/vector-icons'
import AppNavigator from './routes/AppNavigator';
import {AppLoading} from 'expo';
import {AuthContext} from './components/context';
import {TokenContext} from './components/tokenContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storeToken from './helpers/storeToken';

const STORAGE_KEY = 'mydroplist_token'

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);

  const authContext = useMemo(() => ({
    signIn: async (t) => {
      try {
        
        setIsLoading(false);
        
        await storeToken(t);
        
        setToken(t);
      
      } catch (error) {
        console.error(error);
      }
    },
    signUp: async (t) => {
      try {
        
        setIsLoading(false);

        await storeToken(t)

        setToken(t);
      } catch (error) {
        console.error(error);
      }
    },
    signOut: async () => {
      try {
        setIsLoading(false);
        setToken(null);
        await AsyncStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        console.error(error);
      }
    },
  }), []);




  useEffect(() => {
    ( async () => {
      try {
        const token = await AsyncStorage.getItem(STORAGE_KEY);
        if(!token){
          setToken(null);
        } else {
          setToken(JSON.parse(token).token);
        }
      } catch (error) {
        console.error(error);
        setToken(null);
      }
      setIsLoading(true);
    })()
  
    setIsLoading(false);
  }, [])

  const [loaded] = useFonts({
    Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
  });


  return (
    <>
      { !loaded ? (<AppLoading/>) : (
      <AuthContext.Provider value={authContext}>
        <TokenContext.Provider value={token}>
          <AppNavigator token={token}/>
        </TokenContext.Provider>
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
