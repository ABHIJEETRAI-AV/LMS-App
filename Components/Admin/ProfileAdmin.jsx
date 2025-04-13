import { View, Text, StyleSheet, FlatList, Image, ScrollView, Pressable } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react'

const ProfileAdmin = ({navigation}) => {

  const [tableData, setTableData] = React.useState([])

  async function getLeaveRequest() {
    console.log("hello")
    const Admin = await JSON.parse(await AsyncStorage.getItem('adminData'))
    const AdminID = Admin._id
    console.log(AdminID)
    const response = await fetch('https://leave-management-system-backend-nu.vercel.app/LeaveRequestData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ adminId: AdminID })
    })
    const data = await response.json()
    console.log(data)
    setTableData(data)
  }

  useEffect(() => {
    getLeaveRequest()
  }, [])

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.upperHeader}>
          <Text style={styles.welcome}>Leave Manager</Text>
        </View>
        <View style={{ flex: 1, width: '100%' }}>
          <ScrollView style={styles.lowerHeader} contentContainerStyle={{ alignItems: 'center', gap: 30 }}>
            {/* <FlatList
            data={tableData}

            renderItem={({ item }) => item.leaveRequest.status === 'Pending' && <LeaveCard leave={item} />}
            //  renderItem={tableData.leaveRequest.status === 'Pending' ?{({ item }) => <LeaveCard leave={item} /> } : null }

            keyExtractor={(item) => item._id}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            contentContainerStyle={{ width: 370, borderWidth: 2 }}
          /> */}


            <View style={styles.leaveDiv}>
              <View style={{ flexDirection: 'row', width: '100%', height: 50, padding: 10, backgroundColor: 'rgba(213, 245, 5, 0.60)', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                <Text style={{ color: 'black', fontSize: 20 }}>Pending Requests</Text></View>
                {
              tableData.map((item, index) => (item.leaveRequest.status === 'Pending' ? <LeaveCard leave={item} key={index} navigation={navigation} /> : null))
              
            }
              
              </View>
              
             
            <View style={styles.leaveDiv}>
              <View style={{ flexDirection: 'row', width: '100%', height: 50, padding: 10, backgroundColor: 'rgba(213, 245, 5, 0.60)', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                <Text style={{ color: 'black', fontSize: 20 }}>Approved/Rejected</Text></View>
              {tableData.map((item, index) => (item.leaveRequest.status != 'Pending' ? <LeaveCard leave={item} key={index} navigation={navigation}/> : null))} </View>
          </ScrollView>

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
    flexDirection: 'column',
    gap: 10,
    backgroundColor: 'black',
    width: '100%'


  },

  welcome: {
    fontSize: 35,
    color: 'white'
  },

  upperHeader: {

    height: 100,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 10
  },

  lowerHeader: {
    flex: 1,

    width: '100%',
    minHeight: 500,
    position: 'relative',
    bottom: '-45%',
    flexDirection: 'column',

    gap: 20,




  },

  leaveDiv: {

    width: '90%',
    flex: 1,
    flexDirection: 'column',
    gap: 10,
    borderRadius: 10,
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


export default ProfileAdmin



const LeaveCard = ({ leave, navigation }) => {
  return (
    <View style={styles1.body}>
      <View style={styles1.dpBox}>
        <Image source={{ uri: leave.img }} style={{ width: 69, height: 69, borderRadius: 75 }} />
      </View>
      <Text>{leave.employeeName}</Text>
      <Text>{leave.leaveRequest.leaveType}</Text>
      <Pressable style={{
        width: 50, height: 30, borderRadius: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(109, 5, 245, 0.66)',
        shadowColor: "rgba(0, 0, 0, 0.55)", // Color
        shadowOffset: {
          width: 0, // X offset
          height: 30 // Y offset
        },
        shadowRadius: 23, // Blur radius
        shadowOpacity: 0.55, // Opacity
        elevation: 10 // For Android compatibility
      }}><Text style={{ color: 'white' }}
      
      
      onPress={(e) => { navigation.navigate("LeaveData", {Leave : leave}) }}
      
      >More</Text></Pressable>
    </View>
  )
}

const styles1 = StyleSheet.create({

  body: {

    width: '100%',
    height: 100,
    borderRadius: 10,
    borderTopWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  dpBox: {
    height: 70,
    width: 70,
    borderRadius: '50%',

    justifyContent: 'center',
    alignItems: 'center'
  }
})

