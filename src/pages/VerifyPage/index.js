import { CheckCircleFilled, CloseCircleOutlined } from '@ant-design/icons'
import { Result } from 'antd'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import verifyUser from '../../api/verifyUser'
import { AuthContext } from '../../context/AuthProvider'

const VerifyPage = () => {
  const { state } = useContext(AuthContext)
  const [searchParams] = useSearchParams()
  const [verifyCode, setVeriryCode] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const navigate = useNavigate()

  const verify = useCallback(async () => {
    const response = await verifyUser(state.accessToken, verifyCode)
    if (response === 'verify_success') {
      setIsSuccess(true)
    }
  }, [state.accessToken, verifyCode, navigate])

  useEffect(() => {
    setVeriryCode(searchParams.get('code'))
    verify()
  }, [searchParams, verify])

  return (
    <div className='forget-password-container'>
      <div className='success-container'>
        <Result
          icon={
            isSuccess ? (
              <CheckCircleFilled style={{ color: '#5bcae8' }} />
            ) : (
              <CloseCircleOutlined style={{ color: '#5bcae8' }} />
            )
          }
          status={`${isSuccess ? 'success' : 'error'} `}
          title={`${isSuccess ? 'Email sent successfully!' : 'Try again'} `}
          subTitle={
            <Link style={{ color: 'aqua' }} to='/'>
              Back to home.
            </Link>
          }
        />
      </div>
    </div>
  )
}

export default VerifyPage
