import { ActionIcon, Button, Card, Center, Container, Flex, Group, Loader, Modal, NumberInput, Overlay, Pagination, Radio, ScrollArea, Select, SimpleGrid, Space, Table, Text, TextInput, Tooltip } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import React, { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi';
import MantineTable from '../MantineTable.jsx/MantineTable';
import axios from 'axios';
import { MdCircle, MdEdit, MdDeleteForever } from "react-icons/md";
import { useForm } from '@mantine/form';
import client from '../../../API/api';


const UserManagement = () => {
    const mediumScreen = useMediaQuery("(min-width: 1100px)");
    const largeScreen = useMediaQuery("(min-width: 1440px)");
    const extraLargeScreen = useMediaQuery("(min-width: 1770px)");

    const [value, setValue] = useState('active');
    const [gender, setgender] = useState('male')

    const [userData, setUserData] = useState([])

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(1)
    // const lastIndex = currentPage * recordsPerPage;
    // const firstIndex = lastIndex - recordsPerPage;
    const [opened, { open, close }] = useDisclosure(false);
    const [openModal, setOpenModal] = useState(false)
    const [userModal, setUserModal] = useState(false)

    const [EditModal, setEditModal] = useState(false)
    const [editData, setEditData] = useState(null)
    // console.log(editData)
    const [editStatus, setEditStatus] = useState(false)
    const [formValues, setFormValues] = useState(null);
    // console.log(formValues)

    const [userName, setUserName] = useState('')

    // const [render, setRender] = useState(0)
    const [loaderVisible, setLoaderVisible] = useState(false);

    const [categoryList, setcategoryList] = useState([])
    const [selectedCategory, setselectedCategory] = useState('')
    // console.log(userName)
    const form = useForm({

        initialValues: {
            name: "",
            business_email: "",
            contact_no: "",
            location: "",
            user_status: value,
            username: "",
            category: "",
            age: '',
            gender: gender
        },
        transformValues: (values) => ({
            name: `${values.name}`,
            business_email: `${values.business_email}`,
            contact_no: `${values.contact_no}`,
            user_status: `${value}`,
            location: `${values.location}`,
            username: `${values.business_email}`,
            category: `${selectedCategory}`,
            age: values.age,
            gender: `${gender}`
            // company: '',
            // years_of_experience: '',
            // job_position: ''

        }),
    })
    useEffect(() => {
        client.get("pagination/", {
            params: {
                page: currentPage
            },
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("access")}`
            }
        })
            .then((resp) => {
                setUserData(resp.data["page_obj"])
                setRecordsPerPage(resp.data.number_of_pages)
            })
            .catch(err => console.error(err))
    }, [currentPage, loaderVisible])

    // const form = useForm({
    //     initialValues: {
    //         name: window.localStorage.getItem("name"),
    //         password: window.localStorage.getItem("password"),
    //         username: window.localStorage.getItem("username"),
    //         contact_no: window.localStorage.getItem("contact_no"),
    //         location: window.localStorage.getItem("location"),
    //         user_status: value
    //     },
    //     transformValues: (values) => ({
    //         name: `${values.name}`,
    //         password: `${values.password}`,
    //         username: `${values.username}`,
    //         contact_no: `${values.contact_no}`,
    //         user_status: `${values.user_status}`,
    //         location: `${values.location}`,
    //     }),
    // })
    const handleDate = (value) => {
        const date = new Date(value);

        // Get day, month, and year from the Date object
        const day = date.getDate();
        const month = date.getMonth() + 1; // Month starts from 0
        const year = date.getFullYear();

        // Pad day and month with leading zeros if needed
        const formattedDay = day < 10 ? '0' + day : day;
        const formattedMonth = month < 10 ? '0' + month : month;

        // Construct the formatted date string
        const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
        return formattedDate
    }
    // const records = userData.slice(firstIndex, lastIndex);

    // const nPages = Math.ceil(userData.length / recordsPerPage)
    // const numbers = [...Array(nPages + 1).keys()].slice(1)

    const rows = userData.map((item) => (
        <tr key={item.id} style={{ height: 50 }}>
            <td >{item.user_status ?
                (<Tooltip label={item.user_status === 'inactive' ? "Inactive" : "Active"}>
                    <ActionIcon variant='transparent' color={item.user_status === 'inactive' ? 'red' : 'green'} onClick={() => {
                        open();
                        setUserName(item.business_email)
                    }}><MdCircle /></ActionIcon>
                </Tooltip>) : (
                    <ActionIcon variant='transparent' color='gray'><MdCircle /></ActionIcon>
                )

            }</td>
            {/* <td style={{ color: "orange" }}>{item.category}</td> */}
            <td >{item.category}</td>
            <td>{item.name}</td>
            <td>{item.age}</td>
            <td>{item.gender}</td>
            <td>{item.contact_no}</td>
            <td>{item.business_email}</td>
            <td>{handleDate(item.date_joined)}</td>
            <td>{item.location}</td>
            <td>
                <Flex>
                    <Tooltip label={"Edit"}><ActionIcon variant='subtle'
                        onClick={() => {
                            // handleEditData(item)
                            setEditModal(true)
                            setUserName(item.business_email)
                            editDetails(item)
                            setEditStatus(true)
                        }} >
                            <MdEdit color="#233c79" />
                            </ActionIcon>
                    </Tooltip>
                    <Tooltip label={"Delete"}><ActionIcon variant='subtle' onClick={() => {
                        setOpenModal(true)
                        setUserName(item.business_email)
                    }} ><MdDeleteForever color="FF3C5F" /></ActionIcon></Tooltip>
                </Flex>
            </td>
        </tr>
    ))

    const editDetails = (data) => {
        form.setValues({
            name: data.name,
            business_email: data.business_email,
            category: setselectedCategory(data.category),
            contact_no: data.contact_no,
            location: data.location,
            user_status: setValue(data.user_status),
            age: data.age,
            gender: setgender(data.gender)

        });
    }

    const handleDelete = () => {
        setLoaderVisible(true)

        client.delete('delete_users/', {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("access")}`
            },
            params: {
                business_email: userName
            }
        })
            .catch(err => console.error(err))
        setTimeout(() => {
            setOpenModal(false)
            setLoaderVisible(false)
        }, 1000);
    }

    const handleStatus = () => {
        setLoaderVisible(true)

        client.put("update_user_status/", { business_email: userName },
            {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("access")}`
                },


            }
        )
            .catch(err => console.error(err))
        setTimeout(() => {
            close()
            setLoaderVisible(false)
        }, 1000);
    }

    const handleAddUser = () => {
        setLoaderVisible(true)

        client.post("register_user/", form.getTransformedValues(), {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("access")}`
            },

        })
            .catch(err => console.error(err))
        setTimeout(() => {
            setUserModal(false)
            setLoaderVisible(false)
        }, 1000);
    }

    const handleEditUser = () => {
        setLoaderVisible(true)
        client.put("edit_user_details_hct/", form.getTransformedValues(), {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("access")}`
            },

        }
        )
            .catch(err => console.error(err))
        setTimeout(() => {
            setEditModal(false)
            setLoaderVisible(false)
        }, 1000);
    }

    useEffect(() => {
        client.get('hct_category_dd/', {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("access")}`
            }
        })
            .then((resp) => {
                setcategoryList(resp.data['category_list'].map(item => ({
                    value: item.category,
                    label: item.category
                })))
            })
    }, [])
    // console.log(selectedCategory);
    // console.log(gender);
    // console.log(value);



    return (
        <div>

            <Container mt={mediumScreen ? "5rem" : "2rem"} size={"xxl"}>

                <Modal centered style={{ display: "flex", justifyContent: "center" }} opened={userModal} onClose={() => setUserModal(false)} title="Add user">
                    <form>
                        <SimpleGrid cols={1}>
                            <TextInput

                                label="Name"
                                name='name'
                                placeholder="Enter name"
                                size={mediumScreen ? "md" : "lg"}
                                {...form.getInputProps('name')}

                            />
                            <TextInput

                                label="Email"
                                name='business_email'
                                placeholder="user@email.com"
                                size={mediumScreen ? "md" : "lg"}
                                {...form.getInputProps('business_email')}

                            />
                            <NumberInput
                                placeholder="Your age"
                                label="Your age"
                                size={mediumScreen ? "md" : "lg"}

                                {...form.getInputProps('age')}
                            />
                            <Select
                                data={categoryList}
                                placeholder='Select category'
                                label="Category"
                                value={selectedCategory}
                                size={mediumScreen ? "md" : "lg"}
                                onChange={(value) => {
                                    setselectedCategory(value)
                                }}
                            />


                            {/* <TextInput

                                    label="Password"
                                    name='password'
                                    placeholder=" password"
                                    size={mediumScreen ? "md" : "lg"}
                                    {...form.getInputProps('password')}

                                /> */}
                            <TextInput

                                label="Contact No."
                                name='contact_no'
                                placeholder="Enter Contact No."
                                size={mediumScreen ? "md" : "lg"}
                                {...form.getInputProps('contact_no')}

                            />
                            <TextInput

                                label="Location"
                                name='location'
                                placeholder="Enter Location"
                                size={mediumScreen ? "md" : "lg"}
                                {...form.getInputProps('location')}

                            />

                            <Radio.Group
                                name="favoriteFramework"
                                label="Gender"
                                value={gender}
                                onChange={setgender}
                            >
                                <Group mt="xs">
                                    <Radio value="male" label="Male" />
                                    <Radio value="female" label="Female" />
                                    <Radio value="other" label="Other" />
                                </Group>
                            </Radio.Group>


                            <Radio.Group
                                value={value}
                                onChange={setValue}

                                label="Select status of the user"

                                withAsterisk
                            >
                                <Group>
                                    <Radio value="active" label="Active" />
                                    <Radio value="inactive" label="Inactive" />
                                </Group>
                            </Radio.Group>
                        </SimpleGrid>
                        <Space h={15} />
                        <Flex justify={"end"} gap={"2%"}>
                            <Button loading={loaderVisible} style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "#233c79" }}
                                variant='filled' onClick={handleAddUser}>Done</Button>
                            <Button variant='outline' color='dark' onClick={() => setUserModal(false)}>No</Button>
                        </Flex>
                    </form>

                </Modal>



                <Modal centered style={{ display: "flex", justifyContent: "center" }} opened={EditModal} onClose={() => {
                    setEditModal(false)
                    setEditStatus(false)
                    setselectedCategory('')
                }} title="Edit user details">
                    <form>
                        <SimpleGrid cols={1}>
                            <TextInput

                                label="Name"
                                name='name'
                                placeholder="Enter name"
                                size={mediumScreen ? "md" : "lg"}
                                {...form.getInputProps('name')}

                            />
                            <TextInput

                                label="Email"
                                name='business_email'
                                placeholder="user@email.com"
                                size={mediumScreen ? "md" : "lg"}
                                {...form.getInputProps('business_email')}

                            />

                            <NumberInput
                                placeholder="Your age"
                                label="Your age"
                                size={mediumScreen ? "md" : "lg"}

                                {...form.getInputProps('age')} radius='md'
                            />

                            <Select
                                data={categoryList}
                                placeholder='Select category'
                                label="Category"
                                size={mediumScreen ? "md" : "lg"}
                                value={selectedCategory}
                                onChange={(value) => {
                                    setselectedCategory(value)
                                }}
                            />

                            {/* <TextInput

                                    label="Password"
                                    name='password'
                                    placeholder=" password"
                                    size={mediumScreen ? "md" : "lg"}
                                    {...form.getInputProps('password')}

                                /> */}
                            <TextInput

                                label="Contact No."
                                name='contact_no'
                                placeholder="Enter Contact No."
                                size={mediumScreen ? "md" : "lg"}
                                {...form.getInputProps('contact_no')}

                            />
                            <TextInput

                                label="Location"

                                name='location'
                                placeholder="Enter Location"
                                size={mediumScreen ? "md" : "lg"}
                                {...form.getInputProps('location')}

                            />

                            <Radio.Group
                                name="favoriteFramework"
                                label="Gender"
                                value={gender}
                                onChange={setgender}
                            >
                                <Group mt="xs">
                                    <Radio value="male" label="Male" />
                                    <Radio value="female" label="Female" />
                                    <Radio value="other" label="Other" />
                                </Group>
                            </Radio.Group>


                            <Radio.Group
                                value={value}
                                onChange={setValue}

                                label="Select status of the user"

                                withAsterisk
                            >
                                <Group mt={"xs"}>
                                    <Radio value="active" label="Active" />
                                    <Radio value="inactive" label="Inactive" />
                                </Group>
                            </Radio.Group>

                            <Flex justify={"end"} gap={"2%"}>
                                <Button loading={loaderVisible} style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "#233c79" }}
                                    variant='filled' onClick={handleEditUser}>Done</Button>
                                <Button variant='outline' color='dark' onClick={() => {
                                    setEditModal(false)
                                    setEditStatus(false)
                                }}>No</Button>
                            </Flex>
                        </SimpleGrid>
                    </form>

                </Modal>


                <Modal centered style={{ display: "flex", justifyContent: "center" }} opened={opened} onClose={close} title="Are you sure?!">
                    <Text>Do you really want to change the status?</Text>
                    <Space h={15} />
                    <Flex justify={"end"} gap={"2%"}>
                        <Button loading={loaderVisible} style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "#233c79" }}
                            variant='filled' onClick={() => {
                                handleStatus()
                            }}>Yes</Button>
                        <Button variant='outline' color='dark' onClick={close}>No</Button>
                    </Flex>
                </Modal>



                <Modal centered style={{ display: "flex", justifyContent: "center" }} opened={openModal} onClose={() => setOpenModal(false)} title="Are you sure?!">
                    <Text>Do you really want to delete this user?</Text>
                    <Space h={15} />
                    <Flex justify={"end"} gap={"2%"}>
                        <Button loading={loaderVisible} onClick={handleDelete} style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "#233c79" }}
                            variant='filled'>Yes</Button>
                        <Button variant='outline' color='dark' onClick={() => setOpenModal(false)}>No</Button>
                    </Flex>
                </Modal>

                <Flex justify={"space-between"}>
                    <Text fz={22} fw={600}>Users</Text>
                    <Group>
                        {/* <Select searchable nothingFound="No related courses" fz={18} w={400} radius={"md"} variant='filled'
                            placeholder='Search user'
                            icon={<ActionIcon><BiSearch /></ActionIcon>} data={["react", "Js"]}
                        // {data.map((option) => {
                        //   return {
                        //     value: option.value,
                        //     label: option.course_name,
                        //   };
                        // })} 
                        /> */}
                        <Button onClick={() => {
                            setUserModal(true)
                            setEditStatus(false)
                            form.reset()
                        }}
                            radius={10} style={{ backgroundColor: "#233c79" }}>Add User</Button>
                    </Group>
                </Flex>

                <Space h={15} />

                <Card withBorder radius={10} shadow='md'>
                    {mediumScreen ? (

                        <Table striped>
                            <thead>
                                <tr>
                                    <th> Status </th>
                                    <th> Category </th>
                                    <th> Name </th>
                                    <th> Age </th>
                                    <th> Gender </th>
                                    <th> Contact no. </th>
                                    <th> Email </th>
                                    <th> Date of joining </th>
                                    <th> Location </th>
                                    <th> Action </th>
                                </tr>
                            </thead>
                            <tbody>{rows}</tbody>
                        </Table>

                    ) : (
                        <ScrollArea offsetScrollbars h={400} >
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th> Status </th>
                                        <th> Category </th>
                                        <th> Name </th>
                                        <th> Age </th>
                                        <th> Gender </th>
                                        <th> Contact no. </th>
                                        <th> Email </th>
                                        <th> Date of joining </th>
                                        <th> Location </th>
                                        <th> Action </th>
                                    </tr>
                                </thead>
                                <tbody>{rows}</tbody>
                            </Table>
                        </ScrollArea>
                    )}

                    <Space h={"xl"} />
                    <Flex justify={"end"}>
                        <Pagination value={currentPage} onChange={setCurrentPage} total={recordsPerPage} color="yellow" siblings={1} />
                    </Flex>
                </Card>
            </Container>
        </div>
    )
}

export default UserManagement
