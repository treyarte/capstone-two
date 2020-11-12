import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, Button, SectionList} from 'react-native';
import {Card, CardItem, Body, H2, Picker, Form} from 'native-base';
import DropList from './DropList';
import CustomPicker from './CustomPicker';
import { ScrollView } from 'react-native-gesture-handler';


const DropListContainer = ({navigation}) => {

    const [department, setDepartment] = useState({selected: 1});

    const INITIAL_STATE =
        [
            {id: 1, title: 'Droplist 1', date: 'Aug, 8', status: 'not sent', items: 10, department_id: 1},
            {id: 3, title: 'Droplist 1', date: 'Aug, 8', status: 'not sent', items: 10, department_id: 1},
            {id: 4, title: 'Droplist 1', date: 'Aug, 8', status: 'not sent', items: 10, department_id: 2},
            {id: 5, title: 'Droplist 1', date: 'Aug, 8', status: 'not sent', items: 10, department_id: 3},
            {id: 6, title: 'Droplist 1', date: 'Aug, 8', status: 'not sent', items: 10, department_id: 3},
            {id: 2, title: 'Droplist 2', date: 'Aug, 10', status: 'sent', items: 5, department_id: 4},
            {id: 7, title: 'Droplist 2', date: 'Aug, 10', status: 'sent', items: 5, department_id: 4},
            {id: 8, title: 'Droplist 2', date: 'Aug, 10', status: 'sent', items: 5, department_id: 4},
            {id: 9, title: 'Droplist 2', date: 'Aug, 10', status: 'sent', items: 5, department_id: 5},
            {id: 10, title: 'Droplist 2', date: 'Aug, 10', status: 'sent', items: 5, department_id: 1},
            {id: 11, title: 'Droplist 2', date: 'Aug, 10', status: 'sent', items: 5, department_id: 1},
            {id: 12, title: 'Droplist 2', date: 'Aug, 10', status: 'sent', items: 5, department_id: 1},
        ]
    const [droplists, setdroplists] = useState(INITIAL_STATE);
  

    
    const renderItem = ({item}) => (
        <DropList droplist ={item}/>
    )
    
    const renderHeader = () => (
        <CustomPicker department={department} setDepartment={setDepartment}/>
    );

    return(
        <ScrollView>

        <View>
            <FlatList 
                stickyHeaderIndices={[0]}
                ListHeaderComponent={renderHeader}
                data={droplists.filter((d) => d.department_id === department.selected)}
                renderItem={renderItem}
                keyExtractor={(item)=> item.id.toString()}
            />
            <Button title="+"/>
        </View>
        </ScrollView>
    )

  
}

export default DropListContainer;