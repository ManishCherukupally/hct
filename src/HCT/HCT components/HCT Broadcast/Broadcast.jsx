import { useMediaQuery } from '@mantine/hooks';
import React, { useEffect, useState } from 'react'
import client from '../../../API/api';
import { ActionIcon, Button, Card, Container, Flex, Group, Modal, MultiSelect, Pagination, ScrollArea, Select, Space, Spoiler, Table, Text, TextInput, Tooltip } from '@mantine/core';
import { MdDeleteForever, MdEdit, MdSearch } from 'react-icons/md';
import { useForm } from '@mantine/form';
import { TimeInput } from '@mantine/dates';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import { FaTelegramPlane } from 'react-icons/fa';
import { BiSort } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';

const Broadcast = () => {
    const mediumScreen = useMediaQuery("(min-width: 1200px)");
    const largeScreen = useMediaQuery("(min-width: 1440px)");
    const extraLargeScreen = useMediaQuery("(min-width: 1770px)");
    const phone = useMediaQuery("(max-width: 424px)");

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

    const [sortColumn, setSortColumn] = useState(null); // e.g. "template", "usersOrCategory"
    const [sortDirection, setSortDirection] = useState("asc"); // or "desc"
    const [originalData, setOriginalData] = useState([]);

    const [inputValue, setInputValue] = useState('');
    console.log(inputValue);

    // const handleSort = (columnKey) => {
    //     const isSameColumn = sortColumn === columnKey;

    //     const filtered = inputValue
    //         ? originalData.filter((item) =>
    //             item.users &&
    //             item.users.some(user =>
    //                 user.username.toLowerCase().includes(inputValue.toLowerCase())
    //             )
    //         )
    //         : originalData;

    //     // If already sorted on this column, reset to original
    //     if (isSameColumn && sortDirection === "asc") {
    //         setSortColumn(null);
    //         setSortDirection(null);
    //         setbroadcastData(originalData);
    //         return;
    //     }

    //     setSortColumn(columnKey);
    //     setSortDirection("asc");

    //     const sorted = [...filtered].sort((a, b) => {
    //         let aVal = "";
    //         let bVal = "";

    //         switch (columnKey) {
    //             case "template":
    //                 aVal = a.template || "";
    //                 bVal = b.template || "";
    //                 break;

    //             case "frequency":
    //                 aVal = a.frequency || "";
    //                 bVal = b.frequency || "";
    //                 break;

    //             case "source":
    //                 aVal = a.follow_up || "";
    //                 bVal = b.follow_up || "";
    //                 break;

    //             case "time":
    //                 aVal = a.time || "";
    //                 bVal = b.time || "";
    //                 break;

    //             case "usersOrCategory":
    //                 aVal = a.users.length
    //                     ? a.users.map(u => u.username).join(", ")
    //                     : a.category.map(c => c.category).join(", ");
    //                 bVal = b.users.length
    //                     ? b.users.map(u => u.username).join(", ")
    //                     : b.category.map(c => c.category).join(", ");
    //                 break;

    //             default:
    //                 break;
    //         }

    //         return aVal.localeCompare(bVal);
    //     });

    //     setbroadcastData(sorted);
    // };
    useEffect(() => {
        let filtered = originalData;

        // Filter by search input
        if (inputValue) {
            filtered = originalData.filter(item =>
                item.users.some(user =>
                    user.username.toLowerCase().includes(inputValue.toLowerCase())
                ) ||
                item.category.some(category =>
                    category.category.toLowerCase().includes(inputValue.toLowerCase())
                ) ||
                (item.template && item.template.toLowerCase().includes(inputValue.toLowerCase())) ||
                (item.frequency && item.frequency.toLowerCase().includes(inputValue.toLowerCase())) ||
                (item.follow_up && item.follow_up.toLowerCase().includes(inputValue.toLowerCase())) ||
                (item.time && String(item.time).toLowerCase().includes(inputValue.toLowerCase()))
            );
        }

        // Sort only if sortColumn is set
        if (sortColumn && sortDirection === "asc") {
            filtered = [...filtered].sort((a, b) => {
                let aVal = "", bVal = "";

                switch (sortColumn) {
                    case "template":
                        aVal = a.template || "";
                        bVal = b.template || "";
                        break;
                    case "frequency":
                        aVal = a.frequency || "";
                        bVal = b.frequency || "";
                        break;
                    case "source":
                        aVal = a.follow_up || "";
                        bVal = b.follow_up || "";
                        break;
                    case "time":
                        aVal = a.time || "";
                        bVal = b.time || "";
                        break;
                    case "usersOrCategory":
                        aVal = a.users.length
                            ? a.users.map(u => u.username).join(", ")
                            : a.category.map(c => c.category).join(", ");
                        bVal = b.users.length
                            ? b.users.map(u => u.username).join(", ")
                            : b.category.map(c => c.category).join(", ");
                        break;
                    default:
                        break;
                }

                return aVal.localeCompare(bVal);
            });
        }

        setbroadcastData(filtered);
    }, [inputValue, sortColumn, sortDirection, originalData]);


    const handleSort = (columnKey) => {
        // If clicking the same column again, reset to original data
        if (sortColumn === columnKey && sortDirection === "asc") {
            setSortColumn(null);
            setSortDirection(null);
            setbroadcastData(originalData); // reset to original
        } else {
            setSortColumn(columnKey);
            setSortDirection("asc");
        }
    };



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
                setOriginalData(resp.data['templates']);
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
                    <Group>
                        <TextInput w={"8rem"}
                            radius={10}
                            rightSection={inputValue ? (<ActionIcon onClick={() => setInputValue('')}><RxCross2 /></ActionIcon>) : (null)}
                            icon={<MdSearch />} placeholder='Search here'
                            value={inputValue} onChange={(event) => {
                                const value = event.currentTarget.value;
                                setInputValue(value);
                                // setisSearching(value.trim() !== '');

                            }} />

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

                    </Group>

                </Flex>
                <Space h={15} />
                <Card withBorder radius={10} shadow='md'>
                    {
                        mediumScreen ? (
                            <Table striped withColumnBorders={mediumScreen ? false : true}>
                                <thead style={{
                                    position: "sticky",
                                    top: 0,
                                    background: 'white', zIndex: 6,
                                }} >
                                    <tr >

                                        <th style={{ width: 'auto' }}>
                                            <Flex gap={10} align={'center'}>
                                                <Text c={'dark'} fz={14} fw={500}>Template name</Text>
                                                <ActionIcon onClick={() => handleSort('template')}><BiSort /></ActionIcon>
                                            </Flex>
                                        </th> <th style={{ width: 'auto' }}>
                                            <Flex gap={10} align={'center'}>
                                                <Text c={'dark'} fz={14} fw={500}>Users / Category</Text>
                                                <ActionIcon onClick={() => handleSort('usersOrCategory')}><BiSort /></ActionIcon>
                                            </Flex>
                                        </th> <th style={{ width: 'auto' }}>
                                            <Flex gap={10} align={'center'}>
                                                <Text c={'dark'} fz={14} fw={500}>Frequency</Text>
                                                <ActionIcon onClick={() => handleSort('frequency')}><BiSort /></ActionIcon>
                                            </Flex>
                                        </th> <th style={{ width: 'auto' }}>
                                            <Flex gap={10} align={'center'}>
                                                <Text c={'dark'} fz={14} fw={500}>Source</Text>
                                                <ActionIcon onClick={() => handleSort('source')}><BiSort /></ActionIcon>
                                            </Flex>
                                        </th> <th style={{ width: 'auto' }}>
                                            <Flex gap={10} align={'center'}>
                                                <Text c={'dark'} fz={14} fw={500}>Time</Text>
                                                <ActionIcon onClick={() => handleSort('time')}><BiSort /></ActionIcon>
                                            </Flex>
                                        </th>
                                        {/* <th> Template name </th>
                                        <th> Users / Category</th>
                                        <th> Frequency </th>
                                        <th> Source </th>
                                        <th> Time </th> */}
                                        {/* <th> Location </th> */}
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
                                        <tr >
                                            <th style={{ width: 'auto' }}>
                                                <Flex gap={10} align={'center'}>
                                                    <Text c={'dark'} fz={14} fw={500}>Template name</Text>
                                                    <ActionIcon onClick={() => handleSort('template')}><BiSort /></ActionIcon>
                                                </Flex>
                                            </th> <th style={{ width: 'auto' }}>
                                                <Flex gap={10} align={'center'}>
                                                    <Text c={'dark'} fz={14} fw={500}>Users / Category</Text>
                                                    <ActionIcon onClick={() => handleSort('usersOrCategory')}><BiSort /></ActionIcon>
                                                </Flex>
                                            </th> <th style={{ width: 'auto' }}>
                                                <Flex gap={10} align={'center'}>
                                                    <Text c={'dark'} fz={14} fw={500}>Frequency</Text>
                                                    <ActionIcon onClick={() => handleSort('frequency')}><BiSort /></ActionIcon>
                                                </Flex>
                                            </th> <th style={{ width: 'auto' }}>
                                                <Flex gap={10} align={'center'}>
                                                    <Text c={'dark'} fz={14} fw={500}>Source</Text>
                                                    <ActionIcon onClick={() => handleSort('source')}><BiSort /></ActionIcon>
                                                </Flex>
                                            </th> <th style={{ width: 'auto' }}>
                                                <Flex gap={10} align={'center'}>
                                                    <Text c={'dark'} fz={14} fw={500}>Time</Text>
                                                    <ActionIcon onClick={() => handleSort('time')}><BiSort /></ActionIcon>
                                                </Flex>
                                            </th>
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