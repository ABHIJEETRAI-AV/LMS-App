import { View, Text, StyleSheet, Pressable, Alert } from 'react-native'
import React from 'react'
import Back from '../../Components/assets/arrow_back_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg'
import { Image } from 'react-native-svg'

const LeaveData = ({ route, navigation }) => {

    async function leaveDecider(num) {
        const leaveId = route.params.Leave.leaveRequest._id
        // console.log(props.row)

        if (num === 1) {
            var decision = "Approved"
        }
        else {
            var decision = "Rejected"
        }
        console.log(leaveId)
        const response = await fetch('https://leave-management-system-backend-nu.vercel.app/LeaveDecider', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ decision: decision, leaveId: leaveId })
        })
        // const data1 = await response.json()
        // console.log(data1)

        Alert.alert(`Leave ${decision}`)


    }



    return (
        <View style={style.body}>


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

            <View style={style.textCont} >
                <View style={{
                    width: 70, height: 70, borderRadius: 75, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',
                    shadowColor: "rgba(0, 0, 0, 0.55)", // Color
                    shadowOffset: {
                        width: 0, // X offset
                        height: 30 // Y offset
                    },
                    shadowRadius: 23, // Blur radius
                    shadowOpacity: 0.55, // Opacity
                    elevation: 10 // For Android compatibility
                }}><Image source={{ uri: route.params.Leave.img }} style={{ width: 70, height: 70, borderRadius: 75 }} /></View>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{route.params.Leave.employeeName}</Text>
            </View>


            <View style={style.text} >
                <Text>Leave Type :</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }} >{route.params.Leave.leaveRequest.leaveType}</Text>
            </View>

            <View style={style.text} >
                <Text>Leave Days :</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{route.params.Leave.leaveRequest.leaveDays}</Text>
            </View>



            <View style={style.text}>
                <Text>Start Date :</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{route.params.Leave.leaveRequest.startDate}</Text>
            </View>

            <View style={style.text}>
                <Text>End Date  :</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{route.params.Leave.leaveRequest.endDate}</Text>
            </View>


            <View style={style.text}>
                <Text>Reason :</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{route.params.Leave.leaveRequest.reason}</Text>
            </View>

            <View style={style.textCont}>
                {
                    (route.params.Leave.leaveRequest.status === "Pending") ?
                        <View style={style.btn}>
                            <Pressable onPress={() => { leaveDecider(1) }}
                                style={{
                                    backgroundColor: 'green',
                                    width: 150,
                                    height: 30,
                                    borderRadius: 20,
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

                                }}>
                                <Text style={{ color: 'white' }}>Approve</Text>
                            </Pressable>


                            <Pressable onPress={() => { leaveDecider(0) }}
                                style={{
                                    backgroundColor: 'red',
                                    width: 150,
                                    height: 30,
                                    borderRadius: 20,
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

                                }}
                            ><Text style={{ color: 'white' }}>Reject</Text></Pressable>

                        </View>

                        :

                        <View style={{
                           
                            
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(10, 10, 10, 0.10)',
                            width: 200,
                            height: 40,
                            borderRadius: 20,
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

                        }}>
                            <Text style= {{ fontWeight: 600,
                            fontSize: 15,}}>{route.params.Leave.leaveRequest.status}</Text>
                        </View>
                }

            </View>


        </View>
    )
}

export default LeaveData

const style = StyleSheet.create({
    body: {

        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '100%'

    },

    textCont: {
        width: '50%',
        gap: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text: {
        width: '90%',

        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10
    },

    btn: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        gap: 50
    }


})