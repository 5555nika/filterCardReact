import type { ReactNode } from "react";
import { About } from "./pages/About";
import { Posts } from "./pages/Posts";
import { Login } from "./pages/Login";
import { PostIdPage } from "./pages/PostIdPage";

export interface IRoute {
    path: string,
    element: ReactNode
}

export const privateRouter: IRoute[] = [
    {path: '/' , element: <About />},
    {path: '/posts' , element: <Posts />},
    {path: '/posts/:id' , element: <PostIdPage />},
]

export const publicRouter: IRoute[] = [
    {path: '/login' , element: <Login />}
]