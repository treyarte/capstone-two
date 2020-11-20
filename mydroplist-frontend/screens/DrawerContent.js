import React, {useContext} from 'react';
import {Button, Text, Icon} from 'native-base'
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer'
import {AuthContext} from '../components/context'

const DrawerContent = (props) => {
    const {signOut} = useContext(AuthContext);

    const handleSignOut = () => {
        signOut();
    }

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props}/>
            <DrawerItem
                label='Logout'
                onPress={handleSignOut}
            />
        </DrawerContentScrollView>
    )

}

export default DrawerContent;