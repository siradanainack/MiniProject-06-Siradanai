import { View, Text, FlatList, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"

type Car ={
    id : string,
    name : string,
    price : string
}

export default function Home(){
    const [allCar,setAllCar] = useState<Car[]>([])

    useEffect(() => {
        loadCar()
    }, [])  // ❗ ไม่ใส่ allCar เพื่อกันวนลูป

    async function loadCar(){
        const data = await AsyncStorage.getItem("car")  // ❗ เปลี่ยนเป็น car
        if(data !== null){
            setAllCar(JSON.parse(data))
        }    
    }

    return(
        <View style={myStyle.container}>
            
            <Text style={myStyle.title}>  🚘 รายการรถยนต์</Text>

            <FlatList
                data={allCar}   // ❗ เปลี่ยนเป็น allCar
                keyExtractor={(item) => item.id}
                contentContainerStyle={{paddingBottom:20}}
                renderItem={({item}) => (
                    <View style={myStyle.card}>
                        <Text style={myStyle.name}>{item.name}</Text>
                        <Text style={myStyle.price}>ราคา {item.price} บาท</Text>
                    </View>
                )}
            />

        </View>
    )
}

const myStyle = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#F1F5F9",
        padding:15
    },

    title:{
        fontSize:26,
        fontWeight:"bold",
        marginBottom:20,
        color:"#1E3A8A",
        alignSelf:"center"
    },

    card:{
        backgroundColor:"#FFFFFF",
        padding:20,
        borderRadius:20,
        marginBottom:15,
        alignItems:"center",
        shadowColor:"#000",
        shadowOpacity:0.15,
        shadowRadius:8,
        elevation:6
    },

    name:{
        fontSize:20,
        fontWeight:"bold",
        color:"#111827"
    },

    price:{
        fontSize:16,
        color:"#2563EB",
        marginTop:8,
        fontWeight:"600"
    }
})