import React from 'react'
import { View, ScrollView } from 'react-native'
import { styles } from './imageRestaurant.styles'
import { Image } from 'react-native-elements'



interface IImageRestaurantProps {
    images: string[];
  }
  
  export default function ImageRestaurant({ images }: IImageRestaurantProps) {
    const primaryImage = images[0];

    
  
    return (
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Image
          source={
            primaryImage
              ? { uri: primaryImage }
              : require('../../../../../assets/img/imageNotFound.png')
          }
          style={styles.img}
        />
      </ScrollView>
    );
  }