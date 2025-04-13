import { View, Text, StyleSheet, TextInput, Pressable, Alert, onPress } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Back from '../../Components/assets/arrow_back_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg'
const ChangePassword = ({ navigation }) => {

    const [retype, setRetype] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [newPassword, setNewPassword] = React.useState('')

    const data = {
        password: password,
        newPassword: newPassword,
        checkPassword: retype
    }

    async function postdata(data) {

        const token = await AsyncStorage.getItem('token');

        const realData = {
            role: 'admin',
            data: data,
            token: token
        }

        if (data.newPassword === data.checkPassword) {
            try {
                const response = await fetch('https://leave-management-system-backend-nu.vercel.app/changePassword', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(realData)
                })

                console.log(response)

                Alert.alert('Password Changed Successfully')
            }
            catch (err) {
                console.log(err)
            }

        }
        else {
            Alert.alert('Passwords do not match')
        }
    }

    return (
        <View style={styles.body}>
            <View
                style={{
                    height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 75, backgroundColor: 'white',

                    position: 'absolute',
                    top: 20,
                    left: 20,
                    shadowColor: "rgba(0, 0, 0, 0.55)", // Color
                    shadowOffset: {
                        width: 0, // X offset
                        height: 30 // Y offset
                    },
                    shadowRadius: 23, // Blur radius
                    shadowOpacity: 0.55, // Opacity
                    elevation: 10 // For Android compatibility


                }}>
                <Back width={30} height={30} onPress={() => { navigation.goBack() }} />

            </View>
            <View style={styles.body1}>
                <Text style={{ fontSize: 30, color: 'black', fontWeight: 800 }}>Change Password</Text>
                <TextInput
                    placeholder='Enter your password '
                    placeholderTextColor={'black'}
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.fields}

                />

                <TextInput
                    placeholder='Retype your password '
                    placeholderTextColor={'black'}
                    value={retype}
                    onChangeText={text => setRetype(text)}
                    style={styles.fields}


                />

                <TextInput
                    placeholder='Enter new password '
                    placeholderTextColor={'black'}
                    value={newPassword}
                    onChangeText={text => setNewPassword(text)}
                    style={styles.fields}


                />

                <Pressable style={styles.submit} onPress={() => postdata(data)} ><Text style={{ color: 'white' }}>Submit</Text></Pressable>


            </View>
        </View>
    )
}


const styles = StyleSheet.create({

    body: {

        height: '100%',
        width: '100%',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(213, 245, 5, 0.50)'

    },

    body1: {

        height: '0%',
        minHeight: 600,
        width: '90%',

        justifyContent: 'space-around',
        alignItems: 'center'
    },
    fields: {
        width: "90%",
        height: 50,
        borderRadius: 30,
        backgroundColor: 'white',
        color: 'black',
        shadowColor: "rgba(0, 0, 0, 0.55)", // Color
        shadowOffset: {
            width: 0, // X offset
            height: 30 // Y offset
        },
        shadowRadius: 23, // Blur radius
        shadowOpacity: 0.55, // Opacity
        elevation: 10 // For Android compatibility
    },

    submit: {
        backgroundColor: 'black',
        width: '60%',
        height: 50,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default ChangePassword