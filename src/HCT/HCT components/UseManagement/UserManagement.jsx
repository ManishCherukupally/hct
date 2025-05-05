import { ActionIcon, Button, Card, Center, Container, Flex, Group, Loader, Modal, NumberInput, Overlay, Pagination, Radio, ScrollArea, Select, SimpleGrid, Space, Stack, Table, Text, Textarea, TextInput, Tooltip } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import React, { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi';
import MantineTable from '../MantineTable.jsx/MantineTable';
import axios from 'axios';
import { MdCircle, MdEdit, MdDeleteForever } from "react-icons/md";
import { useForm } from '@mantine/form';
import client from '../../../API/api';
import { DateInput } from '@mantine/dates';


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

    const [fulldetails, setfulldetails] = useState(false)
    const [name, setname] = useState("")
    const [userDetails, setuserDetails] = useState({})
    const [date, setDate] = useState(null);
    const [dobdate, setdobdate] = useState(null)
    // console.log(date);


    // console.log(userName)
    const form = useForm({

        initialValues: {
            name: "",
            date_of_birth: "",
            business_email: "",
            contact_no: "",
            location: "",
            user_status: value,
            username: "",
            category: "",
            age: '',
            gender: gender,

            how_did_you_learn_about_us: '',
            type_of_challange: '',
            goal: '',
            date_of_joining: '',
            height: '',
            weight: '',
            body_type: '',
            blood_test: '',
            bone_density: '',
            body_fatpercentage: '',
            muscle_mass: '',
            any_physical_limitations: '',
            any_concerns: ''
        },
        transformValues: (values) => ({
            name: `${values.name}`,
            date_of_birth: new Date(dobdate).toLocaleDateString("en-CA"),
            business_email: `${values.business_email}`,
            contact_no: `${values.contact_no}`,
            user_status: `${value}`,
            location: `${values.location}`,
            username: `${values.business_email}`,
            category: `${selectedCategory}`,
            age: values.age,
            gender: `${gender}`,

            how_did_you_learn_about_us: `${values.how_did_you_learn_about_us}`,
            type_of_challange: `${values.type_of_challange}`,
            goal: `${values.goal}`,
            date_of_joining: new Date(date).toLocaleDateString("en-CA"),
            height: parseFloat(values.height),
            weight: parseFloat(values.weight),
            body_type: `${values.body_type}`,
            blood_test: `${values.blood_test}`,
            bone_density: values.bone_density,
            body_fatpercentage: values.body_fatpercentage,
            muscle_mass: values.muscle_mass,
            any_physical_limitations: `${values.any_physical_limitations}`,
            any_concerns: `${values.any_concerns}`
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

    const handlefulldetails = (data) => {
        setfulldetails(true)
        setname(data.name)
        setuserDetails(data)
    }


    const handleDate = (value) => {
        console.log(value);

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
            <td onClick={() => handlefulldetails(item)}>{item.category}</td>
            <td onClick={() => handlefulldetails(item)}>{item.name}</td>
            <td onClick={() => handlefulldetails(item)}>{item.age}</td>
            <td onClick={() => handlefulldetails(item)}>{item.date_of_birth ? new Date(item.date_of_birth).toLocaleDateString("en-CA") : ''}</td>
            <td onClick={() => handlefulldetails(item)}>{item.gender}</td>
            <td onClick={() => handlefulldetails(item)}>{item.contact_no}</td>
            <td onClick={() => handlefulldetails(item)}>{item.business_email}</td>
            <td onClick={() => handlefulldetails(item)}>{new Date(item.date_joined).toLocaleDateString("en-CA")}</td>
            <td onClick={() => handlefulldetails(item)}>{item.location}</td>
            <td>
                <Flex>
                    <Tooltip label={"Edit"}><ActionIcon variant='subtle'
                        onClick={() => {
                            if (item.date_of_birth) {
                                const dobobject = new Date(item.date_of_birth)
                                setdobdate(dobobject)
                            }

                            const dateObject = new Date(item.date_joined);
                            setDate(dateObject);
                            // handleEditData(item)
                            setEditModal(true)
                            setUserName(item.business_email)
                            editDetails(item)
                            setEditStatus(true)
                        }} ><MdEdit color="#233c79" /></ActionIcon></Tooltip>
                    <Tooltip label={"Delete"}><ActionIcon variant='subtle' onClick={() => {
                        setOpenModal(true)
                        setUserName(item.business_email)
                    }} ><MdDeleteForever color="FF3C5F" /></ActionIcon></Tooltip>
                </Flex>
            </td>
        </tr>
    ))

    const editDetails = (data) => {
        // console.log(new Date(data.date_joined).toLocaleDateString("en-CA"));
        // console.log(data.date_joined);
        // const dateObject = new Date(data.date_joined);
        // console.log(dateObject);

        // setDate(dateObject);
        form.setValues({
            name: data.name,
            date_of_joining: dobdate ? dobdate : '',
            business_email: data.business_email || "",
            category: data.category || "",
            contact_no: data.contact_no || "",
            location: data.location || "",
            user_status: data.user_status || "",
            age: Number(data.age) || 0,
            gender: data.gender || "",
            date_joined: date,
            how_did_you_learn_about_us: data.how_did_you_learn_about_us || "",
            type_of_challange: data.type_of_challange || "",
            goal: data.goal || "",
            height: data.height ? Number(data.height) : 0,  // Ensuring a valid number
            weight: data.weight ? Number(data.weight) : 0,
            body_type: data.body_type || "",
            blood_test: data.blood_test || "",
            bone_density: data.bone_density ? Number(data.bone_density) : 0.0,
            body_fatpercentage: data.body_fatpercentage ? Number(data.body_fatpercentage) : 0.0,
            muscle_mass: data.muscle_mass ? Number(data.muscle_mass) : 0.0,
            any_physical_limitations: data.any_physical_limitations || "no",
            any_concerns: data.any_concerns || "no",
            Total_attendance: data.Total_attendance ? Number(data.Total_attendance) : 0,
            Total_water_intake: data.Total_water_intake ? Number(data.Total_water_intake) : 0,
            Total_step_count: data.Total_step_count ? Number(data.Total_step_count) : 0,
            Total_workout_duration: data.Total_workout_duration || "00:00:00",
        });

        // Separate state setters (if needed)
        setselectedCategory(data.category);
        setValue(data.user_status);
        setgender(data.gender);
    };


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
    console.log(selectedCategory);
    console.log(gender);
    console.log(value);



    return (
        <div>

            <Container mt={mediumScreen ? "5rem" : "2rem"} size={"xxl"}>

                <Modal closeOnClickOutside={false} centered style={{ display: "flex", justifyContent: "center" }} opened={userModal} onClose={() => setUserModal(false)} title="Add user">
                    <form>
                        <SimpleGrid cols={1}>
                            <TextInput

                                label="Name"
                                name='name'
                                placeholder="Enter name"

                                {...form.getInputProps('name')}

                            />

                            <NumberInput
                                placeholder="Your age"
                                label="Your age"


                                {...form.getInputProps('age')}
                            />

                            <DateInput

                                value={dobdate}
                                onChange={setdobdate}
                                label="Date of birth"
                                placeholder=" Enter Date of birth"
                            />


                            <TextInput

                                label="Email"
                                name='business_email'
                                placeholder="user@email.com"

                                {...form.getInputProps('business_email')}

                            />



                            <TextInput

                                label="Height"
                                name='height'
                                placeholder="Enter Height"

                                {...form.getInputProps('height')}

                            />

                            <TextInput

                                label="Weight"
                                name='weight'
                                placeholder="Enter Weight"

                                {...form.getInputProps('weight')}

                            />

                            <Select
                                data={categoryList}
                                placeholder='Select category'
                                label="Category"
                                value={selectedCategory}

                                onChange={(value) => {
                                    setselectedCategory(value)
                                }}
                            />


                            {/* <TextInput

                                    label="Password"
                                    name='password'
                                    placeholder=" password"
                                   
                                    {...form.getInputProps('password')}

                                /> */}
                            <TextInput

                                label="Contact No."
                                name='contact_no'
                                placeholder="Enter Contact No."

                                {...form.getInputProps('contact_no')}

                            />
                            <TextInput

                                label="Location"
                                name='location'
                                placeholder="Enter Location"

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

                            <Select
                                required
                                name='how_did_you_learn_about_us'
                                label="How did you get to know us? "
                                placeholder="Pick one"
                                searchable
                                nothingFound="No options"
                                data={['Facebook', 'Instagram Ad', 'Friend refered', 'Community promotion', 'Others']}
                                {...form.getInputProps('how_did_you_learn_about_us')}
                            />

                            <Radio.Group
                                required
                                name='type_of_challange'
                                label="Choose Your Journey"

                                {...form.getInputProps('type_of_challange')}
                                radius='md'
                                style={{ color: 'blue' }}
                            >
                                <Group mt="xs">
                                    <Radio value="100dayschallenge" label="100 Days Challenge" />
                                    <Radio value="longtermjourney" label="Longterm Journey" />

                                </Group>
                            </Radio.Group>

                            <Textarea maxRows={4} label='Goals' required name='goal' placeholder='Enter here..'
                                {...form.getInputProps('goal')}
                            >

                            </Textarea>


                            <DateInput
                                value={date}
                                onChange={setDate}
                                label="Date of joining"
                                placeholder=" Enter Date of joining"
                            />

                            <TextInput

                                label="Body Type"
                                name='body_type'
                                placeholder="Enter Body Type"

                                {...form.getInputProps('body_type')}

                            />
                            <TextInput

                                label="Blood Group"
                                name='blood_test'
                                placeholder="Enter Blood Group"

                                {...form.getInputProps('blood_test')}

                            />

                            <NumberInput

                                label="Bone Density"
                                name='bone_density'
                                placeholder="Enter Blood Group"

                                {...form.getInputProps('bone_density')}

                            />

                            <NumberInput

                                label="Fat Percentage"
                                name='body_fatpercentage'
                                placeholder="Enter Fat Percentage"

                                {...form.getInputProps('body_fatpercentage')}

                            />

                            <NumberInput

                                label="Muscel Mass"
                                name='muscle_mass'
                                placeholder="Enter Muscel Mass"

                                {...form.getInputProps('muscle_mass')}

                            />

                            <TextInput

                                label="Physical Limitations"
                                name='any_physical_limitations'
                                placeholder="Enter Physical Limitations"

                                {...form.getInputProps('any_physical_limitations')}

                            />

                            <TextInput

                                label="Any Concerns"
                                name='any_concerns'
                                placeholder="Enter Concerns"

                                {...form.getInputProps('any_concerns')}

                            />



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

                <Modal closeOnClickOutside={false} centered style={{ display: "flex", justifyContent: "center" }} opened={EditModal} onClose={() => {
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

                                {...form.getInputProps('name')}

                            />

                            <NumberInput
                                placeholder="Your age"
                                label="Your age"


                                {...form.getInputProps('age')}
                            />

                            <DateInput
                                value={dobdate}
                                onChange={setdobdate}
                                label="Date of birth"
                                placeholder=" Enter Date of birth"
                            />

                            <TextInput

                                label="Email"
                                name='business_email'
                                placeholder="user@email.com"

                                {...form.getInputProps('business_email')}

                            />


                            <TextInput

                                label="Height"
                                name='height'
                                placeholder="Enter Height"

                                {...form.getInputProps('height')}

                            />

                            <TextInput

                                label="Weight"
                                name='weight'
                                placeholder="Enter Weight"

                                {...form.getInputProps('weight')}

                            />

                            <Select
                                data={categoryList}
                                placeholder='Select category'
                                label="Category"
                                value={selectedCategory}

                                onChange={(value) => {
                                    setselectedCategory(value)
                                }}
                            />


                            {/* <TextInput

    label="Password"
    name='password'
    placeholder=" password"
   
    {...form.getInputProps('password')}

/> */}
                            <TextInput

                                label="Contact No."
                                name='contact_no'
                                placeholder="Enter Contact No."

                                {...form.getInputProps('contact_no')}

                            />
                            <TextInput

                                label="Location"
                                name='location'
                                placeholder="Enter Location"

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

                            <Select
                                required
                                name='how_did_you_learn_about_us'
                                label="How did you get to know us? "
                                placeholder="Pick one"
                                searchable
                                nothingFound="No options"
                                data={['Facebook', 'Instagram Ad', 'Friend refered', 'Community promotion', 'Others']}
                                {...form.getInputProps('how_did_you_learn_about_us')}
                            />

                            <Radio.Group
                                required
                                name='type_of_challange'
                                label="Choose Your Journey"

                                {...form.getInputProps('type_of_challange')}
                                radius='md'
                                style={{ color: 'blue' }}
                            >
                                <Group mt="xs">
                                    <Radio value="100dayschallenge" label="100 Days Challenge" />
                                    <Radio value="longtermjourney" label="Longterm Journey" />

                                </Group>
                            </Radio.Group>

                            <Textarea maxRows={4} label='Goals' required name='goal' placeholder='Enter here..'
                                {...form.getInputProps('goal')}
                            >

                            </Textarea>


                            <DateInput
                                value={date}
                                onChange={setDate}
                                label="Date of joining"
                                placeholder=" Enter Date of joining"
                            />

                            <TextInput

                                label="Body Type"
                                name='body_type'
                                placeholder="Enter Body Type"

                                {...form.getInputProps('body_type')}

                            />
                            <TextInput

                                label="Blood Group"
                                name='blood_test'
                                placeholder="Enter Blood Group"

                                {...form.getInputProps('blood_test')}

                            />

                            <NumberInput

                                label="Bone Density"
                                name='bone_density'
                                placeholder="Enter Blood Group"

                                {...form.getInputProps('bone_density')}

                            />

                            <NumberInput

                                label="Fat Percentage"
                                name='body_fatpercentage'
                                placeholder="Enter Fat Percentage"

                                {...form.getInputProps('body_fatpercentage')}

                            />

                            <NumberInput

                                label="Muscel Mass"
                                name='muscle_mass'
                                placeholder="Enter Muscel Mass"

                                {...form.getInputProps('muscle_mass')}

                            />

                            <TextInput

                                label="Physical Limitations"
                                name='any_physical_limitations'
                                placeholder="Enter Physical Limitations"

                                {...form.getInputProps('any_physical_limitations')}

                            />

                            <TextInput

                                label="Any Concerns"
                                name='any_concerns'
                                placeholder="Enter Concerns"

                                {...form.getInputProps('any_concerns')}

                            />

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

                <Modal closeOnClickOutside={false} centered style={{ display: "flex", justifyContent: "center" }} opened={opened} onClose={close} title="Are you sure?">
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

                <Modal closeOnClickOutside={false} centered style={{ display: "flex", justifyContent: "center" }} opened={openModal} onClose={() => setOpenModal(false)} title="Are you sure?!">
                    <Text>Do you really want to delete this user?</Text>
                    <Space h={15} />
                    <Flex justify={"end"} gap={"2%"}>
                        <Button loading={loaderVisible} onClick={handleDelete} style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "#233c79" }}
                            variant='filled'>Yes</Button>
                        <Button variant='outline' color='dark' onClick={() => setOpenModal(false)}>No</Button>
                    </Flex>
                </Modal>

                <Modal closeOnClickOutside={false} centered opened={fulldetails} onClose={() => setfulldetails(false)} title={`${name} (${userDetails.category})`}>
                    <Stack>
                        <Text>Status : {userDetails.user_status}</Text>
                        <Text>Date of Joining : {handleDate(userDetails.date_joined)}</Text>
                        {/* <Text>Date of Joining : {userDetails.name}</Text> */}
                        <Text>Age : {userDetails.age}</Text>
                        <Text>Gender : {userDetails.gender}</Text>
                        <Text>Contact no. : {userDetails.contact_no}</Text>
                        <Text>Email : {userDetails.business_email}</Text>
                        <Text>Location : {userDetails.location}</Text>
                        <Text>Height : {userDetails.height}</Text>
                        <Text>Weight : {userDetails.weight}</Text>
                        <Text>Body Type : {userDetails.body_type}</Text>
                        <Text>Blood : {userDetails.blood_test}</Text>
                        <Text>Bone Density : {userDetails.bone_density}</Text>
                        <Text>Body Fat : {userDetails.body_fatpercentage} %</Text>
                        <Text>Muscel Mass : {userDetails.muscle_mass}</Text>
                        <Text>Physical Limitations : {userDetails.any_physical_limitations}</Text>
                        <Text>Concerns : {userDetails.any_concerns}</Text>
                        <Text>Attendance : {userDetails.Total_attendance}</Text>
                        <Text>Water Intake : {userDetails.Total_water_intake} L</Text>
                        <Text>Step Count : {userDetails.Total_step_count}</Text>
                        <Text>Workout Duration : {userDetails.Total_workout_duration}</Text>
                        <Text>Got To Know Through : {userDetails.how_did_you_learn_about_us}</Text>
                        <Text>Challenge : {userDetails.type_of_challange}</Text>
                        <Text>Goal : {userDetails.goal}</Text>


                    </Stack>
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

                            form.reset()
                            setDate(null);
                            setdobdate(null)
                            setUserModal(true)
                            setEditStatus(false)

                        }}
                            radius={10} style={{ backgroundColor: "#233c79" }}>Add User</Button>
                    </Group>
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
                                    <th> Status </th>
                                    <th> Category </th>
                                    <th> Name </th>
                                    <th> Age </th>
                                    <th> Date of birth </th>
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
                                <thead style={{
                                    position: "sticky",
                                    top: 0,
                                    background: 'white', zIndex: 6,
                                }}>
                                    <tr>
                                        <th> Status </th>
                                        <th> Category </th>
                                        <th> Name </th>
                                        <th> Age </th>
                                        <th> Date of birth </th>
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
