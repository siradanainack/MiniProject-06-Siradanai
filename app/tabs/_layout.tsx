import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"

export default function Layout(){
    return(
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title:"หน้าแรก",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    )
                }}
            />

            <Tabs.Screen
                name="add"
                options={{
                    title:"ใส่ข้อมูล",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="key" size={size} color={color} />
                    )
                }}
            />

            <Tabs.Screen
                name="del"
                options={{
                    title:"ลบข้อมูล",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="trash" size={size} color={color} />
                    )
                }}
            />
        </Tabs>
    )
}