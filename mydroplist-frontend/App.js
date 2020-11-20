import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useMemo, useState} from 'react';
import { StyleSheet, View } from 'react-native';
import {useFonts} from 'expo-font';
import {Ionicons} from '@expo/vector-icons'
import AppNavigator from './routes/AppNavigator';
import {AppLoading} from 'expo';
import {AuthContext} from './components/context';


export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);

  const authContext = useMemo(() => ({
    signIn: () => {
      setIsLoading(false);
      setToken('nnnn');
    },
    signUp: () => {
      setIsLoading(false);
      setToken('nnnn');
    },
    signOut: () => {
      setIsLoading(false);
      setToken(null);
    }
  }), []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000)
  }, [])

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
