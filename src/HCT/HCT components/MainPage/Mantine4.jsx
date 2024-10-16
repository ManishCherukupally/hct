import { AspectRatio, Badge, Button, CardSection, Group, BackgroundImage, Modal, Box, TextInput, NumberInput, Radio } from '@mantine/core'
import { Card, Grid, Footer, Container, Anchor, Paper, SimpleGrid, Image, Text, List } from '@mantine/core'
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react'
import client from '../../../API/api';


const Mantine4 = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState(null)

  const form = useForm({
    initialValues: {
      name: '',
      category: '',
      mobile_num: '',
      email: '',
      location: '',
      age: '',
      gender: value,

    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },

    transformValues: (values) => ({
      name: `${values.name}`,
      category: `${values.category}`,
      mobile_num: `${values.mobile_num}`,
      email: `${values.email}`,
      location: `${values.location}`,
      age: `${values.age}`,
      gender: value,

    })
  });

  const handleRegisterUser = () => {
    // client.post("register_user/", form.getTransformedValues())
    //   .catch(err => console.error(err))
    setTimeout(() => {
      close()
      form.reset()
      setValue(null)
    }, 1000);
  }

  return (
    <>
      <Modal centered opened={opened} onClose={close} title="Registration" >
        {/* Modal content */

          <Box mx="auto">
            <form>
              <TextInput
                withAsterisk
                name='name'
                label="Name"
                placeholder="Enter your Name"
                {...form.getInputProps('name')}
                mb='xs' radius='md'

              />
              <TextInput
                withAsterisk
                name='category'
                label="Category"
                placeholder="enter category"
                {...form.getInputProps('category')}
                mb='xs' radius='md'
              />
              <TextInput
                withAsterisk
                name='mobile_num'
                mask="+91 (000) 000-00-00"
                label="phone number"
                placeholder="Your phone number"
                {...form.getInputProps('mobile_num')} mb='xs' radius='md'
              />
              <TextInput
                withAsterisk
                name='email'
                label="Email"
                placeholder="your@email.com"
                {...form.getInputProps('email')} mb='xs' radius='md'
              />
              <TextInput
                withAsterisk
                name='location'
                label="Location"
                placeholder="your location"
                {...form.getInputProps('location')} mb='xs' radius='md'
              />
              <NumberInput
                name='age'
                placeholder="Your age"
                label="Your age"
                withAsterisk
                {...form.getInputProps('age')} mb='xs' radius='md'
              />
              <Radio.Group
                label="Gender"
                withAsterisk
                mb='xs' radius='md'
                style={{ color: 'blue' }}
                value={value}
                onChange={setValue}
              >
                <Group mt="xs">
                  <Radio value="male" label="Male" />
                  <Radio value="female" label="Female" />
                  <Radio value="other" label="Other" />
                </Group>
              </Radio.Group>

              <Group position="right" mt="md">
                <Button onClick={handleRegisterUser}>Submit</Button>
              </Group>
            </form>
          </Box>




        }
      </Modal>

      <BackgroundImage src="https://wallpapercave.com/wp/wp8298483.jpg"
        style={{ height: '83vh' }}>
        <Grid h={'125vh'} align='center' opacity={0.9}  >
          <Grid.Col span={12} >
            <Group position='center'>
              <SimpleGrid cols={3} >


                <Card withBorder shadow='xl' bg='#1F3469'
                  h='439.19px' w='325.33px'  >
                  <CardSection>
                    <AspectRatio ratio={9 / 5} >
                      <Image src="https://cdni.iconscout.com/illustration/premium/thumb/rules-list-6211246-5116152.png" width={340} height={350} >

                      </Image>
                    </AspectRatio>

                  </CardSection>
                  <Text style={{ fontFamily: '"Poppins", Sans-serif' }} fz='16px' color='#FBD40B' fw='500' m='sm'>
                    Rules
                  </Text>
                  <Badge variant='light'>Cool Badge</Badge>
                  <List style={{ fontFamily: '"Poppins", Sans-serif', color: 'white' }} fz='16px' color='#FBD40B' fw='500' m='lg'>
                    <List.Item >Rule 1</List.Item>
                    <List.Item>Rule 2</List.Item>


                  </List>
                  <Button variant='light' fz='md' fw='700' w='18rem' mt='3rem'>
                    Find Out
                  </Button>

                </Card>

                <Card withBorder shadow='xl' bg='#1F3469'
                  h='439.19px' w='325.33px' >
                  <CardSection>
                    <AspectRatio ratio={9 / 5} >
                      <Image src="https://cdn2.iconfinder.com/data/icons/business-line-color-bg-strawberry-economy/512/goal-512.png" width={250} height={200} ml='2.5rem' >

                      </Image>
                    </AspectRatio>

                  </CardSection>
                  <Text style={{ fontFamily: '"Poppins", Sans-serif' }} fz='16px' color='#FBD40B' fw='500' m='sm'>
                    Target
                  </Text>
                  <Badge variant='light'>Cool Badge1</Badge>
                  <List style={{ fontFamily: '"Poppins", Sans-serif', color: 'white' }} fz='16px' color='#FBD40B' fw='500' m='lg'>
                    <List.Item >Target 1</List.Item>
                    <List.Item>Target 2</List.Item>


                  </List>
                  <Button variant='light' fz='md' fw='700' w='18rem' mt='3rem'>
                    Find Out
                  </Button>

                </Card>


                <Card withBorder shadow='xl' bg='#1F3469'
                  h='439.19px' w='325.33px' >
                  <CardSection>
                    <AspectRatio ratio={9 / 5} >

                      <Image src="https://cdni.iconscout.com/illustration/premium/thumb/online-rewards-8023219-6354904.png" width={250} height={250} ml='2rem' >
                      </Image >
                    </AspectRatio>

                  </CardSection>
                  <Text style={{ fontFamily: '"Poppins", Sans-serif' }} fz='16px' color='#FBD40B' fw='500' m='sm'>
                    Rewards
                  </Text>
                  <Badge variant='light'>Cool Badge2</Badge>
                  <List style={{ fontFamily: '"Poppins", Sans-serif', color: 'white' }} fz='16px' color='#FBD40B' fw='500' m='lg'>
                    <List.Item >Winner</List.Item>
                    <List.Item>Runner</List.Item>


                  </List>
                  <Button variant='light' fz='md' fw='700' w='18rem' mt='3rem'>
                    Find Out
                  </Button>

                </Card>

              </SimpleGrid>

            </Group>

            <Footer mt='5.2rem' height='220' pt='2rem' style={{ backgroundColor: '#ffa500', position: 'relative' }} zIndex='revert' >

              <Container style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} size={"md"}>


                <div>
                  <Text size="xl" weight={700} style={{ color: 'white', fontFamily: '"Poppins", Sans-serif' }}>Simple Mantine template</Text>
                  <Text size="sm" style={{ color: 'white', mt: '5px', fontFamily: '"Poppins", Sans-serif' }}>
                    You can do anything you want with this template, from portfolios to other stuff.
                  </Text>
                  <Text size="sm" style={{ color: 'white', marginTop: '5px', fontFamily: '"Poppins", Sans-serif' }}>
                    You can find the illustrations I used on{' '}
                    <Anchor href="http://healthcoachsaiteja.com/" target="_blank" td='underline' style={{ color: 'white', fontFamily: '"Poppins", Sans-serif' }}>
                      healthcoachsaiteja.com
                    </Anchor>
                  </Text>

                  <Button
                    radius="xl"
                    size="xl"

                    component="a"
                    // href="http://healthcoachsaiteja.com/"
                    target="_blank"
                    mt='md'
                    styles={(theme) => ({
                      root: {
                        backgroundColor: '#1F3469',
                        color: 'white',
                        padding: '1rem 2.5rem',
                        fontSize: '18px',
                        fontWeight: 700,
                        borderRadius: '30px',
                        boxShadow: '0 0 60px rgba(255, 255, 255, 0.6)',
                        transition: 'background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
                        '&:hover': {
                          backgroundColor: '#ffa500',
                          boxShadow: '10px 0 40px rgba(255, 255, 255, 1), -10px 0 40px rgba(255, 165, 0, 1), 0 0 30px rgba(255, 255, 255, 0.8)',
                          transform: 'scale(1.05)',
                        },
                      },
                    })}
                    onClick={open}
                  >
                    Register Here
                  </Button>
                </div>


                <Paper shadow="xs" radius="md" p="xs" style={{ backgroundColor: 'white' }}>
                  <Text size="sm" style={{ color: 'black' }}>Template made by</Text>
                  <Group spacing="xs">
                    <Image
                      width={50}
                      height={50}
                      radius="xl"
                      fit='contain'
                      src="http://healthcoachsaiteja.com/wp-content/uploads/2022/11/saiteja_health_coach-1536x505.png"
                      alt="Logo"
                    />
                    <div>
                      <Text size="sm" weight={700} style={{ color: 'black' }}>Giuseppeptm</Text>
                      <Text size="xs" style={{ color: 'gray', fontFamily: '"Poppins", Sans-serif' }}>example123@gmail.com</Text>
                    </div>
                  </Group>
                </Paper>

              </Container>


            </Footer>



          </Grid.Col>

        </Grid>

      </BackgroundImage>
    </>


  )
}

export default Mantine4

