import React, { useState } from 'react'
import { View } from 'react-native'
import { Input, Icon, Button } from '@rneui/themed'
import { styles } from './LoginForm.styles'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './LoginForm.data'
import {  getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../../../../utils/screenName'

export const LoginForm = () => {

    const navigation = useNavigation();

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const showPasswordHandler = () => {
        setShowPassword(prevState => !prevState);
    }

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const auth = getAuth();
                await signInWithEmailAndPassword(auth, formValue.email, formValue.password);
                navigation.navigate(screen.account.account);
            } catch (error) {
                console.log(error);
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: 'User or password not valid'
                })
            }
        }
    })

    return (
        <View style={styles.content}>
            <Input
                onChangeText={(text) => formik.setFieldValue('email', text)}
                placeholder='Email'
                containerStyle={styles.input}
                rightIcon={
                    <Icon
                        type='material-community'
                        name='at'
                        iconStyle={styles.icon}
                    />}
                errorMessage={formik.errors.email}
            />
            <Input
                errorMessage={formik.errors.password}
                onChangeText={(text) => formik.setFieldValue('password', text)}
                containerStyle={styles.input}
                placeholder='Password'
                secureTextEntry={showPassword ? false : true}
                rightIcon={
                    <Icon
                        onPress={showPasswordHandler}
                        type='material-community'
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        iconStyle={styles.icon}
                    />}
            />
            <Button
                loading={formik.isSubmitting}
                onPress={() => formik.handleSubmit()}
                title='Log in'
                buttonStyle={styles.btn}
                containerStyle={styles.btnContainer}
            />
        </View>
    )
}

