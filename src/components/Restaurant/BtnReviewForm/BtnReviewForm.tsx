import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { styles } from './btnReviewForm.styles'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { screen } from '../../../utils/screenName';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../../utils';

interface IBtnReviewFormProps {
    idRestaurant: number;
}

export default function BtnReviewForm({ idRestaurant }: IBtnReviewFormProps) {
    const [hasReview,setHasReview] = useState<boolean>(false)
    const [hasLogged, setHasLogged] = useState<boolean>(false)

    const auth = getAuth()
    const navigate = useNavigation()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setHasLogged(user ? true : false)
        })
    }, [])

    useEffect(() => {
        if(hasLogged){
            //here we make a query to search for a review made by the currentUser and to this restaurant
            const q = query(
                collection(db,'reviews'),
                where('idRestaurant','==',idRestaurant.toString()),
                where('idUser','==',auth.currentUser?.uid)
            )
            onSnapshot(q,(snapshot)=>{
                if(snapshot.docs.length>0){
                    setHasReview(true)
                }
            })
        }
      
    }, [hasLogged])


    const goToLogIn = () => {
        navigate.navigate(screen.account.tab, {
            screen: screen.account.login,
        });
    }

    const goToAddReview = () =>{
        navigate.navigate(screen.restaurant.addReview,{idRestaurant})
    }


    if(hasLogged && hasReview){
        return (<View style={styles.content}>
            <Text style={styles.textSendReview}>You have already send a review to this restaurant</Text>
        </View>)
    }

    return (
        <View style={styles.content}>
            {hasLogged
                ? <Button
                    onPress={goToAddReview}
                    title='Write an opinion'
                    icon={{
                        type: 'material-community',
                        name: 'square-edit-outline',
                        color: '#00a680'
                    }} 
                    titleStyle={styles.btnText}
                    buttonStyle={styles.button}/>
                : <Text
                    onPress={goToLogIn}
                    style={styles.text}
                >
                    In order to write an opinion you must log in first{' '}
                    <Text style={styles.textClick}>PULSE HERE to Log In</Text>
                </Text>}
        </View>
    )
}