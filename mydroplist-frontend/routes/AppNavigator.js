import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import SignedOutStack from './SignedOutStack';
import SignedInStack from './SignedInStack';

const AppNavigator = ({token, handleToken}) => {
    
    return (
        <NavigationContainer>
        {token !== null ? (
            <SignedInStack/>
        ) : (
            <SignedOutStack handleToken={handleToken}/>
        )}
        </NavigationContainer>
    )
}

export default AppNavigator;