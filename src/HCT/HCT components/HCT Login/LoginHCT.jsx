
// @ts-nocheck
import React, { useEffect, useState } from 'react'
import {
    Card, Flex, Image, Text, Space, TextInput, PasswordInput, Checkbox, Button, Center, Stack
    , BackgroundImage,
    Box,
    Anchor,
    Group
} from '@mantine/core';
import { Link, Navigate, useNavigate } from 'react-router-dom';
// import '../../../components/Components.css'
import "../../../Components.css"
// import axios from 'axios'
import client from '../../../API/api';
import { Cookies, useCookies } from 'react-cookie'
import { isEmail, useForm } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import axios from 'axios';
// axios.defaults.withCredentials = true;
// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = 'x-csrftoken'

const LoginHCT = (props) => {

    const form = useForm({
        initialValues: {
            username: '',
            password: ''
        },

        // functions will be used to validate values at corresponding key
        validate: {
            // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'The email address you entered is invalid'),
            // email: isEmail('The email address you entered is invalid'),
            username: (value) => (value === "" ? "The email address you entered is invalid" : null),
            password: (value) => (value < 6 ? 'The password you entered is incorrect' : null),
        },
    })
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    const [errorStatus, setErrorStatus] = useState(false)
    // const [email, setEmail] = useState("")
    // const [emailError, setEmailError] = useState("")
    // const [password, setPassword] = useState("")
    // const [passworderror, setPasswordError] = useState('')
    // const [auth, setAuth] = useState(false);

    // useEffect(() => {
    //     window.localStorage.sessionid === null ? navigate("/") : navigate("/home")
    // }, [navigate])


    // const [cookies, setCookies] = useCookies();

    const handleLogin = async (values) => {
        setLoader(true);

        try {
            await axios.post('http://13.235.2.182:8000/api/token/', {
                username: values.username,
                password: values.password
            }).then((response) => {
                if (response.data.access) {
                    // Save the tokens to localStorage
                    window.localStorage.setItem("access", response.data.access);
                    window.localStorage.setItem("refresh", response.data.refresh);

                    // Redirect to dashboard
                    navigate("/dashboard");
                }
            }).catch((error) => {
                // Check if it's a 401 error (unauthorized)
                if (error.response && error.response.status === 401) {
                    setLoader(false);

                    // Set specific error messages for the form fields
                    form.setErrors({
                        username: "Invalid username. Please check and try again.",
                        password: "Invalid password. Please check and try again.",
                    });
                } else {
                    // Handle other potential errors (e.g., network errors)
                    setLoader(false);
                    console.error('Error:', error);
                }
            });
        } catch (error) {
            // Handle other unexpected errors
            setLoader(false);
            console.error('Error:', error);
        }
    };


    return (
        <div>
            <Card style={props.style} radius={"xl"}>

                <Center>
                    <Image
                        maw={150}
                        src={"https://lh3.googleusercontent.com/proxy/-ptEoCXQaGeaX0l_w5gA1iSfkLmjCIt9tMW9UtQE6OiQh2taj9X1HNgEQfh6r9d5hshNtcVK5o9wdgxMUbHWsUiibVkJ73TMy90VAJ-pt2QpPlAYk2OH-NsTfjue0JcSnhBRQd3iLuSVFrjmLw"} />
                </Center>
                <Space h={15} />
                <form onSubmit={form.onSubmit(handleLogin)}>
                    <Stack>

                        <Text fz={18} fw={700}>Log In</Text>
                        <div>
                            <TextInput className='email'
                                withAsterisk
                                label="Email ID"
                                placeholder="your@email.com"
                                {...form.getInputProps('username')}
                            />
                            {/* {
                emailError && <Text fz={12} c={"red"}>{emailError}</Text>
            } */}
                            {/* {errorStatus && <Text fz={12} color="red" className="error-message">
                {form.errors.email}
            </Text>} */}
                        </div>
                        <Flex direction={"column"}>
                            <div>
                                <PasswordInput
                                    className='password'
                                    withAsterisk
                                    label='Password'
                                    placeholder="Enter your Password"

                                    {...form.getInputProps('password')}
                                />
                                {/* {
                    passworderror && <Text fz={12} c={"red"}>{passworderror}</Text>
                } */}
                                {/* {errorStatus && <Text fz={12} color="red" className="error-message">
                    {form.errors.password}
                </Text>} */}
                            </div>

                            <Link to="/forgot-password"
                                className="forgot-password-link" >

                                Forgot your password?
                            </Link>
                        </Flex>


                        <Button fullWidth style={{ backgroundColor: "#233c79" }} type='submit' radius={"md"}
                            loading={loader}>Login</Button>



                    </Stack>
                </form>
            </Card>
        </div>
    )
}

export default LoginHCT
