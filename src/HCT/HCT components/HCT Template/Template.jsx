import { ActionIcon, Button, Card, Container, Flex, Group, Modal, Pagination, ScrollArea, SimpleGrid, Space, Spoiler, Table, Text, TextInput, Textarea, Tooltip } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks';
import React, { useEffect, useState } from 'react'
import client from '../../../API/api';
import { MdDeleteForever, MdEdit, MdSearch } from 'react-icons/md';
import { useForm } from '@mantine/form';
import { BiSort } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';

const Template = () => {
    const mediumScreen = useMediaQuery("(min-width: 1200px)");
    const largeScreen = useMediaQuery("(min-width: 1440px)");
    const extraLargeScreen = useMediaQuery("(min-width: 1770px)");
    const phone = useMediaQuery("(max-width: 424px)");

    const [templateData, settemplateData] = useState([])

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(1)

    const [loaderVisible, setLoaderVisible] = useState(false);
    const [templateModal, settemplateModal] = useState(false)
    const [EditModal, setEditModal] = useState(false)
    const [editStatus, setEditStatus] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    const [templateId, settemplateId] = useState(null)
    const [nodata, setnoData] = useState(false)
    const [inputValue, setInputValue] = useState('');

    // const [templateName, settemplateName] = useState('')
    // const [templateBody, settemplateBody] = useState('')
    // const [templateHeading, settemplateHeading] = useState('')
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });


    const sortedData = React.useMemo(() => {
        // Apply filtering first
        if (templateData) {
            const filtered = templateData.filter((item) =>


                (item.template_name && item.template_name.toLowerCase().includes(inputValue.toLowerCase())) ||
                (item.template_heading && item.template_heading.toLowerCase().includes(inputValue.toLowerCase())) ||

                (item.template_body && item.template_body.toLowerCase().includes(inputValue.toLowerCase()))



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
        }
        else setnoData(true)

    }, [templateData, inputValue, sortConfig]);

    const handleSort = (key) => {
        setSortConfig((prev) => {
            if (prev.key === key && prev.direction === 'asc') {
                return { key: '', direction: '' }; // reset
            }
            return { key, direction: 'asc' };
        });
    };

    useEffect(() => {
        client.get("template_pagination/", {
            params: {
                page: currentPage
            },
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("access")}`
            }
        })
            .then((resp) => {
                // console.log(resp.data['templates']);
                settemplateData(resp.data['templates'])
                // console.log(resp.data['templates'][0].template_name);
                setRecordsPerPage(resp.data.number_of_pages)
                if (resp.data.status === 'page_not_found') {
                    setnoData(true)

                }

            })
            .catch(err => console.error(err))
    }, [currentPage, loaderVisible])

    const editDetails = (data) => {
        form.setValues({
            template_id: data.id,
            template_name: data.template_name,
            template_heading: data.template_heading,
            template_body: data.template_body
        });
    }

    const rows = nodata ? (
        <Text mt={"lg"}> No templates found!</Text>
    ) : (
        sortedData.map((item, index) => (
            <tr key={index} style={{ height: 50 }}>
                <td style={{ width: '346px' }}>{item.template_name}</td>
                <td style={{ width: '346px' }}>{item.template_heading}</td>
                {/* <Tooltip label={item.template_body} > */}
                {
                    item.template_body.length > 50 ? (
                        <Spoiler maxHeight={25} showLabel="..." hideLabel="Hide">
                            <td style={{ width: '346px' }}>{item.template_body}</td>
                        </Spoiler>
                    ) : (
                        <td style={{ width: '346px' }}>{item.template_body}</td>
                    )
                }
                {/* </Tooltip> */}
                <td style={{ width: '200px' }}>
                    <Flex>
                        <Tooltip label={"Edit"}><ActionIcon variant='subtle'
                            onClick={() => {
                                // handleEditData(item)
                                editDetails(item)
                                setEditModal(true)
                                settemplateId(item.id)
                                // settemplateName(item.template_name)
                                // console.log(templateName);
                                setEditStatus(true)
                            }} ><MdEdit color="#233c79" /></ActionIcon></Tooltip>
                        <Tooltip label={"Delete"}><ActionIcon variant='subtle' onClick={() => {

                            setOpenModal(true)
                            settemplateId(item.id)
                            console.log(item.id);
                            // handleDelete()
                            // setUserName(item.u_business_email)
                        }} ><MdDeleteForever color="FF3C5F" /></ActionIcon></Tooltip>
                    </Flex>
                </td>
            </tr>
        )
        ))



    const form = useForm({
        initialValues: {
            template_id: null,
            template_name: "",
            template_heading: "",
            template_body: "",
        },
        transformValues: (values) => ({
            template_id: templateId,
            template_name: `${values.template_name}`,
            template_heading: `${values.template_heading}`,
            template_body: `${values.template_body}`
        })

    })

    const handleAddTemplate = () => {
        setLoaderVisible(true)

        client.post("create_template/", form.getTransformedValues(), {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("access")}`
            }
        })
            .catch(err => console.error(err))
        setTimeout(() => {
            settemplateModal(false)
            setLoaderVisible(false)
        }, 1000);
    }

    const handleDelete = () => {
        setLoaderVisible(true)

        client.delete('delete_template/', {
            params: {
                template_id: templateId
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

    const handleEditTemplate = () => {
        // console.log(templateName);
        setLoaderVisible(true)
        client.put("update_template/", form.getTransformedValues(), {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("access")}`
            }
        })
            .catch(err => console.error(err))
        setTimeout(() => {
            setEditModal(false)
            setLoaderVisible(false)
        }, 1000);
    }
    // console.log(templateData.filter((item) => item.id === templateId ? item.template_name : ""));
    return (
        <div>
            <Container mt={mediumScreen ? "5rem" : "2rem"} size={"xxl"}>

                <Modal closeOnClickOutside={false} centered style={{ display: "flex", justifyContent: "center" }} opened={templateModal} onClose={() => settemplateModal(false)} title="Add Template">
                    <form>
                        <SimpleGrid cols={1}>
                            <Textarea
                                autosize
                                minRows={1}

                                label="Template Name"
                                name='template_name'
                                placeholder="Enter Template name"
                                size={mediumScreen ? "md" : "lg"}
                                {...form.getInputProps('template_name')}

                            />
                            <Textarea
                                autosize
                                minRows={1}

                                label="Template Heading"
                                name='template_heading'
                                placeholder="Enter Template heading"
                                size={mediumScreen ? "md" : "lg"}
                                {...form.getInputProps('template_heading')}

                            />
                            {/* <Textarea
                                autosize
                                minRows={1}

                                    label="Password"
                                    name='password'
                                    placeholder=" password"
                                    size={mediumScreen ? "md" : "lg"}
                                    {...form.getInputProps('password')}

                                /> */}
                            <Textarea
                                autosize
                                minRows={1}

                                label="Template Body"
                                name='template_body'
                                placeholder="Enter Template Body"
                                size={mediumScreen ? "md" : "lg"}
                                {...form.getInputProps('template_body')}

                            />

                        </SimpleGrid>
                        <Space h={15} />
                        <Flex justify={"end"} gap={"2%"}>
                            <Button loading={loaderVisible} style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "#233c79" }}
                                variant='filled' onClick={handleAddTemplate} >Add</Button>
                            {/* <Button variant='outline' color='dark' onClick={() => settemplateModal(false)}>No</Button> */}
                        </Flex>
                    </form>

                </Modal>

                <Modal closeOnClickOutside={false} centered style={{ display: "flex", justifyContent: "center" }} opened={openModal} onClose={() => setOpenModal(false)} title="Are you sure?!">
                    <Text>Do you really want to delete this template?</Text>
                    <Space h={15} />
                    <Flex justify={"end"} gap={"2%"}>
                        <Button loading={loaderVisible} onClick={handleDelete} style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "#233c79" }}
                            variant='filled'>Delete</Button>
                        {/* <Button variant='outline' color='dark' onClick={() => setOpenModal(false)}>No</Button> */}
                    </Flex>
                </Modal>

                <Modal closeOnClickOutside={false} centered style={{ display: "flex", justifyContent: "center" }} opened={EditModal} onClose={() => {
                    setEditModal(false)
                    // setEditStatus(false)
                }} title="Edit Template">
                    <form onSubmit={handleEditTemplate}>
                        <SimpleGrid cols={1}>
                            <Textarea
                                autosize
                                minRows={1}
                                label="Template Name"
                                name='template_name'
                                placeholder="Enter Template name"
                                size={mediumScreen ? "md" : "lg"}
                                // value={templateName}
                                {...form.getInputProps('template_name')}

                            />
                            <Textarea
                                autosize
                                minRows={1}
                                label="Template Heading"
                                name='template_heading'
                                placeholder="Enter Template heading"
                                size={mediumScreen ? "md" : "lg"}
                                {...form.getInputProps('template_heading')}

                            />

                            <Textarea
                                autosize
                                minRows={1}
                                label="Template Body"
                                name='template_body'
                                placeholder="Enter Template Body"
                                size={mediumScreen ? "md" : "lg"}
                                {...form.getInputProps('template_body')}

                            />

                            <Space h={15} />
                            <Flex justify={"end"} gap={"2%"}>
                                <Button type='submit' loading={loaderVisible} style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "#233c79" }}
                                    variant='filled' >Edit</Button>
                                {/* <Button variant='outline' color='dark' onClick={() => {
                                    setEditModal(false)
                                    // setEditStatus(false)
                                }}>No</Button> */}
                            </Flex>
                        </SimpleGrid>
                    </form>

                </Modal>
                <Flex justify={"space-between"}>
                    <Text fz={22} fw={600}>Templates</Text>

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
                            settemplateModal(true)
                            form.setValues({
                                template_id: null,
                                template_name: "",
                                template_heading: "",
                                template_body: ""
                            });
                            // setEditStatus(false)
                        }} radius={10} style={{ backgroundColor: "#233c79" }}>Add Template  </Button>

                    </Group>

                </Flex>

                <Space h={15} />

                <Card withBorder radius={10} shadow='md'>
                    {
                        mediumScreen ? (
                            <Table striped >
                                <thead style={{
                                    position: "sticky",
                                    top: 0,
                                    background: 'white', zIndex: 6,
                                }}>
                                    <tr>
                                        <th style={{ width: 'auto' }}>
                                            <Flex gap={10} align={'center'}>
                                                <Text c={'dark'} fz={14} fw={500}>Template Name</Text>
                                                <ActionIcon onClick={() => handleSort('template_name')}><BiSort /></ActionIcon>
                                            </Flex>
                                        </th>
                                        <th style={{ width: 'auto' }}>
                                            <Flex gap={10} align={'center'}>
                                                <Text c={'dark'} fz={14} fw={500}>Template Heading</Text>
                                                <ActionIcon onClick={() => handleSort('template_heading')}><BiSort /></ActionIcon>
                                            </Flex>
                                        </th>
                                        <th style={{ width: 'auto' }}>
                                            <Flex gap={10} align={'center'}>
                                                <Text c={'dark'} fz={14} fw={500}>Template Body</Text>
                                                <ActionIcon onClick={() => handleSort('template_body')}><BiSort /></ActionIcon>
                                            </Flex>
                                        </th>
                                        {/* <th> Email </th>
                                <th> Date of joining </th>
                                <th> Location </th> */}
                                        <th> Action </th>
                                    </tr>
                                </thead>
                                <tbody>{rows}</tbody>
                            </Table>
                        ) : (
                            <ScrollArea offsetScrollbars h={400} >
                                <Table striped >
                                    <thead style={{
                                        position: "sticky",
                                        top: 0,
                                        background: 'white', zIndex: 6,
                                    }}>
                                        <tr>
                                            <th style={{ width: 'auto' }}>
                                                <Flex gap={10} align={'center'}>
                                                    <Text c={'dark'} fz={14} fw={500}>Template Name</Text>
                                                    <ActionIcon onClick={() => handleSort('template_name')}><BiSort /></ActionIcon>
                                                </Flex>
                                            </th>
                                            <th style={{ width: 'auto' }}>
                                                <Flex gap={10} align={'center'}>
                                                    <Text c={'dark'} fz={14} fw={500}>Template Heading</Text>
                                                    <ActionIcon onClick={() => handleSort('template_heading')}><BiSort /></ActionIcon>
                                                </Flex>
                                            </th>
                                            <th style={{ width: 'auto' }}>
                                                <Flex gap={10} align={'center'}>
                                                    <Text c={'dark'} fz={14} fw={500}>Template Body</Text>
                                                    <ActionIcon onClick={() => handleSort('template_body')}><BiSort /></ActionIcon>
                                                </Flex>
                                            </th>
                                            {/* <th> Template Name </th>
                                            <th> Template Heading </th>
                                            <th>Template Body </th> */}
                                            {/* <th> Email </th>
                                <th> Date of joining </th>
                                <th> Location </th> */}
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

export default Template
