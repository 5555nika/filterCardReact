import type { SelectHTMLAttributes } from 'react'
import cl from './MySelect.module.css'


export interface IOption {
    name: string
    value: string
}
export interface ISelect  extends SelectHTMLAttributes<HTMLSelectElement> {
    value: string 
    onChangeValue: (value: string) => void
    defaultValue: string
    options: IOption[],
    className?: string
}
export const MySelect = ({ value, onChangeValue, defaultValue, options, className, ...props}: ISelect) => {
    
    return (
        <select 
        {...props}
        className={[cl.mySel, className].filter(Boolean).join(' ')}
        value={value} 
        onChange={(e)=> 
        onChangeValue(e.target.value)} >

            <option disabled value=''>{defaultValue}</option>
            {options.map(option => 
                <option key={option.value} value={option.value}>{option.name}</option>

            )}

        </select>
        
    )

}