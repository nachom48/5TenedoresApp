import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Text, AirbnbRating, ListItem, Avatar } from 'react-native-elements'
import { styles } from './reviews.styles'
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../../../utils'
import Loading from '../../Shared/Loading/Loading'
import {DateTime} from 'luxon'
import 'intl'
import 'intl/locale-data/jsonp/es'



interface IReviewProps {
    idRestaurant: string;
}

interface ReviewData {
    id: string;
    avatar?: string
    title: string;
    rating: number;
    comment: string;
    createdAt: Date;
}


export default function Reviews({ idRestaurant }: IReviewProps) {

    const [reviews, setReviews] = useState<ReviewData[]>([]);
    useEffect(() => {
        const q = query(
            collection(db, "reviews"),
            where("idRestaurant", "==", idRestaurant.toString()),
            orderBy("createdAt", "desc")
        );
        onSnapshot(q, (snapshot) => {
            const reviewsData = snapshot.docs.map((doc) => {
                const data = doc.data() as ReviewData;
                return {
                    ...data,
                    id: doc.id,
                };
            });
            setReviews(reviewsData);
        });
    }, []);

    if (!reviews) {
        return <Loading show text='Loading'></Loading>
    }

    const defaultImage = require('../../../../assets/img/user-guest.png')

    return (

        <View style={styles.content}>
            {reviews.map((review, index) => {
                    const createdReview = new Date(review.createdAt.seconds * 1000);
                    return (
                    <ListItem
                        bottomDivider
                        containerStyle={styles.review}
                        key={index}
                    >
                        <Avatar
                            rounded
                            source={{ uri: review && review.avatar ? review.avatar : defaultImage }}
                            size={50}
                        />
                        <ListItem.Content >
                            <ListItem.Title style={styles.title}>{review.title}</ListItem.Title>
                            <View style={styles.subtitle}>
                                <Text style={styles.comment}>
                                    {review.comment}
                                </Text>
                                <View style={styles.contentRatingDate}>
                                    <AirbnbRating
                                        isDisabled
                                        defaultRating={review.rating}
                                        showRating={false}
                                        size={15}
                                        starContainerStyle={styles.containerStyle}
                                    />
                                    <Text style={styles.date}>{DateTime.fromISO(createdReview.toISOString()).toFormat('yyyy/LL/dd - hh:mm')}</Text>
                                </View>
                            </View>
                        </ListItem.Content>
                    </ListItem>
                )
            })}
        </View>
    )
}