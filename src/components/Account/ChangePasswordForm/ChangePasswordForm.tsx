import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Button, Input } from 'react-native-elements'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { styles } from './ChangePasswordForm.styles'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import {  EmailAuthProvider, getAuth, reauthenticateWithCredential,  updatePassword } from 'firebase/auth'


interface IChangeEmailFormProps{
    onClose:any
}

export default function ChangePasswordForm({onClose}:IChangeEmailFormProps) {

    const [showPassword,setShowPassword]=useState<boolean>(false)


    const onShowPassword = ()=> setShowPassword((prevState)=>!prevState)

    const validationSchema = Yup.object({
        currentPassword: Yup.string().required('The password is required'),
        password:Yup.string().required('A new password is required'),
        repeatPassword: Yup.string().required('The password is obligatory').oneOf([Yup.ref('password')],'The passwords must be equalss')
    })


    const formik = useFormik({
        initialValues: {
            currentPassword: '',
            password:'',
            repeatPassword:''
        },
        validationSchema,
        onSubmit:async (formValues) => {
            try {
                const currentUser = getAuth().currentUser;
                if(currentUser){
                    const credentials = EmailAuthProvider.credential(currentUser.email!,formValues.password)
                    reauthenticateWithCredential(currentUser,credentials)
                    await updatePassword(currentUser,formValues.currentPassword)
                }
                onClose()
            } catch (error) {
                Toast.show({
                    type:'error',
                    position:'bottom',
                    text1:'Error trying to change the password'
                })
            }
        }
    })

    return (
        <View style={styles.content}>
            <Input
                secureTextEntry={showPassword? false : true}
                containerStyle={styles.input}
                onChangeText={(text) => formik.setFieldValue('currentPassword', text)}
                errorMessage={formik.errors.currentPassword}
                placeholder='Current Password'
                rightIcon={{
                    type: 'material-community',
                    name: showPassword? 'eye-off-outline' : 'eye-outline',
                    color: '#c2c2c2',
                    onPress:onShowPassword
                }}
            />
               <Input
                secureTextEntry={showPassword? false : true}
                containerStyle={styles.input}
                onChangeText={(text) => formik.setFieldValue('password', text)}
                errorMessage={formik.errors.password}
                placeholder='New password'
                rightIcon={{
                    type: 'material-community',
                    name: showPassword? 'eye-off-outline' : 'eye-outline',
                    color: '#c2c2c2',
                    onPress:onShowPassword
                }}
            />
             <Input
                secureTextEntry={showPassword? false : true}
                containerStyle={styles.input}
                onChangeText={(text) => formik.setFieldValue('repeatPassword', text)}
                errorMessage={formik.errors.repeatPassword}
                placeholder='Repeat new password'
                rightIcon={{
                    type: 'material-community',
                    name: showPassword? 'eye-off-outline' : 'eye-outline',
                    color: '#c2c2c2',
                    onPress:onShowPassword
                }}
            />
            <Button
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting}
                title='Change name and last name'
                buttonStyle={styles.btnStyles}
                containerStyle={styles.btnContainer}
            />
        </View>
    )
}