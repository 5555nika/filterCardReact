import { useEffect, useState } from "react"
import { PostService, type IComments } from "../API/PostService"
import { useParams } from "react-router-dom"
import { useFetching } from "../hooks/useFetching"
import type { IPost } from "../models/IPost"
import { MyLoader } from "../components/UI/loader/MyLoader"


export const PostIdPage = () => {

    const params = useParams<{id: string}>()
    const [ post, setPost] = useState<IPost | null>(null)
    const [ comments, setComments] = useState<IComments[]>([])

    const [fetching, isLoading, error] = useFetching(async () => {
            if (!params.id) return;
            const response = await PostService.getPostId(Number(params.id))
            setPost(response.data)

        })

    const [fetchingComm, isLoadingComm, errorComm] = useFetching(async () => {
            if (!params.id) return;
            const response = await PostService.getPostComments(Number(params.id))
            setComments(response.data)

        })
        
        
        useEffect(() => {
            fetching()
            fetchingComm()
        }, [params.id])

    return(
        <div style={{marginTop: 20, padding: 20}}>
            <h1>Страница поста {params.id}</h1>
            
            {error && <div style={{color: 'red'}}>{error}</div>}
            {isLoading 
                ? <MyLoader />
                : <div>{post?.title}</div>
            }

            <h2 style={{marginTop: 20}}>Комментарии:</h2>
            {errorComm && <div style={{color: 'red'}}>{errorComm}</div>}
            {isLoadingComm 
                ? <MyLoader />
                : <div>
                    {comments.map(comm => (
                        <div key={comm.id} style={{marginTop: 15}}>
                            <h5>{comm.email}</h5>
                            <div>{comm.body}</div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )

}