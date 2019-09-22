import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, AsyncStorage} from 'react-native'

const Header = ({navigation})=>{
    function handlerLoggof(){
        AsyncStorage.removeItem('Email').then((response)=>{
        })
        navigation.goBack()
    }
    return(
        <View style={styles.container}>
                <TouchableOpacity onPress={()=> handlerLoggof()}>
                    <Text style={styles.exit}>Sair</Text>
                </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 0.2,
        flexDirection: 'row-reverse',
        padding: 16,
        width: '100%',
        backgroundColor :'#2476E6',
    },
    exit:{
        fontSize: 17,
        color: 'white',
        fontWeight: '800',
        marginRight: 8
    }
})
export default Header