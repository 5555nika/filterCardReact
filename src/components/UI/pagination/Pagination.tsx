import { usePagination } from '../../../hooks/usePagination'
import cl from './Pagination.module.css'

export interface IPagination {
    page: number   // Текущая активная страница (например, 1)
    setPage : (page: number) => void  //Функция для изменения страницы в родительском компоненте
    totalPages: number // Общее количество страниц
}
export const Pagination = ({ page, setPage, totalPages }: IPagination) => {
// 1. Получаем массив страниц (например, [1, 2, 3, 4, 5]) через наш хук
    const arrayPage = usePagination(totalPages)

    return (
        <div className={cl.wrapper}>
            {arrayPage.map(p => 
                <span key={p}
                className={page === p ? `${cl.page} ${cl.active}` : cl.page}
                onClick={() => setPage(p)}
                >{p}</span>
                
            )}

        </div> 
    )
}