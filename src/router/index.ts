import Event from "../pages/Event";
import Login from "../pages/Login";



export interface IRoute
{
    path: string,
    component: React.ComponentType,
}

export enum RouteName {
    LOGIN = '/login',
    EVENT = '/',
    ALL = '*'
}

export const publicRoutes:IRoute [] = [
    {path: RouteName.LOGIN, component: Login},
    {path: RouteName.ALL, component: Login }
]

export const privateRoute: IRoute [] = [
    {path: RouteName.LOGIN, component: Event},
    {path: RouteName.ALL, component: Event}
]