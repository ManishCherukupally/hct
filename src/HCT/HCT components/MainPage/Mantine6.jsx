import React, { useRef, useState, useEffect } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { BackgroundImage, Container, Image, Text } from '@mantine/core';
import Image1 from '../../../assets/IMG-7740-scaled.jpg'





const Mantine6 = () => {
    const isMobile = useMediaQuery('(max-width: 800px)');



    return (
        <BackgroundImage src='https://png.pngtree.com/background/20230516/original/pngtree-large-room-full-of-equipment-in-a-gym-picture-image_2611111.jpg'>
            <div style={{
                height: isMobile ? "85vh" : "60vh", opacity: '0.95', backgroundColor: '#1F3469', display: 'flex', alignItems: 'center',
                justifyContent: 'center',
                borderBottom: 'none', 
            }}>
                <Container size='lg' >
                    <div style={{
                        height: isMobile ? "75vh" : "60vh", opacity: '0.95', backgroundColor: '#1F3469', display: 'flex', alignItems: 'center',
                        justifyContent: 'center',
                        borderBottom: 'none',
                       
                        flexDirection: isMobile ? 'column' : 'row'
                    }}>
                        <div style={{
                            flex: 0.1, borderBottom: 'none', margin: '3rem', 
                        }}>
                            <Image   height='20rem' width='15rem' mb={isMobile?'0rem':'none'} src={Image1}></Image>
                        </div>
                        <div
                            style={{
                                flex: 0.7,
                                borderBottom: 'none',

                            }}
                        >
                            <Text
                                style={{ fontFamily: '"Poppins", Sans-serif' }}
                                fz={isMobile ? '18px' : '20px'}
                                color="rgba(255, 255, 255, 0.8)"
                                fw="600"
                                m='xl'
                                mt={isMobile?'0rem':'none'}
                                align={isMobile ? 'center' : 'left'}
                            >
                                I add value to amazing individual who are curious to build a healthy Lifestyle.
                            </Text>
                        </div>
                    </div>
                </Container>
            </div>
        </BackgroundImage>
    );
};

export default Mantine6;
