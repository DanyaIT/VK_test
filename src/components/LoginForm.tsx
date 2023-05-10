import { Button, Form, Input } from 'antd'
import React, { FC, useState } from 'react'
import { rules } from './utils/rules'
import { useDispatch } from 'react-redux'
import { AuthActionCreators } from '../store/reducers/auth/actionCreators'
import { useSelector } from 'react-redux'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useActions } from '../hooks/useActions'

const LoginForm: FC = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useActions()

    const submit = () => {
       login(username, password)
    }

    const { error, isLoading } = useTypedSelector(state => state.auth)

    return (
        <Form onFinish={submit}>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <Form.Item
                label="Имя пользователя"
                name="username"
                rules={[rules.required('Пожалуйста укажите имя пользователя!')]}
            >
                <Input  value={username} onChange = {e=>setUserName(e.target.value)}/>
            </Form.Item>

            <Form.Item
                label="Пароль"
                name="password"
                rules={[rules.required('Пожалуйста укажите пароль!')]}
            >
                <Input.Password value={password} onChange={e=>setPassword(e.target.value)}/>
            </Form.Item>
            <Form.Item >
                <Button type="primary" htmlType="submit" loading={isLoading} >
                    Войти
                </Button>
            </Form.Item>
        </Form>
    )
}

export default LoginForm