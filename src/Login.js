import React from 'react'
import { View ,Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native'
import Delivery from './assets/delivery.png'

const Login = ()=>{
    return(
        <View style={styles.container}>
            <Image style={styles.logo} source={Delivery}/>
            <TextInput
            style={styles.input}
            placeholder=" Login"
            placeholderTextColor="#323232"
            />
            <TextInput
            style={styles.input}
            placeholder=" Password"
            placeholderTextColor="#323232"
            />
            <TouchableOpacity style={styles.button}>
                <Text style={styles.logger}>Login</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex : 1,
        backgroundColor :'#2476E6',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center'
    },
    input:{
        alignSelf: 'stretch',
        marginLeft: 10,
        marginRight: 10,
        backgroundColor:'white',
        marginBottom: 12,
        borderRadius: 4
    },
    button:{
        alignSelf: 'stretch',
        marginRight: 10,
        marginLeft: 10,
        backgroundColor:'white',
        marginTop: 40,
        height: 50,
        justifyContent: 'center',
        borderRadius: 4
    },
    logger:{
        textAlign: 'center',
        color: '#323232',
        fontSize: 18,
        fontWeight: '600'
    },
    logo:{
        width: 150,
        height :150,
        marginBottom: 30
    }
})
export default Login