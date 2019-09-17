import React from 'react'
import { View ,Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native'
import Delivery from '../assets/gas.png'

const Login = ({navigation})=>{

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
            />
            <TextInput
            style={styles.input}
            placeholder=" Password"
            placeholderTextColor="#323232"
            />
            <TouchableOpacity
                onPress={()=> navigation.navigate('Main')}
                style={styles.button}>
                <Text style={styles.logger}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.register} 
                onPress={()=> navigation.navigate('Register') }>
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
        marginTop: 40,
    },
    text_register:{
        color: 'white'
    }
})
export default Login