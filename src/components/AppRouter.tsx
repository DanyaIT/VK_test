import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { privateRoute, publicRoutes } from '../router/index'
import { useTypedSelector } from '../hooks/useTypedSelector'

const AppRouter = () => {

    const {isAuth} = useTypedSelector(state => state.auth)
    return (
        isAuth ?
            <Routes>
                {privateRoute.map(route =>
                    <Route path={route.path}
                        Component={route.component}
                        key={route.path}
                    />
                )}
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route => 
                    <Route
                        key={route.path}
                        path= {route.path}
                        Component={route.component}
                    />
                    )}
            </Routes> 
  )
}

export default AppRouter