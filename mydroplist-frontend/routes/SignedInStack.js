import React from 'react';
import DroplistIndex from '../screens/DropListContainer';
import AddDroplistForm from '../screens/AddDroplistForm';
import {createStackNavigator} from '@react-navigation/stack';



const SignedInStack = () => {
    const {Navigator, Screen} = createStackNavigator();

    return (
        <Navigator initialRouteName='DroplistIndex'>
            <Screen name='DroplistIndex' component={DroplistIndex}/>
            <Screen name='AddDroplist' component={AddDroplistForm}/>
        </Navigator>
    )
}

export default SignedInStack;
