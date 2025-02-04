// import React from 'react'

// import { ActionIcon, Box, Card, Container, Divider, Flex, Grid, Group, Image, SimpleGrid, Space, Tabs, TextInput, Title, Tooltip, Text, Menu, Select } from '@mantine/core'
// import { Link, useNavigate, useParams } from 'react-router-dom'
// import { TbTemplate } from 'react-icons/tb'
// import { GoBroadcast } from "react-icons/go";
// import { HiHome } from "react-icons/hi";
// import { MdPerson } from 'react-icons/md'
// import { useMediaQuery } from '@mantine/hooks';

// const MobileHead = () => {
//      const navigate = useNavigate()
//         const handleLogout = () => {
//             window.localStorage.clear()
//             navigate("/login")
//         }
//   return (
//     <div>
// <nav >
//                 <Flex align={"center"} justify={"space-between"}>
//                     <Box style={{ display: "flex", alignItems: "center" }}>
//                         <a href='http://healthcoachsaiteja.com/'>
//                             <Image
//                                 style={{ margin: 50 }}
//                                 maw={120}
//                                 src={"https://lh3.googleusercontent.com/proxy/-ptEoCXQaGeaX0l_w5gA1iSfkLmjCIt9tMW9UtQE6OiQh2taj9X1HNgEQfh6r9d5hshNtcVK5o9wdgxMUbHWsUiibVkJ73TMy90VAJ-pt2QpPlAYk2OH-NsTfjue0JcSnhBRQd3iLuSVFrjmLw"} /></a>

//                         {/* <Select searchable nothingFound="No related courses" fz={18} w={400} radius={"md"} variant='filled'
//                             placeholder='Search course'
//                             icon={<ActionIcon><BiSearch /></ActionIcon>} data={["react", "Js"]}
//                         // {data.map((option) => {
//                         //   return {
//                         //     value: option.value,
//                         //     label: option.course_name,
//                         //   };
//                         // })} 
//                         /> */}
//                     </Box>

//                     <Box pt={13} style={{ display: "flex", alignItems: "center" }}>
//                         {/* <Box w={80} className='hctHeadicon'
//                             style={{
//                                 borderBottom: `${window.location.pathname === "/dashboard" ? "4px solid #F09A3E" : ""}`
//                             }}
//                         >
//                             <Link to={"/dashboard"}>
//                                 <Image width="23px"
//                                     src={window.location.pathname === "/dashboard" ? Home1 : Home} ></Image>
//                             </Link>
//                         </Box> */}

//                         <Box w={80} className='hctHeadicon'
//                             style={{
//                                 borderBottom: `${window.location.pathname === "/dashboard" ? "4px solid #fab005" : ""}`
//                             }}
//                         >
//                             <Link to={"/dashboard"}>
//                                 {/* <ActionIcon width="23px" src={window.location.pathname === "/template" ? <TbTemplate co /> : <TbTemplate />} ></ActionIcon> */}
//                                 <HiHome size={"1.5rem"} style={{ color: `${window.location.pathname === "/dashboard" ? "#fab005" : "gray"}` }} />
//                             </Link>
//                         </Box>

//                         <Box w={80} className='hctHeadicon'
//                             style={{
//                                 borderBottom: `${window.location.pathname === "/template" ? "4px solid #fab005" : ""}`
//                             }}
//                         >
//                             <Link to={"/template"}>
//                                 {/* <ActionIcon width="23px" src={window.location.pathname === "/template" ? <TbTemplate co /> : <TbTemplate />} ></ActionIcon> */}
//                                 <TbTemplate size={"1.5rem"} style={{ color: `${window.location.pathname === "/template" ? "#fab005" : "gray"}` }} />
//                             </Link>
//                         </Box>


//                         <Box w={80} className='hctHeadicon'
//                             style={{
//                                 borderBottom: `${window.location.pathname === "/broadcast" ? "4px solid #fab005" : ""}`
//                             }}
//                         >
//                             <Link to={"/broadcast"}>
//                                 {/* <ActionIcon width="23px" src={window.location.pathname === "/broadcast" ? <Tbbroadcast co /> : <Tbbroadcast />} ></ActionIcon> */}
//                                 <GoBroadcast size={"1.5rem"} style={{ color: `${window.location.pathname === "/broadcast" ? "#fab005" : "gray"}` }} />
//                             </Link>
//                         </Box>

//                         {/* <Box h={"100%"} w={80} className='iconbox'
//                             style={{
//                                 borderBottom: `${window.location.pathname === "/mycourses" ? "3px solid #fab005" : ""}`
//                             }}
//                         >
//                             <Link to={"/mycourses"}>
//                                 <Image width="25px" src={window.location.pathname === "/mycourses" ? Book1 : Book} ></Image>
//                             </Link>
//                         </Box> */}

//                         <Box h={"100%"} w={80} className='hctHeadicon'
//                             style={{
//                                 borderBottom: window.location.pathname === '/usermanagement' ? '4px solid #fab005' : "",
//                             }}
//                         >
//                             <Menu position="top" withArrow shadow="md"
//                                 width={200}
//                                 styles={{
//                                     dropdown: {
//                                         position: "fixed",
//                                         zIndex: 999,
//                                     },
//                                 }}>
//                                 <Menu.Target>
//                                     <ActionIcon> <MdPerson size={"1.5rem"} style={{ color: `${window.location.pathname === "/usermanagement" ? "#fab005" : "gray"}` }} /></ActionIcon>
//                                 </Menu.Target>

//                                 <Menu.Dropdown >
//                                     {/* <Menu.Item className='menutext' onClick={() => {
//                                         navigate("/mydetails");
//                                     }}>
//                                         My details
//                                     </Menu.Item>

//                                     <Menu.Item className='menutext' onClick={() => {
//                                         navigate("/changepassword");
//                                     }}>
//                                         Change Password
//                                     </Menu.Item>

//                                     <Menu.Item className='menutext' onClick={() => {
//                                         navigate("/trainingsubscriptions");
//                                     }}>
//                                         Training Subscription
//                                     </Menu.Item>
//                                     */}
//                                     <Menu.Item className='menutext' onClick={() => {
//                                         navigate('/usermanagement')
//                                     }}>
//                                         User Management
//                                     </Menu.Item>
//                                     <Divider ml={'sm'} mr={"sm"} />
//                                     <Menu.Item className='menutext' onClick={handleLogout}>
//                                         Logout
//                                     </Menu.Item>

//                                 </Menu.Dropdown>
//                             </Menu>
//                         </Box>
//                     </Box>
//                 </Flex>
//             </nav>
//             <Divider />
//     </div>
//   )
// }
// export default MobileHead

import React from 'react'

import { ActionIcon, Box, Card, Container, Divider, Flex, Grid, Group, Image, SimpleGrid, Space, Tabs, TextInput, Title, Tooltip, Text, Menu, Select } from '@mantine/core'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { TbTemplate } from 'react-icons/tb'
import { GoBroadcast } from "react-icons/go";
import { HiHome } from "react-icons/hi";
import { MdPerson } from 'react-icons/md'
import { useMediaQuery } from '@mantine/hooks';


const MobileHead = () => {
    const mediumScreen = useMediaQuery("(min-width: 900px)");
    const largeScreen = useMediaQuery("(min-width: 1440px)");
    const extraLargeScreen = useMediaQuery("(min-width: 1770px)");
    const navigate = useNavigate();
    const handleLogout = () => {
        window.localStorage.clear()
        navigate("/login")
    }
    
    return (
        <div>
            <Flex style={{ zIndex: 2, position: "fixed", bottom: 20, left: 57, right: 58 }} align={"center"} justify={"center"}>

                <Card withBorder p={0} w={250} h={40} bg={"white"} radius={"xl"} shadow='lg'>
                    <Box p={8} style={{ display: "flex", alignItems: "center" }}>


                         <Box w={80} className='hctHeadicon'
                            style={{
                                borderBottom: `${window.location.pathname === "/dashboard" ? "4px solid #fab005" : ""}`
                            }}
                        >
                             <Link to={"/dashboard"}>
                                {/* <ActionIcon width="23px" src={window.location.pathname === "/template" ? <TbTemplate co /> : <TbTemplate />} ></ActionIcon> */}
                                <HiHome size={"1.5rem"} style={{ color: `${window.location.pathname === "/dashboard" ? "#fab005" : "gray"}` }} />
                            </Link>
                        </Box>

                        <Box w={80} className='hctHeadicon'
                            style={{
                                borderBottom: `${window.location.pathname === "/template" ? "4px solid #fab005" : ""}`
                            }}
                        >
                            <Link to={"/template"}>
                                {/* <ActionIcon width="23px" src={window.location.pathname === "/template" ? <TbTemplate co /> : <TbTemplate />} ></ActionIcon> */}
                                <TbTemplate size={"1.5rem"} style={{ color: `${window.location.pathname === "/template" ? "#fab005" : "gray"}` }} />
                            </Link>
                        </Box>

                        <Box w={80} className='hctHeadicon'
                            style={{
                                borderBottom: `${window.location.pathname === "/broadcast" ? "4px solid #fab005" : ""}`
                            }}
                        >
                            <Link to={"/broadcast"}>
                                {/* <ActionIcon width="23px" src={window.location.pathname === "/broadcast" ? <Tbbroadcast co /> : <Tbbroadcast />} ></ActionIcon> */}
                                <GoBroadcast size={"1.5rem"} style={{ color: `${window.location.pathname === "/broadcast" ? "#fab005" : "gray"}` }} />
                            </Link>
                        </Box>

                        <Box h={"100%"} w={80} className='hctHeadicon'
                            style={{
                                borderBottom: window.location.pathname === '/usermanagement' ? '4px solid #fab005' : "",
                            }}
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
                                    <ActionIcon> <MdPerson size={"1.5rem"} style={{ color: `${window.location.pathname === "/usermanagement" ? "#fab005" : "gray"}` }} /></ActionIcon>
                                </Menu.Target>


                                <Menu.Dropdown >

                                    <Menu.Item className='menutext' onClick={() => {
                                        navigate('/usermanagement')
                                    }}>
                                        User Management
                                    </Menu.Item>
                                    <Divider ml={'sm'} mr={"sm"} />
                                    <Menu.Item className='menutext' onClick={handleLogout}>
                                        Logout
                                    </Menu.Item>

                                </Menu.Dropdown>
                            </Menu>
                        </Box>
                    </Box>

                </Card>
            </Flex>
        </div>
    )
}

export default MobileHead



