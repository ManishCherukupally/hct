import { Card, Container, Image, Skeleton, Text } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const PageComponent = () => {
    const mediumScreen = useMediaQuery("(min-width: 1200px)");
    const largeScreen = useMediaQuery("(min-width: 1440px)");
    const extraLargeScreen = useMediaQuery("(min-width: 1770px)");

    const [skeletonview, setSkeletonView] = useState(true);
    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            setSkeletonView(false)
        }, 2000);
    }, [])
    return (
        <div>
            <Container mt={mediumScreen ? "5rem" : "2rem"} size={"xxl"}>
                {/* <Link to={'/100daysjourney'}> */}
                <Text fz={22} fw={600} pb={15}>Pages</Text>

                <Card shadow='sm' w={277} p={0} withBorder radius={"md"} onClick={() => navigate('/100daysjourney')} style={{ cursor: 'pointer' }}>
                    <Skeleton visible={skeletonview}>

                        <Card h={120} p={0} radius={0} >
                            <Image
                                src={"https://healthcoachsaiteja.com/wp-content/uploads/2022/11/IMG-1431-scaled.jpg"}

                                height={130}

                            />
                        </Card >


                        <Card pt={6} h={67} radius={0} style={{ backgroundColor: "#ECECEC" }}>
                            <Text fs={"Open Sans"} fz={16} fw={500}>100 Days Challenge</Text>

                            <Text fs={"Open Sans"} fz="sm" color="dimmed">Register now!</Text>

                        </Card>
                    </Skeleton>
                </Card>
                {/* </Link> */}
            </Container>
        </div>
    )
}

export default PageComponent
