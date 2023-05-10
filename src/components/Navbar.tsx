import { Layout, Row, Menu } from 'antd'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { RouteName } from '../router';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { AuthActionCreators } from '../store/reducers/auth/actionCreators';
import { useDispatch } from 'react-redux';
import { useActions } from '../hooks/useActions';

const Navbar: FC = () => {
    const {logout} = useActions();
    const navigate = useNavigate();
    const { isAuth, user } = useTypedSelector(state => state.auth)
    return (
        <Layout.Header>
            <Row style={{height:'100%'}} align={'middle'} justify={'end'}>
                {isAuth ?
                        <Menu theme='dark' mode='horizontal' selectable={false}>
                            <div>{user.username}</div>
                            <Menu.Item onClick={logout} key={1}>Выйти</Menu.Item>
                        </Menu>
                    :
                          <Menu theme='dark' selectable={false}>
                        <Menu.Item onClick={() => navigate(RouteName.LOGIN)} key={2}>Логин</Menu.Item>
                    </Menu>
                }
            </Row>
        </Layout.Header>
    )
}

export default Navbar