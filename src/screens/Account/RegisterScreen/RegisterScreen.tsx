import { View } from 'react-native'
import React from 'react'
import { styles } from './RegisterScreen.styles'
import { Image } from '@rneui/base'
import { RegisterForm } from '../../../components/Shared/LoadingModal/Auth/RegisterForm/RegisterForm'


export const RegisterScreen = () => {
  return (
    <View>
      <Image
        source={require('../../../../assets/img/5tenedoreslogo.png')}
        style={styles.image}
      />
      <View style={styles.content}>
        <RegisterForm />
      </View>
    </View>
  )
}
