import * as Yup from 'yup'


export function initialValues () {
    return {
        email:'',
        password:'',
    }
}

export function validationSchema () {
    return Yup.object({
        email: Yup.string().email('The email is not correct').required('The email is obligatory'),
        password: Yup.string().required('The password is obligatory'),
    })
}