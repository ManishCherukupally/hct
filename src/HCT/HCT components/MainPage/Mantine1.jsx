import React from 'react'
import { AppShell, BackgroundImage, Button, Card, Container, Flex, Footer, Text } from '@mantine/core'

const Mantine1 = () => {
  return (


    <BackgroundImage src="https://static.vecteezy.com/system/resources/previews/022/653/988/non_2x/treadmill-in-modern-gym-toned-image-3d-rendering-generative-ai-free-photo.jpg"
      mt='xl' h={"90vh"} >

      <Container >

        <AppShell
          footer={<Footer height={98} bg='#1F3469'
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
                    component="a"
                    href="http://healthcoachsaiteja.com/"
                    target="_blank"
                    mt='xs'
                    styles={(theme) => ({
                      root: {
                        backgroundColor: '#ffa500',
                        color: 'white',
                        padding: '0.5rem 2rem',
                        fontSize: '16px',
                        fontWeight: 700,
                        borderRadius: '30px',
                        boxShadow: '0 0 20px rgba(255, 255, 255, 0.6)',
                        transition: 'background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
                        '&:hover': {
                          backgroundColor: '#ffa500',
                          boxShadow: '10px 0 40px rgba(255, 165, 0, 1), -10px 0 40px rgba(255, 165, 0, 1), 0 0 30px rgba(255, 255, 255, 0.8)',
                          transform: 'scale(1.05)',
                        },
                      },
                    })}
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

            <Card withBorder h='30rem' w='52rem' bg='#1F3469' style={{ borderRadius: '25px', opacity: '0.91', alignContent: 'center', }}>

              <Text style={{ fontFamily: '"Poppins", Sans-serif' }} fz='20px' color='white' align='center' fw='500' >
                MADE WITH REACT AND MANTINE
              </Text>
              <Text style={{ fontFamily: '"Poppins", Sans-serif' }} fz='3.78rem' color='white' align='center' lh='1.4' fw='700'>
                100 Days Challenge
              </Text>
              <Text style={{ fontFamily: '"Poppins", Sans-serif' }} fz='20px' color='white' align='center' fw='500' >
                Participate and Win the rewards
                <Text component='a' href='http://healthcoachsaiteja.com/' target='_blank' color='#FBD40B' pl='6px'>
                  Join Here
                </Text>
              </Text>

            </Card>
          </Flex>

        </AppShell>


      </Container>
    </BackgroundImage>

  )
}

export default Mantine1
