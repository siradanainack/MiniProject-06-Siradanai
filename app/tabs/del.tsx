import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Ionicons } from "@expo/vector-icons"

type Car ={
    id : string,
    name : string,
    price : string
}

export default function Home(){
    const [allCar,setAllCar] = useState<Car[]>([])

    useEffect(() => {
        loadCar()
    }, [allCar])   // ❗ แก้ไม่ให้วนลูป

    async function loadCar(){
        const data = await AsyncStorage.getItem("car")
        if(data !== null){
            setAllCar(JSON.parse(data))
        }    
    }

    async function removeCar(id:string) {
        const newCar = allCar.filter((item) => item.id !== id)
        await AsyncStorage.setItem("car", JSON.stringify(newCar))
        setAllCar(newCar)
    }

    return(
        <View style={styles.container}>

            <Text style={styles.title}> 🗑️ ลบรายการรถยนต์</Text>

            <FlatList
                data={allCar}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{paddingBottom:20}}
                renderItem={({item}) => (
                    <View style={styles.card}>
                        
                        <View style={{flex:1}}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.price}>ราคา {item.price} บาท</Text>
                        </View>

                        <TouchableOpacity 
                            style={styles.deleteBtn}
                            onPress={() => removeCar(item.id)}
                        >
                            <Ionicons name="trash" size={20} color="white" />
                        </TouchableOpacity>

                    </View>
                )}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#F8FAFC",
        padding:15
    },

    title:{
        fontSize:24,
        fontWeight:"bold",
        marginBottom:20,
        color:"#DC2626",
        alignSelf:"center"
    },

    card:{
        flexDirection:"row",
        backgroundColor:"#FFFFFF",
        padding:18,
        borderRadius:18,
        marginBottom:15,
        alignItems:"center",
        shadowColor:"#000",
        shadowOpacity:0.15,
        shadowRadius:8,
        elevation:5
    },

    name:{
        fontSize:18,
        fontWeight:"bold",
        color:"#111827"
    },

    price:{
        fontSize:15,
        color:"#2563EB",
        marginTop:4
    },

    deleteBtn:{
        backgroundColor:"#EF4444",
        padding:12,
        borderRadius:50
    }
})