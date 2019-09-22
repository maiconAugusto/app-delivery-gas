import React, { useState, useEffect } from 'react'
import { View , StyleSheet, Image, Text, TouchableOpacity, AsyncStorage} from 'react-native'
import BTJ from '../assets/BTJ.png'
import { Icon } from 'react-native-elements'
import axios from 'axios'
import base64 from 'base-64'
import date from '../config/Date'
import firebase from 'firebase'

const Home = ()=>{
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
        setQtd(newQuantity)
    }
    function handlerCanceled(){
        setPrice(0)
        setQuantity(0)
    }
    async function handlerFinalized(){
        if(qtd === 0){
            setNotProduct(false)}
                axios.post(`/Pedidos/${Token}.json`,{
                    user: Token, qtd, price, request_date: date, router_of_delivery: false, delivered: false
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
    return(
        <View style={styles.container}>
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
                <Text style={styles.text_info_qtd_price}>Quantidade: {qtd}</Text>
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
        backgroundColor: '#F5F4F4',
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
        backgroundColor: '#F5F4F4',
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
    }
})
export default Home