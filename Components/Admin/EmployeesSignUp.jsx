import { View, Text, StyleSheet, FlatList, Image, Pressable, Alert } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const EmployeesSignUp = ({ navigation }) => {


    const [data, setData] = useState([])

    async function getEmployeeData() {


        const AdminData = JSON.parse(await AsyncStorage.getItem('adminData'))
        console.log(AdminData._id)
        const reponse = await fetch('https://leave-management-system-backend-nu.vercel.app/getEmployeeData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Id: AdminData._id

            })
        })


        const data = await reponse.json()
        console.log(data)

        setData(data)

    }

    useEffect(() => {
        getEmployeeData()
    }, [])

    return (
        <View style={styles.body}>
            <View style={styles.header}>



                <View style={styles.upperHeader}>

                    <Text style={styles.welcome}>Employees</Text>
                </View>

                <View style={styles.lowerHeader}>

                    {data.length === 0 ? <View style={{ justifyContent: 'center', alignItems: 'center', gap: 10 }}> <Text style={{ color: 'black', fontSize: 20, fontWeight: 600 }}>Add your first Employee !</Text> 
                    
                    <Pressable style={{width: '40%' , height: 30, borderRadius: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(109, 5, 245, 0.66)'}}    onPress={(e) => { navigation.navigate("AddEmployee") }}><Text style={{ color: 'white', fontSize: 20, fontWeight: 600 }}>Add </Text></Pressable></View>
                    : 
                    <FlatList data={data}
                        renderItem={({ item }) => <EmployeesCard employee={item} />}
                        keyExtractor={(item) => item._id}

                        numColumns={2}

                        // contentContainerStyle={{
                        //     justifyContent: 'center',
                        //     alignItems: 'center',
                        //     gap: 10,
                        //     flexDirection: 'colomn',
                        //     width: '100%',
                        //     borderWidth: 2
                        // }}

                        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                        columnWrapperStyle={{
                            justifyContent: 'space-around',
                            gap: 10,
                            



                        }}
                    />}

                </View>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({

    body: {

    },

    header: {
        
        height: 200,
        flexDirection: 'colomn',
        backgroundColor: 'black'

    },

    welcome: {
         fontSize: 35,
        color: 'white'
    },

    lowerHeader: {
        
        width: '100%',
        height: 495,
        position: 'relative',
        bottom: '-30%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'

    },
    upperHeader: {

        height: 100,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 10,
        
    },





})


export default EmployeesSignUp



function EmployeesCard({ employee }) {



    return (
        <View style={styles1.body}>
            <View style={styles1.dpBox}><Image source={{ uri: employee.profilePicture }} style={styles1.dp} /></View>
            <Text style={{ fontSize: 20 }} >{employee.fullName}</Text>
            <Pressable style={{width: '40%' , height: 30, borderRadius: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(109, 5, 245, 0.66)'}}><Text style={{color: 'white'}} onPress={() => {Alert.alert("Coming soon .....") }}>More</Text></Pressable>
        </View>
    );
}


const styles1 = StyleSheet.create({

    body: {
       
        width: '45%',
        height: 200,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        shadowColor: "rgba(0, 0, 0, 0.55)", // Color
            shadowOffset: {
              width: 0, // X offset
              height: 30 // Y offset
            },
            shadowRadius: 23, // Blur radius
            shadowOpacity: 0.55, // Opacity
            elevation: 10 // For Android compatibility

    },

    dp: {
        height: '100%',
        width: '100%',
        borderRadius: 75,
        // borderRadius: '50%'
    },

    dpBox: {
        height: 70,
        width: 70,
        borderRadius: '50%',
        borderWidth: 2
    }


})