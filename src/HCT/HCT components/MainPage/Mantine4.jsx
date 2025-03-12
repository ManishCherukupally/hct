import { AspectRatio, Badge, Button, CardSection, Group, BackgroundImage, Modal, Box, TextInput, NumberInput, Radio, Textarea, Select } from '@mantine/core';
import { Card, Grid, Footer, Container, Anchor, SimpleGrid, Image, Text, List } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useMediaQuery } from '@mantine/hooks';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import facebookImage from '../../../assets/facebook-logo-facebook-icon-transparent-free-png.png';
import Image11 from '../../../assets/IMG-0069-832x1024.jpg'
import facebookImage1 from '../../../assets/colored-instagram-logo-new.png';
import client from '../../../API/api';
import './page.css'
import { MdDone } from 'react-icons/md';
import { ImCross } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import { PiWarningFill } from "react-icons/pi";
import Footer1 from './Footer1';


// import { FaSquareFacebook } from "react-icons/fa6";
// import { FaInstagram } from "react-icons/fa";

const Mantine4 = () => {
  const mediumScreen = useMediaQuery("(min-width: 1100px)");
  const largeScreen = useMediaQuery("(min-width: 1440px)");

  const extraLargeScreen = useMediaQuery("(min-width: 1770px)");


  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
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
      // category: "",
      age: '',
      gender: '',
      goal: '',
      how_did_you_learn_about_us: '',
      type_of_challange: ''
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
      // category: 'gold',
      age: values.age,
      gender: `${values.gender}`,
      goal: `${values.goal}`,
      how_did_you_learn_about_us: `${values.how_did_you_learn_about_us}`,
      type_of_challange: `${values.type_of_challange}`
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
              required
              label="Name"
              name='name'
              placeholder="Enter name"

              {...form.getInputProps('name')}

            />
            <TextInput
              required
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
              required
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

            <Textarea maxRows={4}
              name='goal'
              {...form.getInputProps('goal')}
              label='Goals'
              placeholder='Enter here..'>

            </Textarea>
            <Select
              name='how_did_you_learn_about_us'
              label="How did you get to know us? "
              placeholder="Pick one"
              searchable
              nothingFound="No options"
              data={['Facebook', 'Instagram Add', 'Friend refered', 'Community promotion', 'Others']}
              {...form.getInputProps('how_did_you_learn_about_us')}
            />


            <Radio.Group
              name='type_of_challange'
              label="Choose Your Journey"

              {...form.getInputProps('type_of_challange')} radius='md'
              style={{ color: 'blue' }}
            >
              <Group mt="xs">
                <Radio value="100dayschallenge" label="100 Days Challenge" />
                <Radio value="longtermjourney" label="Longterm Journey" />

              </Group>
            </Radio.Group>


          </SimpleGrid>

          <Group position="right" mt="md">
            <Button onClick={handleRegistration} fullWidth radius='md' loading={loader} bg={'#1F3469'}>Submit</Button>
          </Group>
        </form>
      </Modal>


      <BackgroundImage
        src="https://wallpapercave.com/wp/wp8298483.jpg"
        style={{
          height: isMobile ? 'auto' : '100vh',
          padding: isMobile ? '2rem 0' : '2.5rem 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Grid
          h="auto"
          align="center"
          justify="center"
          opacity={0.9}
          style={{ padding: isMobile ? '1rem' : 'auto' }}
        >
          <Grid.Col span={12}>
            <Group position="center">
              <SimpleGrid
                cols={isMobile ? 1 : 3}
                spacing={isMobile ? '2rem' : '5rem'}
                m={isMobile ? '1rem' : '0.3rem'}
                pb={isMobile ? '2rem' : '0.9rem'}
                style={{
                  maxWidth: '100%',
                  justifyContent: 'center',
                }}
              >

                <Card
                  shadow="xl"
                  bg="#1F3469"
                  h="auto"
                  w={isMobile ? '80vw' : '325.33px'}
                  radius="lg"
                  sx={{
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      boxShadow: '0 0 20px 5px #FBD40B',
                      transform: 'scale(1.05)',
                      cursor: 'pointer',
                    },
                  }}
                >
                  <CardSection>
                    <AspectRatio ratio={9 / 5} >
                      <Image
                        src="https://images.newscientist.com/wp-content/uploads/2021/12/08150023/PRI_214108755.jpg"
                        width="100%"
                        height='100%'

                      />
                    </AspectRatio>
                  </CardSection>
                  <Text fz="15px" color="#FBD40B" fw="500" m="xs" >What will you learn</Text>

                  <List style={{ color: 'white' }} fz="14px" m="lg">
                    <List.Item>Customised workout and meal plans</List.Item>
                    <List.Item>Follow-up team: daily follow-up to check with clients' progress (accountability)</List.Item>
                    <List.Item>Weekly calls direct with the coach to discuss various health and nutrition concepts. The agenda is to ensure clients learn and implement health concepts for a lifetime.</List.Item>
                    <List.Item>Supplement suggestions customised to the client transformation goal.</List.Item>
                    <List.Item>WhatsApp fitness community and challenges given to clients in the community to build synergy and an environment to learn and grow.</List.Item>
                  </List>
                </Card>


                <Card
                  shadow="xl"
                  bg="#1F3469"
                  h="auto"
                  w={isMobile ? '80vw' : '325.33px'}
                  radius="lg"
                  sx={{
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      boxShadow: '0 0 20px 5px #FBD40B',
                      transform: 'scale(1.05)',
                      cursor: 'pointer',
                    },
                  }}
                >
                  <CardSection>
                    <AspectRatio ratio={9 / 5}>
                      <Image
                        src={Image11}

                        width='100%' height="100%"
                        style={{ objectFit: 'cover' }}
                      />
                    </AspectRatio>
                  </CardSection>
                  <Text fz="15px" color="#FBD40B" fw="500" m="xs">Challenges we delt</Text>

                  <List style={{ color: 'white' }} fz="14px" m="lg">
                    <List.Item>Knee rehab</List.Item>
                    <List.Item>Cricket strength and conditioning</List.Item>
                    <List.Item>Lifestyle disorders</List.Item>
                    <List.Item>Lower back pain and sciatica</List.Item>
                    <List.Item>Clients with imbalanced blood lipid profiles and other deficiencies.</List.Item>
                    <List.Item>Working proffesional facing posture imbalance</List.Item>
                    <List.Item>Strength and conditioning to professional/weekend sport enthusiasts</List.Item>
                  </List>
                </Card>


                <Card
                  shadow="xl"
                  bg="#1F3469"
                  h="auto"

                  w={isMobile ? '80vw' : '325.33px'}
                  radius="lg"
                  sx={{
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      boxShadow: '0 0 20px 5px #FBD40B',
                      transform: 'scale(1.05)',
                      cursor: 'pointer',
                    },
                  }}
                >
                  <CardSection>
                    <AspectRatio ratio={9 / 5}>
                      <Image
                        src="https://img.freepik.com/free-photo/front-view-young-female-sport-outfit-holding-dumbbells-white-speech-bubble_140725-83616.jpg"
                        width="100%"
                        height='100%'



                      />
                    </AspectRatio>
                  </CardSection>

                  <Text fz="15px" color="#FBD40B" fw="500" m="xs" >
                    Have Questions? Let’s Talk!
                  </Text>
                  <Text fz="14px" m="lg" color='white'>Not sure where to start on your fitness journey? </Text>

                  <Text fz="14px" m="lg" color='white'>Need help choosing the right membership or personal training plan?</Text>
                  {/* Centering ONLY the Button */}
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: isMobile ? '4rem' : '7rem', marginBottom: isMobile ? '3rem' : 'none' }}>
                    <a href='tel:%20+91%2074165%2060259'>
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

                      >
                        Book Now !
                      </Button>
                    </a>

                  </div>
                </Card>


              </SimpleGrid>
            </Group>

          </Grid.Col>

        </Grid>

      </BackgroundImage>
      <Footer1 openModal={open} />
    </>


  )
}

export default Mantine4

