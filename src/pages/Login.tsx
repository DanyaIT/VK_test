import { Card, Row } from 'antd'

import Layout from 'antd/es/layout/layout'
import React, { FC } from 'react'
import LoginForm from '../components/LoginForm'

const Login: FC = () => {
  return (
    <Layout>
      <Row align ='middle' justify='center'  className='login' >
        <Card>
          <LoginForm/>
        </Card>
      </Row>
    </Layout>
  )
}

export default Login