import { AspectRatio, Badge, Button, CardSection, Group, BackgroundImage, Modal, Box, TextInput, NumberInput, Radio } from '@mantine/core';
import { Card, Grid, Footer, Container, Anchor, SimpleGrid, Image, Text, List } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';
import { Link } from 'react-router-dom';
import facebookImage from '../../../assets/facebook-logo-facebook-icon-transparent-free-png.webp';
import facebookImage1 from '../../../assets/colored-instagram-logo-new.png';

// import { FaSquareFacebook } from "react-icons/fa6";
// import { FaInstagram } from "react-icons/fa";

const Mantine4 = () => {
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
      <Modal opened={opened} onClose={close} title="Authentication" centered>
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
      

      <BackgroundImage src="https://wallpapercave.com/wp/wp8298483.jpg" style={{ height: isMobile ? '152vh' : '85vh' }}>
        <Grid h={isMobile ? 'auto' : '125vh'} align='center' opacity={0.9} >
          <Grid.Col span={12}>
            <Group position='center'>
              <SimpleGrid cols={isMobile ? 1 : 3} spacing={isMobile ? 'md' : '5rem'} m={'0.3rem'} pb={'0.9rem'}>
                <Card shadow="xl" bg="#1F3469" h="auto" w={isMobile ? '290px' : '325.33px'} radius="lg"
                  sx={{
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      boxShadow: '0 0 20px 5px #FBD40B',
                      transform: 'scale(1.05)',
                      cursor: 'pointer'
                    },
                  }}>
                  <CardSection>
                    <AspectRatio ratio={9 / 5}>
                      <Image src="https://cdni.iconscout.com/illustration/premium/thumb/rules-list-6211246-5116152.png" width={340} height={350} />
                    </AspectRatio>
                  </CardSection>
                  <Text style={{ fontFamily: '"Poppins", Sans-serif' }} fz='16px' color='#FBD40B' fw='500' m='sm'>Rules</Text>
                  <Badge variant='light'>Cool Badge</Badge>
                  <List style={{ fontFamily: '"Poppins", Sans-serif', color: 'white' }} fz='16px' color='#FBD40B' fw='500' m='lg'>
                    <List.Item>Rule 1</List.Item>
                    <List.Item>Rule 2</List.Item>
                  </List>
                </Card>

                {/* Target Card */}
                <Card shadow="xl" bg="#1F3469" h="auto" w={isMobile ? '290px' : '325.33px'} radius="lg"
                  sx={{
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      boxShadow: '0 0 20px 5px #FBD40B',
                      transform: 'scale(1.05)',
                      cursor: 'pointer'
                    },
                  }}>
                  <CardSection>
                    <AspectRatio ratio={9 / 5}>
                      <Image src="https://cdn2.iconfinder.com/data/icons/business-line-color-bg-strawberry-economy/512/goal-512.png" width={250} height={200} ml='2.5rem' />
                    </AspectRatio>
                  </CardSection>
                  <Text style={{ fontFamily: '"Poppins", Sans-serif' }} fz='16px' color='#FBD40B' fw='500' m='sm'>Target</Text>
                  <Badge variant='light'>Cool Badge1</Badge>
                  <List style={{ fontFamily: '"Poppins", Sans-serif', color: 'white' }} fz='16px' color='#FBD40B' fw='500' m='lg'>
                    <List.Item>Target 1</List.Item>
                    <List.Item>Target 2</List.Item>
                  </List>
                </Card>

                {/* Rewards Card */}
                <Card shadow="xl" bg="#1F3469" h="auto" w={isMobile ? '290px' : '325.33px'} radius="lg"
                  sx={{
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      boxShadow: '0 0 20px 5px #FBD40B',
                      transform: 'scale(1.05)',
                      cursor: 'pointer'
                    },
                  }}>
                  <CardSection>
                    <AspectRatio ratio={9 / 5}>
                      <Image src="https://cdni.iconscout.com/illustration/premium/thumb/online-rewards-8023219-6354904.png" width={250} height={250} ml='2rem' />
                    </AspectRatio>
                  </CardSection>
                  <Text style={{ fontFamily: '"Poppins", Sans-serif' }} fz='16px' color='#FBD40B' fw='500' m='sm'>Rewards</Text>
                  <Badge variant='light'>Cool Badge2</Badge>
                  <List style={{ fontFamily: '"Poppins", Sans-serif', color: 'white' }} fz='16px' color='#FBD40B' fw='500' m='lg'>
                    <List.Item>Winner</List.Item>
                    <List.Item>Runner</List.Item>
                  </List>
                </Card>
              </SimpleGrid>
            </Group>

            <Footer mt={isMobile ? '-0.5rem' : '10.5rem'} height="9rem" pt="1.5rem" style={{ backgroundColor: '#FBD40B' }}>
              <Container style={{ display: 'flex', alignItems: 'center', padding: 0 }}>
               
                <Link to="https://www.facebook.com/people/Sai-Teja/100063960496461/?mibextid=LQQJ4d" target='_blank'>
        <img
          src={facebookImage} 
          alt="Facebook"
          style={{width: '4.4rem', height: '100%', objectFit: 'cover'  }} 
        />
      </Link>
      <Link to="https://www.instagram.com/healthcoach_saiteja/?igshid=YmMyMTA2M2Y%3D" target='_blank'>
        <img
          src={facebookImage1} 
          alt="Instagram"
          style={{ width: '2.5rem', height: '99.8%', objectFit: 'cover' }} 
        />
      </Link>
    

    {/* Button Section */}
    <div style={{ marginLeft: 'auto' }}>
      <Button
      mr={'2rem'}
      mb={'1rem'}
        radius="xl"
        size="xl"
        component="a"
        mt="8px"
        styles={(theme) => ({
          root: {
            backgroundColor: '#1F3469',
            color: 'white',
            padding: '1rem 2.5rem',
            fontSize: '18px',
            fontWeight: 700,
            borderRadius: '30px',
            boxShadow:
              '10px 0 40px rgba(255, 253, 208, 1), -10px 0 40px rgba(255, 253, 208, 1), 0 0 30px rgba(255, 253, 208, 0.8)',
            transition: 'background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
            '&:hover': {
              backgroundColor: '#FBD40B',
              boxShadow:
                '10px 0 40px rgba(255, 253, 208, 1), -10px 0 40px rgba(255, 253, 208, 1), 0 0 30px rgba(255, 253, 208, 0.8)',
              transform: 'scale(1.05)',
            },
          },
        })}
        onClick={open}
      >
        Register Here
      </Button>
    </div>
  </Container>
</Footer>


      </Grid.Col>

        </Grid>

      </BackgroundImage>
    </>


  )
}

export default Mantine4

