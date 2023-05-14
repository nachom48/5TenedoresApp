import React from 'react'
import { View } from 'react-native'
import { styles } from './UserNotLogged.styles'
import { Button, Icon, Text } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../../utils/screenName'

export default function UserNotLogged() {

    const navigate = useNavigation()

    const goToLogin = () => {
        navigate.navigate(screen.account.tab, {
            screen: screen.account.login
        })
    }



    return (
        <View style={styles.content}>
            <Icon
                type='material-community'
                name='alert-outline'
                size={80}
            />
            <Text style={styles.info}>
                You need to be logged in to view this section
            </Text>
            <Button
                title='Go to log in'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={goToLogin}
            />
        </View>
    )
}