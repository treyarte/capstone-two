import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'mydroplist_token'

const storeToken = async (token) => {
    
        const jsonToken = JSON.stringify({token});
        
        await AsyncStorage.setItem(STORAGE_KEY, jsonToken);
}

export default storeToken