import {  useContext, type FormEvent } from "react"
import { AuthContext } from "../context"
import { MyLoader } from "../components/UI/loader/MyLoader"
import { MyInput } from "../components/UI/input/MyInput"
import { MyButton } from "../components/UI/button/MyButton"

export const Login = () => {

    const { setIsAuth, isLoading } = useContext(AuthContext)
    
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        localStorage.setItem('auth', 'true')
        setIsAuth(true)
    }
    if (isLoading) {
        return <MyLoader />
    }

    return (
        <form onSubmit={handleSubmit}  className="post-form" >
            <MyInput type="text" 
            placeholder="username..."/>
            <MyInput type="password" 
            placeholder="password..."/>
            <MyButton type="submit">Out</MyButton>
        </form>
    )

}