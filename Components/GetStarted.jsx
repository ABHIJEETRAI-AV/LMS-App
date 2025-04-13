import { View, Text, Pressable, StyleSheet, Alert } from 'react-native'
import React from 'react'

const GetStarted = ({ navigation }) => {
  return (
    <View style={styles.body} >
      <View style={styles.started}>
        <View>
          <Text style={styles.welcome}>Welcome to</Text>
          <Text style={styles.zamari}>Zamari</Text>
        </View>
        <View style={styles.button}>
          <Pressable  onPress={(e) => { navigation.navigate("SignUp")}} style={styles.signIn}><Text style={{ color: 'black' , fontSize: 17, fontWeight: 600}}>Sign Up</Text></Pressable>
          <Pressable onPress={(e) => { navigation.navigate("Login") }} style={styles.login}><Text style={{ color: 'black' , fontSize: 17, fontWeight: 600}}>Login</Text></Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flexDirection: 'column',
    borderWidth: 2,
    height: '100%',
    width: 'screenWidth',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(213, 245, 5, 0.50)'

  },

  button: {
    flexDirection: 'colomn',
    height: 150,
    width: 400,
    alignItems: 'center',
    justifyContent: 'space-between',
    
    borderRadius: 10

  },

  started: {
    flexDirection: 'column',
    // borderWidth: 2,
    height: 600,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: 'gray'
  },
  zamari: {
    fontSize: 80,
    fontWeight: 600
  },
  signIn: {
    width: 250,
    height: 50,
    
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
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
  login: {
    width: 250,
    height: 50,
    
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
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

export default GetStarted