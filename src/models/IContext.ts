export interface IContext {
    isAuth: boolean,
    setIsAuth: (isAuth: boolean) => void,
    isLoading: boolean
}