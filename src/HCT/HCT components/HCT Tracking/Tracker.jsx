import { ActionIcon, Button, Card, Container, Flex, Group, Modal, NumberInput, Pagination, ScrollArea, Space, Stack, Table, Text, Textarea, TextInput, Tooltip } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import client from '../../../API/api';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { useForm } from '@mantine/form';
import { DateInput, DatePicker, TimeInput } from '@mantine/dates';
import { PiWarningOctagonFill } from 'react-icons/pi';

const Tracker = () => {
    const mediumScreen = useMediaQuery("(min-width: 1200px)");
    const largeScreen = useMediaQuery("(min-width: 1440px)");
    const extraLargeScreen = useMediaQuery("(min-width: 1770px)");
    const [memberModal, setmemberModal] = useState(false)
    const navigate = useNavigate()
    // const data = {
    //     name: "Vivek"
    // }

    const [userData, setUserData] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(1)
    const [loaderVisible, setLoaderVisible] = useState(false);
    const [date, setDate] = useState(null);
    const [deleteModal, setdeleteModal] = useState(false)
    const [noData, setnoData] = useState(false)
    const [userId, setuserId] = useState(null)

    const categoryparam = useParams()
    // const form = useForm({
    //     initialValues: {
    //         user_id: '',
    //         name: "",
    //         goal: "",
    //         date_of_joining: "",
    //         Total_attendance: "",
    //         Total_water_intake: "",
    //         Total_step_count: "",
    //         Total_workout_duration: "",
    //         body_type: ""
    //     },
    //     transformValues: (values) => ({
    //         name: `${values.name}`,
    //         goal: `${values.goal}`,
    //         date_of_joining: `${values.date_of_joining}`,
    //         Total_attendance: values.Total_attendance,
    //         Total_water_intake: values.Total_water_intake,
    //         Total_step_count: values.Total_step_count,
    //         Total_workout_duration: `${values.Total_workout_duration}`,
    //         body_type: `${values.body_type}`
    //     })
    // })
    useEffect(() => {
        client.get("challenge_pagination/", {
            params: {
                page: currentPage,
                category: categoryparam.category
            },
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("access")}`
            }
        })

            .then((resp) => {
                setUserData(resp.data["challenge_records"]);
                setRecordsPerPage(resp.data.number_of_pages)

            })
    }, [currentPage, loaderVisible, categoryparam.category])


    const handleDelete = () => {
        setLoaderVisible(true)

        client.delete("delete_onboard_user/", {
            params: {
                user_id: userId
            },
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("access")}`
            }

        }).then((resp) => {
            if (resp.data.status === 'No_records_found') {
                setdeleteModal(false)
                setnoData(true)
                setTimeout(() => {
                    setnoData(false)
                }, 2500);
            }

            if (resp.data.status === 'user_records_deleted') {
                setTimeout(() => {
                    setdeleteModal(false)
                    setLoaderVisible(false)
                }, 1000);
            }
            else {
                setTimeout(() => {
                    setdeleteModal(false)
                    setLoaderVisible(false)
                }, 1000);
            }

        })
            .catch(err => console.error(err))
        // setdeleteModal(true)

    }

    const rows = userData.map((item) => (
        <tr key={item.user_id} style={{ height: 50 }}>
            {/* <td onClick={() => navigate(`/tracker/${item.name}`)}>{item.user_id}</td> */}
            <td onClick={() => {
                localStorage.setItem("userId", item.user_id)
                navigate(`/tracker/${item.name}`)
            }}>{item.name}</td>

            <td onClick={() => {
                localStorage.setItem("userId", item.user_id)
                navigate(`/tracker/${item.name}`)
            }}>{item.goal}</td>

            <td onClick={() => {
                localStorage.setItem("userId", item.user_id)
                navigate(`/tracker/${item.name}`)
            }}>{item.date_of_joining}</td>

            <td onClick={() => {
                localStorage.setItem("userId", item.user_id)
                navigate(`/tracker/${item.name}`)
            }}>{item.Total_attendance}</td>

            <td onClick={() => {
                localStorage.setItem("userId", item.user_id)
                navigate(`/tracker/${item.name}`)
            }}>{item.Total_water_intake} L</td>

            <td onClick={() => {
                localStorage.setItem("userId", item.user_id)
                navigate(`/tracker/${item.name}`)
            }}>{item.Total_step_count} </td>

            <td onClick={() => {
                localStorage.setItem("userId", item.user_id)
                navigate(`/tracker/${item.name}`)
            }}>{item.Total_workout_duration}</td>

            {/* <td onClick={() => {
                localStorage.setItem("userId", item.user_id)
                navigate(`/tracker/${item.name}`)
            }}>{item.body_type}</td> */}

            <td>
                <Group>
                    {/* <Tooltip label="Edit"><ActionIcon variant='subtle'>
                        <MdEdit color="#233c79" /> </ActionIcon></Tooltip> */}
                    <Tooltip label="Delete"><ActionIcon variant='subtle'
                        onClick={() => {
                            setdeleteModal(true)
                            setuserId(item.user_id)
                        }}>
                        <MdDeleteForever color="#FF3C5F" /> </ActionIcon></Tooltip>
                </Group>
            </td>

        </tr>
    ))
    return (
        <div>
            <Container mt={mediumScreen ? "5rem" : "2rem"} size={"xxl"}>
                <Modal closeOnClickOutside={false} centered opened={noData} onClose={() => setnoData(false)} withCloseButton={false}>
                    <Text>There are no records!</Text>
                </Modal>
                {/* <Modal centered opened={memberModal} onClose={() => setmemberModal(false)} title="Add Member">
                    <form>
                        <Stack>
                            <TextInput
                                label="Name"
                                name='name'
                                placeholder="Enter name"
                                //  size={mediumScreen ? "md" : "lg"}
                                {...form.getInputProps('name')}
                            />

                            <Textarea
                                label="Goal"
                                placeholder='Enter goal'
                                name='goal'
                                {...form.getInputProps('goal')}

                            />
                            <DateInput
                                value={date}
                                onChange={setDate}
                                label="Date of Joining"
                                placeholder=" Enter Date of Joining"
                            />

                            <NumberInput
                                placeholder="Enter Total Attendance"
                                label="Total Attendance"
                                // value={form.values.Total_attendance || ""}  // Prevents null values
                                // onChange={(val) => form.setFieldValue("Total_attendance", val || "")}
                                {...form.getInputProps('Total_attendance')}
                            />

                            <NumberInput
                                placeholder="Enter Total Water Intake"
                                label="Total Water Intake"
                                // value={form.values.Total_water_intake || ""}
                                // onChange={(val) => form.setFieldValue("Total_water_intake", val || "")}
                                {...form.getInputProps('Total_water_intake')}
                            />

                            <NumberInput
                                placeholder="Enter Total Steps"
                                label="Total Steps"
                                // value={form.values.Total_step_count || ""}
                                // onChange={(val) => form.setFieldValue("Total_step_count", val || "")}
                                {...form.getInputProps('Total_step_count')}
                            />



                            <TimeInput
                                withSeconds
                                label="Total Workout Duration"
                                placeholder="Enter Time Duration"
                                value={form.values.Total_workout_duration || ""}
                                onChange={(val) => form.setFieldValue("Total_workout_duration", val || "")}
                                {...form.getInputProps('Total_workout_duration')}
                            />

                            <Button style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "#233c79" }}
                                variant='filled' onClick={handleAddmember}>Done</Button>
                        </Stack>                 </form>
                </Modal> */}

                <Modal closeOnClickOutside={false} centered opened={deleteModal} onClose={() => setdeleteModal(false)} withCloseButton={false} >
                    <Stack >
                        <Group spacing={"xs"}>
                            <PiWarningOctagonFill size={30} color='orange' />
                            <Text fz={18} fw={600}>Caution</Text>
                        </Group>
                        <Text>All the record data of this client will be deleted.</Text>

                        <Flex justify={"end"} gap={"sm"}>
                            <Button loading={loaderVisible} style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "#233c79" }}
                                variant='filled' onClick={() => handleDelete()}>Done</Button>
                            <Button onClick={() => setdeleteModal(false)} color="dark"
                                variant='outline'>No</Button>
                        </Flex>
                    </Stack>
                </Modal>

                <Flex justify={"space-between"}>
                    <Text fz={22} fw={600}>Tracker - {categoryparam.category}</Text>
                    {/* <Button onClick={() => {
                        setmemberModal(true)
                        form.reset()
                    }} radius={10} style={{ backgroundColor: "#233c79" }}> Add Member  </Button> */}
                </Flex>
                <Space h={15} />
                <Card withBorder radius={10} shadow='md'>
                    {mediumScreen ? (
                        <Table striped>
                            <thead>
                                <tr>
                                    {/* <th> User ID </th> */}
                                    <th> Name </th>
                                    <th> Goal </th>
                                    <th> Date of Joining </th>
                                    <th> Total Attendance </th>
                                    <th> Total Water Intake </th>
                                    <th> Total Step Count </th>
                                    <th> Total Workout Duration </th>
                                    {/* <th> Body Type </th> */}
                                    <th> Action </th>
                                </tr>
                            </thead>
                            <tbody>{rows}</tbody>
                            {/* <tbody>
                            <tr onClick={() => navigate(`/${data.name}`)}>
                                <td>Name</td>
                            </tr>
                        </tbody> */}
                        </Table>
                    ) : (
                        <ScrollArea offsetScrollbars h={400} >
                            <Table striped>
                                <thead>
                                    <tr>
                                        {/* <th> User ID </th> */}
                                        <th> Name </th>
                                        <th> Goal </th>
                                        <th> Date of Joining </th>
                                        <th> Total Attendance </th>
                                        <th> Total Water Intake </th>
                                        <th> Total Step Count </th>
                                        <th> Total Workout Duration </th>
                                        {/* <th> Body Type </th> */}
                                        <th> Action </th>
                                    </tr>
                                </thead>
                                <tbody>{rows}</tbody>
                                {/* <tbody>
                            <tr onClick={() => navigate(`/${data.name}`)}>
                                <td>Name</td>
                            </tr>
                        </tbody> */}
                            </Table>
                        </ScrollArea>
                    )}
                    <Space h={"xl"} />
                    <Flex justify={"end"}>
                        <Pagination value={currentPage} onChange={setCurrentPage} total={recordsPerPage} color="yellow" />
                    </Flex>
                </Card>
            </Container>
        </div>
    )
}

export default Tracker
