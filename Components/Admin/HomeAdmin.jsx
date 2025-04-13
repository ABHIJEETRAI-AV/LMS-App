import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import DashboardAdmin from './DashboardAdmin';
import ProfileAdmin from './ProfileAdmin';
import EmployeesSignUp from './EmployeesSignUp';
import Profile from './ProfileAdminReal'
import AddEmployee from './AddEmployee';

import Svg, { Path } from 'react-native-svg';
import HomeIcon from '../../Components/assets/home_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg'
import EmployeeIcon from '../../Components/assets/person_apron_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg'
import AddIcon from '../../Components/assets/add_circle_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg'
import LMIcon from '../../Components/assets/article_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'
import ProfileIcon from '../../Components/assets/account_circle_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg'
import Notification from '../../Components/assets/notifications_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg'

// const CustomIcon = () => (
//   <Svg width="24" height="24" viewBox="0 0 24 24">
//     <Path d="M12 2L2 7v10l10 5 10-5V7z" fill="white" />
//   </Svg>
// );


const Tab = createBottomTabNavigator();

function TabNavigator() {
    return (
      <Tab.Navigator 
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'black', // Set background color
          borderTopWidth: 0, // Remove border line
          elevation: 5, // Shadow effect (Android)
        },
        tabBarActiveTintColor: 'cyan', // Active tab color
        tabBarInactiveTintColor: 'gray', // Inactive tab color
        tabBarShowLabel: false
        
      }}

      
      >
        <Tab.Screen name="Home" component={DashboardAdmin}  options={{headerShown: false , tabBarIcon: ({ color }) => < HomeIcon fill={color} width={30} height={30}/>}}/>
        <Tab.Screen name="Employees" component={EmployeesSignUp}  options={{headerShown: false , tabBarIcon: ({ color }) => < EmployeeIcon fill={color} width={30} height={30}/>}}/>
        <Tab.Screen name="AddEmployee" component={AddEmployee} options={{headerShown: false , tabBarIcon: ({ color }) => < AddIcon fill={color} width={30} height={30}/>}}/>
        <Tab.Screen name="LM" component={ProfileAdmin} options={{headerShown: false , tabBarIcon: ({ color }) => < LMIcon fill={color} width={30} height={30}/>}}/>
        <Tab.Screen name="Profile" component={Profile} options={{headerShown: false , tabBarIcon: ({ color }) => < ProfileIcon fill={color} width={30} height={30}/>}} />

      </Tab.Navigator>
    );
  }

const HomeAdmin = ({navigation}) => {

    const [profileBtn, setProfileBtn] = React.useState(false)


  return (
    <View style={styles.body}>

        <View  style={styles.nav}>
      <Text style={styles.logo}>Zamari</Text>
      <Pressable style={styles.profileBtn} onPress={(e) => {navigation.navigate("Notification")}}><Notification width={30} height={30}/></Pressable>
      </View>

      
      <TabNavigator/>
    </View>
    
        
    
  )
}

const styles = StyleSheet.create({
    body: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        height: '100%',

    },

    nav: {
        width: '100%',
        height: '13%',
        borderBottomWidth: 1,
        borderBlockColor: 'gray',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 200,
        backgroundColor: 'black'

    },

    profileBtn:{
        borderWidth: 2,
        backgroundColor: 'white',
        borderRadius: '50%',
        height: 40,
        width: 40,
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        fontSize: 25,
        fontWeight: 'bold',
        
        color: '#fff',
        
        textShadowColor: '#0fa',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 70,
        
    }
})

export default HomeAdmin






