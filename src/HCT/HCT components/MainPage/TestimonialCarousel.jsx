import { Carousel } from "@mantine/carousel";
import { Card, Avatar, Text, Container, BackgroundImage, getStylesRef, createStyles } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";


const useStyles = createStyles(() => ({
    controls: {
        ref: getStylesRef('controls'),
        transition: 'opacity 150ms ease',
        opacity: 0,
    },
    root: {
        '&:hover': {
            [`& .${getStylesRef('controls')}`]: {
                opacity: 1,
            },
        },
    },
}));
const TestimonialCarousel = () => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const { classes } = useStyles();
    const autoplay = useRef(Autoplay({ delay: 2000, }));
    return (
        <BackgroundImage
            src='https://healthcoachsaiteja.com/wp-content/uploads/2022/11/1-scaled.jpg'

            style={{
                height: '100vh',
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
                width: 'auto',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <Container size="lg" style={{ width: isMobile ? '100%' : "55%", }}>
                <Text
                    fz={isMobile ? '1.5rem' : '2.5rem'}
                    align='center'
                    fw='bold'
                    style={{ fontFamily: '"Poppins", Sans-serif' }}
                    color='white'
                    mb='2rem'
                    mt='2rem'
                    pt={isMobile ? '2rem' : '1rem'}
                >
                    CLIENTS ACROSS GLOBE
                </Text>
                <Carousel slideSize="100%" align="center" loop
                    mb='2rem'
                    withControls={false}
                    slideGap='xs'
                    plugins={[autoplay.current]}
                    onMouseEnter={() => autoplay.current.stop()}
                    onMouseLeave={() => autoplay.current.play()}
                >
                    {/* Testimonial 1 */}
                    <Carousel.Slide>
                        <Card
                            shadow="sm"
                            p="xl"
                            radius="md"
                            style={{
                                backgroundColor: "#223472",
                                color: "white",
                                textAlign: "center",
                                position: "relative",
                                width: isMobile ? "95%" : "100%",
                                opacity: '0.8',

                                margin: "auto",
                                borderRadius: "10px",
                                paddingTop: isMobile ? "60px" : "80px",
                                paddingBottom: isMobile ? "40px" : "50px",
                                minHeight: isMobile ? "200px" : "450px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center"
                            }}
                        >
                            <Avatar
                                src="https://healthcoachsaiteja.com/wp-content/uploads/2024/11/Sandeep_US-Client-254x300.jpg"
                                size={isMobile ? 70 : 90}
                                radius="50%"
                                style={{
                                    position: "absolute",
                                    top: "7px",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    border: "4px solid white",
                                    backgroundColor: "white",
                                    objectFit: "cover",
                                }}
                            />

                            <Avatar
                                src="https://healthcoachsaiteja.com/wp-content/uploads/2024/11/Sandeep_US-Client-254x300.jpg"
                                size={90}
                                radius="50%"
                                style={{
                                    position: "absolute",
                                    top: "7px",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    border: "4px solid white",
                                    backgroundColor: "white",
                                    objectFit: "cover",
                                }}
                            />
                            <Text fw={700} size="lg" style={{ color: "yellow", marginTop: isMobile ? 30 : 40, fontFamily: '"Poppins", Sans-serif' }}>

                                Rakesh
                            </Text>
                            <Text size="sm" mb="md" c="gray.3" style={{ fontFamily: '"Poppins", Sans-serif' }}>
                                Electrical Engineer, UK
                            </Text>
                            <Text
                                mt="xl"
                                size="md"
                                fz={isMobile ? "14px" : "18px"}
                                style={{
                                    lineHeight: "1.5",
                                    maxWidth: "90%",
                                    margin: "0 auto",
                                    fontFamily: '"Roboto Condensed",Sans-serif',
                                    color: "rgba(255, 255, 255, 0.8)",
                                }}
                            >
                                Thanks for guiding me through my transformation journey. The way you helped me achieve my goals was incredible. Initially, I just wanted to reduce my belly fat, but with your support, I ended up achieving a much better physique. Your diet and workout plans were great and easy to follow. You always pushed me forward and motivated me, even when I was dealing with professional challenges and considered taking a break from working out. Your encouragement kept me going.

                                Thanks for all the support and guidance.😊
                            </Text>
                            <Text
                                style={{
                                    position: "absolute",
                                    top: "5px",
                                    right: "20px",
                                    fontSize: "50px",
                                    color: "yellow",
                                }}
                            >
                                ❝
                            </Text>
                        </Card>
                    </Carousel.Slide>

                    {/* Testimonial 2 */}
                    <Carousel.Slide>
                        <Card
                            shadow="sm"
                            p="xl"
                            radius="md"
                            style={{
                                backgroundColor: "#223472",
                                color: "white",
                                textAlign: "center",
                                position: "relative",
                                width: isMobile ? "95%" : "100%",
                                opacity: '0.8',
                                maxWidth: isMobile ? "100%" : "800px",
                                margin: "auto",
                                borderRadius: "10px",
                                paddingTop: isMobile ? "60px" : "80px",
                                paddingBottom: isMobile ? "40px" : "50px",
                                minHeight: isMobile ? "350px" : "450px", // Adjust height for mobile
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center"
                            }}
                        >
                            <Avatar
                                src="https://healthcoachsaiteja.com/wp-content/uploads/2024/11/Sandeep_US-Client-254x300.jpg"
                                size={isMobile ? 70 : 90}
                                radius="50%"
                                style={{
                                    position: "absolute",
                                    top: "7px",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    border: "4px solid white",
                                    backgroundColor: "white",
                                    objectFit: "cover",
                                }}
                            />

                            <Avatar
                                src="https://healthcoachsaiteja.com/wp-content/uploads/2022/11/RHT6188-1-300x295.jpg"
                                size={90}
                                radius="50%"
                                style={{
                                    position: "absolute",
                                    top: "7px",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    border: "4px solid white",
                                    backgroundColor: "white",
                                    objectFit: "cover",
                                }}
                            />
                            <Text fw={700} size="lg" style={{ color: "yellow", marginTop: isMobile ? 30 : 40, fontFamily: '"Poppins", Sans-serif' }}>

                                Sathish Kalluri
                            </Text>
                            <Text size="sm" mb="md" c="gray.3" style={{ fontFamily: '"Poppins", Sans-serif' }}>
                                Video Marketing Specialist, Hyderabad
                            </Text>
                            <Text
                                mt="xl"
                                size="md"
                                fz={isMobile ? "14px" : "18px"}
                                style={{
                                    lineHeight: "1.5",
                                    maxWidth: "90%",
                                    margin: "0 auto",
                                    fontFamily: '"Roboto Condensed",Sans-serif',
                                    color: "rgba(255, 255, 255, 0.8)",
                                }}
                            >
                                Hello everyone!
                                I'm Sathish Kalluri, an entrepreneur based out of Hyderabad. I would like to share my experience with my health coach, Sai Teja. It's been 1 year since I have started taking training from him. The results are amazing and the best thing I found with Sai Teja is he understands our fitness goals and gives training and diet schedules accordingly. Now,  I'm feeling more lighter and quicker than before.
                            </Text>
                            <Text
                                style={{
                                    position: "absolute",
                                    top: "5px",
                                    right: "20px",
                                    fontSize: "50px",
                                    color: "yellow",
                                }}
                            >
                                ❝
                            </Text>
                        </Card>
                    </Carousel.Slide>

                    <Carousel.Slide>
                        <Card
                            shadow="sm"
                            p="xl"
                            radius="md"
                            style={{
                                backgroundColor: "#223472",
                                color: "white",
                                textAlign: "center",
                                position: "relative",
                                width: isMobile ? "95%" : "100%",
                                opacity: '0.8',
                                maxWidth: isMobile ? "100%" : "800px",
                                margin: "auto",
                                borderRadius: "10px",
                                paddingTop: isMobile ? "60px" : "80px",
                                paddingBottom: isMobile ? "40px" : "50px",
                                minHeight: isMobile ? "350px" : "450px", // Adjust height for mobile
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center"
                            }}
                        >
                            <Avatar
                                src="https://healthcoachsaiteja.com/wp-content/uploads/2024/11/Sandeep_US-Client-254x300.jpg"
                                size={isMobile ? 70 : 90}
                                radius="50%"
                                style={{
                                    position: "absolute",
                                    top: "7px",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    border: "4px solid white",
                                    backgroundColor: "white",
                                    objectFit: "cover",
                                }}
                            />

                            <Avatar
                                src="https://healthcoachsaiteja.com/wp-content/uploads/2025/01/kiranmai_sai-teja-client_profile-294x300.jpg"
                                size={90}
                                radius="50%"
                                style={{
                                    position: "absolute",
                                    top: "7px",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    border: "4px solid white",
                                    backgroundColor: "white",
                                    objectFit: "cover",
                                }}
                            />
                            <Text fw={700} size="lg" style={{ color: "yellow", marginTop: isMobile ? 30 : 40, fontFamily: '"Poppins", Sans-serif' }}>

                                Kiranmayi
                            </Text>
                            <Text size="sm" mb="md" c="gray.3" style={{ fontFamily: '"Poppins", Sans-serif' }}>
                                Home maker, Alberta, Canada
                            </Text>
                            <Text
                                mt="xl"
                                size="md"
                                fz={isMobile ? "14px" : "18px"}
                                style={{
                                    lineHeight: "1.5",
                                    maxWidth: "90%",
                                    margin: "0 auto",
                                    fontFamily: '"Roboto Condensed",Sans-serif',
                                    color: "rgba(255, 255, 255, 0.8)",
                                }}
                            >
                                Being fit and strong changes the whole game of motherhood, especially in the initial post partum years. It is hard to find the right motivation and company to put this thought into practicality. For me, Teja was the perfect fitness buddy. It is indeed rare to find someone like him who is knowledgeable and knows what he is doing. He sets realistic goals and achievable targets. He has played a key role in changing how I think about food, eating habits, and how I feel about going to the gym. Such trainers who work on both the body and mindset of clients are rare. He helped me correct my posture, reduce body fat percentage, tone down my body and improve my muscular strength. The end result was a loss of 9kg weight and a massive gain in confidence and energy. I'm now feeling better than ever!! I highly recommend Sai Teja as anyone's fitness buddy&nbsp;and&nbsp;trainer.
                            </Text>
                            <Text
                                style={{
                                    position: "absolute",
                                    top: "5px",
                                    right: "20px",
                                    fontSize: "50px",
                                    color: "yellow",
                                }}
                            >
                                ❝
                            </Text>
                        </Card>
                    </Carousel.Slide>

                    <Carousel.Slide>
                        <Card
                            shadow="sm"
                            p="xl"
                            radius="md"
                            style={{
                                backgroundColor: "#223472",
                                color: "white",
                                textAlign: "center",
                                position: "relative",
                                width: isMobile ? "95%" : "100%",
                                opacity: '0.8',
                                maxWidth: isMobile ? "100%" : "800px",
                                margin: "auto",
                                borderRadius: "10px",
                                paddingTop: isMobile ? "60px" : "80px",
                                paddingBottom: isMobile ? "40px" : "50px",
                                minHeight: isMobile ? "350px" : "450px", // Adjust height for mobile
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center"
                            }}
                        >
                            <Avatar
                                src="https://healthcoachsaiteja.com/wp-content/uploads/2024/11/Sandeep_US-Client-254x300.jpg"
                                size={isMobile ? 70 : 90}
                                radius="50%"
                                style={{
                                    position: "absolute",
                                    top: "7px",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    border: "4px solid white",
                                    backgroundColor: "white",
                                    objectFit: "cover",
                                }}
                            />

                            <Avatar
                                src="https://healthcoachsaiteja.com/wp-content/uploads/2024/04/Image_Editor-150x150.png"
                                size={90}
                                radius="50%"
                                style={{
                                    position: "absolute",
                                    top: "7px",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    border: "4px solid white",
                                    backgroundColor: "white",
                                    objectFit: "cover",
                                }}
                            />
                            <Text fw={700} size="lg" style={{ color: "yellow", marginTop: isMobile ? 30 : 40, fontFamily: '"Poppins", Sans-serif' }}>

                                Ethan
                            </Text>
                            <Text size="sm" mb="md" c="gray.3" style={{ fontFamily: '"Poppins", Sans-serif' }}>
                                Class 6 student
                            </Text>
                            <Text
                                mt="xl"
                                size="md"
                                fz={isMobile ? "14px" : "18px"}
                                style={{
                                    lineHeight: "1.5",
                                    maxWidth: "90%",
                                    margin: "0 auto",
                                    fontFamily: '"Roboto Condensed",Sans-serif',
                                    color: "rgba(255, 255, 255, 0.8)",
                                }}
                            >
                                Hi everyone, my name is Ethan. I am from class 6th and I am 10 years old. I have been training with coach Sai Teja for about 5 months now, which I feel like everyone my age should also do exercises to be fit and strong. Few different changes I felt were my increase in my speed and agility with a little bit extra strength. Thank you.
                            </Text>
                            <Text
                                style={{
                                    position: "absolute",
                                    top: "5px",
                                    right: "20px",
                                    fontSize: "50px",
                                    color: "yellow",
                                }}
                            >
                                ❝
                            </Text>
                        </Card>
                    </Carousel.Slide>

                    <Carousel.Slide>
                        <Card
                            shadow="sm"
                            p="xl"
                            radius="md"
                            style={{
                                backgroundColor: "#223472",
                                color: "white",
                                textAlign: "center",
                                position: "relative",
                                width: isMobile ? "95%" : "100%",
                                opacity: '0.8',
                                maxWidth: isMobile ? "100%" : "800px",
                                margin: "auto",
                                borderRadius: "10px",
                                paddingTop: isMobile ? "60px" : "80px",
                                paddingBottom: isMobile ? "40px" : "50px",
                                minHeight: isMobile ? "350px" : "450px", // Adjust height for mobile
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center"
                            }}
                        >
                            <Avatar
                                src="https://healthcoachsaiteja.com/wp-content/uploads/2024/11/Sandeep_US-Client-254x300.jpg"
                                size={isMobile ? 70 : 90}
                                radius="50%"
                                style={{
                                    position: "absolute",
                                    top: "7px",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    border: "4px solid white",
                                    backgroundColor: "white",
                                    objectFit: "cover",
                                }}
                            />

                            <Avatar
                                src="https://healthcoachsaiteja.com/wp-content/uploads/2022/11/girl-in-gym-HZ25B4W-150x150.jpg"
                                size={90}
                                radius="50%"
                                style={{
                                    position: "absolute",
                                    top: "7px",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    border: "4px solid white",
                                    backgroundColor: "white",
                                    objectFit: "cover",
                                }}
                            />
                            <Text fw={700} size="lg" style={{ color: "yellow", marginTop: isMobile ? 30 : 40, fontFamily: '"Poppins", Sans-serif' }}>

                                Bhavya
                            </Text>
                            <Text size="sm" mb="md" c="gray.3" style={{ fontFamily: '"Poppins", Sans-serif' }}>
                                Production Manager, Sydney
                            </Text>
                            <Text
                                mt="xl"
                                size="md"
                                fz={isMobile ? "14px" : "18px"}
                                style={{
                                    lineHeight: "1.5",
                                    maxWidth: "90%",
                                    margin: "0 auto",
                                    fontFamily: '"Roboto Condensed",Sans-serif',
                                    color: "rgba(255, 255, 255, 0.8)",
                                }}
                            >
                                In 2021, I approached Health Coach Sai Teja with unrecovered ACL injury and it’s consequential unmeasurable parameters. I had to lift my game to bounce back. Right from listening and understanding your targets to his chronological planning has been appealing. His knowledge in human anatomy and nutritional basics is a great addition for his implementation strategy with me. Starting with basic knee rehab- second level rehab- advanced rehab- overall body strengthening to x level- muscle endurance had been challenging but, Sai has made it a joyous process throughout by highlighting the importance of every workout. His teachings and training prepares an individual to sustain longer. Additionally, his soft skills are very engaging. Thank you Sai for being a great help and good friend.
                            </Text>
                            <Text
                                style={{
                                    position: "absolute",
                                    top: "5px",
                                    right: "20px",
                                    fontSize: "50px",
                                    color: "yellow",
                                }}
                            >
                                ❝
                            </Text>
                        </Card>
                    </Carousel.Slide>
                </Carousel>
            </Container>
        </BackgroundImage>
    );
};

export default TestimonialCarousel;
