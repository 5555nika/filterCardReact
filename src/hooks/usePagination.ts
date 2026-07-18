import { useMemo } from "react"
import { getPageArray } from "../utils/pages"

// Создает массив номеров страниц  это операция, которая нагружает память.
export const usePagination = ( totalPages: number) => {

    return useMemo(() => {
        return getPageArray(totalPages)

    }, [totalPages])
}

/*
Хук говорит React: «Пересозд. массив стр. только тогда, когда измен. общее кол. стр. (totalPage)». В остальных случаях возвращай старый массив из кэша.

*/