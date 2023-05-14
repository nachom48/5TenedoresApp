import React from 'react'
import {styles} from './LoadingModal.styles'
import { Overlay,Text } from '@rneui/base' 
import { View,ActivityIndicator } from 'react-native'

interface ILoadingModalProps {
    show:boolean,
    text?:string

}

const LoadingModal = ({show,text}:ILoadingModalProps) => {

  return (
    <Overlay 
        isVisible={show}  
        overlayStyle={styles.overlay}
        >
        <View style={styles.view}>
            <ActivityIndicator 
                size='large' 
                color='#00a680'
            />
            {text && <Text style={styles.text}>{text}</Text>}
        </View>
    </Overlay>
  
  )
}

export default LoadingModal

LoadingModal.defaultProps = {
    show:false
}