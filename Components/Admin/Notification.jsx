import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import Back from '../../Components/assets/arrow_back_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg'

const Notification = ({navigation}) => {
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

                  <View>
                    <Text style={{fontSize: 25, fontWeight: 500}}>No new notifications</Text>
                  </View>

                  
      
    </View>
  )
}


const styles = StyleSheet.create({
    body: {

        height: '100%',
        width: '100%',
       
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(213, 245, 5, 0.50)'
    
      },
})

export default Notification