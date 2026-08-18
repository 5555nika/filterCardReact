import { createContext, useContext } from "react";
import type { IContext } from "./models/IContext";



export const AuthContext = createContext<IContext>({
    isAuth: false,
    setIsAuth: () => {},
    isLoading: true
})


export const useAuth = () => {
    return useContext(AuthContext)
}
