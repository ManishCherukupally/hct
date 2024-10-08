import React from 'react'
import { Image, BackgroundImage, Text, Flex, } from '@mantine/core'


const Mantine2 = () => {
  return (
    <BackgroundImage src="https://dailytimes.com.pk/assets/uploads/2019/04/04/fitness.jpg"
    >

      <div style={{ border: 'none', backgroundColor: '#1F3469', width: '99vw', height: '75vh', opacity: '0.91' }} >
        <Flex >
          <Flex >

            <Image src="https://static.vecteezy.com/system/resources/thumbnails/011/336/914/small_2x/gym-and-fitness-logo-png.png" height='25rem' width='25rem'  > </Image>
          </Flex>
          <Flex direction='column' justify='center'>
            <Text style={{ fontFamily: '"Poppins", Sans-serif' }} fz='34px' color='white' fw='bold' ml='2rem'>
              About Challenge
            </Text>
            <Text style={{ fontFamily: '"Poppins", Sans-serif' }} ml='2rem' fz='16px' color='white' fw='500' w='60vw'  >
              The 100 Days Gym Challenge is a commitment to fitness that encourages participants to work out consistently for 100 days. This challenge aims to build healthy habits, improve strength, and enhance overall well-being. Whether you're a beginner or a seasoned athlete, it offers structured routines and motivation to stay on track. Many participants share their progress on social media, fostering a sense of community and accountability. Ultimately, it's a great way to jumpstart your fitness journey and embrace a healthier lifestyle!
            </Text>

          </Flex>
        </Flex>
      </div>

    </BackgroundImage>




  )
}

export default Mantine2
