import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import React from 'react'

import './style.css'

const Loading = () => {
  return (
    <div className='background-blur'>
      <Spin indicator={<LoadingOutlined />} className='loading' tip='Loading...' size='large' />
    </div>
  )
}

export default Loading
