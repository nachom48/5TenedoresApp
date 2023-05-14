import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../../utils/screenName'
import { styles } from './RestaurantScreen.styles'
import { Icon } from 'react-native-elements'
import { User, getAuth, onAuthStateChanged } from 'firebase/auth'
import { DocumentData, QuerySnapshot, collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../../../utils'
import LoadingModal from '../../../components/Shared/LoadingModal/LoadingModal'
import ListRestaurant from '../../../components/Restaurants/ListRestaurant/ListRestaurant'



const RestaurantsScreen = () => {

  const navigation = useNavigation()

  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [restaurants, setRestaurants] = useState<QuerySnapshot<DocumentData>>()

  //aca lo q hacemos es traer al usario, y setearlo en currentUser
  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
  }, [])


  useEffect(() => {
    const q = query(
      collection(db, "restaurants"),
      orderBy("createdAt", "desc")
    )
    onSnapshot(q, (snapshot) => {
      setRestaurants(snapshot)
    })
  }, [])


  const goToAddRestaurant = () => {
    // navigation.navigate(screen.restaurant.addRestaurant)
    //Como ya estamos en ese stack no hace falta mandarle el tab podria ser solo diretamente screen.restaurant.add
    navigation.navigate(screen.restaurant.addRestaurant);
  }

  return (
    <View style={styles.content}>
      {!restaurants
        ? <LoadingModal show text='Loading'></LoadingModal>
        :<ListRestaurant restaurants={restaurants}/>
      }

      {currentUser && (
        <Icon
          reverse
          type='material-community'
          name='plus'
          color='#00a680'
          containerStyle={styles.btnContainer}
          onPress={goToAddRestaurant}
        />
      )}
    </View>
  )
}

export default RestaurantsScreen