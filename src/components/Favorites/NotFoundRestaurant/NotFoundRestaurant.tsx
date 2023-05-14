import React from 'react'
import { View } from 'react-native'
import {styles} from './NotFoundRestaurant.styles'
import { Icon, Text } from 'react-native-elements'

export default function NotFoundRestaurant() {
  return (
    <View style={styles.content}>
        <Icon 
            type='material-community'
            name='alert-outline'
            size={80}
        />
        <Text style={styles.text}>You havent add a restaurant to your favorite list yet</Text>
    </View>
  )
}