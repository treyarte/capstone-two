import React, {useState, useEffect, useContext, useLayoutEffect} from 'react';

import {StyleSheet} from 'react-native'
import {Text, Container, Content, Spinner, Button, Icon, View} from 'native-base';
import DroplistApi from '../helpers/DroplistApi';
import {TokenContext} from '../components/tokenContext'
import ItemList from '../screens/ItemsList';
import { set } from 'react-native-reanimated';


const DroplistScreen = ({route, navigation}) => {
    const {id, items} = route.params;
    
    const [droplist, setDroplist] = useState(null);

    const token = useContext(TokenContext);

    const handleEditButton = () => {
        navigation.navigate('EditDroplist', {id});
    }

    const handleAddButton = () => {
        navigation.navigate('AddItem', {id});
    }

    useEffect( () => {
      
        async function getDetails(){
            const droplistData = await DroplistApi.getDroplist(token, id);
            setDroplist(() => (droplistData.droplist));
        }
        const unsubscribe = navigation.addListener("focus", () => {
            setDroplist(null);
            getDetails();
        })
        return unsubscribe;
    }, [navigation])

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
                        
                        <ItemList itemsList={droplist.items}/>
                    
                }
        </Container>
    )
} 

export default DroplistScreen;