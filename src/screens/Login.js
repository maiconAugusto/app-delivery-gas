import React, { useState, useEffect } from 'react'
import { View ,Text, TextInput, TouchableOpacity, StyleSheet, Image, AsyncStorage } from 'react-native';
import Delivery from '../assets/gas.png';
import firebase from 'firebase'

const Login = ({navigation})=>{
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    useEffect(()=>{
        AsyncStorage.getItem('Email').then((response)=>{
            if( response === null){
                return
            }
            else{
                navigation.navigate('Main')
            }
        })
    },[])

    async function handleLogin(){
        try{
            const response = await firebase.auth().signInWithEmailAndPassword(email, password)
            await AsyncStorage.setItem('Email',JSON.stringify(response.user.email))
            navigation.navigate('Main')
        }
        catch(err){

        }
    }
    return(
        <View style={styles.container}>
            <View style={styles.container_logo}>
                <Image style={styles.logo} source={Delivery}/>
                <Text style={styles.logo_text}>HELP-GÁS</Text>
            </View>
            <TextInput
            style={styles.input}
            placeholder=" Login"
            placeholderTextColor="#323232"
            onChangeText={(text)=> setEmail(text)}
            />
            <TextInput
            style={styles.input}
            placeholder=" Password"
            placeholderTextColor="#323232"
            secureTextEntry
            onChangeText={(text)=> setPassword(text)}
            />
            <TouchableOpacity
                onPress={()=> handleLogin()}
                style={styles.button}>
                <Text style={styles.logger}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.register} 
                onPress={()=> navigation.navigate('Register')}>
                <Text style={styles.text_register}>Não tem cadastro? Cadastre-se</Text>
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
        borderRadius: 4,
        height: 47
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
    container_logo:{
        flexDirection: 'column',
        alignItems: 'center'
    },
    logo_text:{
        fontSize: 40,
        color: '#E67E22',
        marginLeft: 8,
        marginTop: 4,
        marginBottom: 40,
        fontWeight:'bold'
    },
    logo:{
        width: 90,
        height :140,
    },
    register:{
        marginTop: 25,
    },
    text_register:{
        color: 'white'
    }
})
export default Login