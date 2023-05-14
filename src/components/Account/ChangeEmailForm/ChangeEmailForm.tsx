import { View } from 'react-native'
import React, { useState } from 'react'
import { Button, Input } from 'react-native-elements'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { styles } from './ChangeEmailForm.styles'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { getAuth, updateEmail, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'


interface IChangeEmailFormProps{
    onReload:any,
    onClose:any
}

export default function ChangeEmailForm({onReload,onClose}:IChangeEmailFormProps) {

    const [showPassword,setShowPassword] =useState<boolean>(false)

    const validationSchema = Yup.object({
        email: Yup.string().email('Must be an email valid').required('The email is required'),
        password: Yup.string().required('The password is required')
    })

    const onShowPassword = () =>{
        setShowPassword((prevState) =>!prevState)
    }


    const formik = useFormik({
        initialValues: {
            email: '',
            password:''
        },
        validationSchema,
        onSubmit:async (formValues) => {
            try {

                const {email} = formValues
                const currentUser = getAuth().currentUser;
                if(currentUser){
                    const credentials = EmailAuthProvider.credential(currentUser.email,formValues.password)
                    reauthenticateWithCredential(currentUser,credentials)
                    await updateEmail(currentUser,email)
                }
                onReload(),
                onClose()
            } catch (error) {
                Toast.show({
                    type:'error',
                    position:'bottom',
                    text1:'Error trying to change the email'
                })
            }
        }
    })



    return (
        <View style={styles.content}>
            <Input
                containerStyle={styles.input}
                onChangeText={(text) => formik.setFieldValue('email', text)}
                errorMessage={formik.errors.email}
                placeholder='Email'
                rightIcon={{
                    type: 'material-community',
                    name: 'at',
                    color: '#c2c2c2'
                }}
            />
              <Input
               secureTextEntry={showPassword? false:true}
                onChangeText={(text) => formik.setFieldValue('password', text)}
                errorMessage={formik.errors.password}
                placeholder='Password'
                rightIcon={{
                    type: 'material-community',
                    name: showPassword ? 'eye-off-outline': 'eye-outline',
                    color: '#c2c2c2',
                    onPress:onShowPassword
                }}
            />
            <Button
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting}
                title='Change email'
                buttonStyle={styles.btnStyles}
                containerStyle={styles.btnContainer}
            />
        </View>
    )
}