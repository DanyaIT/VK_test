import { IUser } from "../../../models/IUser";
import { AuthActionEnum, AuthState, AuthAction } from "./types";

const initialState: AuthState = {
  isAuth: false,
  error: "",
  isLoading: false,
  user: {} as IUser,
};

export default function AuthReducer(state = initialState,action: AuthAction): AuthState {
  switch (action.type) {
    case AuthActionEnum.SET_AUTH:
      return { ...state, isAuth: action.payload, isLoading:false}
    case AuthActionEnum.SET_IS_LOADING:
      return {...state, isLoading: action.payload}
    case AuthActionEnum.SET_ERROR:
      return {...state, error: action.payload, isLoading: true,}
    case AuthActionEnum.SET_USER:
      return {...state, user: action.payload, isLoading: false}
    default:
      return state;
  }
}
