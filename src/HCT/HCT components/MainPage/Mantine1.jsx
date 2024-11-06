import React, { useState } from 'react';
import { AppShell, BackgroundImage, Button, Card, Container, Flex, Footer, Text, Group, Radio, TextInput, Modal, Box, NumberInput, Transition, Overlay, SimpleGrid } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import client from '../../../API/api';
import './page.css'
import '../../../../node_modules/react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify';
import { MdDone } from 'react-icons/md';
import { ImCross } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import { PiWarningFill } from "react-icons/pi";



const Mantine1 = () => {
  const mediumScreen = useMediaQuery("(min-width: 1100px)");
  const largeScreen = useMediaQuery("(min-width: 1440px)");
  const extraLargeScreen = useMediaQuery("(min-width: 1770px)");

  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 800px)');
  const [loader, setLoader] = useState(false)

  const [successful, setSuccessful] = useState(false)
  const [unsuccessful, setunSuccessful] = useState(false)
  const [emailexist, setEmailExist] = useState(false)
  const [page, setPage] = useState(false)
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




  // const notify = () => {
  //   setPage(true)
  //   toast(
  //     <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
  //       <MdDone className='icon-animation' color='rgb(0, 171, 0)' />
  //       <p>Submitted Successfully!</p>

  //     </div>

  //   );

  // }

  // const unsuccessNotify = () => {
  //   setPage(true)

  //   toast(
  //     <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
  //       <IoMdClose className='icon-animation' color='red' />
  //       <p>Unsuccessful Submission!</p>

  //     </div>

  //   );
  // }

  // const emailExist = () => {
  //   setPage(true)


  //   toast(
  //     <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 12 }}>
  //       <PiWarningFill className='icon-animation' color='orange' />
  //       <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
  //         <Text>Email already exists!</Text>
  //         <Text>Please enter another email.</Text>
  //       </div>
  //     </div>

  //   );
  // }

  // setTimeout(() => {
  //   setPage(false)
  //   setSuccessful(false);
  //   setunSuccessful(false)
  //   setEmailExist(false)
  // }, 3000)


  return (
    <>
      {/* <Button onClick={() => {
        setSuccessful(true)
      }}>Modal</Button>
      <Button onClick={() => {
        setEmailExist(true)
      }}>UnSuccesful</Button> */}

      {/* <button onClick={emailExist}>Notify!</button> */}
      {/* <div>

        {page && <Overlay>
          <ToastContainer stacked
            position="top-right"
            autoClose={5000}
            hideProgressBar
            // draggable
            theme="light"

          />
        </Overlay>}
      </div> */}
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

      {/* <Modal opened ={opened} onClose={close} mr={isMobile? '2rem': "0rem"}>
        hii
      </Modal> */}

      <BackgroundImage
        src="https://static.vecteezy.com/system/resources/previews/022/653/988/non_2x/treadmill-in-modern-gym-toned-image-3d-rendering-generative-ai-free-photo.jpg"
        mt="xl"
        h={isMobile ? "70vh" : "90vh"}

      >
        <Container>
          <AppShell
            footer={
              <Footer height={isMobile ? 65 : 70} bg="#1F3469" withBorder={false} style={{ width: isMobile ? '99%' : '100%', padding: isMobile ? '0 0.1rem' : '0 2rem' }}>
                <Container mt={'0.2rem'}>
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
            <Flex mt={isMobile ? '3.5rem' : '5rem'} justify="center" align={'center'}>
              <Card
                h={isMobile ? '20rem' : '30rem'}
                w={isMobile ? '90vw' : '52rem'}
                bg="#1F3469"
                style={{ borderRadius: '25px', opacity: '0.91', alignContent: 'center', justifyContent: 'center' }}
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
                  <Text align="center" component="a" onClick={open} color="#FBD40B" pl="6px"> Join Here</Text>
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
