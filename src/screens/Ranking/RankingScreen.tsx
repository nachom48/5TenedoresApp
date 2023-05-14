import { DocumentData, QueryDocumentSnapshot, collection, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import React,{useState,useEffect} from 'react'
import { ScrollView, Text } from 'react-native'
import { db } from '../../utils'
import RestaurantRanking from '../../components/Restaurants/RestaurantRanking/RestaurantRanking'
import { Restaurant } from '../../utils/interfaces/Restaurant.interface'

const RankingScreen =() => {
  const [restaurants,setRestaurants] = useState<Restaurant[]>([])


  useEffect(() => {
    const q = query(
      collection(db,'restaurants'),
      orderBy('ratingMedia','desc'),
      limit(3)
    )
    onSnapshot(q,(snapshot)=>{
      const restaurantArray = snapshot.docs.map(doc => doc.data() as Restaurant)
      setRestaurants(restaurantArray)
    })
  }, [])
  
  return (
    <ScrollView>
      {restaurants.map((restaurant,index)=>{
        return (
          <RestaurantRanking 
            key={index}
            index={index}
            restaurant={restaurant}
            />

        )
      })}
    </ScrollView>
  )
}

export default RankingScreen