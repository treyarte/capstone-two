import React, {useContext, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Container,Content, Button, Text, Toast } from 'native-base'
import useFields from '../hooks/useFields';
import useErrors from '../hooks/useErrors';
import {TokenContext} from '../components/tokenContext'
import DroplistApi from '../helpers/DroplistApi';
import UserForm from '../components/userForm';
import departments from '../helpers/GetDepartments';
import jwt_decode from 'jwt-decode';

const UserSettings = ({navigation}) => {

    const [token, setToken] = useContext(TokenContext);

    const user_id = jwt_decode(token).id;

    const INITIAL_STATE = {email: '', firstName: '', lastName: '', 
    department: 1, role: 1, password: '', passwordConfirmation: ''}

    const [formData, handleChange, resetForm, setFormData] = useFields(INITIAL_STATE);
    
    const [errors, handleErrors] = useErrors([])
    
    const handleUpdate = async () => {
        try {
            let updatedUser = await DroplistApi.updateUser(token, user_id, formData);
            //find a better alternative to refresh the token
            let updatedToken = await DroplistApi.login(formData.email, formData.password);
            resetForm();
            setToken(updatedToken)
            navigation.navigate('Home');
            Toast.show({
                text: 'Profile successfully updated',
                buttonText: 'Okay',
                type: 'success',
                duration: 5000
            });

        } catch (error) {
            const errorsArr = error[0].errors ? error[0].errors : error;
            handleErrors(errorsArr);
            Toast.show({
                text: errorsArr.join('\n'),
                buttonText: 'Okay',
                type: 'danger',
                duration: 5000
            });
            // Alert.alert("Errors: ", errorsArr.join("\n"));
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
            const {user} = await DroplistApi.getUser(token, user_id)
            setFormData( () => (
                {
                    email: user.email, firstName: user.first_name, lastName: user.last_name, 
                    department: departments[user.department], role: user.role==='stocker' ? 1 : 2, password: '', passwordConfirmation: ''
            }));
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
                    <Button primary style={styles.buttons} onPress={handleUpdate}>
                        <Text>Update</Text>
                    </Button>
                </View>
            </Content>
        </Container>
    )
}

export default UserSettings;