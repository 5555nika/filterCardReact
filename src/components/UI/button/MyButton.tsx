import type { ButtonHTMLAttributes, ReactNode } from 'react'
import cl from './MyButton.module.css'

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
}

export const MyButton = ({ children, className, ...props}: MyButtonProps) => {

    return (
        <button {...props} className={[cl.myBtn, className].filter(Boolean).join(' ')}>
            {children}
        </button>
    )
}