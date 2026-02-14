import { View, TextInput, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"

type Car ={
    id : string,
    name : string,
    price : string
}

export default function Add(){
    const [carName, setCarName] = useState("")
    const [carPrice, setCarPrice] = useState("")
    const [allCar,setAllCar] = useState<Car[]>([])

    useEffect(() => {
        loadCar()
    }, [allCar])

    async function loadCar(){
        const data = await AsyncStorage.getItem("car")
        if(data !== null){
            setAllCar(JSON.parse(data))
        }    
    }

    async function addCar(){
        if(!carName || !carPrice){
            return
        }

        const car ={
            id : Date.now().toString(),
            name : carName,
            price : carPrice
        }

        const newCar = [...allCar, car]
        await AsyncStorage.setItem("car", JSON.stringify(newCar))
        setAllCar(newCar)

        setCarName("")
        setCarPrice("")
    }

    return(
        <View style={myStyle.container}>
            <Text style={myStyle.title}> 🚗 เพิ่มรุ่นรถยนต์</Text>

            <View style={myStyle.card}>
                
                <Text style={myStyle.label}>ชื่อรถยนต์</Text>
                <TextInput
                    value={carName}
                    onChangeText={setCarName}
                    placeholder="กรอกชื่อรุ่นรถ"
                    style={myStyle.input}
                />

                <Text style={myStyle.label}>ราคารถยนต์</Text>
                <TextInput
                    value={carPrice}
                    onChangeText={setCarPrice}
                    placeholder="กรอกราคา"
                    keyboardType="numeric"
                    style={myStyle.input}
                />
            
                <TouchableOpacity style={myStyle.button} onPress={addCar}>
                    <Text style={myStyle.buttonText}>บันทึกข้อมูล</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

const myStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EAF6FF'
    },

    title:{
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#1E3A8A"
    },

    card:{
        width: "85%",
        backgroundColor: "#FFFFFF",
        padding: 25,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 8
    },

    label:{
        fontSize: 16,
        marginBottom: 5,
        color: "#374151",
        fontWeight: "600"
    },

    input:{
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 12,
        padding: 12,
        marginBottom: 15,
        backgroundColor: "#F9FAFB",
        fontSize: 16
    },

    button:{
        backgroundColor: "#2563EB",
        padding: 15,
        borderRadius: 15,
        alignItems: "center",
        marginTop: 10
    },

    buttonText:{
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "bold"
    }
})