import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, Button, SectionList} from 'react-native';
import {Card, CardItem, Body, H2} from 'native-base';
import DropList from './DropList';
import { color } from 'react-native-reanimated';

const DropListContainer = ({navigation}) => {
    const DLContainerStyles = StyleSheet.create({
        header: {
            flex: 1,
            marginTop: 0,
        }
    });

    const INITIAL_STATE = 
        [
            {
                title: 'Produce',
                data: [
                    {id: 1, title: 'Droplist 1', date: 'Aug, 8', status: 'not sent', items: 10},
                    {id: 3, title: 'Droplist 1', date: 'Aug, 8', status: 'not sent', items: 10},
                    {id: 4, title: 'Droplist 1', date: 'Aug, 8', status: 'not sent', items: 10},
                    {id: 5, title: 'Droplist 1', date: 'Aug, 8', status: 'not sent', items: 10},
                    {id: 6, title: 'Droplist 1', date: 'Aug, 8', status: 'not sent', items: 10},
                ],
            },
            {
                title: 'Hardlines',
                data: [
                    {id: 2, title: 'Droplist 2', date: 'Aug, 10', status: 'sent', items: 5},
                    {id: 7, title: 'Droplist 2', date: 'Aug, 10', status: 'sent', items: 5},
                    {id: 8, title: 'Droplist 2', date: 'Aug, 10', status: 'sent', items: 5},
                    {id: 9, title: 'Droplist 2', date: 'Aug, 10', status: 'sent', items: 5},
                    {id: 10, title: 'Droplist 2', date: 'Aug, 10', status: 'sent', items: 5},
                    {id: 11, title: 'Droplist 2', date: 'Aug, 10', status: 'sent', items: 5},
                    {id: 12, title: 'Droplist 2', date: 'Aug, 10', status: 'sent', items: 5},
                ],
            },
            
        ]
    
    const [droplists, setdroplists] = useState(INITIAL_STATE);


    
    const renderItem = ({item}) => (
        <DropList droplist ={item}/>
    )
    
    const renderHeader = ({section: {title}}) => (
        <Card style={DLContainerStyles.header}>
            <CardItem style={{backgroundColor: '#ececec'}}>
                <Body>
                <H2>{title}</H2>
                </Body>
            </CardItem>
        </Card>
    );
    

    return(
        <View>
            <SectionList 
                stickySectionHeadersEnabled={true}
                renderSectionHeader={renderHeader}
                sections={droplists}
                renderItem={renderItem}
                keyExtractor={(item)=> item.id.toString()}
            />
        </View>
    )

  
}

export default DropListContainer;