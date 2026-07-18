import { createContext, useEffect, useState, type ReactNode } from "react";

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

export const AuthProvider = ({children}: ({children: ReactNode}) ) => {

    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setIsAuth(true)
        } 
        setIsLoading(false)
    }, [])

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

