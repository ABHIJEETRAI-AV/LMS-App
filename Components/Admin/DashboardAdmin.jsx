import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Person from '../../Components/assets/person_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'
import People from '../../Components/assets/emoji_people_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'
import Leave from '../../Components/assets/article_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'

const DashboardAdmin = () => {
    const [username, setUsername] = React.useState('')
    const [tableData, setTableData] = React.useState([])
    const [data, setData] = React.useState([])



    async function getAdminData() {

        const token = await AsyncStorage.getItem('token');
        console.log(token)
        const response = await fetch('https://leave-management-system-backend-nu.vercel.app/getAdminData',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },

                body: JSON.stringify({
                    token: token,
                    role: 'Admin'
                })
            }
        )
console.log(response)
        const data = await response.json();
        console.log(data);
        await AsyncStorage.setItem('adminData', JSON.stringify(data[0]));
        getEmployeeData(data)
        getLeaveRequest(data)
        setUsername(data[0].username);

    }

    useEffect(() => {
        getAdminData();
    }, []);

    async function getEmployeeData(AdminData) {

        const reponse = await fetch('https://leave-management-system-backend-nu.vercel.app/getEmployeeData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Id: AdminData[0]._id

            })
        })
        const data = await reponse.json()
        setData(data)
        setIsLoadingData(false)

    }


    async function getLeaveRequest(AdminData) {

        const response = await fetch('https://leave-management-system-backend-nu.vercel.app/LeaveRequestData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ adminId: AdminData[0]._id })
        })
        const data = await response.json()
        console.log(data)
        setTableData(data)

    }






    function employeeOnLeaveCounter(data) {
        const count = data.filter(employee => employee.isActive === true).length;
        return count;


    }





    return (
        <View style={styles.body}>
            <View style={styles.header}>
                <View style={styles.upperHeader}>
                    <Text style={{ color: 'white', fontSize: 18 }}>Hello {username},</Text>
                    <Text style={styles.welcome}>Welcome</Text>
                </View>

                <View style={styles.lowerHeader}>
                    <View style={styles.upperDataCard}>
                        <View style={styles.dataCard}>

                            <View style={styles.dataCard1DP1}><Person width={30} height={30} /></View>


                            <View style={{ width: '100%', height: 70, flexDirection: 'column', gap: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Text>Total Employees</Text>
                                <Text style={{ fontWeight: 'bold' }}>{data.length}</Text>
                            </View>
                        </View>
                        <View style={styles.dataCard1}>
                            <View style={styles.dataCard1DP1}><People width={30} height={30} /></View>


                            <View style={{ width: '100%', height: 70, flexDirection: 'column', gap: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Text>Active Employees</Text>
                                <Text style={{ fontWeight: 'bold' }}>{employeeOnLeaveCounter(data)}</Text>
                            </View>

                        </View>
                    </View>
                    <View style={styles.lowerDataCard}>
                        <View style={styles.lowerDataCardDP}>
                            <Leave width={90} height={90} fill='black' />
                        </View>
                        <View style={styles.lowerDataCardText}>
                            <Text style={{ fontSize: 18 }}>Leave Request</Text>
                            <Text style={{ fontSize: 20, fontWeight: 600 }}>{tableData.filter(request => request.leaveRequest.status === "Pending").length}</Text>
                        </View>

                    </View>
                </View>
            </View>

            <View style={styles.extraData}>
                <View style={{ width: '90%', justifyContent: 'center', alignItems: 'flex-start' }}><Text style={{fontWeight: 'bold'}}>Inactive Employees</Text></View>
                <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center',  minWidth: '90%', minHeight: 160 }}>
                    {data.map((item, index) => (item.isActive === false ? <Inactive employee={item} key={index} /> : null))}
                </ScrollView>

            </View>


        </View>
    )
}

const styles = StyleSheet.create({

    body: {
        height: '100%',
        width: '100%',
        gap: '36%'

        
    },

    header: {
        backgroundColor: 'black',
        height: 200,
        flexDirection: 'colomn',
        gap: 5

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

        width: '100%',
        position: 'relative',
        bottom: '-20%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 20,
        alignItems: 'center'

    },

    dataCard: {


        width: '45%',
        height: 150,
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


    },

    dataCard1: {


        width: '45%',
        height: 150,
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



    },

    upperDataCard: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',

    },

    lowerDataCard: {

        width: '90%',
        height: 100,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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

    dataCard1DP: {
        height: 50,
        width: 50,
        borderRadius: 75,
        borderWidth: 2

    },
    dataCard1DP1: {
        height: 70,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(245, 5, 5, 0.63)",
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,


    },

    lowerDataCardDP: {

        height: '100%',
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(241, 245, 5, 0.80)",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10

    },
    lowerDataCardText: {
        height: '100%',
        width: '70%',

        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: 'space-around',
        alignItems: 'center'

    },

    extraData: {
        // marginTop: 240,
        width: '90%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column', // Corrected here
        alignSelf: 'center',
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: "rgba(0, 0, 0, 0.55)", // Color
        shadowOffset: {
            width: 0, // X offset
            height: 30 // Y offset
        },
        shadowRadius: 23, // Blur radius
        shadowOpacity: 0.55, // Opacity
        elevation: 10 ,// For Android compatibility
        gap: 5
    }
})

export default DashboardAdmin



const Inactive = ({employee}) => {
    return (
        <View style={styles1.body}>
            <View style={{width:50, height:50, borderRadius: 75,  backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}><Image source={{uri: employee.profilePicture }} style={{ width: 50, height: 50, borderRadius: 75 }}/></View>
            <Text>{employee.fullName}</Text>
            <Text>Employee</Text>
        </View>
    )
}


const styles1 = StyleSheet.create({

    body:{
        width: '100%',
        height: 60,
        
        borderRadius:10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(10, 10, 10, 0.10)'
    }
})
