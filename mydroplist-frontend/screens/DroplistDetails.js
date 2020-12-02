import React, {useState, useEffect, useContext, useLayoutEffect} from 'react';
import {StyleSheet} from 'react-native'
import {Text, Container, Content, Spinner, Button, Icon, View} from 'native-base';
import DroplistApi from '../helpers/DroplistApi';
import {TokenContext} from '../components/tokenContext'
import ItemList from '../screens/ItemsList';
import DroplistNavigationButtons from '../components/DroplistNavigationButtons';
import jwt_decode from 'jwt-decode';

const DroplistScreen = ({route, navigation}) => {
    const {id} = route.params;
    
    const [droplist, setDroplist] = useState(null);
    const [message, setMessage] = useState('')

    const [token] = useContext(TokenContext);

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
        
        const filteredDroplist = {...droplist}
        filteredDroplist.droplist.items = droplist.droplist.items.filter(i => i.id !== item_id);
        
        setDroplist( () => filteredDroplist);
        let message = await DroplistApi.deleteItem(token, id, item_id);
        setMessage(() => message);        
    }

    const handleComplete = async () => {
        const msg = await DroplistApi.completeDroplist(token, id);
        navigation.navigate('DroplistIndex', {message: msg});
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
                <>
                {
                    jwt_decode(token).role_id === 1 ?

                        <DroplistNavigationButtons 
                            droplist={droplist} 
                            handleEditButton={handleEditButton} 
                            handleAddButton={handleAddButton}
                        />
                    : 
                        <Button transparent onPress={handleComplete}>
                            <Icon name='checkmark' style={{color: '#61b15a'}}/>
                        </Button>
                }
                </>
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
                        
                        <ItemList droplist={droplist} editItem={editItem} deleteItem={deleteItem} itemsList={droplist.droplist.items}/>
                    
                }
        </Container>
    )
} 

export default DroplistScreen;