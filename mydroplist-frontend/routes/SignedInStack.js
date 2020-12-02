import React from 'react';
import DroplistIndex from '../screens/DroplistIndex';
import AddDroplistForm from '../screens/AddDroplistForm';
import DroplistDetails from '../screens/DroplistDetails';
import EditDroplist from '../screens/EditDroplistForm';
import {createStackNavigator} from '@react-navigation/stack';
import { Button, Icon } from 'native-base';
import {createDrawerNavigator} from '@react-navigation/drawer'
import DrawerContent from '../screens/DrawerContent';
import AddItem from '../screens/AddItem';
import EditItem from '../screens/EditItem';
import SendScreen from '../screens/SendScreen';
import UserSettings from '../screens/UserSettings';

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
            <Screen name='DroplistDetails'  component={DroplistDetails} options={({route}) => ({title: route.params.title})} />
            <Screen name='EditDroplist' component={EditDroplist} options={{title: 'Edit Droplist'}}/>
            <Screen name='AddItem' component={AddItem} options={{title: 'Add Item'}}/>
            <Screen name='EditItem' component={EditItem} options={{title: 'Edit Item'}}/>
            <Screen name='SendDroplist' component={SendScreen} options={{title: 'Send'}}/>
            
        </Navigator>
    )
}


const SignedInStack = () => {
  
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator initialRouteName='Droplists' drawerContent={props => <DrawerContent {...props}  />}>
                <Drawer.Screen name='Home' component={homeStack}/>
                <Drawer.Screen name='AddDroplist' component={AddDroplistForm} options={{title: 'Add Droplist', headerShown: true}}/>
                <Drawer.Screen name='UserSettings' component={UserSettings} options={{title: 'Settings', headerShown: true}}/>
        </Drawer.Navigator>
    )
}

export default SignedInStack;
