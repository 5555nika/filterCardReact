import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../context"
import classes from './Navbar.module.css'

export const Navbar = () => {

    const { setIsAuth, isAuth } = useContext(AuthContext)

    const handleClick = () => {
        localStorage.removeItem('auth')
        setIsAuth(false)
    }

    return (
        <nav className={classes.navbar}>
            <div className={classes.links}>
                <NavLink to={'/'} 
                    className={({isActive}) => isActive ? `${classes.link} ${classes.active}` : classes.link}
                >About</NavLink>

                <NavLink to={'/posts'} 
                    className={({isActive}) => isActive ? `${classes.link} ${classes.active}` : classes.link}
                >Posts</NavLink>
            </div>
            
            {isAuth && (
                <button className={classes.logoutBtn} onClick={handleClick}>
                    Выйти
                </button>
            )}
        </nav>
    )
}