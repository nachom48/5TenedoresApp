import React from 'react'
import { ScrollView, View } from 'react-native'
import { styles } from './AddRestaurantScreen.styles'
import InfoForm from '../../../components/Restaurants/AddRestaurant/InfoForm/InfoForm'
import { Button } from '@rneui/base'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import UploadImageForm from '../../../components/Restaurants/AddRestaurant/UploadImageForm/UploadImageForm'
import ImageRestaurant from '../../../components/Restaurants/AddRestaurant/ImageRestaurant/ImageRestaurant'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../../utils'
import { useNavigation } from '@react-navigation/native'

interface FormValues {
  name: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  location: null | {
    latitude: number;
    longitude: number;
  };
  images: string[];
  id?: number;
  createdAt?: Date;
}

const AddRestaurantScreen = () => {

  const navigation = useNavigation()

  const validationSchema = Yup.object({
    name: Yup.string().required('The name is required'),
    address: Yup.string().required('The address is required'),
    phone: Yup.string().required('The telephone is required'),
    email: Yup.string().email('It isnt a valid email').required('The email is required'),
    description: Yup.string().required('The description is required'),
    location:Yup.object().required('The location is required'),
    images:Yup.array().min(1,'At least one image is required').required('An image is required')
  })


  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      phone: '',
      email: '',
      description: '',
      location:null,
      images:[],
    },
    validationSchema,
    validateOnChange:false,
    onSubmit: async(formValue: FormValues) => {
      try {
        const newData: FormValues = { ...formValue };
        newData.id = Math.random();
        newData.createdAt = new Date();
        const myDb = doc(db, "restaurants", newData.id.toString());        
        await setDoc(myDb, newData);
        navigation.goBack();
      } catch (error) {
        console.log(error)
      }
    }
  })


  return (
    <ScrollView>
      <ImageRestaurant images={formik.values.images}/>
      <InfoForm 
        formik={formik} 
        />
      <UploadImageForm formik={formik}></UploadImageForm>
      <Button
        title='Create Restaurant'
        buttonStyle={styles.addRestaurant}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </ScrollView>
  )

}
export default AddRestaurantScreen