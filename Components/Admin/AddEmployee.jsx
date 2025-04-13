import { View, Text, StyleSheet, TextInput, Pressable, Alert, onPress } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';


const AddEmployee = () => {
  const [retype, setRetype] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [newPassword, setNewPassword] = React.useState('')

    const data= {
        fullName: password,
        email: retype ,
        password: newPassword
    }   



    async function postdata(data) {

      const token = await AsyncStorage.getItem('token');

        const realData = {
           
            data: data,
            adminId: token
        }

      
  
      console.log(realData)
  
      try {
        const response = await fetch('https://leave-management-system-backend-nu.vercel.app/EmployeeSignUp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(realData)
        })

        const response1 = await response.json();

        console.log(response1)

        if (response.ok) {

        Alert.alert('Employee Added Successfully')
        }
        else{

          Alert.alert('Employee Not Added');
        }
      }
      catch (err) {
  
      }
  
     
    }

    return (
        <View style={styles.body}>
            <View style={styles.signCard}>
                <Text style={{fontSize: 30, fontWeight:'bold'}}>Add Employee</Text>
                <TextInput
                    placeholder='Username '
                    placeholderTextColor={'black'}
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style= {styles.field}

                />

                <TextInput
                    placeholder='Email '
                    placeholderTextColor={'black'}
                    value={retype}
                    onChangeText={text => setRetype(text)}
                    style= {styles.field}


                />

                <TextInput
                    placeholder='Password '
                    placeholderTextColor={'black'}
                    value={newPassword}
                    onChangeText={text => setNewPassword(text)}
                    style= {styles.field}


                />

                <Pressable onPress={() => postdata(data)} style= {styles.btn}><Text style={{color: 'white',}}>Submit</Text></Pressable>


            </View>
        </View>
    )
}


const styles = StyleSheet.create({

    body: {
        
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(213, 245, 5, 0.50)'

    },

    signCard: {
       
        width: '90%',
        height: 500,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    field:{
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

    btn:{
      width: "60%",
      height: 50,
      borderRadius: 30,
      backgroundColor: 'black',
      
      justifyContent: 'center',
        alignItems: 'center',
      shadowColor: "rgba(0, 0, 0, 0.55)", // Color
            shadowOffset: {
              width: 0, // X offset
              height: 30 // Y offset
            },
            shadowRadius: 23, // Blur radius
            shadowOpacity: 0.55, // Opacity
            elevation: 10 // For Android compatibility

    }

})

export default AddEmployee