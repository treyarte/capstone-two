import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import {useFonts} from 'expo-font';
import {Ionicons} from '@expo/vector-icons'
import {Container, Header, Content, Footer, FooterTab, Icon, Button, Text} from 'native-base'
import DropListContainer from './screens/DropListContainer';
import Home from './screens/Home';
import AddDroplistForm from './screens/AddDroplistForm';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'



export default function App() {

  const [department, setDepartment] = useState({selected: 1});

  const Stack = createStackNavigator();

  const [loaded] = useFonts({
    Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
  });

  if(!loaded){
    return null;
  }

  return (
   <NavigationContainer>
     <Stack.Navigator initialRouteName="Home">
       <Stack.Screen name="Home" component={Home} options={{title: 'My DropList'}}/>
       <Stack.Screen name="Droplists" component={DropListContainer} />
       <Stack.Screen name="AddDroplist" component={AddDroplistForm} options={{title: 'Create Droplist'}}/>
     </Stack.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});