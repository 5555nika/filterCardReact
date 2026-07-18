import { useState, type ChangeEvent, type FormEvent } from "react"
import type { IPost } from "../models/IPost"
import { MyInput } from "./UI/input/MyInput"
import { MyButton } from "./UI/button/MyButton"

export interface IPostForm {
    onAdd: (newPost: Omit<IPost, 'id'>) => void
}
export const PostForm = ({  onAdd }: IPostForm) => {

    const [formDate, setFormDate] = useState({ title: '', body: ''})
    const isInValid = !formDate.title.trim() && !formDate.body.trim()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            if (isInValid) return
            onAdd(formDate) // Передаем данные нового поста наверх (родителю)
            setFormDate({ title: '', body: ''})   
        }
// Универсальный обработчик изменения инпутов
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setFormDate(prev =>  ({...prev, [name]: value}))
        }

    return (
        <form onSubmit={handleSubmit} className="post-form">
            <MyInput type="text" 
            placeholder="enter title"
            name='title'
            value={formDate.title}
            onChange={handleChange}/>

            <MyInput type="text" 
            placeholder="enter description"
            name='body'
            value={formDate.body}
            onChange={handleChange}/>

            <MyButton type="submit" disabled={isInValid} 
            style={{ 
                cursor: isInValid ? 'not allowed' : ' pointer',
                background: isInValid ? '#777' : 'dodgerblue'
            }}>Send</MyButton>
        </form>
    )
}