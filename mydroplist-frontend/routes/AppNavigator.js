import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import SignedOutStack from './SignedOutStack';
import SignedInStack from './SignedInStack';


const AppNavigator = ({token}) => {

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