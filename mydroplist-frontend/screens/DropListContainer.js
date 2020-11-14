import React, {useState, useEffect} from 'react';
import {View, FlatList, Button, Modal} from 'react-native';
import {Card, CardItem, Body, H2, Picker, Form} from 'native-base';
import DropList from './DropList';
import CustomPicker from './CustomPicker';
import { ScrollView } from 'react-native-gesture-handler';



const DropListContainer = ({navigation}) => {

    const [department, setDepartment] = useState({selected: 2});

    const INITIAL_STATE =
        [
            {id: 1, title: 'Droplist 1', date: 'Aug, 8', status: 'not sent', items: 10, department_id: 2},
            {id: 3, title: 'Droplist 1', date: 'Aug, 8', status: 'not sent', items: 10, department_id: 2},
            {id: 4, title: 'Droplist 1', date: 'Aug, 8', status: 'not sent', items: 10, department_id: 2},
            {id: 5, title: 'Droplist 1', date: 'Aug, 8', status: 'not sent', items: 10, department_id: 3},
            {id: 6, title: 'Droplist 1', date: 'Aug, 8', status: 'not sent', items: 10, department_id: 3},
            {id: 2, title: 'Droplist 2', date: 'Aug, 10', status: 'sent', items: 5, department_id: 4},
            {id: 7, title: 'Droplist 2', date: 'Aug, 10', status: 'sent', items: 5, department_id: 4},
            {id: 8, title: 'Droplist 2', date: 'Aug, 10', status: 'sent', items: 5, department_id: 4},
            {id: 9, title: 'Droplist 2', date: 'Aug, 10', status: 'sent', items: 5, department_id: 5},
            {id: 10, title: 'Droplist 2', date: 'Aug, 10', status: 'sent', items: 5, department_id: 2},
            {id: 11, title: 'Droplist 2', date: 'Aug, 10', status: 'sent', items: 5, department_id: 2},
            {id: 12, title: 'Droplist 2', date: 'Aug, 10', status: 'sent', items: 5, department_id: 1},
            {id: 13, title: 'Droplist 2', date: 'Aug, 10', status: 'sent', items: 5, department_id: 2},
            {id: 14, title: 'Droplist 2', date: 'Aug, 10', status: 'sent', items: 5, department_id: 2},
            {id: 15, title: 'Droplist 2', date: 'Aug, 10', status: 'sent', items: 5, department_id: 2},
            {id: 16, title: 'Droplist 2', date: 'Aug, 10', status: 'sent', items: 5, department_id: 2},
            {id: 17, title: 'Droplist 2', date: 'Aug, 10', status: 'sent', items: 5, department_id: 2},
            {id: 18, title: 'Droplist 2', date: 'Aug, 10', status: 'sent', items: 5, department_id: 2},
            {id: 19, title: 'Droplist 2', date: 'Aug, 10', status: 'sent', items: 5, department_id: 2},
            {id: 20, title: 'Droplist 2', date: 'Aug, 10', status: 'sent', items: 5, department_id: 2},
            {id: 21, title: 'Droplist 2', date: 'Aug, 10', status: 'sent', items: 5, department_id: 2},
        ]
    const [droplists, setdroplists] = useState(INITIAL_STATE);
  

    
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
            <Button color='#323232' title="+" onPress={goToDroplist} />
        </View>
        </View>
    )

  
}

export default DropListContainer;