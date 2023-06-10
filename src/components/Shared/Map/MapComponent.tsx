import React from 'react'
import {styles} from './mapComponent.styles'
import MapView, {  Marker } from 'react-native-maps'
import openMap from 'react-native-open-maps'

interface IMapComponentProps{
    name:string,
    location:{
        latitude:number,
        longitude:number,
        latitudeDelta:number;
        longitudeDelta:number;
    }
}

export default function MapComponent({location,name}:IMapComponentProps) {
    
    const openAppMap = ()=>{
        openMap({
            latitude:location.latitude,
            longitude:location.longitude,
            zoom:19,
            query:name
        })
    }

  return (
    <MapView 
        onPress={openAppMap}
        initialRegion={location} 
        style={styles.content}
        >
        <Marker coordinate={location}/>
    </MapView>
  )
}