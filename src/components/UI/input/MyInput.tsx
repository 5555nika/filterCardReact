import type { InputHTMLAttributes} from 'react'
import cl from './MyInput.module.css'


export type MyInputProps = InputHTMLAttributes<HTMLInputElement> 

export const MyInput = ({ className, ...props}: MyInputProps) => {

    return (
        <input {...props} className={[cl.myInp, className].filter(Boolean).join('  ')} />
        
    )
}