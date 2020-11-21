import React, {useState, useEffect, useContext} from 'react';
import {View, FlatList, Button, Alert} from 'react-native';
import DropList from './DropList';
import DroplistApi from '../helpers/DroplistApi';
import CustomPicker from './CustomPicker';
import {TokenContext} from '../components/tokenContext'
import jwt_decode from 'jwt-decode';


const DroplistIndex = ({navigation}) => {

    const [department, setDepartment] = useState({selected: 2});
    
    const token = useContext(TokenContext);

    const INITIAL_STATE = [];
    const [droplists, setdroplists] = useState(INITIAL_STATE);
  
    useEffect(() => {
        async function getDroplists(){
            const userDroplists = await DroplistApi.getAllDroplist(token);
            console.log("droplists: ", token);
            setdroplists( () => [...userDroplists]);
        }
        getDroplists();
    }, []);
    
    const renderItem = ({item}) => (
        <DropList droplist ={item}/>
    )
    
    const renderHeader = () => (
        <CustomPicker department={department} setDepartment={setDepartment}/>
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
            <FlatList 
                initialNumToRender={4}
                maxToRenderPerBatch={3}
                stickyHeaderIndices={[0]}
                ListHeaderComponent={renderHeader}
                removeClippedSubviews={true}
                data={droplists.filter((d) => d.department_id === department.selected)}
                renderItem={renderItem}
                keyExtractor={(item)=> item.id.toString()}
            />
        <View style={
                {
                    width: 100, 
                    
                    position: 'absolute', 
                    bottom: 0, 
                    right: 1,  
                    alignSelf: 'flex-end', 
                    margin: 15,
                }
            }>

        </View>
        </View>
    )

  
}

export default DroplistIndex;