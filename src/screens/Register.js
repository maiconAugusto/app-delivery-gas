import React, { useEffect } from 'react'
import {    View, 
            TextInput, 
            TouchableOpacity, 
            StyleSheet, 
            Text
        } from 'react-native'
import axios from 'axios'
import base64 from ''


const Register = ()=>{
    function handleRegister(){
        try{
            axios.post(`Users/`)
        }
        catch(err){

        }
    }
    return(
        <View style={styles.container}>
            <TextInput
            style={styles.input}
            placeholder=" Nome"
            placeholderTextColor="#323232"
            />
            <TextInput
            style={styles.input}
             placeholder=" E-mail"
             placeholderTextColor="#323232"
            />
            <TextInput
            style={styles.input}
             placeholder=" Telefone"
             placeholderTextColor="#323232"
            />
            <TextInput
            style={styles.input}
             placeholder=" Senha"
             placeholderTextColor="#323232"
            />
            <TextInput
            style={styles.input}
             placeholder=" Confirmar Senha"
             placeholderTextColor="#323232"
            />
            <TouchableOpacity style={styles.button}>
                <Text style={styles.text_register}>Cadastrar</Text>
            </TouchableOpacity>
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
        textAlign:'center'
    }
})
