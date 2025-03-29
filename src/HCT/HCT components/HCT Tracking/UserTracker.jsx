import { ActionIcon, Button, Card, Container, Flex, Group, Modal, NumberInput, Pagination, SegmentedControl, SimpleGrid, Space, Stack, Table, Text, Textarea, TextInput, Tooltip } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks';
import React, { useEffect, useState } from 'react'
import { PiTableFill } from 'react-icons/pi';
import { SlGraph } from "react-icons/sl";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Usertrackchart from '../graphs/Usertrackchart';
import StepCountchart from '../graphs/WaterIntakechart';
import WaterIntakechart from '../graphs/WaterIntakechart';
import Sleepchart from '../graphs/Sleepchart';
import { FaArrowLeft, FaArrowLeftLong } from "react-icons/fa6";
import client from '../../../API/api';
import { useForm } from '@mantine/form';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { DateInput, TimeInput } from '@mantine/dates';

const UserTracker = () => {
    const mediumScreen = useMediaQuery("(min-width: 1200px)");
    const largeScreen = useMediaQuery("(min-width: 1440px)");
    const extraLargeScreen = useMediaQuery("(min-width: 1770px)");
    const username = useParams()
    const navigate = useNavigate()
    const [value, setValue] = useState('table');


    const [recordsPerPage, setRecordsPerPage] = useState(1)

    const [currentPage, setCurrentPage] = useState(1);
    const [loaderVisible, setLoaderVisible] = useState(false);

    const [data, setData] = useState([])
    const userId = localStorage.getItem("userId")
    const [recordModal, setrecordModal] = useState(false)
    const [editModal, seteditModal] = useState(false)
    const [deleteModal, setdeleteModal] = useState(false)
    const [date, setDate] = useState(null);
    const [nodata, setnoData] = useState(false)
    // console.log(new Date(date).toLocaleDateString("en-CA"));
    // const [deleteDate, setdeleteDate] = useState("")
    // console.log(deleteDate);

    const form = useForm({
        initialValues: {

            user_id: "",
            category: "",
            date_of_activity: "",
            day_count: "",
            step_count: "",
            diet: {},
            Exercises: "",
            water_in_liters: "",
            hours_of_sleep: "",
            workout_duration: "",
            calories_initial: "",
            calories_burn: "",
            just_relief_activity: ""


        },
        transformValues: (values) => ({
            user_id: parseInt(userId),
            category: 1,
            date_of_activity: new Date(date).toLocaleDateString("en-CA"),
            day_count: values.day_count,
            step_count: values.step_count,
            diet: {},
            Exercises: `${values.Exercises}`,
            water_in_liters: parseFloat(values.water_in_liters),
            hours_of_sleep: `${values.hours_of_sleep}`,
            workout_duration: `${values.workout_duration}`,
            calories_initial: 0,
            calories_burn: 0,
            just_relief_activity: `${values.just_relief_activity}`

        })
    })
    useEffect(() => {
        client.get("user_challenge_records/", {
            params: {
                page: currentPage,
                user_id: userId
            },
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("access")}`
            }
        })
            .then((resp) => {
                setData(resp.data["user_daily_activity_records"])

                if (resp.data.status === 'page_not_found') {
                    setnoData(true)

                }
            })
            .catch((err) => {
                console.log(err)
                setData([]);
            });
    }, [loaderVisible, currentPage])

    const rows = nodata ? (
        <Text mt={"lg"}> No data found!</Text>
    ) : (
        data.map((item) => (
            <tr key={item.id} style={{ height: 50 }}>
                <td> {item.date_of_activity} </td>
                <td> {item.day_count} </td>
                <td> {item.step_count} </td>
                <td> {item.water_in_liters} </td>
                <td> {item.hours_of_sleep} </td>
                <td> {item.workout_duration}  </td>
                {/* <td>{item.calories_initial} </td> */}
                {/* <td>{item.calories_burn} </td> */}
                {/* <td>
                    {Object.entries(item.diet).map(([key, value]) => (
                        // <div key={key}>{value}</div>
                        <ul style={{ paddingLeft: 20 }}>
                            <li>{value}</li>
                        </ul>
                    ))}
                </td>     */}
                <td> {item.Exercises} </td>
                <td> {item.just_relief_activity} </td>

                <td>
                    <Group>
                        <Tooltip label="Edit"><ActionIcon variant='subtle' onClick={() => {
                            seteditModal(true)
                            const dateObject = new Date(item.date_of_activity);
                            setDate(dateObject);
                            form.setValues({

                                user_id: userId,
                                category: 1,
                                date_of_activity: dateObject, day_count: item.day_count,
                                step_count: item.step_count,
                                diet: {},
                                Exercises: item.Exercises,
                                water_in_liters: item.water_in_liters,
                                hours_of_sleep: item.hours_of_sleep,
                                workout_duration: item.workout_duration,
                                calories_initial: 0,
                                calories_burn: 0,
                                just_relief_activity: item.just_relief_activity

                            })
                        }}>
                            <MdEdit color="#233c79" /> </ActionIcon></Tooltip>
                        <Tooltip label="Delete"><ActionIcon variant='subtle'
                            onClick={() => {
                                setDate(item.date_of_activity)
                                setdeleteModal(true)
                            }}
                        >
                            <MdDeleteForever color="#FF3C5F" /> </ActionIcon></Tooltip>
                    </Group>
                </td>
            </tr>
        )
        ))

    const handleAddrecord = () => {
        setLoaderVisible(true)
        client.post("user_challenge_create_records/", form.getTransformedValues(), {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("access")}`
            }
        })
            .then(resp => {
                if (resp.data.status === "user_tracking_created") {


                    setTimeout(() => {
                        setLoaderVisible(false)
                        setrecordModal(false)
                    }, 1000);
                }
                else {
                    setTimeout(() => {
                        setLoaderVisible(false)
                        setrecordModal(false)
                    }, 1000);
                }

            })


    }

    const handleEditrecord = () => {
        setLoaderVisible(true)

        client.put("update_user_tracking/", form.getTransformedValues(), {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("access")}`
            }
        })
            .then(resp => {
                // console.log(resp.data);

                if (resp.data.status === "User_tracking_updated") {
                    setTimeout(() => {
                        setLoaderVisible(false)
                        seteditModal(false)
                    }, 1000);
                }
                else {
                    setTimeout(() => {
                        setLoaderVisible(false)
                        setrecordModal(false)
                    }, 1000);
                }

            })
    }

    const handleDelete = (deleteDate) => {
        setLoaderVisible(true)

        client.delete("delete_user_activity_record/", {
            params: {
                user_id: userId,
                date_of_activity: deleteDate
            },
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("access")}`
            }
        }).then((resp) => {
            if (resp.data.status === 'user_activity_record_deleted') {
                setTimeout(() => {
                    setLoaderVisible(false)
                    setdeleteModal(false)
                }, 1000);
            }
            else {
                setTimeout(() => {
                    setLoaderVisible(false)
                    setrecordModal(false)
                }, 1000);
            }

        })
    }
    return (
        <div>
            <Container mt={mediumScreen ? "6rem" : "2rem"} size={"xxl"} style={{ zIndex: 150 }}>


                <Modal centered opened={recordModal} onClose={() => setrecordModal(false)} title="Add Record">
                    <Stack>
                        <DateInput
                            value={date}
                            onChange={setDate}
                            label="Date"
                            placeholder=" Enter Date"
                        />

                        <NumberInput
                            label="Day Count"
                            placeholder='Enter Day Count'
                            {...form.getInputProps('day_count')}
                        />

                        <NumberInput
                            label="Step Count"
                            placeholder='Enter Step Count'
                            {...form.getInputProps('step_count')}
                        />

                        <Textarea
                            label="Exercises"
                            placeholder='Enter Exercises'
                            {...form.getInputProps('Exercises')}
                        />

                        <TextInput
                            label="Water in Liters"
                            placeholder='Enter Water in Liters'
                            {...form.getInputProps('water_in_liters')}
                        />

                        {/* <TextInput
                            label="Hours of Sleep"
                            placeholder='Enter Hours of Sleep'
                            {...form.getInputProps('hours_of_sleep')}
                        /> */}

                        <TimeInput
                            withSeconds
                            label="Hours of Sleep"
                            placeholder="Enter Hours of Sleep"
                            // value={form.values.Total_workout_duration || ""}
                            // onChange={(val) => form.setFieldValue("Total_workout_duration", val || "")}
                            {...form.getInputProps('hours_of_sleep')}
                        />
                        <TimeInput
                            withSeconds
                            label="Workout Duration"
                            placeholder="Enter Workout Duration"
                            // value={form.values.Total_workout_duration || ""}
                            // onChange={(val) => form.setFieldValue("Total_workout_duration", val || "")}
                            {...form.getInputProps('workout_duration')}
                        />

                        <Textarea
                            label="Just Relief Activity"
                            placeholder='Enter Relief Activity'
                            {...form.getInputProps('just_relief_activity')}
                        />

                        <Button loading={loaderVisible} style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "#233c79" }}
                            variant='filled' onClick={handleAddrecord}>Done</Button>
                    </Stack>
                </Modal>
                <Modal centered opened={editModal} onClose={() => seteditModal(false)} title="Edit Record">
                    <Stack>
                        <DateInput
                            value={date}  // Ensure it's using the state value
                            onChange={(value) => setDate(value)}
                            label="Date"
                            placeholder=" Enter Date"
                        />

                        <NumberInput
                            label="Day Count"
                            placeholder='Enter Day Count'
                            {...form.getInputProps('day_count')}
                        />

                        <NumberInput
                            label="Step Count"
                            placeholder='Enter Step Count'
                            {...form.getInputProps('step_count')}
                        />

                        <Textarea
                            label="Exercises"
                            placeholder='Enter Exercises'
                            {...form.getInputProps('Exercises')}
                        />

                        <TextInput
                            label="Water in Liters"
                            placeholder='Enter Water in Liters'
                            {...form.getInputProps('water_in_liters')}
                        />

                        {/* <TextInput
                            label="Hours of Sleep"
                            placeholder='Enter Hours of Sleep'
                            {...form.getInputProps('hours_of_sleep')}
                        /> */}

                        <TimeInput
                            withSeconds
                            label="Hours of Sleep"
                            placeholder="Enter Hours of Sleep"
                            // value={form.values.Total_workout_duration || ""}
                            // onChange={(val) => form.setFieldValue("Total_workout_duration", val || "")}
                            {...form.getInputProps('hours_of_sleep')}
                        />
                        <TimeInput
                            withSeconds
                            label="Workout Duration"
                            placeholder="Enter Workout Duration"
                            // value={form.values.Total_workout_duration || ""}
                            // onChange={(val) => form.setFieldValue("Total_workout_duration", val || "")}
                            {...form.getInputProps('workout_duration')}
                        />

                        <Textarea
                            label="Just Relief Activity"
                            placeholder='Enter Relief Activity'
                            {...form.getInputProps('just_relief_activity')}
                        />

                        <Button loading={loaderVisible} style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "#233c79" }}
                            variant='filled' onClick={handleEditrecord}>Edit</Button>
                    </Stack>
                </Modal>

                <Modal centered opened={deleteModal} onClose={() => setdeleteModal(false)} title='Are you sure?'>
                    <Text>Do you really want to delete this record?</Text>

                    <Flex justify={"end"}>
                        <Button loading={loaderVisible} style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "#233c79" }}
                            variant='filled' onClick={() => handleDelete(date)}>Done</Button>
                    </Flex>
                </Modal>

                <Flex justify={"space-between"}>
                    <Group>
                        <Link to={"/trackingpage"}>
                            <FaArrowLeftLong />
                        </Link>
                        {/* <ActionIcon onClick={() => navigate()}></ActionIcon> */}
                        <Text fz={22} fw={600}>{username.username}</Text>
                    </Group>
                    <Group>
                        <Button radius={10} style={{ backgroundColor: "#233c79" }}
                            onClick={() => {
                                setrecordModal(true)
                                form.reset()
                                setDate(null);
                            }}> Add Record  </Button>

                        <SegmentedControl w={"10rem"}
                            value={value}
                            onChange={setValue}
                            data={[
                                { label: <PiTableFill />, value: 'table' },
                                { label: <SlGraph />, value: 'graph' },

                            ]}
                        />
                    </Group>
                </Flex>
                <Space h={15} />


                {
                    value === 'table' ? (
                        <Card withBorder radius={10} shadow='md'>

                            <Table striped>
                                <thead>
                                    <tr>
                                        <th> Date </th>
                                        <th> Day Count </th>
                                        <th> Step Count </th>
                                        <th> Water in Liters </th>
                                        <th> Hours of Sleep </th>
                                        <th> Workout Duration  </th>
                                        {/* <th> Calories Initial </th> */}
                                        {/* <th>Calories Burn </th> */}
                                        {/* <th> Diet </th> */}
                                        <th> Exercises </th>
                                        <th> Just Relief Activity </th>
                                        <th> Action </th>

                                    </tr>
                                </thead>
                                <tbody>{rows}</tbody>

                                {/* {
                                    nodata ? (
                                        <Text align="center">No records found</Text>
                                    ) : (
                                        <tbody>{rows}</tbody>
                                    )
                                } */}

                                {/* <tbody>
                                    <tr >
                                        <td>Name</td>
                                    </tr>
                                </tbody> */}
                            </Table>

                            <Flex justify={"end"}>
                                <Pagination value={currentPage} onChange={setCurrentPage} total={recordsPerPage} color="yellow" siblings={1} />
                            </Flex>
                        </Card>
                    ) : (
                        <>
                            <SimpleGrid cols={2}>
                                <Card withBorder radius={"md"}>
                                    <WaterIntakechart data={data} />
                                </Card>

                                <Card withBorder radius={"md"}>
                                    <Sleepchart data={data} />
                                </Card>
                            </SimpleGrid>
                            <Space h={15} />
                            <Card withBorder radius={"md"} mb={"1rem"}>
                                <Usertrackchart data={data} />
                            </Card>

                        </>
                    )
                }

            </Container>
        </div>
    )
}

export default UserTracker
