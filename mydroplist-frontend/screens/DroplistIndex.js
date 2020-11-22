import React, {useState, useEffect, useContext} from 'react';
import {View, FlatList, Button, Alert} from 'react-native';
import {Spinner, Container, Text} from 'native-base';
import DropList from './DropList';
import DroplistApi from '../helpers/DroplistApi';
import CustomPicker from './CustomPicker';
import {TokenContext} from '../components/tokenContext'
import jwt_decode from 'jwt-decode';


const DroplistIndex = ({navigation}) => {

    const [departments, setDepartments] = useState(
        ['produce', 'sundries', 'hardlines',  'seasonal',  'freezer',  'dairy', 'receiving',  'deli']
    );
    
    const token = useContext(TokenContext);

    const INITIAL_STATE = [];
    const [droplists, setdroplists] = useState(INITIAL_STATE);
  
    useEffect(() => {
        async function getDroplists(){
            const userDroplists = await DroplistApi.getAllDroplist(token);
            console.log("droplists: ", userDroplists);
            setdroplists( () => [...userDroplists.droplists]);
        }
        getDroplists();
    }, []);
    
    const renderItem = ({item}) => (
        <DropList droplist ={item} departments={departments}/>
    )
    
    const renderHeader = () => (
       
           <View></View>
       
    );

    const AddDroplist = (formData) => {
        const {id, title, date, status, items, department_id} = formData
        setdroplists( 
            (d) => [
                ...d,
                {id, title, date, status, items, department_id}
            ]
        )
    }

    const goToDroplist = () => {
        navigation.navigate('AddDroplist')
      }

    return(
        <View>
            {
                !droplists ? (
                   <Text>No droplists found</Text>
                ) : 
            (
                <FlatList 
                initialNumToRender={4}
                maxToRenderPerBatch={3}
                stickyHeaderIndices={[0]}
                ListHeaderComponent={renderHeader}
                removeClippedSubviews={true}
                data={droplists}
                renderItem={renderItem}
                keyExtractor={(item)=> item.id.toString()}
                />
            )

            }
        </View>
    )

  
}

export default DroplistIndex;