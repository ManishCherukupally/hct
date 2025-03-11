import React, { useRef, useState, useEffect } from 'react';
import { Carousel } from '@mantine/carousel';
import { Card, Text, Image, createStyles, getStylesRef } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Autoplay from 'embla-carousel-autoplay';

// Import images
import Image1 from '../../../assets/FF0F998B-67DE-4EFD-BA6C-209FE875FEE1-768x614.png';
import Image2 from '../../../assets/F5BEF845-50C9-4BB6-8F1D-10EA090C41CF-768x614.png';
import Image3 from '../../../assets/Before-after-minimal-skincare-Instagram-post-600x600.jpeg';
import Image4 from '../../../assets/70CB0996-080E-4728-92B7-13A7A786F90E-768x614.png';
import Image5 from '../../../assets/86A7915C-0940-4E11-AA20-FECB8A3D1141-768x614.png';
import Image6 from '../../../assets/WhatsApp Image 2025-03-11 at 15.37.35_a088208c.jpg';


const useStyles = createStyles(() => ({
    controls: {
        ref: getStylesRef('controls'),
        transition: 'opacity 150ms ease',
        opacity: 0,
    },
    root: {
        '&:hover': {
            [`& .${getStylesRef('controls')}`]: {
                opacity: 1,
            },
        },
    },
}));

const Mantine5 = () => {
    const { classes } = useStyles();
    const isMobile = useMediaQuery('(max-width: 800px)');

    // Store autoplay plugin reference
    const autoplay = useRef(Autoplay({ delay: 2000, }));

    return (
        <div style={{ height: isMobile ? "65vh" : "100vh", backgroundColor: '#1F3469', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            
            <Text
                fz={isMobile ? '1.5rem' : '2.5rem'}
                align='center'
                fw='bold'
                style={{ fontFamily: '"Poppins", Sans-serif' }}
                color='white'
                pt={isMobile ? '2rem' : '1rem'}
            >
                CLIENTS TRANSRORMATION
            </Text>

            <Carousel
                classNames={classes}
                mx="auto"
                withControls
                controlsOffset='sm'
                w={isMobile ? '85vw' : '65vw'}
                h={isMobile ? 240 : 250}
                slideSize={isMobile ? '75%' : '5rem'}
                slidesToScroll={1}
                draggable
                slideGap={isMobile ? '1rem' : '2rem'}
                opacity={0.9}
                mt={isMobile ? '3rem' : '5rem'}
                loop
                plugins={[autoplay.current]}
                onMouseEnter={() => autoplay.current.stop()}
                onMouseLeave={() => autoplay.current.play()}
            >
                {[Image1, Image2, Image3, Image4, Image5, Image6].map((image, index) => (
                    <Carousel.Slide key={index}>
                        <Card
                            bg='#1F3469'
                            h={isMobile ? "230px" : "240px"}
                            w={isMobile ? '100%' : '305.33px'}
                            radius='15px'
                        >
                            <Image src={image} radius='sm' />
                        </Card>
                    </Carousel.Slide>
                ))}
            </Carousel>
        </div>
    );
};

export default Mantine5;
