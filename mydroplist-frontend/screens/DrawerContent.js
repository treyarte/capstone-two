import React, {useContext} from 'react';
import {Button, Text, Icon, View, Card, CardItem, Body} from 'native-base'
import {StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer'
import {AuthContext} from '../components/context';
import {TokenContext} from '../components/tokenContext';
import jwt_decode from 'jwt-decode';

const DrawerContent = (props) => {
    const {signOut} = useContext(AuthContext);
    const [token] = useContext(TokenContext);
    const email = jwt_decode(token).email;
    const role = jwt_decode(token).role_id === 1 ? 'stocker' : 'forklift driver';

    const handleSignOut = () => {
        signOut();
    }

    const styles = StyleSheet.create({
        header: {
            flex: 1,
            flexDirection: 'column',
            margin: 0,
            borderBottomWidth: 1,
            borderBottomColor: '#eeeeee',
        },
        headerText: {
            textTransform: 'capitalize',
            color: '#222831',
            fontSize: 16
        }
    });

    const navigate = (loc) => {
        props.navigation.navigate(loc);
    }

    return (
        <DrawerContentScrollView {...props}>
            <Card transparent>
                <CardItem header style={styles.header}>
                    <Button disabled light  transparent>
                        <Text style={styles.headerText}>{email}</Text>
                    </Button>
                    <Button disabled light transparent>
                        <Text style={styles.headerText}>Role: {role}</Text>
                    </Button>
                    <Button primary transparent onPress={() => navigate('UserSettings')}>
                        <Text >settings</Text>
                    </Button>
                </CardItem>
                <CardItem>
                    <Body>
                        <Button primary transparent onPress={() => navigate('DroplistIndex')}>
                            <Text>Home</Text>
                        </Button>
                        {
                            role === 'stocker' &&
                        <Button primary transparent onPress={() => navigate('AddDroplist')}>
                            <Text>Create Droplist</Text>
                        </Button>
                        
                        }
                    </Body>
                </CardItem>
                <CardItem bordered footer>
                   <Button primary transparent onPress={handleSignOut}>
                       <Text>Sign Out</Text>
                   </Button>
                </CardItem>
            </Card>
        </DrawerContentScrollView>
    )

    
}

export default DrawerContent;