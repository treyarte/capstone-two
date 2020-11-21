import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native'
import SignedOutStack from './SignedOutStack';
import SignedInStack from './SignedInStack';
import {TokenContext} from '../components/tokenContext'

const AppNavigator = () => {

    const token = useContext(TokenContext);

    return (
        <NavigationContainer>
        {token !== null ? (
            <SignedInStack/>
        ) : (
            <SignedOutStack />
        )}
        </NavigationContainer>
    )
} 

export default AppNavigator;