import React, {useState, useContext} from 'react';
import {View, Text, SafeAreaView,SectionList, StyleSheet} from 'react-native'
import {H3, Button, Row, Col} from 'native-base';
import {TokenContext} from '../components/tokenContext';
import jwt_Decode from 'jwt-decode';

const ItemsList = ({itemsList, deleteItem, editItem}) => {

    const [items, setItems] = useState(formatItems(itemsList));
    
    const token = useContext(TokenContext);

    const styles = StyleSheet.create({
        title: {
            flex: 1,
            backgroundColor: '#393e46',
            marginVertical: 10,
            alignItems: 'center',
            padding: 5
        }, 
        titleText: {
            color: '#eeeeee',
        },
        item: {
            flex: 1,
  
        },
        fontText: {
            margin: 10,
            fontSize: 20,
            fontWeight: 'bold'
        },
        noItems: {
            flex: 1,
            marginTop: 100,
            alignSelf: 'center'
        }
    });

    const handleEditItem = (id) => {
        editItem(id)
    }

    const handleDelete = (id, item) => {
        
        const index = items.findIndex( i => i.title === item.steel_name);
        
        const filteredItems = items
        console.log(filteredItems);
        filteredItems[index].data = items[index].data.filter(i => i.id !== id) 
        if(filteredItems[index].data.length === 0){
            filteredItems.splice(index, 1);
        }
        setItems(() =>filteredItems);
        
        deleteItem(id);
    }

    const renderItem = ({item}) => (
        <View style={styles.item}>
            <Row>
                <Col>
                    <Text style={styles.fontText}>
                        {item.row_letter}{item.column_number}
                        <Text> </Text>
                        <Text style={styles.fontText}>{item.description}</Text>
                    </Text>
                </Col>
                </Row>
                {
                    jwt_Decode(token).role_id === 1 &&
                        <Row style={{margin: 10}}>
                            <Col>
                                <Button transparent onPress={() => handleEditItem(item.id)}>
                                    <H3 style={{color: '#222831'}}>Edit</H3>
                                </Button>
                            </Col>
                            <Col>
                                <Button transparent onPress={() => handleDelete(item.id, item)}>
                                    <H3 style={{color: '#ea5455'}}>Delete</H3>
                                </Button>
                            </Col>
                        </Row>

                }
        </View>
    )

    const renderHeader = ({section: {title}}) => (
        <View style={styles.title}>
            <H3 style={styles.titleText}>{title}</H3>
        </View>
    );

    
    

    return (
        <>
            {
                items.length === 0 ? 
                <H3 style={styles.noItems}>No items in this list</H3>
                :

                <SafeAreaView>
                    <SectionList
                        sections={items}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                        renderSectionHeader={renderHeader}
                    />
                </SafeAreaView>
            }
        </>
    )
}

function formatItems(items){
    let arr = [...new Set(items.map((i) => i.steel_name))]

    const newFormatItems = []

    for(let title of arr){
        newFormatItems.push({title, data: [...items.filter((i) => i.steel_name === title)]})
    }
    return newFormatItems
}

export default ItemsList;