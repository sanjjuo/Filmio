import { View, Text, Dimensions } from 'react-native'
import React from 'react';
import * as Progress from 'react-native-progress';

const { width, height } = Dimensions.get("window")

const Loading = () => {
    return (
        <View style={{ height, width }} className='absolute flex justify-center items-center'>
            <Progress.Circle size={80} thickness={5} indeterminate={true} color='teal' />
        </View>
    )
}

export default Loading