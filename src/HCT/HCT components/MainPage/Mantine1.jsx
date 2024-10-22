import React from 'react';
import { AppShell, BackgroundImage, Button, Card, Container, Flex, Footer, Text, Group, Radio, TextInput, Modal, Box, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';

const Mantine1 = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 800px)'); 
  const form = useForm({
    initialValues: {
      name: '',
      category: '',
      phone: '',
      email: '',
      location: '',
      age: '',
      gender: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <>
       <Modal opened={opened} onClose={close} title="Authentication">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput
              withAsterisk
              label="Name"
              placeholder="Enter your Name"
              {...form.getInputProps('name')}
              mb='xs' radius='md'
            />
            <TextInput
              withAsterisk
              label="Category"
              placeholder="enter category"
              {...form.getInputProps('category')}
              mb='xs' radius='md'
            />
            <TextInput
              withAsterisk
              mask="+91 (000) 000-00-00"
              label="phone number"
              placeholder="Your phone number"
              {...form.getInputProps('phone')} mb='xs' radius='md'
            />
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps('email')} mb='xs' radius='md'
            />
            <TextInput
              withAsterisk
              label="Location"
              placeholder="your location"
              {...form.getInputProps('location')} mb='xs' radius='md'
            />
            <NumberInput
              placeholder="Your age"
              label="Your age"
              withAsterisk
              {...form.getInputProps('age')} mb='xs' radius='md'
            />
            <Radio.Group
              name="favoriteFramework"
              label="Gender"
              withAsterisk
              {...form.getInputProps('gender')} mb='xs' radius='md'
              style={{ color: 'blue' }}
            >
              <Group mt="xs">
                <Radio value="male" label="Male" />
                <Radio value="female" label="Female" />
                <Radio value="other" label="Other" />
              </Group>
            </Radio.Group>

            <Group position="right" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
      </Modal>

      {/* <Modal opened ={opened} onClose={close} mr={isMobile? '2rem': "0rem"}>
        hii
      </Modal> */}

      <BackgroundImage
        src="https://static.vecteezy.com/system/resources/previews/022/653/988/non_2x/treadmill-in-modern-gym-toned-image-3d-rendering-generative-ai-free-photo.jpg"
        mt="xl"
        h={isMobile ? "60vh" : "90vh"}
       
      >
        <Container>
          <AppShell
            footer={
              <Footer height={isMobile ? 85 : 70} bg="#1F3469" withBorder={false} style={{ width: '98.2%', padding: isMobile ? '0 0.1rem' : '0 2rem' }}>
                <Container mt={'1rem'}>
                  <Flex justify="space-between" >
                    <Text
                    
                      sx={{
                        
                        fontFamily: '"Poppins", Sans-serif',
                        background: 'linear-gradient(90deg, #fff, #fbd40b, #fff)',
                        backgroundSize: '200%',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                        animation: 'glowAnimation 1.5s infinite',
                        '@keyframes glowAnimation': {
                          '0%': {
                            backgroundPosition: '-200%',
                          },
                          '100%': {
                            backgroundPosition: '200%',
                          },
                        },
                      }}
                      fz={isMobile ? '15px' : '30px'}
                      fw={500}
                      ml={isMobile ? '1rem' : '2rem'}
                      mt="md"
                    >
                      HURRY UP AND REGISTER
                    </Text>
                    <Button
  h={isMobile ? '2.5rem' : '3rem'}
  mt="xs"
  styles={(theme) => ({
    root: {
      backgroundColor: '#FBD40B',
      color: 'white',
      padding: isMobile ? '0.3rem 1.5rem' : '0.5rem 2rem',
      fontSize: isMobile ? '14px' : '16px',
      fontWeight: 700,
      borderRadius: '30px',
      boxShadow: '0 0 20px rgba(255, 255, 255, 0.6)',
      transition: 'background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
      backgroundSize: '200%',
      backgroundImage: 'linear-gradient(90deg, #fbd40b, #ff9933, #fbd40b)',
      animation: 'glowAnimation 3s infinite',
      '&:hover': {
        backgroundColor: '#FBD40B',
        boxShadow: '0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 165, 0, 0.7)',
        transform: 'scale(1.05)',
      },
    },
    '@keyframes glowAnimation': {
      '0%': {
        backgroundPosition: '-200%',
      },
      '100%': {
        backgroundPosition: '200%',
      },
    },
  })}
  onClick={open}
>
  Register Here
</Button>

                  </Flex>
                </Container>
              </Footer>
            }
          >
            <Flex mt={isMobile ? '6rem' : '5rem'} justify="center" align={'center'}>
              <Card
                h={isMobile ? '20rem' : '30rem'}
                w={isMobile ? '90vw' : '52rem'}
                bg="#1F3469"
                style={{ borderRadius: '25px', opacity: '0.91', alignContent: 'center', justifyContent:'center' }}
              >
                <Text
                  style={{ fontFamily: '"Poppins", Sans-serif' }}
                  fz="20px"
                  color="white"
                  align="center"
                  fw="500"
                ></Text>
                <Text
                  style={{ fontFamily: '"Poppins", Sans-serif' }}
                  fz={isMobile ? '2.5rem' : '3.78rem'}
                  color="white"
                  align="center"
                  lh="1.4"
                  fw="700"
                >
                  100 Days Of Fitness Challenge
                </Text>
                <Text
                  style={{ fontFamily: '"Poppins", Sans-serif' }}
                  fz="20px"
                  color="white"
                  align="center"
                  fw="500"
                >
                  Participate and Win the rewards<br />
                  <Text  align="center" component="a" onClick={open} color="#FBD40B" pl="6px"> Join Here</Text>
                </Text>
              
              </Card>
            </Flex>
          </AppShell>
        </Container>
      </BackgroundImage>
    </>
  );
};

export default Mantine1;
