import React, {useState, useEffect, useContext} from 'react';
import {} from 'react-native';
import {Container, Content, View, Text, Spinner} from 'native-base';
import {TokenContext} from '../components/tokenContext';
import DroplistApi from '../helpers/DroplistApi';
import ForkliftDriverList from '../components/ForkliftDriverList';

const SendScreen = ({route, navigation}) => {
    const {id} = route.params;

    const [token] = useContext(TokenContext);

    const [forkliftDrivers, setForkliftDrivers] = useState([])

    useEffect( () => {
        (async() => {
            const data = await DroplistApi.getForkliftDrivers(token);
            
            setForkliftDrivers(data.users);
        })();

    }, []);

    const sendDroplist = async (forklift_driver_id) => {
        
        const droplist = await DroplistApi.sendDroplist(token, id, forklift_driver_id);
        navigation.navigate('DroplistIndex');
    }

    return (
        <Container>
                {
                    forkliftDrivers.length <= 0 ? 
                    
                    <Spinner color='#000'/>
                    
                    :
                    
                    <View>
                    <ForkliftDriverList forkliftDrivers={forkliftDrivers} sendDroplist={sendDroplist}/>
                    </View>
                }
        </Container>
    )
}

export default SendScreen;