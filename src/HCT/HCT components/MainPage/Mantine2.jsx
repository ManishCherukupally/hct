import React from 'react';
import { Image, BackgroundImage, Text, Flex } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

const Mantine2 = () => {
  const isMobile = useMediaQuery('(max-width: 768px)'); // Detect mobile screens

  return (
    <BackgroundImage
      src="https://dailytimes.com.pk/assets/uploads/2019/04/04/fitness.jpg"
      style={{ height: isMobile ? '100vh' : '90vh' }}
    >
      <div
        style={{
          border: 'none',
          backgroundColor: '#1F3469',
          width: '99.9vw',
          height: isMobile? '100vh': '90vh',
          opacity: '0.91',
        }}
      >
        <Flex
          direction={isMobile ? 'column' : 'row'}
          align="center"
          justify={isMobile ? 'center' : 'flex-start'}
          style={{ height: '100%' }}
          gap={isMobile ? 'xs' : 'lg'}
          p={isMobile ? '1rem' : '2rem'}
        >
          {/* Image Section */}
          <Flex justify={isMobile ? 'flex-start' : 'flex-start'} mt={'-6rem'}>
            <Image
              src="https://static.vecteezy.com/system/resources/thumbnails/011/336/914/small_2x/gym-and-fitness-logo-png.png"
              height={isMobile ? '11rem' : '25rem'}
              width={isMobile ? '11rem' : '25rem'}
            />
          </Flex>

          {/* Text Section */}
          <Flex
            direction="column"
            justify="center"
            align={isMobile ? 'center' : 'flex-start'}
            mt={isMobile ? '0.4rem' : 0}
          >
            <Text
              style={{ fontFamily: '"Poppins", Sans-serif' }}
              fz={isMobile ? '24px' : '34px'}
              color="white"
              fw="bold"
              ml={isMobile ? '0' : '2rem'}
              align={isMobile ? 'center' : 'left'}
            >
              About Challenge
            </Text>
            <Text
              style={{ fontFamily: '"Roboto Condensed",Sans-serif' }}
              ml={isMobile ? '0' : '2rem'}
              fz={isMobile ? '14px' : '18px'}
              color="rgba(255, 255, 255, 0.8)"
              fw="300"
              mt="md"
              align={isMobile ? 'center' : 'left'}
              px={isMobile ? '1rem' : '0'}
            >
              The 100 Days Gym Challenge is a commitment to fitness that encourages participants to work out consistently for 100 days. This challenge aims to build healthy habits, improve strength, and enhance overall well-being. Whether you're a beginner or a seasoned athlete, it offers structured routines and motivation to stay on track. Many participants share their progress on social media, fostering a sense of community and accountability. Ultimately, it's a great way to jumpstart your fitness journey and embrace a healthier lifestyle!
            </Text>
          </Flex>
        </Flex>
      </div>
    </BackgroundImage>
  );
};

export default Mantine2;
