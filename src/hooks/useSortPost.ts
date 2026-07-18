import { useMemo } from "react"
import type { IPost } from "../models/IPost"

export interface IuseSortedPost {
    posts: IPost[]
    sort: string
}
export const useSortedPost = ({ posts, sort }: IuseSortedPost) => {

    const sortedPost = useMemo(() => {
 //1. Если поле сортировки (sort) не выбрано, возвращаем копию оригинального массива
        if (!sort) return [...posts]
 // 2. Если поле выбрано, сортируем
        if (sort) {
            return [...posts].sort((a, b) => {
                const A = a[sort as keyof IPost]
                const B =b[sort as keyof IPost]
                if (typeof A === 'string' && typeof B === 'string' ) {
                    return A.localeCompare(B)
                }
                if (A < B) return -1 
                if (A > B) return 1 
                return 0
            })
        }
        return posts
        
    }, [posts, sort]) // Хук перезапустится, только если изменятся posts или sort
    return sortedPost
}
export interface IuseSortPost extends IuseSortedPost {
    query: string
}
export const useSortPost = ({ posts, sort, query }: IuseSortPost) => {

    const sortedPost = useSortedPost({ posts, sort })

    const searchedAndSorted = useMemo(() => {
        
        return sortedPost?.filter(post => 
//к ниж. регистру (.toLowerCase()) метод .includes() всё равно найдет совпадение.
// Приводим и заголовок поста, и поиск. запрос к ниж. регистру для регистронезавис. поиска
            post.title.toUpperCase().includes(query.toUpperCase() ) )
    
        }, [sortedPost, query])  // Пересчит., только если измен. отсортиров. масс. или поиск. запрос    
    return searchedAndSorted
}