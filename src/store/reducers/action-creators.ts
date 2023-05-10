import { AuthActionCreators } from './auth/actionCreators';
import { EventActionCreators } from './event/eventCreators';


export const allActionCreators = {
    ...AuthActionCreators,
    ...EventActionCreators
}