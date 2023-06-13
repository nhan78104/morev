/* eslint-disable no-template-curly-in-string */
import { Avatar, Button, Form, Input, InputNumber } from 'antd'
import React, { useContext, useState } from 'react'

import updateUser from '../../api/updateUser'
import { Loading } from '../../components'
import { AuthContext } from '../../context/AuthProvider'
import './style.css'

const UserPage = () => {
  const { state, dispatch } = useContext(AuthContext)
  const [form] = Form.useForm()
  const [isEdit, setIsEdit] = useState(false)
  const [userData, setUserData] = useState(state.user)
  const [loadingUserInfo, setLoadingUserInfo] = useState(false)

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 20 },
    style: { width: '80%', marginTop: '2rem', marginRight: '4rem', textAlign: 'left' },
  }

  const validateMessages = {
    required: '${label} không được để trống.',
    types: {
      email: 'Định dạng không đúng!',
      number: '${label} không hợp lệ!',
    },
    number: {
      range: '${label} phải từ ${min} đến ${max}',
    },
  }

  const handleInput = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    })
  }

  const handleInputNumber = (e) => {
    setUserData({
      ...userData,
      age: e,
    })
  }

  const handleChangeUserInfo = async () => {
    // cập nhật thay đổi dữ liệu của user
    try {
      setLoadingUserInfo(true)
      await updateUser(state.accessToken, userData)
      dispatch({ type: 'SET_USER', data: userData })
      setLoadingUserInfo(false)
      setIsEdit(false)
    } catch (error) {
      console.log(error)
      setLoadingUserInfo(false)
      setIsEdit(false)
    }
  }

  return (
    <div className='user-page'>
      {loadingUserInfo && <Loading />}
      <div className='user-container'>
        <div className='avatar-container'>
          <Avatar
            src={
              userData != null && userData.avatarUrl != null
                ? userData.avatarUrl
                : 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
            }
            size={150}
            style={{ marginTop: '2rem', backgroundColor: '#fde3cf', color: '#f56a00', fontSize: 50 }}
          />

          {isEdit ? (
            <Input name='displayName' onChange={handleInput} />
          ) : (
            <div className='username'>{userData?.displayName}</div>
          )}
        </div>
        <div className='infomation-container'>
          {isEdit ? (
            <Form form={form} {...layout} validateMessages={validateMessages} size='large'>
              <Form.Item
                name='fullName'
                label='Full mame'
                rules={[{ required: true }]}
                initialValue={userData?.fullName}
              >
                <Input name='fullName' onChange={handleInput} />
              </Form.Item>
              <Form.Item
                name='age'
                label='Age'
                rules={[{ type: 'number', min: 6, max: 200 }]}
                initialValue={userData?.age}
              >
                <InputNumber min='6' max='200' name='age' onChange={handleInputNumber} />
              </Form.Item>
              <Form.Item name='email' label='Email' rules={[{ type: 'email' }]} initialValue={userData?.email}>
                <Input name='email' onChange={handleInput} />
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                <Button type='primary' size='medium' onClick={handleChangeUserInfo}>
                  Hoàn thành
                </Button>
              </Form.Item>
            </Form>
          ) : (
            <Form {...layout} validateMessages={validateMessages}>
              <Form.Item label='Full name'>{userData?.fullName}</Form.Item>
              <Form.Item label='Age'>{userData?.age}</Form.Item>
              <Form.Item label='Email'>{userData?.email}</Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                <Button
                  size='middle'
                  type='primary'
                  onClick={() => {
                    setIsEdit(true)
                  }}
                >
                  Chỉnh sửa
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserPage
