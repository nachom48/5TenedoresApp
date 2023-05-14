import React from 'react'
import { View} from 'react-native'
import { styles } from './ChangeDisplayNameForm.styles'
import { Button, Input } from 'react-native-elements'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {getAuth,updateProfile} from 'firebase/auth'
import Toast from 'react-native-toast-message'

interface IChangeDisplayNameFormProps {
    onClose: () => void;
    onReload:() => void;
}

export default function ChangeDisplayNameForm({ onReload,onClose }: IChangeDisplayNameFormProps) {

    const validationSchema = Yup.object({
        displayName:Yup.string().required('The name is required')
    });

    const formik = useFormik({
        initialValues:{
            displayName:''
        },
        validationSchema:validationSchema,
        validateOnChange:false,
        onSubmit:async (formValue)=>{
            try {
                const {displayName} = formValue;
                const currentUser = getAuth().currentUser;
                if (currentUser){
                    await updateProfile(currentUser,{displayName})
                }
                onReload();
                onClose();
            } catch (error) {
                Toast.show({
                    type:'error',
                    position:'bottom',
                    text1:'Error trying to change name and password'
                })
            }
        }

    })

    return (
        <View style={styles.content}>
            <Input
                onChangeText={(text)=>formik.setFieldValue('displayName',text)}
                errorMessage={formik.errors.displayName}
                placeholder='Name and last name'
                rightIcon={{
                    type: 'material-community',
                    name: 'account-circle-outline',
                    color: '#c2c2c2'
                }} />
            <Button
                onPress={()=>formik.handleSubmit}               
                loading={formik.isSubmitting}
                title='Change name and last name'
                buttonStyle={styles.btnStyles}
                containerStyle={styles.btnContainer}
            />
        </View>
    )
}