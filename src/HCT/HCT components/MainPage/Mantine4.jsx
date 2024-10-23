import { AspectRatio, Badge, Button, CardSection, Group, BackgroundImage, Modal, Box, TextInput, NumberInput, Radio } from '@mantine/core';
import { Card, Grid, Footer, Container, Anchor, SimpleGrid, Image, Text, List } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useMediaQuery } from '@mantine/hooks';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import facebookImage from '../../../assets/facebook-logo-facebook-icon-transparent-free-png.png';
import facebookImage1 from '../../../assets/colored-instagram-logo-new.png';
import './response.css';

const Mantine4 = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [submitted, setSubmitted] = useState(false);  // State for animation
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

  const handleSubmit = (values) => {
    console.log(values);
    setSubmitted(true); // Set submitted to true on form submission
    setTimeout(() => setSubmitted(false), 3000); // Reset after 3 seconds
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Registration" centered>
        <form onSubmit={form.onSubmit(handleSubmit)}>
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
            label="Phone number"
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
        {submitted && (
          <div className="success-message">Form Submitted Successfully!</div> // Success message
        )}
      </Modal>

      <BackgroundImage src="https://wallpapercave.com/wp/wp8298483.jpg" style={{ height: isMobile ? '177vh' : '95vh' }}>
        {/* Rest of your code */}
      </BackgroundImage>
    </>
  );
};

export default Mantine4;
