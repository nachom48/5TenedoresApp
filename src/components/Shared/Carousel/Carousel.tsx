import React,{useState} from 'react'
import { ScrollView, Dimensions } from 'react-native'
import { Image } from 'react-native-elements'
import {styles} from './carousel.styles'
import CarouselSnap,{Pagination} from 'react-native-snap-carousel'

interface ICarouselProps{
    arrayImages:string[];
    hideDots?:boolean
}

export default function Carousel({arrayImages,hideDots}:ICarouselProps) {

    const [activeDotIndex, setActiveDotIndex] = useState<number>(0);
    const { width } = Dimensions.get('window');

    const pagination = () => {
        return (
            <Pagination
                dotsLength={arrayImages.length}
                activeDotIndex={1}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                containerStyle={styles.dotContainer}
                dotStyle={styles.dot}
            />
        )
    };
    
    const renderItem = ({ item }: any) => (
        <Image 
            source={{ uri: item }} 
            style={{ height: 250, width: width }} 
            />
    );

    return (
        <ScrollView style={styles.content}>
            <CarouselSnap
                onSnapToItem={(index) => setActiveDotIndex(index)}
                layout='default'
                data={arrayImages}
                sliderWidth={width}
                itemWidth={width}
                renderItem={renderItem}
            />
            {!hideDots && pagination()}
        </ScrollView>
    )
}



