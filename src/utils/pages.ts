// Вычисляет общее количество страниц
export const calcTotalPages = (heads: number, limit: number) => {
    return Math.ceil(heads / limit)

}

// создает массив нужной длины и заполняет его числами от 1 до totalPages
export const getPageArray = (totalPages: number): number[] => {
    const result: number[] = []
    for (let i = 0; i < totalPages; i++) {
        result.push(i + 1)
    }
        return result

}

    //return Array.from({ length: totalPages }, (_, index) => index + 1)