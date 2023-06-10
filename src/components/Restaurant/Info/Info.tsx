import React from 'react'
import { View } from 'react-native'
import { Icon, ListItem, Text } from 'react-native-elements'
import { styles } from './info.styles'
import MapComponent from '../../Shared/Map/MapComponent'
import { Restaurant } from '../../../utils/interfaces/Restaurant.interface'

interface IInfoProps {
    restaurant: Restaurant
}

export default function Info({ restaurant }: IInfoProps) {

    const listInfo = [
        {
            text: restaurant.address,
            iconName: 'map-marker',
            iconType:'material-community'
        },
        {
            text:restaurant.phone,
            iconType:'material-community',
            iconName:'phone'
        },
        {
            text:restaurant.email,
            iconType:'material-community',
            iconName:'at'
        }

    ]

    

    return (
        <View style={styles.content}>
            <Text style={styles.title}>Information about the restaurant</Text>
            <MapComponent 
                location={restaurant.location} 
                name={restaurant.name}
                />
            {listInfo.map((item, index) => {
                return (
                    <ListItem key={index} bottomDivider>
                        <Icon 
                            type={item.iconType}
                            name={item.iconName} 
                            color='#00a680' 
                            />
                        <ListItem.Content>
                            <ListItem.Title>{item.text}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                )
            })}

        </View>
    )
}