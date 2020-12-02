import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Container,Content, Form, Item, Input, Label, Button, Text, Picker } from 'native-base'
import useFields from '../hooks/useFields';
import useErrors from '../hooks/useErrors';
import {TokenContext} from '../components/tokenContext'
import DroplistApi from '../helpers/DroplistApi';
import UserForm from '../components/userForm';
import jwt_decode from 'jwt-decode';

const UserSettings = ({navigation}) => {

    const token = useContext(TokenContext);

    const user_id = jwt_decode(token).id;

    const INITIAL_STATE = {email: '', firstName: '', lastName: '', 
    department: 1, role: 1, password: '', passwordConfirmation: ''}

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
        buttonContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        buttons: {
            marginLeft: 35,
            marginRight: 20,
            marginTop: 20, 
        
        }
    });

    useEffect(() => {
        (async () => {
            const {user} = DroplistApi.getUser(token, user_id)
            console.log(user);
        })();
    }, [token, user_id])

    return (
         <Container>
            <Content>
                <UserForm formData={formData} handleChange={handleChange} />
                <View style={styles.buttonContainer}>
                    <Button info style={styles.buttons} onPress={() => navigation.goBack()} >
                    <Text>Cancel</Text>  
                    </Button>
                    <Button primary style={styles.buttons} onPress={handleSignUp}>
                        <Text>Update</Text>
                    </Button>
                </View>
            </Content>
        </Container>
    )
}

export default UserSettings;