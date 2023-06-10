import React from 'react'
import {styles} from './Modal.styles'
import { Overlay } from 'react-native-elements'


interface IModalProps{
    show:boolean;
    close:() => void;
    children?:React.ReactNode;
}


export const  Modal = ({show,close,children}:IModalProps) =>{

  return (
    <Overlay isVisible={show} overlayStyle={styles.overlay} onBackdropPress={close}>
        {children}
    </Overlay>
  )
}