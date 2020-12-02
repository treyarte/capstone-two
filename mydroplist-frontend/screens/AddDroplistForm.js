import React, {useState, useContext} from 'react';
import {Alert} from 'react-native';
import { Form, Item, Input, Label, Picker, Button, Text, Container, Content, Row, Col } from 'native-base';
import {StyleSheet} from 'react-native';
import useFields from '../hooks/useFields';
import useErrors from '../hooks/useErrors';
import DroplistApi from '../helpers/DroplistApi';
import {TokenContext} from '../components/tokenContext';

const AddDroplistForm = ({ navigation}) => {
    const INITIAL_STATE = {description: '', department_id: 1}
    
    const [formData, handleChange, resetForm] = useFields(INITIAL_STATE);

    const [ errors, handleErrors] =  useErrors()

    const [token] = useContext(TokenContext);

    const handleSubmit = async () => {
        try {
            const {description, department_id} = formData;

            const droplist = await DroplistApi.addDroplist(token, description, department_id)

            resetForm();
            
            navigation.navigate("Home");

            
        } catch (error) {
            const errorsArr = error[0].errors ? error[0].errors : error;
            handleErrors(errorsArr);
            Alert.alert("Errors: ", errorsArr.join("\n"));
        }
        

    }

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
                        <Label>Description</Label>
                        <Input value={formData.description} onChangeText={(text) => handleChange(text, 'description')} />
                    </Item>
                    <Item  picker style={styles.dropDown}>
                        <Picker
                        style={styles.dropDownText}
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholder='department'
                        mode="dropdown"
                        selectedValue={formData.department_id}
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
                                <Text>Add</Text>
                            </Button>
                        </Col>
                       
                    </Row>
                </Form>
            </Content>
        </Container>
    )
}

export default AddDroplistForm