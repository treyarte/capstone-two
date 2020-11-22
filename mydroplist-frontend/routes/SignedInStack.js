import React from 'react';
import DroplistIndex from '../screens/DroplistIndex';
import AddDroplistForm from '../screens/AddDroplistForm';
import {createStackNavigator} from '@react-navigation/stack';
import { Button, Icon } from 'native-base';
import {createDrawerNavigator} from '@react-navigation/drawer'
import DrawerContent from '../screens/DrawerContent';


function homeStack ({navigation}) {
    const {Navigator, Screen} = createStackNavigator();
    return (
        <Navigator initialRouteName='DroplistIndex' >
            <Screen name='DroplistIndex' component={DroplistIndex} options={{
                headerLeft: () => (
                    <Button transparent onPress={() => navigation.openDrawer()}>
                        <Icon style={{color: '#000000'}} name='md-menu'/>
                    </Button>
                )
            }}/>
            
        </Navigator>
    )
}


const SignedInStack = () => {
  
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator initialRouteName='Droplists' drawerContent={props => <DrawerContent {...props} />}>
                <Drawer.Screen name='Home' component={homeStack}/>
                <Drawer.Screen name='AddDroplist' component={AddDroplistForm} options={{title: 'Add Droplist', headerShown: true}}/>
        </Drawer.Navigator>
    )
}

export default SignedInStack;
