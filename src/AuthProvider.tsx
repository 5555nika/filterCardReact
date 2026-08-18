import { useEffect, useState, type ReactNode } from "react"
import { AuthContext } from "./context"

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