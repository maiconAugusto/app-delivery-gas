import React, { useState, useEffect } from 'react'
import {View ,
        Text, 
        TextInput, 
        TouchableOpacity, 
        StyleSheet, 
        ActivityIndicator, 
        AsyncStorage } 
        from 'react-native';
import Delivery from '../assets/gas.png';
import firebase from 'firebase'

const Login = ({navigation})=>{
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ spinner, setSpinner ] = useState('')

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
        setSpinner(true)
            const response = await firebase.auth().signInWithEmailAndPassword(email, password)
                .then(()=>{
                    setSpinner(false)
                        AsyncStorage.setItem('Email',email)
                            navigation.navigate('Main')
                })
                .catch(()=>{
                    setSpinner(false)
                        console.log('Error')
                })
    }
    function Buttom(){
        if(spinner){
            return(
                <ActivityIndicator style={styles.spinners} size='large' color='white'/>
            )
        }
        return(
            <TouchableOpacity
            onPress={()=> handleLogin()}
            style={styles.button}>
            <Text style={styles.logger}>Entrar</Text>
            </TouchableOpacity>
        )
    }
    return(
        <View style={styles.container}>
            <View style={styles.container_logo}>
                <Text style={styles.logo_text}>HELP</Text>
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
            {Buttom()}
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
        height: 48, 
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
        fontSize: 48,
        color: 'white',
        marginLeft: 8,
        marginTop: 4,
        marginBottom: 40,
        fontWeight:'bold',
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
    },
    spinners:{
        marginTop: 40,
        height: 50,
    }
})
export default Login