import React, { useRef } from 'react';
import { Carousel } from '@mantine/carousel';
import { Card, Text, BackgroundImage, Image, getStylesRef, createStyles } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Image1 from '../../../assets/Sai-Teja_1-scaled-pzl0id5u4xyg2hpdsml0ru0l6g22c55kvzjoap24j8 .jpg';
import Image2 from '../../../assets/Sai-Teja_2-scaled-pzl0ipdqlsf69f7mt9v668xkwgdu47i39o0zjak0ac.jpg';
import Image3 from '../../../assets/Sai-Teja_3-scaled-pzl0j3hbgayh3kn5ixykpndht8gcbo22blt9qfz3p0.jpg';
import Image4 from '../../../assets/Sai-Teja_4-scaled-pzl0jgn23zghm441e3ncok1y4mnhbfib1ey2gbfl9w.jpg';
import Image5 from '../../../assets/Sai-Teja_5-scaled-pzl0jtssrnyi4nkx99c4ngqeg0umb6yjr82v66w2us.jpg';
import Autoplay from 'embla-carousel-autoplay';

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

const Mantine3 = () => {
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const { classes } = useStyles();
  const isMobile = useMediaQuery('(max-width: 800px)');

  return (
    <BackgroundImage
      src="https://getwallpapers.com/wallpaper/full/9/7/9/200446.jpg"
      style={{ height: isMobile ? '80vh' : '90vh' }}
    >
      <div style={{ height: isMobile ? "65vh" : "100vh", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Text
          fz={isMobile ? '1.5rem' : '2.5rem'}
          align='center'
          fw='bold'
          style={{ fontFamily: '"Poppins", Sans-serif' }}
          color='white'
          pt={isMobile ? '2rem' : 'none'}
        >
          Certificates
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
          loop
          mt={isMobile ? '3rem' : '5rem'}
          plugins={[autoplay.current]}
          onMouseEnter={() => autoplay.current.stop()}
          onMouseLeave={() => autoplay.current.play()}

        >
          <Carousel.Slide>
            <Card
              bg='#1F3469'
              h={isMobile ? "230px" : "240px"}
              w={isMobile ? '100%' : '305.33px'}
              radius='15px'
            >
              <Image src={Image1} radius='sm'></Image>
            </Card>
          </Carousel.Slide>

          <Carousel.Slide>
            <Card
              bg='#1F3469'
              h={isMobile ? "230px" : "240px"}
              w={isMobile ? '100%' : '305.33px'}
              radius='15px'
            >
              <Image src={Image2} radius='sm'></Image>
            </Card>
          </Carousel.Slide>

          <Carousel.Slide>
            <Card
              bg='#1F3469'
              h={isMobile ? "230px" : "240px"}
              w={isMobile ? '100%' : '305.33px'}
              radius='15px'
            >
              <Image src={Image3} radius='sm'></Image>
            </Card>
          </Carousel.Slide>

          <Carousel.Slide>
            <Card
              bg='#1F3469'
              h={isMobile ? "230px" : "240px"}
              w={isMobile ? '100%' : '305.33px'}
              radius='15px'
            >
              <Image src={Image4} radius='sm'></Image>
            </Card>
          </Carousel.Slide>

          <Carousel.Slide>
            <Card
              bg='#1F3469'
              h={isMobile ? "230px" : "240px"}
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
