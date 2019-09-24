import React, { useState, useEffect } from 'react'
import { View , StyleSheet, Image, Text, TouchableOpacity, AsyncStorage} from 'react-native'
import BTJ from '../assets/BTJ.png'
import { Icon } from 'react-native-elements'
import axios from 'axios'
import base64 from 'base-64'
import date from '../config/Date'
import firebase from 'firebase'
import Header from './Header'


const Home = ({navigation})=>{
    const [ quantity , setQuantity ] = useState('')
    const [ price, setPrice ] = useState('')
    const [ notProduct, setNotProduct ] = useState('')
    const [ Token, setToken ] = useState('')
    const [ value, setValue ] = useState('')

    useEffect(()=>{
        firebase.database().ref('Price')
            .once('value')
                .then((snapshot)=>{
                    setValue(snapshot.val().Gas)
                })
    },[])
    useEffect(()=>{
        setQuantity(0)
        setPrice(0)
        setNotProduct(true)
        AsyncStorage.getItem('Email').then((response)=>{
            const Token = base64.encode(response)
                setToken(Token)
        })
    },[])
    function handlerAdd(qtdNow){
        if(quantity === 0){
            setQuantity(qtdNow) 
                setPrice(value)
                    return
        }
        const newQuantity = quantity + qtdNow
        const NewTotal = newQuantity * value
        setPrice(NewTotal.toFixed(2))
        setQuantity(newQuantity)
    }
    function handlerCanceled(){
        setPrice(0)
        setQuantity(0)
    }
    async function handlerFinalized(){
        if(quantity === 0){
            return setNotProduct(false)}
        firebase.database().ref(`/Pedidos/${Token}`).push({
            user: Token, quantity, price, request_date: date, router_of_delivery: false, delivered: false
        })
        setQuantity(0)
        setPrice(0)
    }
    function handlerError(){
        setTimeout(()=>{
            setNotProduct(true)
        },4000)
        return(
            <Text style={styles.msg_err}>SELECIONE O PRODUTO</Text>
        )
    }
    function handlerLoggof(){
        AsyncStorage.removeItem('Email')
        navigation.pop()
    }
    return(
        <View style={styles.container}>
            <View style={styles.container_nav}>
                <TouchableOpacity onPress={()=> handlerLoggof()}>
                    <Text style={styles.exit}>Sair</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.header}>
                <Image style={styles.iconBTJ} source={BTJ}/>
                    <View style={styles.add}>
                        <Text style={styles.description}>Preço:</Text>
                        <Text style={styles.price}>{value}</Text>
                        <TouchableOpacity onPress={()=>handlerAdd(1)}>
                            <Icon
                            size={40}
                            color='#45E74C'
                            name="add-box"
                            iconStyle={{marginRight: 8}}
                            />
                        </TouchableOpacity>
                    </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.text_info_qtd_price}>Quantidade: {quantity}</Text>
                <Text style={styles.text_info_qtd_price}>Total: {price}</Text>
                { notProduct === true ? <></> : 
                    handlerError()
                }
                <TouchableOpacity 
                    onPress={()=> handlerFinalized()}
                    style={styles.button}>
                    <Text style={styles.btn_end}>Finalizar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={()=> handlerCanceled()}
                    style={styles.button_canceled}>
                    <Text style={styles.btn_end}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white'
    },
    header:{
        flex: 1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
        backgroundColor: '#EAEDED',
        margin: 10,
        marginTop: 14,
        borderRadius: 2,
        borderWidth: 1.5,
        borderColor: '#E5E5E5'
    },
    add:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'center'
    },
    price:{
        marginRight: 30,
        fontSize: 14,
        color: '#323232'
    },
    description:{
        marginRight: 8,
        fontSize: 16,
        fontWeight: '600',
        color: '#323232'
    },
    iconBTJ:{
        height: 70,
        width: 70,
        borderRadius: 100,
        marginLeft: 8
    },
    section:{
        flex: 4,
        justifyContent:'center',
        alignItems:'center',
        margin: 10,
        backgroundColor: '#EAEDED',
        borderRadius: 2,
        borderWidth: 1.5,
        borderColor: '#E5E5E5'
    },
    button:{
        alignSelf: 'stretch',
        marginRight: 10,
        marginLeft: 10,
        backgroundColor:'#45E74C',
        marginTop: 20,
        height: 50,
        justifyContent: 'center',
        borderRadius: 4
    },
    button_canceled:{
        alignSelf: 'stretch',
        marginRight: 10,
        marginLeft: 10,
        backgroundColor:'#EA4C4C',
        marginTop: 16,
        height: 50,
        justifyContent: 'center',
        borderRadius: 4
    },
    btn_end:{
        textAlign:'center',
        fontSize: 18,
        color: '#323232'
    },
    text_info_qtd_price:{
        fontSize: 16,
        color: '#323232'
    },
    msg_err:{
        marginTop: 10,
        fontSize: 18,
        color :'#EA4C4C'
    },
    exit:{
        flexDirection :'row',
        padding: 14,
        backgroundColor:'#2476E6'
    },
    container_nav:{
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
export default Home