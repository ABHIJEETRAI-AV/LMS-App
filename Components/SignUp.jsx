import { View, Text, TextInput, StyleSheet, Button, Pressable, Alert , ActivityIndicator} from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Wolf from '../Components/assets/vecteezy_wolf-head-mascot-logo_11551603.svg'


const SignUp = ({ navigation }) => {


    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [token, setToken] = React.useState('')
     const [loader, setLoader] = React.useState(false)


    const data = {
        username: username,
        email: email,
        password: password
        
    }




    async function postData(data) {

        setLoader(true)
        const response = await fetch('https://leave-management-system-backend-nu.vercel.app/SignUp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }
    
        )

        const data1 = await response.json();
        console.log(data1.token)
        setToken(data1.token)
        setLoader(false)
        if (data1.token) {
          await AsyncStorage.setItem('token', data1.token)
          console.log("item added")
          Alert.alert('User Added Successfully,Please Login to continue')   
          navigation.navigate('Login' )
        }
      }
    return (
        <View style={styles.body}>
            <View style={styles.body1}>
                <Wolf width={150} height={150} />

                <Text style={{ fontSize: 40, color: 'black', fontWeight: 800 }}>Sign Up</Text>

                <TextInput
                    placeholder='Enter your name '
                    placeholderTextColor={'black'}

                    value={username}
                    onChangeText={text => setUsername(text)}
                    style={styles.fields}

                />

                <TextInput
                    placeholder='Enter your email '
                    placeholderTextColor={'black'}
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.fields}

                />

                <TextInput
                    placeholder='Enter your password '
                    placeholderTextColor={'black'}
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.fields}

                />

                <Pressable onPress={() => postData(data)} style={styles.submit}>{loader ? <ActivityIndicator size="large" color="white"/>: <Text style={{ color: 'white' }}>Submit</Text>}</Pressable>

                <View style={styles.bottom}>
                    <View style={styles.or}>
                        <View style={styles.line}></View>
                        <Text style={{ fontSize: 15 }}>or</Text>
                        <View style={styles.line}></View>
                    </View>
                    <Text>Already a user ?</Text>
                    <Pressable onPress={(e) => { navigation.navigate("Login") }} style={styles.submit}><Text style={{ color: 'white' }}>Login</Text></Pressable>

                </View>



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

        height: '90%',
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

    line: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: '45%'

    },

    or: {

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        gap: 5

    },

    bottom: {
        flexDirection: 'column',
        height: 150,

        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'

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

export default SignUp