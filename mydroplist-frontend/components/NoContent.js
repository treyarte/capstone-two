import React from 'react';
import {StyleSheet} from 'react-native'
import {H3} from 'native-base';

/**
 * Returns a screen to display when content is empty
 * ex: display something when droplist index is empty
 */

const NoContent = ({message}) => {
    const styles = StyleSheet.create({
        noItems: {
            
            marginTop: 100,
            alignSelf: 'center'
        }
    })

    return (
        <H3 style={styles.noItems}>{message}</H3>
    )
}

export default NoContent;