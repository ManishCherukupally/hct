import { ActionIcon, Button, Card, Container, Flex, Group, Modal, NumberInput, Pagination, ScrollArea, Space, Stack, Table, Text, Textarea, TextInput, Tooltip } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import client from '../../../API/api';
import { MdDeleteForever, MdEdit, MdSearch } from 'react-icons/md';
import { useForm } from '@mantine/form';
import { DateInput, DatePicker, TimeInput } from '@mantine/dates';
import { PiWarningOctagonFill } from 'react-icons/pi';
import { BiSort } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';

const Tracker = () => {
    const mediumScreen = useMediaQuery("(min-width: 1200px)");
    const largeScreen = useMediaQuery("(min-width: 1440px)");
    const extraLargeScreen = useMediaQuery("(min-width: 1770px)");
    const phone = useMediaQuery("(max-width: 424px)");

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
    const [inputValue, setInputValue] = useState('');

    const categoryparam = useParams()

    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

    const sortedData = React.useMemo(() => {
        // Apply filtering first
        const filtered = userData.filter((item) =>

            (item.name && item.name.toLowerCase().includes(inputValue.toLowerCase())) ||
            (item.goal && item.goal.toLowerCase().includes(inputValue.toLowerCase())) ||
            (item.date_of_joining && String(item.date_of_joining).toLowerCase().includes(inputValue.toLowerCase())) ||
            (item.Total_attendance && String(item.Total_attendance).toLowerCase().includes(inputValue.toLowerCase())) ||
            (item.Total_water_intake && String(item.Total_water_intake).toLowerCase().includes(inputValue.toLowerCase())) ||
            (item.Total_step_count && String(item.Total_step_count).toLowerCase().includes(inputValue.toLowerCase())) ||
            (item.formatted_workout_duration && String(item.formatted_workout_duration).toLowerCase().includes(inputValue.toLowerCase()))

        );

        // Then apply sorting
        if (!sortConfig.key || sortConfig.direction === '') {
            return filtered.sort((a, b) => b.id - a.id); // Default sorting by ID desc
        }

        return [...filtered].sort((a, b) => {
            const aVal = a[sortConfig.key];
            const bVal = b[sortConfig.key];

            if (typeof aVal === 'string' && typeof bVal === 'string') {
                return sortConfig.direction === 'asc'
                    ? aVal.localeCompare(bVal)
                    : bVal.localeCompare(aVal);
            }

            if (typeof aVal === 'number' && typeof bVal === 'number') {
                return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
            }

            if (aVal instanceof Date && bVal instanceof Date) {
                return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
            }

            return 0;
        });
    }, [userData, inputValue, sortConfig]);

    // const sortedData = React.useMemo(() => {
    //     if (!sortConfig.key || sortConfig.direction === '') {
    //         return userData;
    //     }

    //     let sortableData = [...userData];
    //     if (sortConfig.key) {
    //         sortableData.sort((a, b) => {
    //             const aVal = a[sortConfig.key];
    //             const bVal = b[sortConfig.key];

    //             if (typeof aVal === 'string' && typeof bVal === 'string') {
    //                 return sortConfig.direction === 'asc'
    //                     ? aVal.localeCompare(bVal)
    //                     : bVal.localeCompare(aVal);
    //             }

    //             if (typeof aVal === 'number' && typeof bVal === 'number') {
    //                 return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
    //             }

    //             if (aVal instanceof Date && bVal instanceof Date) {
    //                 return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
    //             }

    //             return 0;
    //         });
    //     }
    //     return sortableData;
    // }, [userData, sortConfig]);

    const handleSort = (key) => {
        setSortConfig((prev) => {
            if (prev.key === key && prev.direction === 'asc') {
                return { key: '', direction: '' }; // reset
            }
            return { key, direction: 'asc' };
        });
    };
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

    const rows = sortedData.map((item) => (
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
            }}>{item.formatted_workout_duration}</td>

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
                    <TextInput w={"8rem"}
                        radius={10}
                        rightSection={inputValue ? (<ActionIcon onClick={() => setInputValue('')}><RxCross2 /></ActionIcon>) : (null)}
                        icon={<MdSearch />} placeholder='Search here'
                        value={inputValue} onChange={(event) => {
                            const value = event.currentTarget.value;
                            setInputValue(value);
                            // setisSearching(value.trim() !== '');

                        }} />
                </Flex>
                <Space h={15} />
                <Card withBorder radius={10} shadow='md'>
                    {mediumScreen ? (
                        <Table striped>
                            <thead style={{
                                position: "sticky",
                                top: 0,
                                background: 'white', zIndex: 6,
                            }}>
                                <tr>
                                    {/* <th> User ID </th> */}

                                    <th style={{ width: 'auto' }}>
                                        <Flex gap={10} align={'center'}>
                                            <Text c={'dark'} fz={14} fw={500}>Name</Text>
                                            <ActionIcon onClick={() => handleSort('name')}><BiSort /></ActionIcon>
                                        </Flex>
                                    </th>

                                    <th style={{ width: 'auto' }}>
                                        <Flex gap={10} align={'center'}>
                                            <Text c={'dark'} fz={14} fw={500}>Goal</Text>
                                            <ActionIcon onClick={() => handleSort('goal')}><BiSort /></ActionIcon>
                                        </Flex>
                                    </th>

                                    <th style={{ width: 'auto' }}>
                                        <Flex gap={10} align={'center'}>
                                            <Text c={'dark'} fz={14} fw={500}> Date of Joining</Text>
                                            <ActionIcon onClick={() => handleSort('date_of_joining')}><BiSort /></ActionIcon>
                                        </Flex>
                                    </th>

                                    <th style={{ width: 'auto' }}>
                                        <Flex gap={10} align={'center'}>
                                            <Text c={'dark'} fz={14} fw={500}>Total Attendance</Text>
                                            <ActionIcon onClick={() => handleSort('Total_attendance')}><BiSort /></ActionIcon>
                                        </Flex>
                                    </th>

                                    <th style={{ width: 'auto' }}>
                                        <Flex gap={10} align={'center'}>
                                            <Text c={'dark'} fz={14} fw={500}>Average Water Intake</Text>
                                            <ActionIcon onClick={() => handleSort('Total_water_intake')}><BiSort /></ActionIcon>
                                        </Flex>
                                    </th>

                                    <th style={{ width: 'auto' }}>
                                        <Flex gap={10} align={'center'}>
                                            <Text c={'dark'} fz={14} fw={500}>Average Step Count</Text>
                                            <ActionIcon onClick={() => handleSort('Total_step_count')}><BiSort /></ActionIcon>
                                        </Flex>
                                    </th>

                                    <th style={{ width: 'auto' }}>
                                        <Flex gap={10} align={'center'}>
                                            <Text c={'dark'} fz={14} fw={500}>Average Workout Duration</Text>
                                            <ActionIcon onClick={() => handleSort('formatted_workout_duration')}><BiSort /></ActionIcon>
                                        </Flex>
                                    </th>

                                    {/* <th> Name </th>
                                    <th> Goal </th>
                                    <th> Date of Joining </th>
                                    <th> Total Attendance </th>
                                    <th> Average Water Intake </th>
                                    <th> Average Step Count </th>
                                    <th> Average Workout Duration </th> */}
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
                                <thead style={{
                                    position: "sticky",
                                    top: 0,
                                    background: 'white', zIndex: 6,
                                }}>
                                    <tr>
                                        {/* <th> User ID </th> */}
                                        <th style={{ width: 'auto' }}>
                                            <Flex gap={10} align={'center'}>
                                                <Text c={'dark'} fz={14} fw={500}>Name</Text>
                                                <ActionIcon onClick={() => handleSort('name')}><BiSort /></ActionIcon>
                                            </Flex>
                                        </th>

                                        <th style={{ width: 'auto' }}>
                                            <Flex gap={10} align={'center'}>
                                                <Text c={'dark'} fz={14} fw={500}>Goal</Text>
                                                <ActionIcon onClick={() => handleSort('goal')}><BiSort /></ActionIcon>
                                            </Flex>
                                        </th>

                                        <th style={{ width: 'auto' }}>
                                            <Flex gap={10} align={'center'}>
                                                <Text c={'dark'} fz={14} fw={500}> Date of Joining</Text>
                                                <ActionIcon onClick={() => handleSort('date_of_joining')}><BiSort /></ActionIcon>
                                            </Flex>
                                        </th>

                                        <th style={{ width: 'auto' }}>
                                            <Flex gap={10} align={'center'}>
                                                <Text c={'dark'} fz={14} fw={500}>Total Attendance</Text>
                                                <ActionIcon onClick={() => handleSort('Total_attendance')}><BiSort /></ActionIcon>
                                            </Flex>
                                        </th>

                                        <th style={{ width: 'auto' }}>
                                            <Flex gap={10} align={'center'}>
                                                <Text c={'dark'} fz={14} fw={500}>Average Water Intake</Text>
                                                <ActionIcon onClick={() => handleSort('Total_water_intake')}><BiSort /></ActionIcon>
                                            </Flex>
                                        </th>

                                        <th style={{ width: 'auto' }}>
                                            <Flex gap={10} align={'center'}>
                                                <Text c={'dark'} fz={14} fw={500}>Average Step Count</Text>
                                                <ActionIcon onClick={() => handleSort('Total_step_count')}><BiSort /></ActionIcon>
                                            </Flex>
                                        </th>

                                        <th style={{ width: 'auto' }}>
                                            <Flex gap={10} align={'center'}>
                                                <Text c={'dark'} fz={14} fw={500}>Average Workout Duration</Text>
                                                <ActionIcon onClick={() => handleSort('formatted_workout_duration')}><BiSort /></ActionIcon>
                                            </Flex>
                                        </th>
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
