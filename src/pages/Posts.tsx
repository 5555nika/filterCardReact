import { useEffect, useState } from "react"
import type { IPost } from "../models/IPost"
import { PostList } from "../components/PostList"
import { PostForm } from "../components/PostForm"
import { PostFilter } from "../components/PostFilter"
import { useSortPost } from "../hooks/useSortPost"
import { useFetching } from "../hooks/useFetching"
import { PostService } from "../API/PostService"
import { calcTotalPages } from "../utils/pages"
import { Pagination } from "../components/UI/pagination/Pagination"
import { MyLoader } from "../components/UI/loader/MyLoader"
import { MyButton } from "../components/UI/button/MyButton"
import { MyModal } from "../components/UI/modal/MyModal"

export const Posts = () => {

    const [posts, setPosts] = useState<IPost[]>([
        /* {id: 1, title: 'Java', body: 'Text'},
        {id: 2, title: 'Vue', body: 'Desc'},
        {id: 2, title: 'Python', body: 'Hello'}*/

    ])
    const [modal, setModal] = useState(false)
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(1)
    const [limit] = useState(10)

    const searchedAndSorted = useSortPost({ posts, sort: filter.sort, query: filter.query})
    const [fetching, isLoading, error] = useFetching(async () => {
        const response = await PostService.getPost(limit, page)
        setPosts(response.data)

        const heads = response.headers['x-total-count']
        console.log(response.headers);
        setTotalPages(calcTotalPages(heads, limit))
    })
    
    const add = (newPost: Omit<IPost, 'id'>) => {
        const id = posts.length > 0 ? posts[posts.length - 1].id + 1 : 1
        setPosts(prev => [...prev, { id, title: newPost.title, body: newPost.body }])
        setModal(false)
    }
    const del = (id: number ) => {
        setPosts(prev => prev.filter(p => p.id !== id))
    }
    useEffect(() => {
        fetching()
    }, [page])

    return (
        <div className="post">

            <MyButton onClick={() => setModal(true)}>Создать пост</MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm onAdd={add} />
            </MyModal>
            <PostFilter filter={filter} setFilter={setFilter} />
            <PostList posts={searchedAndSorted} onDelete={del} limit={limit} page={page} />

            {error && <div>{error}</div>}
            {isLoading && <MyLoader />}

            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
    )


}