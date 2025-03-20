import { Button, Card, Container, Flex, Group, SegmentedControl, Space, Table, Text } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks';
import React, { useState } from 'react'
import { PiTableFill } from 'react-icons/pi';
import { SlGraph } from "react-icons/sl";
import { useParams } from 'react-router-dom';
import Usertrackchart from '../graphs/Usertrackchart';

const UserTracker = () => {
    const mediumScreen = useMediaQuery("(min-width: 1200px)");
    const largeScreen = useMediaQuery("(min-width: 1440px)");
    const extraLargeScreen = useMediaQuery("(min-width: 1770px)");
    const username = useParams()

    const [value, setValue] = useState('table');
    return (
        <div>
            <Container mt={mediumScreen ? "5rem" : "2rem"} size={"xxl"}>
                <Flex justify={"space-between"}>
                    <Text fz={22} fw={600}>{username.username}</Text>
                    <Group>
                        <Button radius={10} style={{ backgroundColor: "#233c79" }}> Add Record  </Button>

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
                <Card withBorder radius={10} shadow='md'>
                    {
                        value === 'table' ? (
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
                                {/* <tbody>{rows}</tbody> */}
                                <tbody>
                                    <tr >
                                        <td>Name</td>
                                    </tr>
                                </tbody>
                            </Table>
                        ) : (<Usertrackchart />)
                    }

                </Card>
            </Container>
        </div>
    )
}

export default UserTracker
