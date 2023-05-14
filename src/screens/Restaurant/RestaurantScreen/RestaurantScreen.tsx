import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import { styles } from './restaurant.styles'
import { db } from '../../../utils'
import { doc, getDoc } from 'firebase/firestore'
import Loading from '../../../components/Shared/Loading/Loading'
import Header from '../../../components/Restaurant/Header/Header'
import Info from '../../../components/Restaurant/Info/Info'
import CarouselComponent from '../../../components/Shared/Carousel/Carousel'
import BtnReviewForm from '../../../components/Restaurant/BtnReviewForm/BtnReviewForm'
import Reviews from '../../../components/Restaurant/Reviews/Reviews'
import BtnFavorite from '../../../components/Restaurant/BtnFavorite/BtnFavorite'
import { Restaurant } from '../../../utils/interfaces/Restaurant.interface'



export default function RestaurantScreen(props: any) {

  const { route } = props
  const [restaurant, setRestaurant] = useState<Restaurant | undefined>(undefined)

  useEffect(() => {
    async function fetchRestaurant() {
      try {
        const docRef = doc(db, "restaurants", route.params.id.toString());
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRestaurant(docSnap.data() as Restaurant);
        } else {
          console.log("El documento no existe");
        }
      } catch (error) {
        console.log("Error al recuperar el documento: ", error);
      }
    }
    fetchRestaurant();

  }, [route.params.id]);

  if (restaurant === undefined) return <Loading show text="Loading Restaurants" />;
  return (
    <ScrollView style={styles.content}>
      <CarouselComponent
        arrayImages={restaurant.images}
      />
      <Header restaurant={restaurant}/>
      <Info restaurant={restaurant}/>
      <BtnReviewForm idRestaurant={restaurant.id}/>
      <Reviews idRestaurant={route.params.id.toString()}/>
      <BtnFavorite
        idRestaurant={route.params.id.toString()}/>
    </ScrollView>
  )
}