import { useState, type ReactNode } from "react"
import { AuthContext } from "./context"

export const AuthProvider = ({children}: ({children: ReactNode}) ) => {

    const [isAuth, setIsAuth] = useState(() => {
        return Boolean(localStorage.getItem('auth'))
    })

    const isLoading = false 

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}