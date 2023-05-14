import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { styles } from './RestaurantRanking.styles'
import { Restaurant } from '../../../utils/interfaces/Restaurant.interface'
import { Icon, Image, Rating, Text } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../../utils/screenName'

interface IRestaurantRanking {
    restaurant: Restaurant,
    key: number,
    index: number
}

export default function RestaurantRanking({ restaurant, key, index }: IRestaurantRanking) {

    const navigate = useNavigation()

    const goToScreen = ()=>{
        navigate.navigate(screen.restaurant.tab,{
            screen:screen.restaurant.restaurant,
                params:{
                    id:restaurant.id
            }
        })
    }

    const renderMedal = ():JSX.Element | null=>{
        if(index > 2) return null;
        let color = '';
        if(index===0) color = '#FFD700';
        if(index===1) color ='#BEBEBE';
        if(index===2) color ='#CD7F32';

        return (
            <Icon
                type='material-community'
                name='medal-outline'
                color={color}
                containerStyle={styles.medal} />
        )
    }

    return (
        <TouchableOpacity
            onPress={goToScreen}>
            <View style={styles.content}>
                <Image
                    source={{ uri: restaurant.images[0] }}
                    style={styles.image}
                />
                <View style={styles.infoContent}>
                    <View style={styles.nameContent}>
                        {renderMedal()}
                    </View>
                    <Text style={styles.name}>{restaurant.name}</Text>
                    <Rating
                        imageSize={15}
                        readonly
                        startingValue={restaurant.ratingMedia}
                    />
                </View>
                <Text style={styles.description}>{restaurant.description}</Text>
            </View>
        </TouchableOpacity>
    )
}