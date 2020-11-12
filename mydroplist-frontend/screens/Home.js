import React from 'react';
import {View, Text, Button} from 'react-native';


const Home = ({navigation}) => {
    return (
        <View>
            <Text>Home Screen</Text>
            <Button
                title='Logsin'
                onPress={() => navigation.navigate('Droplists')}
            />
        </View>
    );
}

export default Home;
