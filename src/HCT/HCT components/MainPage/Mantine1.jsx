import React, { useEffect, useState } from 'react';
import { AppShell, BackgroundImage, Button, Card, Container, Flex, Footer, Text, Group, Radio, TextInput, Modal, Box, NumberInput, Transition, Overlay, SimpleGrid, Textarea, Select, Space } from '@mantine/core';
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
import { DateInput } from '@mantine/dates';



const Mantine1 = () => {
  const mediumScreen = useMediaQuery("(min-width: 1100px)");
  const largeScreen = useMediaQuery("(min-width: 1440px)");
  const extraLargeScreen = useMediaQuery("(min-width: 1770px)");

  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 800px)');
  const [loaderVisible, setLoaderVisible] = useState(false);

  const [successful, setSuccessful] = useState(false)
  const [unsuccessful, setunSuccessful] = useState(false)
  const [emailexist, setEmailExist] = useState(false)
  const [page, setPage] = useState(false)
  const [value, setValue] = useState('active');
  const [date, setDate] = useState(null);
  const [selectedCategory, setselectedCategory] = useState('')
  const [categoryList, setcategoryList] = useState([])
  const [gender, setgender] = useState('male')



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
      gender: gender,

      how_did_you_learn_about_us: '',
      type_of_challange: '',
      goal: '',
      date_of_joining: '',
      height: '',
      weight: '',
      body_type: '',
      blood_test: '',
      bone_density: '',
      body_fatpercentage: '',
      muscle_mass: '',
      any_physical_limitations: '',
      any_concerns: ''
    },
    transformValues: (values) => ({
      name: `${values.name}`,
      business_email: `${values.business_email}`,
      contact_no: `${values.contact_no}`,
      user_status: `${value}`,
      location: `${values.location}`,
      username: `${values.business_email}`,
      category: `${selectedCategory}`,
      age: values.age,
      gender: `${gender}`,

      how_did_you_learn_about_us: `${values.how_did_you_learn_about_us}`,
      type_of_challange: `${values.type_of_challange}`,
      goal: `${values.goal}`,
      date_of_joining: new Date(date).toLocaleDateString("en-CA"),
      height: parseFloat(values.height),
      weight: parseFloat(values.weight),
      body_type: `${values.body_type}`,
      blood_test: `${values.blood_test}`,
      bone_density: values.bone_density,
      body_fatpercentage: values.body_fatpercentage,
      muscle_mass: values.muscle_mass,
      any_physical_limitations: `${values.any_physical_limitations}`,
      any_concerns: `${values.any_concerns}`
      // company: '',
      // years_of_experience: '',
      // job_position: ''

    }),
  })

  useEffect(() => {
    client.get('hct_category_dd/', {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("access")}`
      }
    })
      .then((resp) => {
        setcategoryList(resp.data['category_list'].map(item => ({
          value: item.category,
          label: item.category
        })))
      })
  }, [])


  const handleRegistration = () => {
    setLoaderVisible(true);
    client.post("register_user/", form.getTransformedValues())
      .then((resp) => {
        if (resp.data.status === "user_registered_successfully") {
          // notify()

          setTimeout(() => {
            setSuccessful(true)
            setLoaderVisible(false)
            close()
            form.reset()
          }, 1000)
        }

        else if (resp.data.status === "failed_to_register") {
          // unsuccessNotify()

          setTimeout(() => {
            setunSuccessful(true)
            setLoaderVisible(false)
            close()
            form.reset()

          }, 1000)
        }

        else if (resp.data.email) {
          // emailexist()

          setTimeout(() => {
            setEmailExist(true)
            setLoaderVisible(false)
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
        <form>
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


              {...form.getInputProps('age')}
            />

            <TextInput

              label="Height"
              name='height'
              placeholder="Enter Height"

              {...form.getInputProps('height')}

            />

            <TextInput

              label="Weight"
              name='weight'
              placeholder="Enter Weight"

              {...form.getInputProps('weight')}

            />

            <Select
              data={categoryList}
              placeholder='Select category'
              label="Category"
              value={selectedCategory}

              onChange={(value) => {
                setselectedCategory(value)
              }}
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
              value={gender}
              onChange={setgender}
            >
              <Group mt="xs">
                <Radio value="male" label="Male" />
                <Radio value="female" label="Female" />
                <Radio value="other" label="Other" />
              </Group>
            </Radio.Group>

            <Select
              required
              name='how_did_you_learn_about_us'
              label="How did you get to know us? "
              placeholder="Pick one"
              searchable
              nothingFound="No options"
              data={['Facebook', 'Instagram Ad', 'Friend refered', 'Community promotion', 'Others']}
              {...form.getInputProps('how_did_you_learn_about_us')}
            />

            <Radio.Group
              required
              name='type_of_challange'
              label="Choose Your Journey"

              {...form.getInputProps('type_of_challange')}
              radius='md'
              style={{ color: 'blue' }}
            >
              <Group mt="xs">
                <Radio value="100dayschallenge" label="100 Days Challenge" />
                <Radio value="longtermjourney" label="Longterm Journey" />

              </Group>
            </Radio.Group>

            <Textarea maxRows={4} label='Goals' required name='goal' placeholder='Enter here..'
              {...form.getInputProps('goal')}
            >

            </Textarea>


            <DateInput
              value={date}
              onChange={setDate}
              label="Date"
              placeholder=" Enter Date"
            />

            <TextInput

              label="Body Type"
              name='body_type'
              placeholder="Enter Body Type"

              {...form.getInputProps('body_type')}

            />
            <TextInput

              label="Blood Group"
              name='blood_test'
              placeholder="Enter Blood Group"

              {...form.getInputProps('blood_test')}

            />

            <NumberInput

              label="Bone Density"
              name='bone_density'
              placeholder="Enter Blood Group"

              {...form.getInputProps('bone_density')}

            />

            <NumberInput

              label="Fat Percentage"
              name='body_fatpercentage'
              placeholder="Enter Fat Percentage"

              {...form.getInputProps('body_fatpercentage')}

            />

            <NumberInput

              label="Muscel Mass"
              name='muscle_mass'
              placeholder="Enter Muscel Mass"

              {...form.getInputProps('muscle_mass')}

            />

            <TextInput

              label="Physical Limitations"
              name='any_physical_limitations'
              placeholder="Enter Physical Limitations"

              {...form.getInputProps('any_physical_limitations')}

            />

            <TextInput

              label="Any Concerns"
              name='any_concerns'
              placeholder="Enter Concerns"

              {...form.getInputProps('any_concerns')}

            />



            <Radio.Group
              value={value}
              onChange={setValue}

              label="Select status of the user"

              withAsterisk
            >
              <Group>
                <Radio value="active" label="Active" />
                <Radio value="inactive" label="Inactive" />
              </Group>
            </Radio.Group>
          </SimpleGrid>
          <Space h={15} />
          <Flex justify={"end"} gap={"2%"}>
            <Button loading={loaderVisible} style={{ color: "rgba(255, 255, 255, 1)", backgroundColor: "#233c79" }}
              variant='filled' onClick={handleRegistration}>Done</Button>
            <Button variant='outline' color='dark' onClick={close}>No</Button>
          </Flex>
        </form>
      </Modal>

      {/* <Modal opened ={opened} onClose={close} mr={isMobile? '2rem': "0rem"}>
        hii
      </Modal> */}

      <BackgroundImage
        src="https://healthcoachsaiteja.com/wp-content/uploads/2022/11/IMG-1431-scaled.jpg"
        mt="xl"
        // h={isMobile ? "80vh" : "90vh"}
        h='auto'
        style={{ backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <Container fluid p={isMobile ? '1rem' : '2rem'}>
          <AppShell
            footer={
              <Footer
                fixed
                height={isMobile ? 60 : 80}
                bg="#1F3469"
                withBorder={false}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: isMobile ? '0 0.5rem' : '0 2rem',
                }}
              >
                <Container
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    maxWidth: '1200px',
                  }}
                >
                  {/* Glowing "HURRY UP AND REGISTER" Text */}
                  <Flex direction='column' >
                    <Text
                      sx={{
                        fontFamily: '"Poppins", Sans-serif',
                        background: 'linear-gradient(90deg, #fff, #fbd40b, #fff)',
                        backgroundSize: '200%',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                        animation: 'glowAnimation 1.5s infinite',
                        textAlign: isMobile ? 'center' : 'left',
                        '@keyframes glowAnimation': {
                          '0%': { backgroundPosition: '-200%' },
                          '100%': { backgroundPosition: '200%' },
                        },
                      }}
                      fz={isMobile ? '16px' : '28px'}
                      fw={600}
                      ml={isMobile ? '0' : '2rem'}
                    >
                      HURRY UP AND REGISTER
                    </Text>
                    <Text ml={isMobile ? '-1rem' : '2rem'} color='white' style={{ fontfamily: '"Open Sans", Sans-serif', fontSize: isMobile ? '9.5px' : '12px' }}>
                      Designed and Developed by Automac Technologies
                    </Text>
                  </Flex>

                  {/* Register Button */}
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


                </Container>

              </Footer>
            }
          >
            {/* Card Section */}
            <Flex mt={isMobile ? '4rem' : '5rem'} mb={isMobile ? '4rem' : '5rem'} justify="center" align="center">
              <Card
                h={isMobile ? '22rem' : '30rem'}
                w={isMobile ? '90vw' : '50rem'}
                bg="#1F3469"
                radius="lg"
                p={isMobile ? '1rem' : '2rem'}
                style={{
                  opacity: '0.8',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{ fontFamily: '"Poppins", Sans-serif', }}
                  fz={isMobile ? '2.2rem' : '3.5rem'}
                  color="white"
                  fw="700"
                  lh="1.4"

                >
                  100 Days Fitness Challenge
                </Text>
                <Text
                  style={{ fontFamily: '"Poppins", Sans-serif' }}
                  fz="20px"
                  color="white"
                  mt="sm"
                >
                  Get Fit to "LEAD"
                </Text>
                <Text
                  style={{
                    fontFamily: '"Poppins", Sans-serif',
                    cursor: 'pointer',
                    display: 'inline-block',
                    marginTop: '0.5rem',
                  }}
                  component="a"
                  onClick={open}
                  color="#FBD40B"
                  fz="18px"
                  fw={600}
                >
                  Join Here
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
