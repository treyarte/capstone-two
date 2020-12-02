import React, {useContext} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Container,Content, Form, Item, Input, Label, Button, Text, Picker } from 'native-base'
import useFields from '../hooks/useFields';
import useErrors from '../hooks/useErrors';
import {AuthContext} from '../components/context'
import DroplistApi from '../helpers/DroplistApi';
import DropList from './DropList';

const SignUp = () => {

    const {signUp} = useContext(AuthContext);

    const INITIAL_STATE = {email: '', firstName: '', lastName: '', department: 1, role: 1, password: '', passwordConfirmation: ''}

    const [formData, handleChange, resetForm] = useFields(INITIAL_STATE);
    
    const [errors, handleErrors] = useErrors([])
    
    const handleSignUp = async () => {
        try {
            const {email, firstName, lastName, department, role, password} = formData;
            
            let token = await DroplistApi.signUp(email, password, firstName, lastName, department, role);

            signUp(token);

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
        },
        dropDownText: {
            color: '#323232',
            margin: -5
            
        },
        submitBtn: {
            marginRight: 20,
            marginTop: 20, 
            alignSelf: 'flex-end'
        }
    });

    return (
         <Container>
            <Content>
                <Form style={styles.form}>
                    <Item floatingLabel>
                        <Label>Email *</Label>
                        <Input value={formData.email} onChangeText={(text) => handleChange(text, 'email')} />
                    </Item>
                    <Item floatingLabel>
                        <Label>First name *</Label>
                        <Input value={formData.firstName} onChangeText={(text) => handleChange(text, 'firstName')} />
                    </Item>
                    <Item floatingLabel>
                        <Label>Last name *</Label>
                        <Input value={formData.lastName} onChangeText={(text) => handleChange(text, 'lastName')} />
                    </Item>
                    <Item style={styles.dropDown}>
                    
                        <Picker style={styles.dropDownText}  mode='dialog' selectedValue={formData.department} 
                            onValueChange={(text) => handleChange(text, 'department')}>
                            <Picker.Item label='Produce' value={1}/>
                            <Picker.Item label='Sundries' value={2}/>
                            <Picker.Item label='Hardlines' value={3}/>
                            <Picker.Item label='Seasonal' value={4}/>
                            <Picker.Item label='Freezer' value={5}/>
                            <Picker.Item label='Dairy' value={6}/>
                            <Picker.Item label='Receiving' value={7}/>
                            <Picker.Item label='Deli' value={8}/>
                        </Picker>
                    </Item>
                    <Item style={styles.dropDown}>
                        <Picker style={styles.dropDownText} mode='dropdown' selectedValue={formData.role} placeholder='Role'
                            onValueChange={(text) => handleChange(text, 'role')}>
                            <Picker.Item label='Stocker' value={1}/>
                            <Picker.Item label='Forklift driver' value={2}/>
                        </Picker>
                    </Item>
                    <Item floatingLabel>
                        <Label>Password *</Label>
                        <Input 
                            secureTextEntry={true} 
                            value={formData.password}
                            onChangeText={(text) => handleChange(text, 'password')}
                        />
                    </Item>

                    {/* <Item floatingLabel>
                        <Label>Confirm Password</Label>
                        <Input 
                            secureTextEntry={true} 
                            value={formData.passwordConfirmation}
                            onChangeText={(text) => handleChange(text, 'passwordConfirmation')}
                        />
                    </Item> */}
                </Form>
                    <Button dark style={styles.submitBtn} onPress={handleSignUp}>
                        <Text>Sign Up</Text>
                    </Button>
            </Content>
        </Container>
    )
}

export default SignUp;