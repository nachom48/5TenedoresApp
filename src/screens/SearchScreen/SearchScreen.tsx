import React, { useState, useEffect } from 'react'
import { View,ScrollView, Text } from 'react-native'
import { styles } from './SearchScreen.styles'
import { SearchBar, ListItem, Avatar, Icon } from 'react-native-elements'
import Loading from '../../components/Shared/Loading/Loading'
import { collection, endAt, getDocs, limit, orderBy, query, startAt } from 'firebase/firestore'
import { db } from '../../utils'
import { Restaurant } from '../../utils/interfaces/Restaurant.interface'
import {useNavigation} from '@react-navigation/native'
import { screen } from '../../utils/screenName'

const SearchScreen = () => {

  const navigation = useNavigation()
  const [searchText, setSearchText] = useState<string>('')
  const [searchResults, setSearchResults] = useState<Restaurant[]>()

  const goToRestaurant = (idRestaurant:number)=>{
    console.log("recibo esta ide" ,idRestaurant)
    if (idRestaurant){
      navigation.navigate(screen.restaurant.tab,{
        screen: screen.restaurant.restaurant,
        params :{
          id : idRestaurant
        }
      })
    }
  }

  useEffect(() => {
    const getRestaurants = async () => {
      const q = query(
        collection(db, "restaurants"),
        orderBy("name"),
        startAt(searchText),
        endAt(`${searchText}\uf8ff`),
        limit(20)
      );
      const querySnapshot = await getDocs(q);
      const restaurants = querySnapshot.docs.map((doc) => doc.data()) as Restaurant[];
      setSearchResults(restaurants);
    };
    if (searchText !== "") {
      getRestaurants();
    } else {
      setSearchResults([]);
    }
  }, [searchText]);
  

  return (
    <>
      <SearchBar
        placeholder='Search your restaurant'
        value={searchText}
        onChangeText={(text)=>setSearchText(text)}
      />
      {!searchResults && <Loading show text='Loading' />}
      <ScrollView>
        {searchResults && searchResults.length === 0 ?
          <View style={{alignItems:'center',marginTop:20}}>
            <Text>
              No results have been found
            </Text>
          </View>
          : searchResults?.map((el)=>{
            return (
                <ListItem 
                  key={el.id} 
                  bottomDivider 
                  onPress={()=>goToRestaurant(el.id)}
                  >
                    <Avatar 
                      source={{uri:el.images[0]}} 
                      rounded/>
                    <ListItem.Content>
                      <ListItem.Title>
                        {el.name}
                      </ListItem.Title>
                    </ListItem.Content>
                    <Icon
                      type='material-community'
                      name="chevron-right"
                      />
                </ListItem>
            )
          })}
      </ScrollView>
    </>

  )
}

export default SearchScreen