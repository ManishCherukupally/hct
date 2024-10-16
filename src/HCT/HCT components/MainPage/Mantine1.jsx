import React from 'react'
import { AppShell, BackgroundImage, Button, Card, Container, Flex, Footer, Text,Group,Radio,TextInput,Modal,Box,NumberInput } from '@mantine/core'
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';

const Mantine1 = () => {

 const [opened, { open, close }] = useDisclosure(false);
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
      <Modal centered opened={opened} onClose={close} title="Registration" >
        {/* Modal content */

          <Box mx="auto">
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
          </Box>




        }
      </Modal>


    <BackgroundImage src="https://static.vecteezy.com/system/resources/previews/022/653/988/non_2x/treadmill-in-modern-gym-toned-image-3d-rendering-generative-ai-free-photo.jpg"
      mt='xl' h={"90vh"} >

      <Container >

        <AppShell
          footer={<Footer height={70} bg='#1F3469' withBorder={false}
          >
            <Container style={{ justifyContent: 'center' }}>
              <Flex justify='space-between'>
                <Flex>
                  <Text style={{ fontFamily: '"Poppins", Sans-serif', animation: 'glowAnimation 1.5s infinite' }} fz='30px' color='white' fw='500' ml='2rem' mt='sm' >HURRY UP AND REGISTER
                    <style>
                      {`
            @keyframes glowAnimation {
              0% {
                text-shadow: 0 0 10px rgba(255, 255, 255, 0.9), 0 0 20px rgba(255, 165, 0, 0.6);
              }
              50% {
                text-shadow: 0 0 20px rgba(255, 255, 255, 1), 0 0 30px rgba(255, 165, 0, 0.8);
              }
              100% {
                text-shadow: 0 0 10px rgba(255, 255, 255, 0.9), 0 0 20px rgba(255, 165, 0, 0.6);
              }
            }
          `}
                    </style>
                  </Text>
                </Flex>
                <Flex>
                  <Button
                    h='3rem'
                    mt='xs'
                    styles={(theme) => ({
                      root: {
                        backgroundColor: '#FBD40B', 
                        color: 'white',
                        padding: '0.5rem 2rem',
                        fontSize: '16px',
                        fontWeight: 700,
                        borderRadius: '30px',
                        boxShadow: '0 0 20px rgba(255, 255, 255, 0.6)', 
                        transition: 'background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
                        '&:hover': {
                        backgroundColor: '#FBD40B', 
                        boxShadow: '0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 165, 0, 0.7)', 
                        transform: 'scale(1.05)', 
                      },
                      }
                    })}
                    onClick={open}
                  >
                    Register Here
                  </Button>
                  <style>
                    {`
          @keyframes glow-animation {
            0% {
              left: -100%; 
            }
            50% {
              left: 100%; 
            }
            100% {
              left: -100%; 
            }
          }
        `}
                  </style>
                </Flex>
              </Flex>
            </Container>
          </Footer>

          } >

          <Flex mt='5rem' justify={"center"}>

            <Card  h='30rem' w='52rem' bg='#1F3469' style={{ borderRadius: '25px', opacity: '0.91', alignContent: 'center', }}>

              <Text style={{ fontFamily: '"Poppins", Sans-serif' }} fz='20px' color='white' align='center' fw='500' >
                MADE WITH REACT AND MANTINE
              </Text>
              <Text style={{ fontFamily: '"Poppins", Sans-serif' }} fz='3.78rem' color='white' align='center' lh='1.4' fw='700'>
              100 Days Of Fitness Challenge
              </Text>
              <Text style={{ fontFamily: '"Poppins", Sans-serif' }} fz='20px' color='white' align='center' fw='500' >
                Participate and Win the rewards
                <Text component='a' onClick={open} color='#FBD40B' pl='6px'>
                  Join Here
                </Text>
              </Text>

            </Card>
          </Flex>

        </AppShell>


      </Container>
    </BackgroundImage>
</>
  )
}

export default Mantine1
