import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import verifyUser from '../../api/verifyUser'
import { AuthContext } from '../../context/AuthProvider'

const VerifyPage = () => {
  const { state } = useContext(AuthContext)
  const [searchParams] = useSearchParams()
  const [veriryCode, setVeriryCode] = useState('')
  const navigate = useNavigate()

  const verify = useCallback(async () => {
    const response = await verifyUser(state.accessToken, veriryCode)
    if (response === 'verify_success') {
      navigate('/')
    }
  }, [state.accessToken, veriryCode, navigate])

  useEffect(() => {
    setVeriryCode(searchParams.get('code'))
    verify()
  }, [searchParams, verify])

  return <div>VerifyPage</div>
}

export default VerifyPage
