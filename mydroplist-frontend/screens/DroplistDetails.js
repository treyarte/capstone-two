import React, {useState, useEffect, useContext, useLayoutEffect} from 'react';

import {StyleSheet} from 'react-native'
import {Text, Container, Content, Spinner, Button, Icon, View} from 'native-base';
import DroplistApi from '../helpers/DroplistApi';
import {TokenContext} from '../components/tokenContext'
import ItemList from '../screens/ItemsList';
import { set } from 'react-native-reanimated';
import {} from '@react-navigation/native'

const DroplistScreen = ({route, navigation}) => {
    const {id} = route.params;
    
    const [droplist, setDroplist] = useState(null);
    const [message, setMessage] = useState('')

    const token = useContext(TokenContext);

    const handleEditButton = () => {
        navigation.navigate('EditDroplist', {id});
    }

    const handleAddButton = () => {
        navigation.navigate('AddItem', {id});
    }

    const editItem = (item_id) => {
        navigation.navigate('EditItem', {droplist_id: id, item_id});
    }


    const deleteItem = async (item_id) => {
        
        let message = await DroplistApi.deleteItem(token, id, item_id);
        setMessage(() => message);
        navigation.navigate('Spinner');
        navigation.pop();
        
    }

    useEffect( () => {
        
        async function getDetails(){
            const droplistData = await DroplistApi.getDroplist(token, id);
            setDroplist(() => (droplistData));
        }
        const unsubscribe = navigation.addListener("focus", () => {
            setDroplist(null);
            getDetails();
        })
        return unsubscribe;
    }, [navigation,setDroplist])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
            <View style={{flexDirection: 'row'}}>
              <Button  transparent  onPress={handleEditButton}>
                 <Text style={{color: '#222831'}}>
                     Edit
                 </Text>
              </Button>
              <Button Icon transparent onPress={handleAddButton}>
                  <Icon name="add" style={{color: '#222831'}}/>
              </Button>
            </View>
            )
          });
    });

    const styles = StyleSheet.create({
        spinner: {
            flex: 1,
            justifyContent: 'center',
        }
    });

    return (
        <Container>
                {
                !droplist ?
            <Content>
                
                     <Spinner style={styles.spinner} color='#000'/>
            </Content>
                     :
                        
                        <ItemList editItem={editItem} deleteItem={deleteItem} itemsList={droplist.droplist.items}/>
                    
                }
        </Container>
    )
} 

export default DroplistScreen;