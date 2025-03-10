import React from 'react';
import { Image, BackgroundImage, Text, Flex } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

const Mantine2 = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <BackgroundImage
      src="https://dailytimes.com.pk/assets/uploads/2019/04/04/fitness.jpg"
      style={{
        height: isMobile ? '75vh' : '90vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay Div */}
      <div
        style={{
          backgroundColor: 'rgba(31, 52, 105, 0.91)', // Semi-transparent overlay
          width: 'auto',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? '1rem' : '2rem',
        }}
      >
        {/* Flex Container */}
        <Flex
          direction={isMobile ? 'column' : 'row'}
          align="center"
          justify="center"
          gap={isMobile ? 'sm' : 'lg'}
          style={{ width: '100%', maxWidth: '1200px' }}
        >
          {/* Image Section */}
          <Flex justify="center" mt={isMobile ? '-2rem' : '-6rem'}>
            <Image
              src="https://static.vecteezy.com/system/resources/thumbnails/011/336/914/small_2x/gym-and-fitness-logo-png.png"
              height={isMobile ? '8rem' : '20rem'}
              width={isMobile ? '8rem' : '20rem'}
              style={{ objectFit: 'contain' }}
            />
          </Flex>

          {/* Text Section */}
          <Flex
            direction="column"
            align={isMobile ? 'center' : 'flex-start'}
            justify="center"
            mt={isMobile ? '1rem' : 0}
            px={isMobile ? '1rem' : '2rem'}
          >
            <Text
              style={{ fontFamily: '"Poppins", Sans-serif' }}
              fz={isMobile ? '22px' : '34px'}
              color="white"
              fw="bold"
              align={isMobile ? 'center' : 'left'}
            >
              16’s to 60’s, Let’s Get Fit – 100 Days of Strength!
            </Text>
            <Text
              style={{ fontFamily: '"Roboto Condensed", Sans-serif' }}
              fz={isMobile ? '14px' : '18px'}
              color="rgba(255, 255, 255, 0.8)"
              fw="300"
              mt="md"
              align={isMobile ? 'center' : 'left'}
            >
              The 100 Days Gym Challenge is a commitment to fitness that encourages participants to work out consistently for 100 days. This challenge aims to build healthy habits, improve strength, and enhance overall well-being. Whether you're a beginner or a seasoned athlete, it offers structured routines and motivation to stay on track. We are building a community where eachother take the accountability of getting Fit !
            </Text>
          </Flex>
        </Flex>
      </div>
    </BackgroundImage>
  );
};

export default Mantine2;
