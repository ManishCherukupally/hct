import React from 'react'
import {Carousel} from '@mantine/carousel';
import { Card, Text,BackgroundImage } from '@mantine/core';

const Mantine3 = () => {
  return (

    <BackgroundImage src="https://getwallpapers.com/wallpaper/full/9/7/9/200446.jpg"
    style={{height:'85vh',}} >
    <div style={{ height:"70vh"}}>
        <Text fz='2.5rem' align='center' fw='bold' style={{fontFamily:'"Poppins", Sans-serif'}} color='white' pt='4rem'>
            Certificates
        </Text>
    <Carousel  mx="auto" withControls controlsOffset='sm' w={'65vw'} h={300} slideSize={'5rem'} slidesToScroll={1} draggable slideGap={'1rem'} withIndicators loop opacity={0.9} mt='5rem'>
        
    <Carousel.Slide>
        <Card withBorder bg='#1F3469' h={"300px"} w={'305.33px'} radius='15px' ><Text align='center' color='white' fw='600' mt='8rem' fz='xl' > Certificate 1</Text> </Card>
        </Carousel.Slide>

        <Carousel.Slide>
        <Card withBorder bg='#1F3469' h={"300px"} w={'305.33px'} radius='15px'><Text align='center' color='white' fw='600' mt='8rem' fz='xl' > Certificate 2</Text> </Card>
        </Carousel.Slide>
        
        <Carousel.Slide>
        <Card withBorder bg='#1F3469' h={"300px"} w={'305.33px'} radius='15px'><Text align='center' color='white' fw='600' mt='8rem' fz='xl' > Certificate 3</Text> </Card>
        </Carousel.Slide>

        <Carousel.Slide>
        <Card withBorder bg='#1F3469' h={"300px"} w={'305.33px'} radius='15px'><Text align='center' color='white' fw='600' mt='8rem' fz='xl' > Certificate 4</Text> </Card>
        </Carousel.Slide>

        <Carousel.Slide>
        <Card withBorder bg='#1F3469' h={"300px"} w={'305.33px'} radius='15px'><Text align='center' color='white' fw='600' mt='8rem' fz='xl' > Certificate 5</Text> </Card>
        </Carousel.Slide>
   
  </Carousel>
  </div>
  </BackgroundImage>
  )
}

export default Mantine3
