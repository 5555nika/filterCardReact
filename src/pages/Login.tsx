import {  useContext, useState, type FormEvent, type ChangeEvent } from "react"
import { AuthContext } from "../context"
import { MyLoader } from "../components/UI/loader/MyLoader"
import { MyInput } from "../components/UI/input/MyInput"
import { MyButton } from "../components/UI/button/MyButton"

interface IForm {
    username: string
    password: string
}

export const Login = () => {

    const { setIsAuth, isLoading } = useContext(AuthContext)
    const [form, setForm] = useState<IForm>({username: '', password: ''})
    const [error, setError] = useState({username: '', password: ''})
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
        // Clear error message when user starts typing
        setError(prev => ({ ...prev, [name]: '' }))
    }

    const validate = () => {
        const newErrors = { username: '', password: '' }

        if (!form.username.trim()) {
            newErrors.username = 'Username is required' 
        }

        if (!form.password) {
            newErrors.password = 'Password is required' 
        } else if (form.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters' 
        }

        setError(newErrors)

        return !newErrors.username && !newErrors.password
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (validate()) {
            localStorage.setItem('auth', 'true')
            setIsAuth(true)
            setForm({username: '', password: ''})
            alert('Success')
        }
    }

    if (isLoading) {
        return <MyLoader />
    }

    return (
        <form onSubmit={handleSubmit}  className="post-form" >
            <MyInput 
                type="text"
                name="username"
                value={form.username} 
                onChange={handleChange}
                placeholder="username..."
            />
            {error.username && <div style={{color: 'red', fontSize: '14px', marginTop: '4px'}}>{error.username}</div>}

            <MyInput 
                type="password"
                name="password"
                value={form.password} 
                onChange={handleChange}
                placeholder="password..."
            />
            {error.password && <div style={{color: 'red', fontSize: '14px', marginTop: '4px'}}>{error.password}</div>}

            <MyButton type="submit">Log In</MyButton>
        </form>
    )

}