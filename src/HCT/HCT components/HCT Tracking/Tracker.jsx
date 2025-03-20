import { Button, Card, Container, Flex, Space, Table, Text } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Tracker = () => {
    const mediumScreen = useMediaQuery("(min-width: 1200px)");
    const largeScreen = useMediaQuery("(min-width: 1440px)");
    const extraLargeScreen = useMediaQuery("(min-width: 1770px)");

    const navigate = useNavigate()
    const data = {
        name: "Vivek"
    }
    return (
        <div>
            <Container mt={mediumScreen ? "5rem" : "2rem"} size={"xxl"}>
                <Flex justify={"space-between"}>
                    <Text fz={22} fw={600}>Tracker - 100 Days Journey</Text>
                    <Button radius={10} style={{ backgroundColor: "#233c79" }}> Add Member  </Button>
                </Flex>
                <Space h={15} />
                <Card withBorder radius={10} shadow='md'>
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
                            <tr onClick={() => navigate(`/${data.name}`)}>
                                <td>Name</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card>
            </Container>
        </div>
    )
}

export default Tracker
