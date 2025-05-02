import { useMediaQuery } from '@mantine/hooks';
import React, { useEffect, useState } from 'react'
import client from '../../../API/api';
import { ActionIcon, Button, Card, Container, Flex, Modal, MultiSelect, Pagination, ScrollArea, Select, Space, Spoiler, Table, Text, Tooltip } from '@mantine/core';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { useForm } from '@mantine/form';
import { TimeInput } from '@mantine/dates';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import { FaTelegramPlane } from 'react-icons/fa';

const Broadcast = () => {
    const mediumScreen = useMediaQuery("(min-width: 1200px)");
    const largeScreen = useMediaQuery("(min-width: 1440px)");
    const extraLargeScreen = useMediaQuery("(min-width: 1770px)");

    const [broadcastData, setbroadcastData] = useState([])

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(1)

    const [loaderVisible, setLoaderVisible] = useState(false);

    const [editModal, setEditModal] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [broadcastModal, setbroadcastModal] = useState(false)
    const [sendModal, setsendModal] = useState(false)

    const [broadcastId, setbroadcastId] = useState(null)
    const [editBroadcastId, seteditBroadcastId] = useState(null)

    const [templateData, settemplateData] = useState([])
    const [templatedropDownData, settemplatedropDownData] = useState([])
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    // console.log(selectedTemplate)


    const [userData, setuserData] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([]);
    // console.log(selectedUsers)

    const [categoryList, setcategoryList] = useState([])
    const [selectedCategory, setSelectedCategory] = useState([])
    // console.log(selectedCategory);

    const [selectedValue, setSelectedValue] = useState('')
    // console.log(selectedValue)

    const [editData, setEditData] = useState(null);
    // const [userData, setuserData] = useState([])
    // const userData = []
    // console.log(userData);
    const [selectedFrequency, setSelectedFrequency] = useState('');

    const [selectedSource, setSelectedSource] = useState('');

    const [newTemplateId, setnewTemplateId] = useState(null)
    const [newTemplate, setnewTemplate] = useState(null)
    const [newtemplateEdit, setnewtemplateEdit] = useState(false)
    // console.log(newTemplate) 
    // console.log(newtemplateEdit)   

    const [isEditMode, setIsEditMode] = useState(false);
    const [editValue, setEditValue] = useState('')
    // console.log(editValue);
    const [nodata, setnoData] = useState(false)

    useEffect(() => {
        client.get("broadcast_pagination/", {
            params: {
                page: currentPage
            },
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("access")}`
            }
        })
            .then((resp) => {
                // console.log(resp.data['templates']);
                setbroadcastData(resp.data['templates'])
                console.log(resp.data['templates'])

                // resp.data['templates'].map(item => item.users.map(item => ({
                //     value: item.user_id,
                //     label: item.username,
                // })))
                // setTimeout(() => {
                //     broadcastData.map(item => userData.push(item["users"].map(item => ({
                //         value: item.user_id,
                //         label: item.username
                //     }))));
                //     console.log(userData);
                // }, 500);

                setRecordsPerPage(resp.data.number_of_pages)
                if (resp.data.status === 'page_not_found') {
                    setnoData(true)

                }
            })
            .catch(err => console.error(err))
    }, [currentPage, loaderVisible])

    useEffect(() => {
        client.get('hct_template_dd', {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("access")}`
            }
        })
            .then((resp) => {
                settemplateData(resp.data['template_list']);
                settemplatedropDownData(resp.data['template_list'].map(template => ({
                    value: template.template_id,
                    label: template.template_name,
                }))
                )
            })
            .catch(err => console.error(err))
    }, [])


    useEffect(() => {
        client.get('hct_active_users_dd', {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("access")}`
            }
        })
            .then((resp) => {
                setuserData(resp.data['active_users'].map((user) => ({
                    value: user.user_id,
                    // label: user.business_email
                    label: user.name
                })))
            })
            .catch(err => console.error(err))
    }, [])
    // console.log(templatedropDownData);

    useEffect(() => {
        client.get('hct_category_dd/', {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("access")}`
            }
        })
            .then((resp) => {
                setcategoryList(resp.data['category_list'].map(item => ({
                    value: item.category_id,
                    label: item.category
                })))
                // console.log(resp.data['category_list'])
            })
    }, [])
    // console.log(selectedCategory);
    // console.log(gender);
    // console.log(value);

    const handleSelectTemplate = (value) => {
        const selectedTemplateId = parseInt(value);

        if (isEditMode) {
            if (selectedTemplateId !== selectedTemplate) {
                setnewTemplate(selectedTemplateId); // template was changed
            } else {
                setnewTemplate(selectedTemplate); // unchanged, fallback to old
            }
        } else {
            setSelectedTemplate(selectedTemplateId); // for non-edit mode
        }
    };



    // console.log(newTemplate);

    const handleSelectUsers = (values) => {
        // setSelectedUsers(values);
        // Convert the selected values to the corresponding user IDs
        const selectedUserIds = values.map(value => parseInt(value));
        setSelectedUsers(selectedUserIds);
    };

    const handleCategoryChange = (values) => {
        const selectedcategoryIds = values.map(value => parseInt(value));
        setSelectedCategory(selectedcategoryIds);
    };

    // const handleEditData = (item) => {
    //     setEditData(item);
    //     console.log(typeof (item.id));
    //     setSelectedUsers(item.users.map(user => user.user_id));
    //     setSelectedFrequency(item.frequency);
    //     setSelectedSource(item.follow_up);
    //     form.setFieldValue('time', item.time); // Set the initial time value
    //     setEditModal(true);
    // };

    const handleEditData = (item) => {
        if (item.users && item.users.length > 0) {
            setEditValue('User');
        } else if (item.category && item.category.length > 0) {
            setEditValue('Category');
        }
        setIsEditMode(true);
        setEditData(item);
        setSelectedTemplate(parseInt(item.template_id));
        setSelectedUsers(item.users.map(user => user.user_id));
        setSelectedFrequency(item.frequency);
        setSelectedSource(item.follow_up);
        form.setFieldValue('time', item.time); // Set the initial time value
        // console.log("Editing item:", item);
        // console.log("Selected template ID:", item.id);
        // console.log("Template data:", templateData);
        setSelectedCategory(item.category.map(cat => cat.category_id));
    };

    const handleAddData = () => {
        setSelectedTemplate(null); // Make sure this sets the correct template ID
        setSelectedUsers([]);
        setSelectedFrequency("");
        setSelectedSource("");
        form.setFieldValue('time', "");
        setIsEditMode(false);
    }
    // console.log(templatedropDownData);

    const rows =
        nodata ? (
            <Text mt={"lg"}> No broadcasts found!</Text>
        ) : (
            broadcastData.map((item) => (
                <tr key={item.id} style={{ height: 50 }}>
                    <td style={{ width: '346px' }}>{item.template}</td>
                    <td style={{ width: '346px' }}>
                        {item.users.length === 0 ? (
                            item.category.length > 1 ? (
                                <Spoiler maxHeight={25} showLabel="Show more" hideLabel="Hide">
                                    {item.category.map((categoryData) => (
                                        <div key={categoryData.category_id}>{categoryData.category}</div>
                                    ))}
                                </Spoiler>
                            ) : (
                                item.category.map((categoryData) => (
                                    <div key={categoryData.category_id}>{categoryData.category}</div>
                                ))
                            )
                        ) : (
                            item.users.length > 1 ? (
                                <Spoiler maxHeight={25} showLabel="Show more" hideLabel="Hide">
                                    {item.users.map((userData) => (
                                        <div key={userData.user_id}>{userData.username}</div>
                                    ))}
                                </Spoiler>
                            ) : (
                                item.users.map((userData) => (
                                    <div key={userData.user_id}>{userData.username}</div>
                                ))
                            )
                        )}
                    </td>
                    <td style={{ width: '346px' }}>{item.frequency}</td>
                    <td style={{ width: '346px' }}>{item.follow_up}</td>
                    <td style={{ width: '346px' }}>{item.time}</td>
                    <td>
                        <Flex gap={"0.5rem"}>
                            <Tooltip label={"Send"}>
                                <ActionIcon variant='subtle' onClick={() => {
                                    setsendModal(true);
                                    setbroadcastId(item.id);
                                }}>
                                    <FaTelegramPlane color="#0096FF" />
                                </ActionIcon>
                            </Tooltip>

                            <Tooltip label={"Edit"}>
                                <ActionIcon variant='subtle' onClick={() => {
                                    setEditModal(true);
                                    setnewtemplateEdit(true);
                                    handleEditData(item);
                                    seteditBroadcastId(item.id)
                                }}>
                                    <MdEdit color="#233c79" />
                                </ActionIcon>
                            </Tooltip>

                            <Tooltip label={"Delete"}>
                                <ActionIcon variant='subtle' onClick={() => {
                                    setOpenModal(true);
                                    setbroadcastId(item.id);
                                }}>
                                    <MdDeleteForever color="FF3C5F" />
                                </ActionIcon>
                            </Tooltip>
                        </Flex>
                    </td>
                </tr>
            )
            ));


    const form = useForm({
        initialValues: {
            broadcast_id: null,
            template_id: null,
            users: [],
            categories: [],
            frequency: "",
            follow_up: "",
            time: null,
            new_template_id: null
        },
        transformValues: (values) => {
            const typeValue = isEditMode ? editValue : selectedValue;

            return {
                broadcast_id: editBroadcastId,
                template_id: selectedTemplate,
                users: typeValue === "User" ? selectedUsers : [],
                frequency: selectedFrequency,
                follow_up: selectedSource,
                categories: typeValue === "Category" ? selectedCategory : [],
                time: selectedFrequency === 'once' ? null : `${values.time}`,
                new_template_id: isEditMode ? (newTemplate ?? selectedTemplate) : selectedTemplate,
            };
        }

    })

    const handleAddBroadcast = () => {
        setLoaderVisible(true)
        // console.log(form.getTransformedValues());
        client.post("create_broadcast/", form.getTransformedValues(), {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${window.localStorage.getItem("access")}`
            }
        })
            .catch(err => console.error(err))

        setTimeout(() => {
            setbroadcastModal(false)
            setLoaderVisible(false)
        }, 1000);
    }

    const handleDelete = () => {
        setLoaderVisible(true)

        client.delete('delete_broadcast/', {
            params: {
                broadcast_id: broadcastId
            },
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("access")}`
            }
        })
            .catch(err => console.error(err))
        setTimeout(() => {
            setOpenModal(false)
            setLoaderVisible(false)
        }, 1000);
    }

    const handleEditBroadcast = () => {
        setLoaderVisible(true)
        client.put('update_broadcast/', form.getTransformedValues(), {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("access")}`
            }
        })
            .catch(err => console.error(err))
        setTimeout(() => {
            setEditModal(false)
            setLoaderVisible(false)
        }, 1000);
        setSelectedTemplate(newTemplate)
        setnewtemplateEdit(false)
        // setSelectedCategory(parseInt(value))
    }

    const handleSend = () => {
        setLoaderVisible(true)
        client.put('broadcast/', {
            broadcast_id: broadcastId
        },
            {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("access")}`
                }
            })
            .catch(err => console.error(err))
        setTimeout(() => {
            setsendModal(false)
            setLoaderVisible(false)
        }, 1000);
    }
    return (
        <div>
            <Container mt={mediumScreen ? "5rem" : "2rem"} size={"xxl"}>

                <Modal closeOnClickOutside={false} centered style={{ display: "flex", justifyContent: "center" }} opened={broadcastModal} onClose={() => setbroadcastModal(false)} title="Add Broadcast">
                    <Select
                        data={templatedropDownData}
                        placeholder="Select a template"
                        label="Templates"
                        value={selectedTemplate}
                        onChange={handleSelectTemplate}
                    />

                    <Select required
                        data={[
                            { value: 'User', label: 'User' },
                            { value: 'Category', label: 'Category' }
                        ]}
                        placeholder="Select By"
                        label="Select By"
                        value={selectedValue}
                        onChange={setSelectedValue}
                    />

                    {
                        selectedValue === "User" && (<MultiSelect
                            data={userData}
                            placeholder="Select User"
                            label="User"
                            value={selectedUsers}
                            onChange={handleSelectUsers}
                        />)
                    }

                    {
                        selectedValue === "Category" && (<MultiSelect
                            data={categoryList}
                            placeholder="Select Category"
                            label="Category"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        />)
                    }


                    <Select
                        data={[
                            { value: 'once', label: 'Once' },
                            { value: 'periodic', label: 'Periodic' }]
                        }
                        placeholder="Select frequency"
                        label="Frequency"
                        value={selectedFrequency}
                        onChange={setSelectedFrequency}
                    />

                    {
                        selectedFrequency === 'periodic' ? (
                            <TimeInput
                                withSeconds
                                label='Time'
                                placeholder='Enter time'
                                {...form.getInputProps('time')}
                            />) : (null)
                    }

                    <Select
                        data={[
                            { value: 'mail', label: 'Mail' },
                            { value: 'whatsapp', label: 'Whatsapp' },
                            { value: 'both', label: 'Both' }]
                        }
                        placeholder="Select Source"
                        label="Source"
                        value={selectedSource}
                        onChange={setSelectedSource}
                    />

                    <Space h={15} />
                    <Flex justify={"end"} gap={"2%"}>
                        <Button loading={loaderVisible} style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "#233c79" }}
                            variant='filled' onClick={handleAddBroadcast} >Add</Button>
                        {/* <Button variant='outline' color='dark' onClick={() => settemplateModal(false)}>No</Button> */}
                    </Flex>
                </Modal>

                {/* Edit Broadcast */}

                <Modal closeOnClickOutside={false} centered style={{ display: "flex", justifyContent: "center" }} opened={editModal} onClose={() => setEditModal(false)} title="Edit Broadcast">
                    <Select
                        data={templatedropDownData}
                        placeholder="Select a template"
                        label="Templates"
                        value={isEditMode && newTemplate === null ? selectedTemplate : newTemplate}
                        // onChange={(value) => {
                        //     // setnewtemplateEdit ? setnewTemplate(parseInt(value)) : setSelectedTemplate(parseInt(value));
                        //     // setnewtemplateEdit && setnewTemplate(parseInt(value))
                        // }}
                        onChange={handleSelectTemplate}
                    />
                    {
                        editValue === "User" ? (
                            <MultiSelect
                                dropdownPosition="bottom"
                                searchable
                                clearable
                                data={userData}
                                placeholder="Select users"
                                label="Users"
                                value={selectedUsers}
                                onChange={handleSelectUsers}
                            />) : (<MultiSelect
                                dropdownPosition="bottom"
                                searchable
                                clearable
                                data={categoryList}
                                placeholder="Select Category"
                                label="Category"
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                            />)
                    }


                    <Select
                        data={[
                            { value: 'once', label: 'Once' },
                            { value: 'periodic', label: 'Periodic' }]
                        }
                        placeholder="Select frequency"
                        label="Frequency"
                        value={selectedFrequency}
                        onChange={setSelectedFrequency}
                    />

                    {
                        selectedFrequency === 'periodic' ? (
                            <TimeInput
                                withSeconds
                                label='Time'
                                placeholder='Enter time'
                                {...form.getInputProps('time')}
                            />) : (null)
                    }



                    <Select
                        data={[
                            { value: 'mail', label: 'Mail' },
                            { value: 'whatsapp', label: 'Whatsapp' },
                            { value: 'both', label: 'Both' }]
                        }
                        placeholder="Select Source"
                        label="Source"
                        value={selectedSource}
                        onChange={setSelectedSource}
                    />

                    <Space h={15} />
                    <Flex justify={"end"} gap={"2%"}>
                        <Button type='submit' loading={loaderVisible} style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "#233c79" }}
                            variant='filled' onClick={() => handleEditBroadcast()}>Edit</Button>
                        {/* <Button variant='outline' color='dark' onClick={() => settemplateModal(false)}>No</Button> */}
                    </Flex>

                </Modal>


                <Modal closeOnClickOutside={false} centered style={{ display: "flex", justifyContent: "center" }} opened={openModal} onClose={() => setOpenModal(false)} title="Are you sure?!">
                    <Text>Do you really want to delete this broadcast?</Text>
                    <Space h={15} />
                    <Flex justify={"end"} gap={"2%"}>
                        <Button loading={loaderVisible} onClick={handleDelete} style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "#233c79" }}
                            variant='filled'>Delete</Button>
                        {/* <Button variant='outline' color='dark' onClick={() => setOpenModal(false)}>No</Button> */}
                    </Flex>
                </Modal>

                <Modal closeOnClickOutside={false} centered style={{ display: "flex", justifyContent: "center" }} opened={sendModal} onClose={() => setsendModal(false)} title="Are you sure?!">
                    <Text>Do you really want to send this broadcast?</Text>
                    <Space h={15} />
                    <Flex justify={"end"} gap={"2%"}>
                        <Button loading={loaderVisible} onClick={handleSend} style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "#233c79" }}
                            variant='filled'>Send</Button>
                        {/* <Button variant='outline' color='dark' onClick={() => setOpenModal(false)}>No</Button> */}
                    </Flex>
                </Modal>

                <Flex justify={"space-between"}>
                    <Text fz={22} fw={600}>Broadcasts</Text>

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
                        setbroadcastModal(true)
                        handleAddData()
                        form.setValues({
                            broadcast_id: null,
                            template_id: null,
                            users: [],
                            categories: [],
                            frequency: "",
                            follow_up: "",
                            time: null,
                            new_template_id: null
                        })
                        setSelectedValue('')
                        // setUserModal(true)
                        // setEditStatus(false)
                        //
                    }} radius={10} style={{ backgroundColor: "#233c79" }}> Add Broadcast </Button>

                </Flex>
                <Space h={15} />
                <Card withBorder radius={10} shadow='md'>
                    {
                        mediumScreen ? (
                            <Table striped withColumnBorders={mediumScreen ? false : true}>
                                <thead >
                                    <tr >
                                        <th> Template name </th>
                                        <th> Users </th>
                                        <th> Frequency </th>
                                        <th> Source </th>
                                        <th> Time </th>
                                        {/* <th> Location </th> */}
                                        <th> Action </th>
                                    </tr>
                                </thead>
                                <tbody>{rows}</tbody>
                            </Table>
                        ) : (
                            <ScrollArea offsetScrollbars h={400} >
                                <Table striped withColumnBorders={mediumScreen ? false : true}>
                                    <thead >
                                        <tr >
                                            <th> Template name </th>
                                            <th> Users </th>
                                            <th> Frequency </th>
                                            <th> Source </th>
                                            <th> Time </th>
                                            {/* <th> Location </th> */}
                                            <th> Action </th>
                                        </tr>
                                    </thead>
                                    <tbody>{rows}</tbody>
                                </Table>
                            </ScrollArea>
                        )
                    }

                    <Space h={"xl"} />
                    <Flex justify={"end"}>
                        <Pagination value={currentPage} onChange={setCurrentPage} total={recordsPerPage} color="yellow" siblings={1} />
                    </Flex>
                </Card>
            </Container>
        </div>
    )
}

export default Broadcast