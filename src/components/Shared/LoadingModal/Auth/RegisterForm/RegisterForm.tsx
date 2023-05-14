import React,{useState} from 'react'
import { Input, Icon, Button } from '@rneui/base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { styles } from './RegisterForm.styles'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './RegisterForm.data'
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth'
import {useNavigation} from '@react-navigation/native'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { screen } from '../../../../../utils/screenName'

export const RegisterForm = () => {

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigation = useNavigation();

  const showHiddenPassword = ()=>{
    setShowPassword((prevState)=> !prevState);
  }

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, formValue.email, formValue.password)
        navigation.navigate(screen.account.account);
      } catch (error) {
        console.log(error);
        Toast.show({
          type:'error',
          position:'bottom',
          text1:'Error at register, try again later'
        })
      }
    }
  })

  return (
    <KeyboardAwareScrollView enableOnAndroid={true}  >
      <Input
        onChangeText={text => formik.setFieldValue('email', text)}
        placeholder='Email'
        containerStyle={styles.input}
        rightIcon={<Icon type='material-community' name='at' iconStyle={styles.icon} />}
        errorMessage={formik.errors.email}
      />
      <Input
        onChangeText={text => formik.setFieldValue('password', text)}
        placeholder='Password'
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={
          <Icon 
          onPress={showHiddenPassword}
          type='material-community' 
          name={showPassword ? 'eye-off-outline' : 'eye-outline' } 
          iconStyle={styles.icon} 
          />
        }
        errorMessage={formik.errors.password}
      />
      <Input
        onChangeText={text => formik.setFieldValue('repeatPassword', text)}
        placeholder='Repeat password'
        containerStyle={styles.input}
        secureTextEntry={true}
        rightIcon={
          <Icon 
            onPress={showHiddenPassword}
            type='material-community' 
            name={showPassword ? 'eye-off-outline' : 'eye-outline' } 
            iconStyle={styles.icon} 
            />
          }
        errorMessage={formik.errors.repeatPassword}
      />
      <Button
        title='Register'
        containerStyle={styles.btnContainer} 
        buttonStyle={styles.btn}
        onPress={() => formik.handleSubmit()}
        loading={formik.isSubmitting}
      />
    </KeyboardAwareScrollView>
  )
}