import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SignedOutStack from './SignedOutStack';
import SignedInStack from './SignedInStack';
import {TokenContext} from '../components/tokenContext'
import DroplistIndex from '../screens/DroplistIndex';

const AppNavigator = () => {

    const [token] = useContext(TokenContext);
    const Tab = createBottomTabNavigator();
    return (
        <NavigationContainer>
        {token !== null ? (
            <>
                <SignedInStack/>
                <Tab.Navigator>
                    <Tab.Screen name='DroplistIndex' component={DroplistIndex}/>
                </Tab.Navigator>
            </>
        ) : (
            <SignedOutStack />
        )}
        </NavigationContainer>
    )
} 

export default AppNavigator;