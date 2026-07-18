import type { AxiosResponse } from "axios"
import type { IPost } from "../models/IPost"
import axios from "axios"

export interface IComments {
    id: number
    email: string
    name: string
    body: string
}
export class PostService {
    static async   getPost(limit: number = 10, page: number = 1): Promise<AxiosResponse<IPost[]>>  {
        const response = await axios.get<IPost[]>('https://jsonplaceholder.typicode.com/posts', {
            params: {
                _limit: limit,
                _page: page
            }
        }) 
        return response

    }
    static async   getPostId(id: number): Promise<AxiosResponse<IPost>>  {
        const response = await axios.get<IPost>('https://jsonplaceholder.typicode.com/posts/' + id) 
        return response

    }
    static async   getPostComments(id: number): Promise<AxiosResponse<IComments[]>>  {
        const response = await axios.get<IComments[]>('https://jsonplaceholder.typicode.com/posts/' + id + '/comments') 
        return response

    }
}