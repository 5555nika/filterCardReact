import type { IPost } from "../models/IPost"
import { PostItem } from "./PostItem"

export interface IPostList {
    posts: IPost[]
    onDelete?: (id: number) => void
    page: number
    limit: number
}
export const PostList = ({ posts, onDelete, limit, page }: IPostList) => {

    return (
        <div className="card-list">
            {posts.length === 0 && <div style={{textAlign: 'center'} } className="card">No Posts</div>}

            {posts.map((post, index)  => 
                <PostItem 
                number={ (page - 1) * limit + index + 1}
                key={post.id} post={post} onDelete={onDelete} 
                />
            )}
        </div>
    )
}