import React from 'react'
import { Flex, Image } from '@mantine/core'
import Image1 from "../../../assets/hctlogo.jpeg"

const MantinePage = () => {
  return (
    <div style={{ justifyContent: 'center', display: 'flex', width: '100%', }}>
      <div>
        <Flex mt='1rem'>

          <Image src={"https://healthcoachsaiteja.com/wp-content/uploads/2022/11/saiteja_health_coach-1536x505.png "} height='5.6rem' width='17rem'>

          </Image>

        </Flex>
      </div>
    </div>
  )
}

export default MantinePage
