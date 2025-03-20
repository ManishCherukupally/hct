import React from 'react'
import Tracker from './Tracker'
import { useMediaQuery } from '@mantine/hooks';
import { AppShell, Header } from '@mantine/core';
import HeadHCT from '../HCT head/HeadHCT';

const TrackerComp = () => {
    const mediumScreen = useMediaQuery("(min-width: 1200px)");
    const largeScreen = useMediaQuery("(min-width: 1440px)");
    const extraLargeScreen = useMediaQuery("(min-width: 1770px)");
    return (
        <div>
            {
                mediumScreen ? (
                    <AppShell header={
                        <Header><HeadHCT /></Header>
                    }><Tracker /></AppShell>
                ) : (
                    <>
                        <Tracker />
                        {/* <MobileHead /> */}
                    </>
                )
            }
        </div>
    )
}

export default TrackerComp
