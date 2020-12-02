import React, {useState, useEffect, useContext} from 'react';
import {View, Alert} from 'react-native';
import {Text,} from 'native-base';
import DropList from './DropList';
import DroplistApi from '../helpers/DroplistApi';
import {TokenContext} from '../components/tokenContext'
import {SwipeListView} from 'react-native-swipe-list-view'
import CustomSwipeableButton from '../components/CustomSwipeableButton';
import { useIsFocused } from '@react-navigation/native'
import jwt_decode from 'jwt-decode';
import NoContent from '../components/NoContent';


const DroplistIndex = ({navigation}) => {

    const [departments, setDepartments] = useState(
        ['produce', 'sundries', 'hardlines',  'seasonal',  'freezer',  'dairy', 'receiving',  'deli']
    );
    
    const token = useContext(TokenContext);


    const INITIAL_STATE = [];
    const [droplists, setdroplists] = useState(INITIAL_STATE);
    const isFocused = useIsFocused()

    useEffect(() => {
        async function getDroplists(){
            const userDroplists = await DroplistApi.getAllDroplist(token);
            setdroplists( () => [...userDroplists.droplists]);
        }
        getDroplists();
    }, [isFocused]);
    
    const handleDelete = async (droplist_id) => {
        const isDeleted = await DroplistApi.deleteDroplist(token, droplist_id);   
        setdroplists(droplists.filter(d => d.id !== droplist_id));
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
    }

    const rejectDroplist = async (id) => {
        const droplist_id = await DroplistApi.rejectDroplist(token, id);
        const updatedList = droplists.map( d => d);

        const index = updatedList.findIndex((d) => d.id === id)
        updatedList[index].status = 'declined';

        setdroplists(() => (updatedList));
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
                        <CustomSwipeableButton data={data} rowMap={rowMap} label={'Delete'} color={'#ea5455'} fn={handleDelete}  />
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

    return(
        <View>
            {
                droplists.length === 0 ? (
                   <NoContent message={'No Droplist found'}/>
                ) : 
            (
                <SwipeListView 
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

            }
        </View>
    )

  
}

export default DroplistIndex;