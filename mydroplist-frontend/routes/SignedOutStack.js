import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LandingPage from '../screens/LandingPage'
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';

const SignedOutStack = () => {
    const {Navigator, Screen} = createStackNavigator();

    return (
        <Navigator initialRouteName='LandingPage'>
            <Screen name='LandingPage' component={LandingPage} options={{title: 'Landing Page', headerShown: false}} />
            <Screen name='Login' component={Login} options={{title: 'Login'}}/>
            <Screen name='SignUp' component={SignUp} options={{title: 'Sign Up'}}/>
        </Navigator>
    )
}

export default SignedOutStack;