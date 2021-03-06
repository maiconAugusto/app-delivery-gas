import React, { useState, useEffect } from 'react'
import {View, 
        TextInput, 
        TouchableOpacity, 
        StyleSheet, 
        Text,
        ActivityIndicator
        } from 'react-native'
import firebase from '../config/firebase'
import base64 from 'base-64'
import axios from 'axios'
import date from '../config/Date'
import Geolocalização from 'react-native-geolocation-service'

const Register = ({navigation})=>{

    const [ name, setName ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ passwordComfirm, setPasswordcomfirm] = useState('')
    const [ email, setEmail ] = useState('')
    const [ phone, setPhone ] = useState('')
    const [ spinner, setSpinner ] = useState('')
    const [ registerSucess, setRegisterSecess ] = useState('')
    const [ longitude,  setLongitude ] = useState('')
    const [ latitude, setLatitude ] = useState('')

    useEffect(()=>{
        handleLocation()
    },[])

    async function handleLocation(){
        const Location = await Geolocalização.getCurrentPosition((data)=>{
            const { latitude, longitude } = data.coords
            setLatitude(JSON.stringify(latitude))
            setLongitude(JSON.stringify(longitude))
        },(err)=>{

        })
    }

    async function handleRegister(){

        setSpinner(true)
        const email_ID = base64.encode(email)
        if(!name || !email || !password || !phone) return setSpinner(false)
        if( password !== passwordComfirm) return setSpinner(false)

        const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(()=>{
                axios.post(`Users/${email_ID}.json`,{
                    name, phone, email, created: date, geolocalization:{
                        latitude, longitude
                    } })    
            }) 
            .then(()=>{
                setRegisterSecess(true)
            })
            .catch(()=>{
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
                onPress={()=> handleRegister()}
                style={styles.button}>
                <Text style={styles.text_register}>Cadastrar</Text>
            </TouchableOpacity>
        )
    }
    function handleSucess(){
        setTimeout(function(){
            setRegisterSecess(false)
            setSpinner(false)
            navigation.goBack()
        },3000)
        return(
            <Text style={styles.registerSucess}>Cadastro realizado com sucesso</Text>
        )
    }
    return(
        <View style={styles.container}>
            <TextInput
            style={styles.input}
            placeholder=" Nome"
            placeholderTextColor="#323232"
            onChangeText={(text) => setName(text)}
            />
            <TextInput
            style={styles.input}
             placeholder=" E-mail"
             placeholderTextColor="#323232"
             onChangeText={(text) => setEmail(text)}
            />
            <TextInput
            style={styles.input}
             placeholder=" Telefone"
             placeholderTextColor="#323232"
             onChangeText={(text) => setPhone(text)}
            />
            <TextInput
            style={styles.input}
             placeholder=" Senha"
             placeholderTextColor="#323232"
             secureTextEntry
             onChangeText={(text)=> setPassword(text)}
            />
            <TextInput
            style={styles.input}
             placeholder=" Confirmar Senha"
             placeholderTextColor="#323232"
             secureTextEntry
             onChangeText={(text)=> setPasswordcomfirm(text)}
            />
            { registerSucess === true ? 
                handleSucess() :
                <></>
            }
            {Buttom()}
        </View>
    )
}  
export default Register

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor :'#2476E6',
        justifyContent:'center'
    },
    input:{
        alignSelf: 'stretch',
        marginLeft: 10,
        marginRight: 10,
        backgroundColor:'white',
        marginBottom: 12,
        borderRadius: 4,
        height: 48
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
    text_register:{
        textAlign: 'center',
        textAlign: 'center',
        fontSize: 20,
        color: '#0066ff',
        fontWeight:'bold'
    },
    spinners:{
        marginTop: 40,
        height: 50,
    },
    registerSucess:{
        textAlign: 'center',
        marginTop: 4,
        color: 'white',
        fontSize: 17,
        fontWeight: '800'

    }
})
