import React from 'react'
import { ScrollView } from 'react-native'
import { styles } from './UserGuestScreen.styles'
import { Text, Button, Image } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../../utils/screenName'

const UserGuestScreen = () => {
  const navigation = useNavigation();
  const goToLogin = () => {
    navigation.navigate(screen.account.login);
  }

  return (
    <ScrollView 
      centerContent={true} 
      style={styles.contentBody}
      >
      <Image 
        source={require("../../../../assets/img/user-guest.png")} 
        style={styles.image} 
        />
      <Text style={styles.title}>Check your profile of 5-Tenedores</Text>
      <Text style={styles.description}>
        How would you describe your preffered restaurant?
        Search and visualize the best
        restaurants in a simple way , vote will you liked the most and comment about your experience
      </Text>
      <Button 
        title='View your profile' 
        onPress={goToLogin} 
        buttonStyle={styles.btnStyle} 
        />
    </ScrollView>
  )
}

export default UserGuestScreen
