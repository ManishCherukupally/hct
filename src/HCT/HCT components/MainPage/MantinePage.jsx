import React from 'react'
import { Flex, Image } from '@mantine/core'
import Image1 from "../../../assets/hctlogo.jpeg"

const MantinePage = () => {
  return (
    <div style={{ justifyContent: 'center', display: 'flex', width: '100%', }}>
      <div>
        <Flex mt='1rem'>

          <Image src={Image1} height='5.6rem' width='17rem'>

          </Image>

        </Flex>
      </div>
    </div>
  )
}

export default MantinePage
