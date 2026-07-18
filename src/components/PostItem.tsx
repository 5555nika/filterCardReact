import { IoPencil, IoTrash } from "react-icons/io5"
import type { IPost } from "../models/IPost"
import { useNavigate } from "react-router-dom"

export interface IPostItem {
    post: IPost
    onDelete?: (id: number) => void
    number: number
}
export const PostItem = ({ post, onDelete, number }: IPostItem) => {

    const navigate = useNavigate()

    return (
        <div className="card">
            <h2>{number}. {post.title}</h2>
            <p>{post.body}</p>
            <div className="active">
                <IoPencil className="icon-pencil" onClick={()=>navigate(`/posts/${post.id}`)} />
                <IoTrash className="icon-delete" onClick={() => onDelete?.(post.id)} />
            </div>
        </div>
    )
}