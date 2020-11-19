import React from 'react';
import {View, ImageBackground, StyleSheet} from 'react-native'
import {Button, Text} from 'native-base'

const LandingPage = ({navigation}) => {
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: "column"
          },
          image: {
            flex: 1,
            resizeMode: "cover",
            justifyContent: "center"
          },
          text: {
            color: "white",
            fontSize: 42,
            fontWeight: "bold",
            textAlign: "center",
            backgroundColor: "#000000a0",
            marginHorizontal: 5,
            marginBottom: 50
          },
          button: {
              margin: 5
          }
    });

    const handleNavigation = (location) => {
        navigation.navigate(location);
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../landing_img_small.jpg')} style={styles.image}>
                <Text style={styles.text}>My Droplist Mobile</Text>
                <Button style={styles.button} dark block onPress={() => handleNavigation('SignUp')}>
                    <Text>Sign Up</Text>
                </Button>
                <Button style={styles.button} dark block onPress={() => handleNavigation('Login')}>
                    <Text>Login</Text>
                </Button>
            </ImageBackground>
        </View>
    )
}

export default LandingPage;