import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { styles } from './MapForm.styles'
import { Modal } from '../../../Shared/Modal/Modal'
import * as Location from 'expo-location'
import Toast from 'react-native-toast-message'
import MapView, { Marker } from 'react-native-maps'
import { Button } from 'react-native-elements'

interface IMapFormProps {
    show: boolean,
    close: () => void,
    formik:any
}

export default function MapForm({ show, close,formik }: IMapFormProps) {
    const [location, setLocation] = useState({
        latitude: 0.001,
        longitude: 0.001,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
    })

    useEffect(() => {
        (async () => {

            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Toast.show({
                    type: 'info',
                    position: 'bottom',
                    text1: 'You have to go to activate your location on your device'
                })
                return;
            }
            const locationTemp = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude: locationTemp.coords.latitude,
                longitude: locationTemp.coords.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001
            });
        })();
    }, []);

    const saveLocation = () =>{
        formik.setFieldValue('location',location)
        close()
    }



    return (
        <Modal show={show} close={close}>
            <MapView
                onRegionChange={(locationTemp) => setLocation(locationTemp)}
                showsUserLocation={true}
                initialRegion={location}
                style={styles.mapStyle}>
                <Marker draggable coordinate={location} />
            </MapView>
            <View style={styles.mapActions}>
                <Button
                    title='Save'
                    containerStyle={styles.btnMapContainerSave}
                    buttonStyle={styles.btnMapSave}
                    onPress={saveLocation}
                />
                <Button
                    title='Close'
                    containerStyle={styles.btnMapContainerCancel}
                    buttonStyle={styles.btnMapCancel} 
                    onPress={close}
                />
            </View>
        </Modal>
    )
}