import React, {useState, useEffect, useContext} from 'react';
import {View, Alert, RefreshControl, ScrollView, StyleSheet} from 'react-native';
import {Toast, Spinner} from 'native-base';
import DropList from './DropList';
import DroplistApi from '../helpers/DroplistApi';
import {TokenContext} from '../components/tokenContext'
import {SwipeListView} from 'react-native-swipe-list-view'
import CustomSwipeableButton from '../components/CustomSwipeableButton';
import { useIsFocused } from '@react-navigation/native'
import jwt_decode from 'jwt-decode';
import NoContent from '../components/NoContent';
import useErrors from '../hooks/useErrors';


const DroplistIndex = ({navigation}) => {

    const [departments, setDepartments] = useState(
        ['produce', 'sundries', 'hardlines',  'seasonal',  'freezer',  'dairy', 'receiving',  'deli']
    );

    const [refreshing, setRefresh] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    const [token] = useContext(TokenContext);


    const INITIAL_STATE = [];
    const [droplists, setdroplists] = useState(INITIAL_STATE);
    const isFocused = useIsFocused()

    useEffect(() => {
        
        getDroplists();
        
    }, [isFocused]);


    async function getDroplists(){
        const userDroplists = await DroplistApi.getAllDroplist(token);
        
        //created at is string. Must convert it to a date first.
        userDroplists.droplists.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setdroplists( () => [...userDroplists.droplists]);
        setRefresh(false);
        setIsLoading(false);
    }
    
    const onRefresh = async () => {
        setRefresh(true);
        await getDroplists();
        
        
    }

    const handleDelete = async (droplist_id) => {
        const isDeleted = await DroplistApi.deleteDroplist(token, droplist_id);   
        setdroplists(droplists.filter(d => d.id !== droplist_id));
        Toast.show({
            text: 'Droplist Successfully deleted',
            buttonText: 'Okay',
            type: 'success',
            duration: 5000
        });
    }
    
    const sendDroplist = (droplist_id) => {
       navigation.navigate('SendDroplist', {id: droplist_id});
    }

    const navigateToDetails = (id, description) => {
        navigation.navigate('DroplistDetails', {id, title: description});
    }

    const droplistWarning = (msg) => {
        Alert.alert("Warning",msg);
    }

    const renderItem = ({item}) => (
        <DropList droplist ={item} departments={departments} navigateToDetails={navigateToDetails}/>
    )
    

    /**
     * 
     * Move to its own file
     * forklift driver actions
     */

    const acceptDroplist = async (id) => {        
        const droplist_id = await DroplistApi.acceptDroplist(token, id);
        const updatedList = droplists.map( d => d);

        const index = updatedList.findIndex((d) => d.id === id)
        updatedList[index].status = 'accepted';

        setdroplists(() => (updatedList));
        
        Toast.show({
            text: 'Droplist successfully accepted',
            buttonText: 'Okay',
            type: 'success',
            duration: 5000
        });
    }

    const rejectDroplist = async (id) => {
        const droplist_id = await DroplistApi.rejectDroplist(token, id);
        const updatedList = droplists.map( d => d);

        const index = updatedList.findIndex((d) => d.id === id)
        updatedList[index].status = 'declined';

        setdroplists(() => (updatedList));

        Toast.show({
            text: 'Droplist rejected',
            buttonText: 'Okay',
            type: 'danger',
            duration: 5000
        });
        
    }

    const renderHiddenItem = (data, rowMap) => (

        <View style={{flex: 1, flexDirection: 'row'}}>
        {
           jwt_decode(token).role_id === 1 ? 
            <>
                    <View style={{flex: 1, alignItems: 'flex-start'}} >
                    {
                        parseInt(data.item.num_items) <= 0 ? 
                        
                        <CustomSwipeableButton data={data} rowMap={rowMap} label={'Send'} color={'#393e46'} fn={() => droplistWarning("Droplist cannot be empty")} />
                        :
                        <CustomSwipeableButton data={data} rowMap={rowMap} label={'Send'} color={'#393e46'} fn={sendDroplist} />
                    }
                    </View>

                    <View style={{flex: 1, alignItems: 'flex-end'}}>  
                        <CustomSwipeableButton data={data} rowMap={rowMap} label={'Delete'} color={'#ea5455'} fn={handleDelete} deleteOption={true} />
                    </View>
            </>

          :
            <>
                <View style={{flex: 1, alignItems: 'flex-start'}} >
                    <CustomSwipeableButton data={data} rowMap={rowMap} label={'Accept'} color={'#61b15a'} fn={acceptDroplist} />
                </View> 
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                    <CustomSwipeableButton data={data} rowMap={rowMap} label={'Decline'} color={'#ea5455'} fn={rejectDroplist} declinedOption={true}/>
                </View>
            </>
        }
        </View>


       
    );

    const styles = StyleSheet.create({
        spinner: {
            flex: 1,
            justifyContent: 'center',
            marginTop: 30
        }
    });

    return(
        <View>
            {
                isLoading ? (
              
                        <Spinner style={styles.spinner} color='#000'/>
    
                ) : 
            (  
                
                    droplists.length === 0 ? (
                        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                            <NoContent message={'No Droplist found'}/>
                        </ScrollView>
                    ) : (
                        <SwipeListView 
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                            initialNumToRender={4}
                            maxToRenderPerBatch={3}
                            removeClippedSubviews={true}
                            data={droplists}
                            renderItem={renderItem}
                            keyExtractor={(item)=> item.id.toString()}
                            renderHiddenItem={renderHiddenItem}
                            leftOpenValue={75}
                            rightOpenValue={-70}
                            previewOpenValue={-40}
                            previewOpenDelay={3000}
                        />
                        )
                
            )
            }
        </View>
    )

  
}

export default DroplistIndex;