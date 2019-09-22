import React, { useEffect, useState} from 'react'
import { View, AsyncStorage, Text, FlatList, StyleSheet} from 'react-native'
import firebase from 'firebase'
import baseb4 from 'base-64'
import _ from 'lodash'

const Shopping = ()=>{
    const [ historic, setHistoric ] = useState('')

    useEffect(()=>{
        AsyncStorage.getItem("Email").then((response)=>{
            const email = baseb4.encode(response)
                firebase.database().ref(`Pedidos/${email}`)
                    .on('value',snapshot=>{
                        const data = _.values(snapshot.val())
                        console.log(data)
                            setHistoric(data)
                    })
        })
    },[])

    function handleHistory(item){
        if(item.delivered === true){
            return(
                <View style={styles.historic_list}>
                    <Text>Quantidade: {item.quantity}</Text>
                    <Text>Preço: {item.price}</Text>
                    <Text>Data: {item.request_date}</Text>
                </View>
            )
        }
    }
    return(
        <View style={styles.container}>
            <View style={styles.container_history_now}>
            </View>
            <View style={styles.historic}>
                <Text style={styles.historic_text}>Seu histórico:</Text>
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
        backgroundColor: '#5882FA',
        margin: 6,
        padding: 14,
        borderRadius: 4
    },
    historic_text:{
        marginLeft: 6,
        marginBottom: 6,
        fontSize: 17
    }
})
export default Shopping