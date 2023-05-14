import React, { useState } from 'react'
import {  Text,ScrollView,Alert } from 'react-native'
import { styles } from './UploadImageForm.styles'
import { Avatar, Icon } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import LoadingModal from '../../../Shared/LoadingModal/LoadingModal'

export default function UploadImageForm({ formik }: any) {

    const [isLoading, setIsLoading] = useState<boolean>(false)


    const openGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })
        if (!result.canceled) {
            setIsLoading(true)
            uploadImage(result.assets[0].uri)
        }
    }

    const uploadImage = async (uri: string) => {
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            const storage = getStorage();
            const fileName = `restaurant-${Date.now()}-${Math.random()}.jpg`;
            const storageRef = ref(storage, `restaurants/${fileName}`);         
            uploadBytes(storageRef, blob).then((snapshot) => {
                updatePhotosRestaurant(snapshot.metadata.fullPath);
            }).catch((error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    }

    const removeImage =  (img:File) => {
        Alert.alert('Remove Image','Are you sure about removing this image?',
        [
            {
                text:"Cancel",
                style:'cancel'
            },
            {
                text:'Remove',
                onPress:()=>{
                    const result = formik.values.images.filter((image:any) => image !== img)
                    formik.setFieldValue('images',result)
                }
            }
        ],
        {
            cancelable:false
        })
    }

    const updatePhotosRestaurant = async (imagePath: string) => {
        const storage = getStorage();
        const imageRef = ref(storage, imagePath);
        const imageUrl = await getDownloadURL(imageRef);
        if (imageUrl) {
            formik.setFieldValue('images', [...formik.values.images, imageUrl]);
          }
        setIsLoading(false)
      }


    return (
        <>
            <ScrollView 
                style={styles.viewImage} 
                horizontal 
                showsHorizontalScrollIndicator={false}
                >
                <Icon
                    type='material-community'
                    name='camera'
                    color='#a7a7a7'
                    containerStyle={styles.containerIcon}
                    onPress={openGallery}
                />
                {formik.values.images ? formik.values.images.map((img:any) => (
                    <Avatar
                        onPress={()=>removeImage(img)}
                        key={img}
                        source={{ uri: img }}
                        containerStyle={styles.imageStyle}
                    />
                )) : null}
            </ScrollView>
            <Text style={styles.error}>{formik.errors.images}</Text>
            <LoadingModal show={isLoading} text='Uploading Image' />
        </>
    )
}