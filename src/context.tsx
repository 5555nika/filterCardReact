import { createContext, useContext } from "react";

export interface IContext {
    isAuth: boolean,
    setIsAuth: (isAuth: boolean) => void,
    isLoading: boolean
}

export const AuthContext = createContext<IContext>({
    isAuth: false,
    setIsAuth: () => {},
    isLoading: true
})


export const useAuth = () => {
    return useContext(AuthContext)
}
