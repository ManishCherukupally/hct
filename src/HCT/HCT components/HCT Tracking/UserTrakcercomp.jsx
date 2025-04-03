import React from 'react'
import Tracker from './Tracker'
import { useMediaQuery } from '@mantine/hooks';
import { AppShell, Header } from '@mantine/core';
import HeadHCT from '../HCT head/HeadHCT';
import UserTracker from './UserTracker';
import MobileHead from '../HCT head/MobileHead';

const UserTrakcercomp = () => {
    const mediumScreen = useMediaQuery("(min-width: 1200px)");
    const largeScreen = useMediaQuery("(min-width: 1440px)");
    const extraLargeScreen = useMediaQuery("(min-width: 1770px)");
    return (
        <div>
            {
                mediumScreen ? (
                    <AppShell header={
                        <Header><HeadHCT /></Header>
                    }><UserTracker /></AppShell>
                ) : (
                    <>
                        <UserTracker />
                        <MobileHead />
                    </>
                )
            }
        </div>
    )
}

export default UserTrakcercomp
