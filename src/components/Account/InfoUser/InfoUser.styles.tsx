import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    userInfoContainer:{
        flex: 1,
        marginTop:10,
        paddingTop:10,
        alignItems:'center',
        justifyContent:'flex-start',
        width:'100%',
        backgroundColor:'white',
        maxHeight: '20%',
    },
    avatar:{
        marginRight:30,
        backgroundColor:'green'
    },
    displayName:{
        fontWeight:'bold',
        paddingBottom:5
    }
})