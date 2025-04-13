import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GetStarted from './Components/GetStarted'
import Login from './Components/Login';
import HomeAdmin from './Components/Admin/HomeAdmin';
import Profile from './Components/Admin/ProfileAdminReal'
import AddEmployee from './Components/Admin/AddEmployee';
import ChangePassword from './Components/Admin/ChangePassword';
import SignUp from './Components/SignUp';
import LeaveData from './Components/Admin/LeaveData';
import Notification from './Components/Admin/Notification';

const Stack = createNativeStackNavigator();



const StackNavigation = () => {

    return (
        

        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={GetStarted} options={{headerShown: false}} />
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
            <Stack.Screen name="HomeAdmin" component={HomeAdmin} options={{headerShown: false}}/>
            <Stack.Screen name="AddEmployee" component={AddEmployee} options={{headerShown: false}}/>
            <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
            <Stack.Screen name="ChangePassword" component={ChangePassword} options={{headerShown: false}}/>
            <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
            <Stack.Screen name="LeaveData" component={LeaveData} options={{headerShown: false}}/>
            <Stack.Screen name="Notification" component={Notification} options={{headerShown: false}}/>
        </Stack.Navigator>

    )
}

const App = () => {
    return (

        
        <NavigationContainer >
            
                <StackNavigation/>
            
        </NavigationContainer>
        
    )
}

const styles = StyleSheet.create({
    body: {
        width: 'screenWidth', // Equivalent to 100%
        height: 950,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'

    }
})

export default App