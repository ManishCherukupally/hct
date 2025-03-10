import React, { useState } from 'react'
import Mantine1 from './Mantine1'
import Mantine2 from './Mantine2'
import Mantine3 from './Mantine3'
import MantinePage from './MantinePage'
import Mantine4 from './Mantine4'
import { toast, ToastContainer } from 'react-toastify'
import '../../../../node_modules/react-toastify/dist/ReactToastify.css'
import './page.css'
import { ActionIcon, Overlay } from '@mantine/core'
import Party from "../../../assets/Party.mp4"

import { FaThumbsUp } from "react-icons/fa6";
import Mantine5 from './Mantine5'
import TestimonialCarousel from './TestimonialCarousel'
import Mantine6 from './Mantine6'

const LandingPage = () => {

    return (
        <div>

            <MantinePage />
            <Mantine1 />
            <Mantine2 />
            <Mantine3 />
            <Mantine6 />
            <TestimonialCarousel />
            <Mantine5 />
            <Mantine4 />
        </div>
    )
}

export default LandingPage
