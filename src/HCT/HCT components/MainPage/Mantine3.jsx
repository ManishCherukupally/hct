import React, { useRef } from 'react';
import { Carousel } from '@mantine/carousel';
import { Card, Text, BackgroundImage, Image } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Image1 from '../../../assets/Sai-Teja_1-scaled-pzl0id5u4xyg2hpdsml0ru0l6g22c55kvzjoap24j8 .jpg';
import Image2 from '../../../assets/Sai-Teja_2-scaled-pzl0ipdqlsf69f7mt9v668xkwgdu47i39o0zjak0ac.jpg';
import Image3 from '../../../assets/Sai-Teja_3-scaled-pzl0j3hbgayh3kn5ixykpndht8gcbo22blt9qfz3p0.jpg';
import Image4 from '../../../assets/Sai-Teja_4-scaled-pzl0jgn23zghm441e3ncok1y4mnhbfib1ey2gbfl9w.jpg';
import Image5 from '../../../assets/Sai-Teja_5-scaled-pzl0jtssrnyi4nkx99c4ngqeg0umb6yjr82v66w2us.jpg';
import Autoplay from 'embla-carousel-autoplay';
import './response.css';

const Mantine3 = () => {
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  
  
  const isMobile = useMediaQuery('(max-width: 800px)');

  return (
    <BackgroundImage className='carouselback'
      src="https://getwallpapers.com/wallpaper/full/9/7/9/200446.jpg"
      style={{ height: isMobile ? '80vh' : '85vh' }} 
    >
      <div style={{ height: isMobile ? "65vh" : "70vh" }}>
        <Text 
          fz={isMobile ? '1.5rem' : '2.5rem'} 
          align='center' 
          fw='bold' 
          style={{ fontFamily: '"Poppins", Sans-serif' }} 
          color='white' 
          pt={isMobile ? '2rem' : '4rem'}
        >
          Certificates
        </Text>
        
        <Carousel 
        className='carousel'
          mx="auto" 
          withControls 
          controlsOffset='lg' 
          w={isMobile ? '88vw' : '65vw'} 
          h={isMobile ? 226 : 250} 
          slideSize={isMobile ? '75%' : '5rem'} 
          slidesToScroll={1} 
          draggable 
          slideGap={isMobile ? '1rem' : '2rem'} 
          withIndicators 
          opacity={0.9} 
          mt={isMobile ? '3rem' : '5rem'}  
          
        >
          <Carousel.Slide>
            <Card 
            className='carouselcard'
              bg='#1F3469' 
              
              w={isMobile ? '100%' : '305.33px'} 
              radius='15px'
            >
              <Image src={Image1} radius='sm'></Image>
            </Card>
          </Carousel.Slide>

          <Carousel.Slide>
            <Card 
            className='carouselcard'
              bg='#1F3469' 
             
              w={isMobile ? '100%' : '305.33px'} 
              radius='15px'
            >
              <Image src={Image2} radius='sm'></Image>
            </Card>
          </Carousel.Slide>

          <Carousel.Slide>
            <Card 
            className='carouselcard'
              bg='#1F3469' 
             
              w={isMobile ? '100%' : '305.33px'} 
              radius='15px'
            >
              <Image src={Image3} radius='sm'></Image>
            </Card>
          </Carousel.Slide>

          <Carousel.Slide>
            <Card 
              bg='#1F3469' 
             className='carouselcard'
              w={isMobile ? '100%' : '305.33px'} 
              radius='15px'
            >
              <Image src={Image4} radius='sm'></Image>
            </Card>
          </Carousel.Slide>

          <Carousel.Slide>
            <Card 
            className='carouselcard'
              bg='#1F3469' 
             
              w={isMobile ? '100%' : '305.33px'} 
              radius='15px'
            >
              <Image src={Image5} radius='sm'></Image>
            </Card>
          </Carousel.Slide>
        </Carousel>
      </div>
    </BackgroundImage>
  );
};

export default Mantine3;
