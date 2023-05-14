import React from 'react'
import { View, Text } from 'react-native'
import { styles } from './header.styles'
import { Restaurant } from '../../../screens/Restaurant/RestaurantsScreen/RestaurantsScreen'
import { Rating } from 'react-native-elements'

interface IHeaderProps {
  restaurant: Restaurant
}

export default function Header({ restaurant }: IHeaderProps) {

  return (
    <View style={styles.content}>
      <View style={styles.titleView}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Rating
          imageSize={20}
          readonly
          startingValue={restaurant.ratingMedia ? restaurant.ratingMedia : 0}
        />
      </View>
      <Text style={styles.description}>{restaurant.description}</Text>
    </View>
  )
}