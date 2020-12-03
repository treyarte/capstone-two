import React, {useState, useContext} from 'react';
import {View, Text, SafeAreaView,SectionList, StyleSheet} from 'react-native'
import {H3, Button, Row, Col, Icon} from 'native-base';
import {TokenContext} from '../components/tokenContext';
import jwt_Decode from 'jwt-decode';


const ItemsList = ({itemsList, deleteItem, editItem, droplist}) => {

    const [items, setItems] = useState(formatItems(itemsList));
    
    const [token] = useContext(TokenContext);

    const styles = StyleSheet.create({
        title: {
            flex: 1,
            backgroundColor: '#1a1c20',
            marginVertical: 10,
            alignItems: 'flex-start',
            padding: 5,
            
        }, 
        titleText: {
            color: '#eeeeee',
            textTransform: 'capitalize',
            margin: 5
        },
        item: {
            flex: 1,
           
  
        },
        fontText: {
            margin: 10,
            fontSize: 20,
            fontWeight: 'bold',
            textTransform: 'capitalize'
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
                {
                    jwt_Decode(token).role_id === 1 &&
                    droplist.droplist.status !== 'completed' &&
                    droplist.droplist.status !== 'accepted' &&
                        <Row style={{margin: 10}}>
                            <Col>
                                <Button transparent onPress={() => handleEditItem(item.id)}>
                                    <Icon type='MaterialIcons' name='edit' style={{color: '#393e46'}}/>
                                </Button>
                            </Col>
                            <Col>
                                <Button transparent onPress={() => handleDelete(item.id, item)}>
                                    <Icon type='MaterialIcons' name='delete' style={{color: '#ea5455'}}/>
                                </Button>
                            </Col>
                        </Row>

                }
                </Row>
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