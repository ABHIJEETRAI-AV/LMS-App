import { View, Text, StyleSheet, ScrollView, Image, Pressable, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


const ProfileAdminReal = ({navigation}) => {
    return (
        <View style={styles.body}>


            <ScrollView style={styles.lowerHeader} contentContainerStyle={{
                justifyContent: 'space-between',
                gap: 20,
                alignItems: 'center'
            }}>

                <ProfileCard  navigation = {navigation}/>

            </ScrollView>



        </View>
    )
}

const styles = StyleSheet.create({

    body: {

        backgroundColor: 'black'

    },

    header: {
        borderWidth: 2,
        height: 200,

        flexDirection: 'colomn',
        gap: 10

    },

    welcome: {
        fontSize: 30
    },

    lowerHeader: {
        borderWidth: 2,
        width: '100%',
        minHeight: 650,
        position: 'relative',
        bottom: '-45%',
        flexDirection: 'column',
        flex: 1,


    },



})


export default ProfileAdminReal




const ProfileCard = ({navigation}) => {

    const [adminData, setAdminData] = useState([])
    const [url, setUrl] = useState('')
    const [data, setData] = useState([])


const uploadImageToCloudinary = async (imageUri) => {
    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg', // Adjust based on your image format
      name: 'uploaded_image.jpg',
    });
    formData.append('upload_preset', "jcyu8yxj"); // Replace with your preset name
  
    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dtzgh8app/image/upload', // Replace 'your_cloud_name'
        {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      if (!response.ok) {
        throw new Error('Upload failed with status ' + response.status);
      }
  
      const data = await response.json();
      setUrl(data.secure_url);
      Alert.alert('Image uploaded successfully!');
    //   console.log('Upload successful:', url);
    // upload(url)
     


    } catch (error) {
      console.error('Upload failed:', error);
    }
  };


  async function upload(url) {

    

    const token = await AsyncStorage.getItem('token');

    console.log(token)
    const response = await fetch('https://leave-management-system-backend-nu.vercel.app/uploadImageAdmin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            image: url,
            token:  token
        })
    })


    const data = await response.json();
    setData(data)
    // console.log(data)
    
}

useEffect(() => {
    upload(url)
}, [url])




    const selectImage =  () => {
         launchImageLibrary({},  (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                console.log('Selected Image: ', response);
                
                

                uploadImageToCloudinary(response.assets[0].uri)
            }
        });


    };




    async function getAdminData() {

        const data = JSON.parse(await AsyncStorage.getItem('adminData'))
        setAdminData(data)

    }

    useEffect(() => {
        getAdminData()
    }, [])


    async function logout() {
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('adminData')
        
    
        console.log("Navigating to login...");
    
        navigation.navigate('Login')
    
    
    
      }
    
    return (
        <View style={Style1.body}>
            <View style={{flexDirection: 'colomn', gap: 10, justifyContent: 'center', alignItems: 'center',}}>


                <TouchableOpacity onPress={() => selectImage()} style={Style1.dp}>
                    < Image source={{ uri: data.image }} style={{ width: '90%', height: '90%', borderRadius: 75 }} />
                </TouchableOpacity>
                <Text style={{fontSize: 25, fontWeight: 600, color: 'white'}}>{adminData.username}</Text>
                



            </View>
            <View style={Style1.infoCard}>

                <View style={Style1.infoText}>
                    <Text style={{color: 'white', fontSize: 15, fontWeight: 300 }}>Name : </Text>
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 600 }}>{adminData.username}</Text>
                </View>

                <View style={Style1.infoText}>
                    <Text style={{color: 'white', fontSize: 15, fontWeight: 300 }}>Email :</Text>
                    <Text style={{color: 'white', fontSize: 15, fontWeight: 600 }}>{adminData.email}</Text>
                </View>

                <View style={Style1.infoText}>
                    <Text style={{color: 'white', fontSize: 15, fontWeight: 300 }}>Role :</Text>
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 600 }}>{adminData.role}</Text>
                </View>


            </View>
            <View style={Style1.btnCont}>
                <Pressable style={Style1.btn} onPress={(e) => { navigation.navigate("ChangePassword") }}><Text>Change Password</Text> </Pressable>
                <Pressable style={Style1.btn} onPress={(e) => { logout() }}><Text>Logout</Text></Pressable>
            </View>
        </View>
    )
}


const Style1 = StyleSheet.create({

    body: {

        borderWidth: 2,
        height: 750,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'black'

    },

    dp: {

        height: 100,
        width: 100,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 75, // Half of the width/height for a circular image
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "rgba(250, 55, 198, 0.9)", // Color
        shadowOffset: {
          width: 0, // X offset
          height: 30 // Y offset
        },
        shadowRadius: 23, // Blur radius
        shadowOpacity: 0.55, // Opacity
        elevation: 10 // For Android compatibility

    },

    infoText: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
        marginLeft: 20



    },

    infoCard: {
        width: '90%',
        height: 250,
        borderWidth: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: 'white'
        
    },

    btnCont: {
        borderWidth: 2,
        height: 100,
        width: '80%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'

    },

    btn: {

        width: '90%',
        height: 40,
        
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        color: 'black',
        shadowColor: "rgba(80, 11, 219, 0.92)", // Color
        shadowOffset: {
          width: 0, // X offset
          height: 30 // Y offset
        },
        shadowRadius: 23, // Blur radius
        shadowOpacity: 1, // Opacity
        elevation: 5 // For Android compatibility


    }


})
