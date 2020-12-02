import React, {useContext, useState, useEffect} from 'react';
import {Alert} from 'react-native';
import { Form, Item, Input, Label, Picker, Button, Text, Container, Content, Row, Col } from 'native-base';
import {StyleSheet} from 'react-native';
import useFields from '../hooks/useFields';
import useErrors from '../hooks/useErrors';
import DroplistApi from '../helpers/DroplistApi';
import {TokenContext} from '../components/tokenContext';

const EditItem = ({ navigation, route}) => {
    const INITIAL_STATE = {steel_name: '', row_letter: 'A', column_number: '', description: ''}
    
    const [formData, setFormData] = useState(INITIAL_STATE);

    const {droplist_id, item_id} = route.params;

    const [ errors, handleErrors] =  useErrors()

    const [token] = useContext(TokenContext);

    const handleChange = (value, name) => {
        
        setFormData((fData) => ({
            ...fData,
            [name]: value
        }));
    };

    const resetFormData = () => {
        setFormData(INITIAL_STATE);
    };


    const handleSubmit = async () => {
        try {
            
            const item = await DroplistApi.editItem(token, droplist_id, item_id, formData);

            resetFormData();
            
            navigation.navigate("DroplistDetails", {item});

            
        } catch (error) {
            const errorsArr = error[0].errors ? error[0].errors : error;
            handleErrors(errorsArr);
            Alert.alert("Errors: ", errorsArr.join("\n"));
        }
        

    }

    useEffect (() => {
        (async () => {

            const droplistData = await DroplistApi.getItem(token, droplist_id, item_id);
            setFormData((fData) => ({
                ...fData,
                'description': droplistData.item.description,
                'steel_name': droplistData.item.steel_name,
                'row_letter': droplistData.item.row_letter,
                'column_number': `${droplistData.item.column_number}`,
              }));
        })()
    }, []);


    const styles = StyleSheet.create({
        form: {
            marginHorizontal: 20
        },
        dropDown: {
            marginTop: 30,
            marginLeft: 15
        },
        dropDownText: {
            color: '#323232',
            margin: -5
            
        }
    });

    return (

        <Container>
            <Content>
                <Form style={styles.form}>
                    <Item floatingLabel>
                        <Label>Steel Name</Label>
                        <Input value={formData.steel_name} onChangeText={(text) => handleChange(text, 'steel_name')} />
                    </Item>
                    <Item  picker style={styles.dropDown}>
                        <Picker
                        style={styles.dropDownText}
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholder='Row'
                        mode="dropdown"
                        selectedValue={formData.row_letter}
                        onValueChange={(val) => handleChange(val, 'row_letter')}
                    >
                            <Picker.Item label="A" value='A'/>
                            <Picker.Item label="B" value='B'/>
                            <Picker.Item label="C" value='C'/>
                        </Picker>
                    </Item>
                    <Item floatingLabel>
                        <Label>Column #</Label>
                        <Input value={formData.column_number} 
                        onChangeText={(text) => handleChange(text, 'column_number')} keyboardType="numeric"/>
                    </Item>
                    <Item floatingLabel>
                        <Label>Description</Label>
                        <Input value={formData.description} onChangeText={(text) => handleChange(text, 'description')} />
                    </Item>
                    <Row>
                        <Col>
                            <Button info style={{marginTop: 20, marginLeft: 15, alignSelf: 'flex-start'}} onPress={() => navigation.goBack()}>
                                <Text>Cancel</Text>
                            </Button>
                        </Col>
                        <Col>
                            <Button success style={{marginTop: 20, alignSelf: 'flex-end'}} onPress={handleSubmit}>
                                <Text>Edit</Text>
                            </Button>
                        </Col>
                       
                    </Row>
                </Form>
            </Content>
        </Container>
    )
}

export default EditItem