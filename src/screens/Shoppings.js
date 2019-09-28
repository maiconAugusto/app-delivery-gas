import React, { useEffect, useState} from 'react'
import { View, AsyncStorage, Text, FlatList, StyleSheet} from 'react-native'
import firebase from 'firebase'
import baseb4 from 'base-64'
import _ from 'lodash'
import date from '../config/Date'

const Shopping = ()=>{
    const [ historic, setHistoric ] = useState([])

    useEffect(()=>{
        AsyncStorage.getItem("Email").then((response)=>{
            const email = baseb4.encode(response)
                firebase.database().ref(`Pedido/Users/${email}`)
                    .on('value',snapshot=>{
                        const data = _.values(snapshot.val())
                            setHistoric(data)
                    })
        })
    },[])
    
    function handleHistory(item){
        if(item.delivered === true){
            return(
                <View style={styles.historic_list}>
                    <Text style={styles.info_historic}>Quantidade: {item.quantity}</Text>
                    <Text style={styles.info_historic}>Preço: {item.price}</Text>
                    <Text style={styles.info_historic}>Data: {item.request_date}</Text>
                </View>
            )
        }
    }
    function handleHistoryNow(item){
        if(item.delivered === false){
            return(
                <View style={styles.now}>
                    <Text style={styles.finality}>Pronto para entrega</Text>
                    <Text style={styles.info}>Quantidade: {item.quantity}</Text>
                    <Text style={styles.info}>Valor total: {item.price}</Text>
                    <Text style={styles.info}>Data: {item.request_date}</Text>
                </View>
            )
        }
    }
    return(
        <View style={styles.container}>
            <View style={styles.container_history_now}>
                <FlatList
                data={historic}
                renderItem={({item})=>handleHistoryNow(item)}
                />
            </View>
            <View style={styles.historic}>
                <Text style={styles.historic_text}>Seu histórico</Text>
                <FlatList
                data={historic}
                renderItem={({item})=> handleHistory(item)}
                keyExtractor={(item,index)=> index.toFixed()}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    container_history_now:{
        flex: 3
    },
    historic:{
        flex: 6
    },
    historic_list:{
        backgroundColor: '#323232',
        margin: 6,
        padding: 14,
        borderRadius: 4
    },
    historic_text:{
        marginLeft: 6,
        marginTop: 6,
        marginBottom: 6,
        color: '#323232',
        fontWeight:'bold',
        textTransform:'uppercase',
        fontSize: 16,
        textAlign: 'center'
    },
    now:{
        backgroundColor:'#0FDD7F',
        margin: 6,
        padding: 24,
        borderRadius: 4
    },
    finality:{
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom:12,
        color: 'white',
        fontWeight:'bold',
        fontSize: 16
    },
    info:{
        color: 'white',
        fontSize: 16,
        textTransform :'uppercase',
    },
    info_historic:{
        color: 'white',
        fontSize: 16,
        textTransform :'uppercase',
    },
    registers:{
        textAlign: 'center',
        fontSize: 24,
        marginTop: 40,
        color: '#B2BABB'
    }
})
export default Shopping