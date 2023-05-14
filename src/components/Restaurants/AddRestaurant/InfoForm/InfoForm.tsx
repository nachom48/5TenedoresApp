import React, { useState } from 'react'
import { View, Text } from 'react-native'
import {styles} from './InfoForm.styles'
import { Input } from 'react-native-elements'
import MapForm from '../MapForm/MapForm'


interface IInfoFormProps{
    formik:any
}

export default function InfoForm({formik}:IInfoFormProps) {

    const [showMap,setShowMap] = useState<boolean>(false)

    const onOpenCloseMap = ()=>{
        setShowMap((prevState)=>!prevState)
    }


  return (
    <>
    <View style={styles.content}>
      <Input
        placeholder='Restaurant´s name'
        onChangeText={(text)=>formik.setFieldValue('name',text)}
        errorMessage={formik.errors.name}
      />
      <Input
        placeholder='Address'
        rightIcon={{
            type:'material-community',
            name:'map-marker-radius',
            color:getColorIconMap(formik),
            onPress:onOpenCloseMap
        }}
        onChangeText={(text)=>formik.setFieldValue('address',text)}
        errorMessage={formik.errors.address}
      />
      <Input
        placeholder='Telephone Number'
        onChangeText={(text)=>formik.setFieldValue('phone',text)}
        errorMessage={formik.errors.telephone}
      />
       <Input
        placeholder='Email'
        onChangeText={(text)=>formik.setFieldValue('email',text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder='Description of the restaurant' 
        multiline={true}
        inputContainerStyle={styles.textArea}
        onChangeText={(text)=>formik.setFieldValue('description',text)}
        errorMessage={formik.errors.description}
      />
    </View>
    <MapForm formik={formik} show={showMap} close={onOpenCloseMap}/>
    </>
  )
}


const getColorIconMap = (formik: any) => {
  if (formik.errors.location) {
    return "#ff0000";
  }
  if (formik.values.location !== null ) {
    return "#00a680";
  }
  return "#c2c2c2";
};