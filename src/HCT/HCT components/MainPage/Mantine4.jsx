import { AspectRatio, Badge, Button, CardSection, Group, BackgroundImage, Modal, Box, TextInput, NumberInput, Radio } from '@mantine/core';
import { Card, Grid, Footer, Container, Anchor, SimpleGrid, Image, Text, List } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useMediaQuery } from '@mantine/hooks';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import facebookImage from '../../../assets/facebook-logo-facebook-icon-transparent-free-png.png';
import facebookImage1 from '../../../assets/colored-instagram-logo-new.png';
import client from '../../../API/api';
import './page.css'
import { MdDone } from 'react-icons/md';
import { ImCross } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import { PiWarningFill } from "react-icons/pi";


// import { FaSquareFacebook } from "react-icons/fa6";
// import { FaInstagram } from "react-icons/fa";

const Mantine4 = () => {
  const mediumScreen = useMediaQuery("(min-width: 1100px)");
  const largeScreen = useMediaQuery("(min-width: 1440px)");
  const extraLargeScreen = useMediaQuery("(min-width: 1770px)");


  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 800px)');
  const [loader, setLoader] = useState(false)

  const [successful, setSuccessful] = useState(false)
  const [unsuccessful, setunSuccessful] = useState(false)
  const [emailexist, setEmailExist] = useState(false)
  const [value, setValue] = useState('active');


  const form = useForm({
    initialValues: {
      name: "",
      business_email: "",
      contact_no: "",
      location: "",
      user_status: value,
      username: "",
      category: "",
      age: '',
      gender: ''
    },
    validate: {
      business_email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },

    transformValues: (values) => ({
      name: `${values.name}`,
      business_email: `${values.business_email}`,
      contact_no: `${values.contact_no}`,
      user_status: `${value}`,
      location: `${values.location}`,
      username: `${values.business_email}`,
      category: 'gold',
      age: values.age,
      gender: `${values.gender}`
    })
  });

  const handleRegistration = () => {
    setLoader(true);
    client.post("register_user/", form.getTransformedValues())
      .then((resp) => {
        if (resp.data.status === "user_registered_successfully") {
          // notify()

          setTimeout(() => {
            setSuccessful(true)
            setLoader(false)
            close()
            form.reset()
          }, 1000)
        }

        else if (resp.data.status === "failed_to_register") {
          // unsuccessNotify()

          setTimeout(() => {
            setunSuccessful(true)
            setLoader(false)
            close()
            form.reset()

          }, 1000)
        }

        else if (resp.data.email) {
          // emailexist()

          setTimeout(() => {
            setEmailExist(true)
            setLoader(false)
            close()
            form.reset()
          }, 1000)
        }

      })

    setTimeout(() => {
      setSuccessful(false);
      setunSuccessful(false)
      setEmailExist(false)
      // setCheckmarkVisible(false); // Hide checkmark after 2 seconds
    }, 5000);
  }


  return (
    <>

      <Modal opened={successful} onClose={() => setSuccessful(false)} withCloseButton={false} centered
        padding="md"
      >
        <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
          <MdDone className='icon-animation' color='rgb(0, 171, 0)' />
          <p>Submitted Successfully!</p>

        </div>

      </Modal>

      <Modal opened={unsuccessful} onClose={() => setunSuccessful(false)} withCloseButton={false} centered
        padding="md"
      >
        <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
          <IoMdClose className='icon-animation' color='red' />
          <p>Unsuccessful Submission!</p>

        </div>
      </Modal>


      <Modal opened={emailexist} onClose={() => setEmailExist(false)} withCloseButton={false} centered
        padding="md"
      >
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 12 }}>
          <PiWarningFill className='icon-animation' color='orange' />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Text>Email already exists!</Text>
            <Text>Please enter another email.</Text>
          </div>
        </div>
      </Modal>


      <Modal opened={opened} onClose={close} title="Registration" centered size={isMobile ? "xs" : "md"}>
        <form >
          <SimpleGrid cols={1}>
            <TextInput

              label="Name"
              name='name'
              placeholder="Enter name"

              {...form.getInputProps('name')}

            />
            <TextInput

              label="Email"
              name='business_email'
              placeholder="user@email.com"

              {...form.getInputProps('business_email')}

            />
            <NumberInput
              placeholder="Your age"
              label="Your age"

              {...form.getInputProps('age')} radius='md'
            />



            {/* <TextInput

    label="Password"
    name='password'
    placeholder=" password"
   
    {...form.getInputProps('password')}

/> */}
            <TextInput

              label="Contact No."
              name='contact_no'
              placeholder="Enter Contact No."

              {...form.getInputProps('contact_no')}

            />
            <TextInput

              label="Location"
              name='location'
              placeholder="Enter Location"

              {...form.getInputProps('location')}

            />

            <Radio.Group
              name="favoriteFramework"
              label="Gender"

              {...form.getInputProps('gender')} radius='md'
              style={{ color: 'blue' }}
            >
              <Group mt="xs">
                <Radio value="male" label="Male" />
                <Radio value="female" label="Female" />
                <Radio value="other" label="Other" />
              </Group>
            </Radio.Group>


            <Radio.Group
              value={value}
              onChange={setValue}

              label="Select status of the user"


            >
              <Group mt={"xs"}>
                <Radio value="active" label="Active" />
                <Radio value="inactive" label="Inactive" />
              </Group>
            </Radio.Group>
          </SimpleGrid>

          <Group position="right" mt="md">
            <Button onClick={handleRegistration} loading={loader}>Submit</Button>
          </Group>
        </form>
      </Modal>


      <BackgroundImage src="https://wallpapercave.com/wp/wp8298483.jpg" style={{ height: isMobile ? '177vh' : '95vh' }}>
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

            <Footer mt={isMobile ? '-0.4rem' : '12.9rem'} height={isMobile ? "9rem" : '9rem'} pt={isMobile ? "0.5rem" : '1.5rem'} style={{ backgroundColor: '#FBD40B' }}>
              <Container style={{ display: 'flex', alignItems: 'center', padding: 0 }}>

                <Link to="https://www.facebook.com/people/Sai-Teja/100063960496461/?mibextid=LQQJ4d" target='_blank'>
                  <img
                    src={facebookImage}
                    alt="Facebook"
                    style={{ width: '4.4rem', height: '100%', objectFit: 'cover' }}
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

