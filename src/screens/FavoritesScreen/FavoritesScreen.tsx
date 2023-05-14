import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import { styles } from './FavoritesScreen.styles'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import UserNotLogged from '../../components/Favorites/UserNotLogged/UserNotLogged'
import {  collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../utils'
import { Favorite } from '../../utils/interfaces/Favorite.interface'
import { Restaurant } from '../../utils/interfaces/Restaurant.interface'
import Loading from '../../components/Shared/Loading/Loading'
import NotFoundRestaurant from '../../components/Favorites/NotFoundRestaurant/NotFoundRestaurant'
import RestaurantFavorites from '../../components/Favorites/RestaurantFavorites/RestaurantFavorites'




const FavoritesScreen = () => {
  const [isLogged, setIsLogged] = useState<boolean>()
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const user = getAuth()

  useEffect(() => {
    onAuthStateChanged(user, () => {
      if (user.currentUser) {
        setIsLogged(true)
      }
    })
  }, [])

useEffect(() => {
  if (user.currentUser?.uid) {
    const q = query(
      collection(db, 'favorites'),
      where('idUser', '==', user.currentUser?.uid)
    )
    onSnapshot(q, async (snapshot) => {
      const restaurantArray: Restaurant[] = [];
      for await (const item of snapshot.docs) {
        const data = item.data() as Favorite;
        //In firebase, to get a particular doc, first you have to get the reference, then you have to getDoc the ref.
        const docRef = doc(db, 'restaurants', data.idRestaurant)
        const docSnap = await getDoc(docRef)
        const newData = docSnap.data() as Restaurant;
        if (newData) {
          newData.idFavorite = data.id;
          restaurantArray.push(newData)
        }
      }
      setRestaurants(restaurantArray);
    })
  }
}, [user.currentUser?.uid]);

  if (!isLogged) return <UserNotLogged />

  if (!restaurants) return <Loading show text='Loading' />

  if (restaurants.length === 0) return <NotFoundRestaurant />

  return (
    <ScrollView>
      {restaurants.length>0 && restaurants.map((restaurant)=>{
        return <RestaurantFavorites 
          key={restaurant.id} 
          restaurant={restaurant}
          />
      })}
    </ScrollView>
  )
}

export default FavoritesScreen