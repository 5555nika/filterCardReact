import { Routes, Route, Navigate } from "react-router-dom"
import { privateRouter, publicRouter } from "../routes"
import { useContext } from "react"
import { AuthContext } from "../context"

export const AppRouter = () => {

    const { isAuth } = useContext(AuthContext)

    return (
        <Routes>
            {isAuth 
            ? privateRouter.map(route => 
                <Route key={route.path} path={route.path} element={route.element} /> )

            : publicRouter.map(route => 
                <Route key={route.path} path={route.path} element={route.element} /> )
            }

            <Route path="*" element={ <Navigate to={isAuth ? '/posts' : '/login' } replace /> }  />

        </Routes>
    )
}