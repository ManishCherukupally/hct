import React from 'react'
import { Flex, Image } from '@mantine/core'
import Image1 from "../../../assets/hctlogo.jpeg"

const MantinePage = () => {
  return (
    <div style={{ justifyContent: 'center', display: 'flex', width: '100%', }}>
      <div>
        <Flex mt='1rem'>

          <Image src={"https://lh3.googleusercontent.com/proxy/-ptEoCXQaGeaX0l_w5gA1iSfkLmjCIt9tMW9UtQE6OiQh2taj9X1HNgEQfh6r9d5hshNtcVK5o9wdgxMUbHWsUiibVkJ73TMy90VAJ-pt2QpPlAYk2OH-NsTfjue0JcSnhBRQd3iLuSVFrjmLw "} height='5.6rem' width='17rem'>

          </Image>

        </Flex>
      </div>
    </div>
  )
}

export default MantinePage
