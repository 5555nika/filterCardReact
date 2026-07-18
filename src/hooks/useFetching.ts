import { useState } from "react"


export const useFetching = <T extends unknown[]> (callback: (...args: T) => Promise<void> )
                        : [ (...args: T) => Promise<void>, boolean, string]  => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const fetching = async (...args: T) => {
        try {
            setError('')
            setIsLoading(true)
            await callback(...args)
        } catch (e) {
            setError(e instanceof Error ? e.message : 'error')
        } finally {
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, error] 

}