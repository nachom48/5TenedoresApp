import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { styles } from './btnFavorite.styles'
import { Icon } from 'react-native-elements';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { getAuth } from 'firebase/auth';
import { db } from '../../../utils';
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';

interface IBtnFavoriteProps {
  idRestaurant: string;
}

const BtnFavorite = ({ idRestaurant }: IBtnFavoriteProps) => {

  const [isFavorite, setIsFavorite] = useState<boolean>()
  const [isReaload, setIsReaload] = useState<boolean>(false)

  useEffect(() => {
    (async () => {
      const response = await getFavorites();
      if (response && response.length > 0) {
        setIsFavorite(true)
      }
      else {
        setIsFavorite(false)
      }
    })()

  }, [idRestaurant, isReaload])

  const onReload = () => {
    setIsReaload((prevState) => !prevState)
  }

  const getFavorites = async () => {

    //This query is = Search in the DataBase , the collection favorites, and idRestaurant that is the same than the current Restaurant, 
    // and the idUser is the same than the CurrentUser
    if (auth.currentUser?.uid) {
      const q = query(
        collection(db, 'favorites'),
        where('idRestaurant', '==', idRestaurant),
        where('idUser', '==', auth.currentUser?.uid)
      );
      //This return all the docs of the collection that match the query
      const result = await getDocs(q);
      return result.docs;
    }

  }

  //TO obtain ID from User logged
  const auth = getAuth();

  const addfavorite = async () => {
    try {
      //1)Step - Create the ID the save the data
      const idFavorite = Math.random().toString();
      //2)Step - Create the data to save
      if (auth.currentUser?.uid) {
        console.log("entro aca xq existe")
        const data = {
          id: idFavorite,
          idRestaurant,
          idUser: auth.currentUser?.uid
        }
        //To save the data en create the collection
        await setDoc(doc(db, "favorites", idFavorite), data);
        onReload();
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error sending the review'
      })
    }
  }


  const removeFavorite = async() => {
    try {
      //To remove this
      const response = await getFavorites();
      if(response){
        response.forEach(async res => {
          await deleteDoc(doc(db,'favorites',res.id))
        });
        onReload()
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <View style={styles.content}>
      {isFavorite !== undefined &&
        <Icon
          type='material-community'
          name={isFavorite ? 'heart' : 'heart-outline'}
          color={isFavorite ? 'red' : 'black'}
          size={35}
          onPress={isFavorite ? removeFavorite : addfavorite} />}
    </View>
  )
}

export default BtnFavorite;
