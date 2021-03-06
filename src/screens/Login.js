import React, { useState, useEffect } from 'react'
import {View ,
        Text, 
        TextInput, 
        TouchableOpacity, 
        StyleSheet, 
        ActivityIndicator, 
        AsyncStorage } 
        from 'react-native';
import firebase from 'firebase'

const Login = ({navigation})=>{
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ spinner, setSpinner ] = useState('')

    useEffect(()=>{
        AsyncStorage.getItem('Email').then((response)=>{
            response === null ? null :  navigation.navigate('Main')
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
                .catch((response)=>{
                    setSpinner(false)
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
            <TextInput
            style={styles.input}
            placeholder=" E-mail"
            placeholderTextColor="#323232"
            onChangeText={(text)=> setEmail(text)}
            />
            <TextInput
            style={styles.input}
            placeholder=" Senha"
            placeholderTextColor="#323232"
            secureTextEntry
            onChangeText={(text)=> setPassword(text)}
            />
            {Buttom()}
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex : 1,
        backgroundColor :'#0066ff',
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
        backgroundColor:'#0FDD7F',
        marginTop: 40,
        height: 50,
        justifyContent: 'center',
        borderRadius: 4
    },
    logger:{
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
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
    },
    spinners:{
        marginTop: 40,
        height: 50,
    }
})
export default Login