import { View, ScrollView } from 'react-native'
import React from 'react'
import { styles } from './LoginScreen.styles'
import { Text, Image } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import { LoginForm } from '../../../components/Shared/LoadingModal/Auth/LoginForm/LoginForm'
import { screen } from '../../../utils/screenName'


export const LoginScreen = () => {

  const navigation = useNavigation()

  const goToRegister = () => {
    navigation.navigate(screen.account.register)
  }

  return (
    <ScrollView>
      <Image
        source={require('../../../../assets/img/5tenedoreslogo.png')}
        style={styles.image}
      />
      <View style={styles.content}>
        <LoginForm />
        <Text style={styles.textRegister}>
          Don't have an account yet?
          <Text
            style={styles.btnRegister}
            onPress={goToRegister}>
            {' '} Register
          </Text>
        </Text>
      </View>
    </ScrollView>
  )
}


