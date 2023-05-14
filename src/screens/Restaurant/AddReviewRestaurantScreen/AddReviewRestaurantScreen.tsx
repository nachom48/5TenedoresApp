import { View } from 'react-native'
import React from 'react'
import { styles } from './addReviewRestaurantScreen.styles'
import { AirbnbRating, Button, Input } from 'react-native-elements'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { getAuth } from 'firebase/auth'
import { collection, doc, getDocs,  query, setDoc, updateDoc, where } from 'firebase/firestore'
import { db } from '../../../utils'
import { mean } from 'lodash'
import { useNavigation } from '@react-navigation/native'

export interface Review {
    title: string,
    comment: string,
    rating: number
    id: string,
    idRestaurant: string,
    idUser: string | null,
    avatar: string | null | undefined,
    createdAt: Date
}

interface ReviewFormValues {
    title: string,
    comment: string,
    rating: number
}


export default function AddReviewRestaurantScreen(props: any) {

    const navigation = useNavigation()

    const { route } = props
    const validationSchema = Yup.object({
        title: Yup.string().required('The title is required'),
        comment: Yup.string().required('The comment is required'),
        rating: Yup.number().required('The rating is required')
    })

    const formik = useFormik({
        initialValues: {
            title: '',
            comment: '',
            rating: 3,
        },
        validationSchema,
        onSubmit: async (formValue) => {
            try {
                const idDoc = Math.random().toString()
                const review = createNewReview(formValue, idDoc)

                //save review on fireBase
                await setDoc(doc(db, "reviews", idDoc), review);
                await updateRestaurant()
                navigation.goBack()
            } catch (error) {
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: 'Error sending the review'
                })
            }
        },
        validateOnChange: false,
    })

    const createNewReview = (formValue: ReviewFormValues, idDoc: string): Review => {
        const auth = getAuth();
        const newData: Review = {
            title: formValue.title,
            comment: formValue.comment,
            rating: formValue.rating,
            id: idDoc,
            idRestaurant: route.params.idRestaurant.toString(),
            idUser: auth.currentUser!.uid,
            avatar: auth.currentUser?.photoURL,
            createdAt: new Date()
        }
        return newData
    }

    const updateRestaurant = async () => {
        const q = query(
            collection(db, 'reviews'),
            where('idRestaurant', '==', route.params.idRestaurant.toString())
        );
        try {
            const snapshot = await getDocs(q);
            const reviews = snapshot.docs.map((doc) => doc.data());
            const arrayStars = reviews.map((review) => 
                review.rating);
            const media = mean(arrayStars);
            const restaurantRef = doc(db, 'restaurants', route.params.idRestaurant.toString());
            await updateDoc(restaurantRef, { ratingMedia: media });
        } catch (error) {
            console.log("fallo el snapshot", error)
        }

    };


    return (
        <View style={styles.content}>
            <View>
                <View style={styles.ratingContent}>
                    <AirbnbRating
                        count={5}
                        reviews={['Awful', 'Subpar', 'Regular', 'Very Good', 'Excellent']}
                        size={35}
                        defaultRating={formik.values.rating}
                        onFinishRating={(rating) => formik.setFieldValue('rating', rating)}
                    />
                </View>
                <View>
                    <Input
                        onChangeText={(text) => formik.setFieldValue('title', text)}
                        placeholder='Title'
                        errorMessage={formik.errors.title}
                    />
                    <Input
                        onChangeText={(text) => formik.setFieldValue('comment', text)}
                        placeholder='Coment'
                        multiline
                        inputContainerStyle={styles.comment}
                        errorMessage={formik.errors.comment}
                    />
                </View>
            </View>
            <Button
                onPress={()=>formik.handleSubmit}
                loading={formik.isSubmitting}
                title='Send review'
                buttonStyle={styles.styleBtn}
                containerStyle={styles.btnContainer}
            />
        </View>
    )
}