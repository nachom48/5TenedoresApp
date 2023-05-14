import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Avatar } from '@rneui/base'
import { getAuth, updateProfile } from 'firebase/auth'
import { styles } from './InfoUser.styles'
import * as ImagePicker from 'expo-image-picker'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

interface IInfoUserProps {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    setLoadingText: React.Dispatch<React.SetStateAction<string>>
}

export default function InfoUser({ setLoading, setLoadingText }: IInfoUserProps) {

    const { uid, photoURL, displayName, email } = getAuth().currentUser!;
    const [avatar, setAvatar] = useState(photoURL)

    const changeAvatar = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
        });
        if (!result.canceled) {
            uploadImage(result.assets[0].uri)
        }
    }

    const uploadImage = async (uri: string) => {
        setLoadingText('Uploading Image')
        setLoading(true)
        const response = await fetch(uri);
        const blob = await response.blob();
        const storage = getStorage()
        const storageRef = ref(storage, `avatar/${uid}`)
        uploadBytes(storageRef, blob).then((snapshop) => {
            updatePhotoUrl(snapshop.metadata.fullPath)
        })

    }

    const updatePhotoUrl = async (imagePath: string) => {
        const storage = getStorage()
        const imageRef = ref(storage, imagePath)
        const imageUrl = await getDownloadURL(imageRef)
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) {
            return null; // o un valor predeterminado
        }
        updateProfile(auth.currentUser, { photoURL: imageUrl })
        setAvatar(imageUrl)
        setLoading(false)
    }


    return (
        <View style={styles.userInfoContainer}>
            <Avatar
                containerStyle={styles.avatar}
                size='large'
                rounded
                icon={{ type: 'material-community', name: 'account' }}
                source={avatar ? { uri: avatar } : require('./default-avatar.png')}
                onPress={changeAvatar}
            >
                <Avatar.Accessory 
                    size={28} 
                    style={{ backgroundColor: 'red' }} 
                    />
            </Avatar>
            <View>
                <Text style={styles.displayName}>
                    {displayName || 'Anonimo'}
                </Text>
                <Text>
                    {email}
                </Text>
            </View>
        </View>
    )
}