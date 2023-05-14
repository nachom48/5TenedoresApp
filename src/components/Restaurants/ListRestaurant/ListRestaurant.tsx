import React from 'react'
import { View, FlatList, TouchableOpacity } from 'react-native'
import { Text, Image } from "react-native-elements"
import { styles } from './listRestaurant.styles'
import { Restaurant } from '../../../screens/Restaurant/RestaurantsScreen/RestaurantsScreen'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../../utils/screenName'
import { DocumentData, QuerySnapshot } from 'firebase/firestore'

interface IListRestaurantProp {
    restaurants:  QuerySnapshot<DocumentData>;
}



export default function ListRestaurant({ restaurants }:IListRestaurantProp) {
    const navigation = useNavigation()

    const goToRestaurant = (restaurant:Restaurant) => {
       navigation.navigate(screen.restaurant.restaurant,{id:restaurant.id})
    }

    return (
        <View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={restaurants.docs}
                renderItem={(doc) => {
                    const restaurant = doc.item.data() as Restaurant;                    
                    return (
                    <TouchableOpacity onPress={() => goToRestaurant(restaurant)}>
                        <View style={styles.restaurant}>
                            <Image
                                style={styles.img} 
                                source={{uri: restaurant.images[0]}}
                                />
                            <View>
                                <Text style={styles.name}>{restaurant.name}</Text>
                                <Text style={styles.info}>{restaurant.address}</Text>
                                <Text style={styles.info}>{restaurant.description}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    )

                }} />
        </View>
    )
}