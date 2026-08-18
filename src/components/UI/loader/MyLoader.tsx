import cl from './MyLoader.module.css'
import {type  HTMLAttributes } from 'react'

export type ILoader = HTMLAttributes<HTMLDivElement> 


export const MyLoader = ({ className,  ...props}: ILoader) => {
    return (
        <div className={cl['loading-container']}>
            <div className={[cl.loading, className].filter(Boolean).join(' ')} {...props}></div>
        </div>
    )
}