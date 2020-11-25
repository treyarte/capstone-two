import React, {useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import { Form, Item, Input, Label, Picker, Button, Text, Container, Content, Row, Col, Spinner } from 'native-base';
import {StyleSheet} from 'react-native';
import useFields from '../hooks/useFields';
import useErrors from '../hooks/useErrors';
import DroplistApi from '../helpers/DroplistApi';
import {TokenContext} from '../components/tokenContext';

const EditDroplistFrom = ({ navigation, route}) => {

    const [droplist, setDroplist] = useState(null)
   
    const INITIAL_STATE = {description: '', department_id: ''}

    const [formData, setFormData] = useState(INITIAL_STATE);

    const handleChange = (value, name) => {
        
        setFormData((fData) => ({
            ...fData,
            [name]: value
        }));
    };

    const resetFormData = () => {
        setFormData(INITIAL_STATE);
    };


    const {id} = route.params;

    const [ errors, handleErrors] =  useErrors()

    const token = useContext(TokenContext);

    const handleSubmit = async () => {
        try {
            const {description, department_id} = formData;

            const droplist = await DroplistApi.editDroplist(token,id, {description, department_id});    
            
            resetFormData();

            navigation.navigate("DroplistIndex");
 
        } catch (error) {
            const errorsArr = error[0].errors ? error[0].errors : error;
            handleErrors(errorsArr);
            Alert.alert("Errors: ", errorsArr.join("\n"));
        }
    }

    useEffect (() => {
        (async () => {
            const droplistData = await DroplistApi.getDroplist(token, id);
            setDroplist(() => (droplistData.droplist));
            setFormData((fData) => ({
                ...fData,
                'description': droplistData.droplist.description,
                'department_id': droplistData.droplist.department.id
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
                {
                    droplist !== null ?                
                <Form style={styles.form}>
                    <Item floatingLabel>
                        <Label>Description</Label>
                        <Input value={formData.description} onChangeText={(text) => handleChange(text, 'description')} />
                    </Item>
                    <Item  picker style={styles.dropDown}>
                        <Picker
                        style={styles.dropDownText}
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholder='department'
                        mode="dropdown"
                        selectedValue={parseInt(formData.department_id)}
                        onValueChange={(val) => handleChange(val, 'department_id')}
                    >
                    <Picker.Item label="Produce" value={1}/>
                    <Picker.Item label="Hardlines" value={2}/>
                    <Picker.Item label="Freezer" value={3}/>
                    <Picker.Item label="Seasonal" value={4}/>
                    <Picker.Item label="Sundries" value={5}/>

                    </Picker>
                    </Item>
                    <Row>
                        <Col>
                            <Button info style={{marginTop: 20, marginLeft: 15, alignSelf: 'flex-start'}} onPress={() => navigation.goBack()}>
                                <Text>Cancel</Text>
                            </Button>
                        </Col>
                        <Col>
                            <Button success style={{marginTop: 20, alignSelf: 'flex-end'}} onPress={handleSubmit}>
                                <Text>Save</Text>
                            </Button>
                        </Col>
                       
                    </Row>
                </Form>
                :
                <Spinner color='#000'/>
                }
            </Content>
        </Container>
    )
}

export default EditDroplistFrom