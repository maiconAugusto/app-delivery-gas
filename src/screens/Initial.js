import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'

const Initial = ()=>{
    return(
        <View style={styles.container}>
            <View style={styles.logo}>
                <Text style={styles.nameLogo}>speed gás</Text>
                <Text style={styles.nameType}>delivery</Text>
            </View>
            <View style={styles.btn}>
                <TouchableOpacity style={styles.logger}>
                    <Text style={styles.text_btn_login}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.register}>
                    <Text style={styles.text_btn_register}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection:'column',
        backgroundColor: '#0066ff',
    },
    logo:{
        flex: 4,
        justifyContent:'center',
        alignItems:'center'
    },
    nameLogo:{
        fontSize: 30,
        color: 'white',
        textTransform:'uppercase',
        fontWeight:'bold'
    },
    nameType:{
        color: 'white',
        fontSize: 18
    },
    btn:{
        flex: 1,
        justifyContent:'flex-end'
    },
    logger:{
        backgroundColor: '#0FDD7F',
        padding: 16
    },
    register:{
        backgroundColor: 'white',
        padding: 14
    },
    text_btn_login:{
        justifyContent:'center',
        textAlign : 'center',
        fontSize: 20,
        color: 'white',
        fontWeight:'bold'
    },
    text_btn_register:{
        justifyContent:'center',
        textAlign : 'center',
        fontSize: 20,
        color: '#0066ff',
        fontWeight:'bold'
    }
})
export default Initial