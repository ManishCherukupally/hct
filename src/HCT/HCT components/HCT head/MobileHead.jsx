import { ActionIcon, Box, Card, Divider, Flex, Group, Image, Menu, Text, Tooltip } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React, { useEffect, useState } from 'react'
import { GoBroadcast } from 'react-icons/go';
import { HiHome, HiSpeakerphone } from 'react-icons/hi';
import { IoMdStats } from 'react-icons/io';
import { MdPerson } from 'react-icons/md';
import { TbTemplate } from 'react-icons/tb';
import { Link, useNavigate, useParams } from 'react-router-dom';
import market from '../../../assets/market.png'
import market1 from '../../../assets/market1.png'
import { FaExternalLinkSquareAlt } from 'react-icons/fa';
import client from '../../../API/api';

const MobileHead = () => {
    const mediumScreen = useMediaQuery("(min-width: 900px)");
    const largeScreen = useMediaQuery("(min-width: 1440px)");
    const extraLargeScreen = useMediaQuery("(min-width: 1770px)");
    const navigate = useNavigate();
    const usernameparam = useParams()
    const categoryparam = useParams()
    const [categoryList, setcategoryList] = useState([])


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
                // console.log(resp.data['category_list'])
            })
    }, [])
    const handleLogout = () => {
        // try {
        //     client.get("logout/", {
        //         withCredentials: true
        //     }).then((resp) => {
        //         if (resp.data.status === "Logged_out") {
        //             // removeToken(['sessionid']);
        //             window.localStorage.clear()
        //             // Optionally, redirect user to login page
        //             window.location.href = "/login";
        //         }
        //     })
        //     // window.location.href = "/login";
        // }
        // catch (err) {
        //     console.error(err)
        // }

        window.localStorage.clear()
        navigate("/login")
    }
    return (
        <div>
            <Flex style={{ zIndex: 2, position: "fixed", bottom: 20, left: 57, right: 58 }} align={"center"} justify={"center"}>
                <Card withBorder p={0} w={"auto"} bg={"white"} radius={"xl"} shadow='md'>
                    <Flex>
                        <Box w={80} className='hctmobileHeadicon'

                        >
                            <Tooltip label='Home'>
                                <Link to={"/dashboard"}>
                                    {/* <ActionIcon width="23px" src={window.location.pathname === "/template" ? <TbTemplate co /> : <TbTemplate />} ></ActionIcon> */}

                                    <HiHome size={"1.5rem"} style={{ color: `${window.location.pathname === "/dashboard" ? "#fab005" : "gray"}` }} />

                                </Link>
                            </Tooltip>
                        </Box>

                        {/* <Box w={80} className='hctmobileHeadicon'

                        >
                            <Tooltip label='Template'>
                                <Link to={"/template"}>
                                    <ActionIcon width="23px" src={window.location.pathname === "/template" ? <TbTemplate co /> : <TbTemplate />} ></ActionIcon>
                                    <TbTemplate size={"1.5rem"} style={{ color: `${window.location.pathname === "/template" ? "#fab005" : "gray"}` }} />

                                </Link>
                            </Tooltip>
                        </Box>

                        <Box w={80} className='hctmobileHeadicon'

                        >
                            <Tooltip label='Broadcast'>
                                <Link to={"/broadcast"}>
                                    <ActionIcon width="23px" src={window.location.pathname === "/broadcast" ? <Tbbroadcast co /> : <Tbbroadcast />} ></ActionIcon>
                                    <GoBroadcast size={"1.5rem"} style={{ color: `${window.location.pathname === "/broadcast" ? "#fab005" : "gray"}` }} />

                                </Link>
                            </Tooltip>
                        </Box> */}

                        <Box h={"100%"} w={80} className='hctmobileHeadicon'

                        >
                            <Menu position="top" withArrow shadow="md"
                                width={200}
                                styles={{
                                    dropdown: {
                                        position: "fixed",
                                        zIndex: 999,
                                    },
                                }}>
                                <Menu.Target>
                                    {/* <Tooltip label='Home'> */}
                                    <ActionIcon> <HiSpeakerphone size={"1.5rem"} style={{ color: `${window.location.pathname === "/template" || window.location.pathname === "/broadcast" ? "#fab005" : "gray"}` }} /></ActionIcon>
                                    {/* </Tooltip> */}
                                </Menu.Target>

                                <Menu.Dropdown >

                                    <Menu.Item className='menutext' onClick={() => {
                                        navigate('/template')
                                    }}
                                        icon={<TbTemplate />}
                                    >
                                        Templates
                                    </Menu.Item>

                                    <Menu.Item className='menutext' onClick={() => {
                                        navigate('/broadcast')
                                    }}
                                        icon={<GoBroadcast />}
                                    >
                                        Broadcasts
                                    </Menu.Item>

                                </Menu.Dropdown>
                            </Menu>
                        </Box>


                        <Box w={80} className='hctmobileHeadicon'

                        >
                            <Tooltip label='Pages'>
                                <Link to={"/pages"}>
                                    {/* <ActionIcon width="23px" src={window.location.pathname === "/broadcast" ? <Tbbroadcast co /> : <Tbbroadcast />} ></ActionIcon> */}
                                    <FaExternalLinkSquareAlt size={"1.5rem"} style={{ color: `${window.location.pathname === "/pages" ? "#fab005" : "gray"}` }} />

                                </Link>
                            </Tooltip>
                        </Box>

                        <Box w={80} className='hctmobileHeadicon'

                        >

                            <Menu withArrow shadow="md" styles={{
                                dropdown: {
                                    position: "fixed",
                                    zIndex: 999,
                                },
                            }}>
                                <Menu.Target>
                                    <Tooltip label='Tracker'>
                                        <ActionIcon variant='transparent'><IoMdStats size={"1.5rem"} style={{ color: `${window.location.pathname === `/tracking/${categoryparam.category}` || window.location.pathname === `/tracker/${encodeURIComponent(usernameparam.username)}` ? "#fab005" : "gray"}` }} /></ActionIcon>
                                    </Tooltip>
                                </Menu.Target>

                                <Menu.Dropdown>
                                    {
                                        categoryList.map((item) => (
                                            <Menu.Item onClick={() => navigate(`/tracking/${item.value}`)}>
                                                <Text fw={500}>{item.value}</Text>
                                            </Menu.Item>
                                        ))
                                    }
                                </Menu.Dropdown>
                            </Menu>
                            {/* <Tooltip label='Tracker'>
                                <Link to={"/trackingpage"}>
                                    <ActionIcon width="23px" src={window.location.pathname === "/broadcast" ? <Tbbroadcast co /> : <Tbbroadcast />} ></ActionIcon>
                                    <IoMdStats size={"1.5rem"} style={{ color: `${window.location.pathname === `/trackingpage/${categoryparam.category}` || window.location.pathname === `/tracker/${usernameparam.username}` ? "#fab005" : "gray"}` }} />

                                </Link>
                            </Tooltip> */}
                        </Box>

                        {/* <Box w={80} className='hctmobileHeadicon'

                        >
                            <Tooltip label='Tracker'>
                                <Link to={"/trackingpage"}>
                                    <ActionIcon width="23px" src={window.location.pathname === "/broadcast" ? <Tbbroadcast co /> : <Tbbroadcast />} ></ActionIcon>
                                    <IoMdStats size={"1.5rem"} style={{ color: `${window.location.pathname === "/trackingpage" || window.location.pathname === `/tracker/${usernameparam.username}` ? "#fab005" : "gray"}` }} />

                                </Link>
                            </Tooltip>
                        </Box> */}

                        <Box h={"100%"} w={80} className='hctmobileHeadicon'

                        >
                            <Menu position="top" withArrow shadow="md"
                                width={200}
                                styles={{
                                    dropdown: {
                                        position: "fixed",
                                        zIndex: 999,
                                    },
                                }}>
                                <Menu.Target>
                                    {/* <Tooltip label='Home'> */}
                                    <ActionIcon> <MdPerson size={"1.5rem"} style={{ color: `${window.location.pathname === "/usermanagement" ? "#fab005" : "gray"}` }} /></ActionIcon>
                                    {/* </Tooltip> */}
                                </Menu.Target>

                                <Menu.Dropdown >

                                    <Menu.Item className='menutext' onClick={() => {
                                        navigate('/usermanagement')
                                    }}>
                                        User Management
                                    </Menu.Item>
                                    <Divider ml={'sm'} mr={"sm"} />
                                    <Menu.Item className='menutext' onClick={handleLogout} c={"red"}>
                                        Logout
                                    </Menu.Item>

                                </Menu.Dropdown>
                            </Menu>
                        </Box>
                    </Flex>
                </Card>
            </Flex>
        </div>
    )
}

export default MobileHead
