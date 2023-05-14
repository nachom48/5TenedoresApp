import React from 'react'
import { View,ActivityIndicator } from 'react-native'
import { Text } from 'react-native-elements'

import {styles} from './loading.styles'

interface ILoadingProps{
    show:boolean,
    text?:string
}

export default function Loading({show,text}:ILoadingProps) {

    if(!show) return null;

  return (
    <View style={styles.content}>
        <ActivityIndicator size='large' color='#00a680'/>
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  )
}