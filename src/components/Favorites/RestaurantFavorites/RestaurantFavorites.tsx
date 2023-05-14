import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { styles } from './RestaurantFavorites.styles'
import {useNavigation} from '@react-navigation/native'
import { Restaurant } from '../../../utils/interfaces/Restaurant.interface'
import { Icon, Image } from 'react-native-elements';
import { screen } from '../../../utils/screenName'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../../utils'

interface IRestaurantFavoritesProps {
    restaurant: Restaurant;
}

export default function RestaurantFavorites({ restaurant }: IRestaurantFavoritesProps) {

    const navigate = useNavigation()

    const onRemoveFavorite = async() => {
        try {
            if(restaurant.idFavorite){
                await deleteDoc(doc(db,'favorites',restaurant.idFavorite))
            }
        } catch (error) {
            
        }

    }

    const goToRestaurant = () => {
        navigate.navigate(screen.restaurant.tab,{
            screen : screen.restaurant.restaurant,
            params:{
                id: restaurant.id
            }
        })
    }

    return (
        <TouchableOpacity
            onPress={goToRestaurant}
        >
            <View style={styles.content}>
                <Image
                    style={styles.image}
                    source={{ uri: restaurant.images[0] }}
                />
                <View style={styles.infoContent}>
                    <Text style={styles.name}>
                        {restaurant.name}
                    </Text>
                    <Icon
                        type='material-community'
                        name='heart'
                        color='#f00'
                        size={35}
                        containerStyle={styles.iconContent}
                        onPress={onRemoveFavorite}
                    />
                </View>
            </View>
        </TouchableOpacity>
    )
}