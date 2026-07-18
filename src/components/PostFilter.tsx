import { MyInput } from "./UI/input/MyInput"
import { MySelect } from "./UI/select/MySelect"

export interface IFilter {
    query: string
    sort: string
}
export interface IPostFilter {
    filter: IFilter
    setFilter : (filter: IFilter) => void
}
export const PostFilter = ({ filter, setFilter }: IPostFilter) => {

    return (
        <form className="post-form">
            <MyInput 
            placeholder="Search..."
            value={filter.query} 
// При вводе текста перезапис. только поле query, сохр. остальные поля
            onChange={(e) => setFilter({...filter, query: e.target.value})}
            />
            
            <MySelect
            value={filter.sort}
            onChangeValue={(select) => setFilter({...filter, sort: select})}
            defaultValue='Sort by'
            options={[
                { name: 'by name', value: 'title'},
                { name: 'by desc', value: 'body'},
            ]}
            />

        </form>
    )
}


/*
о делает копию старого объекта filter, но заменяет в нем свойство query на новое. То же самое происходит и с выбором сортировки sort.
*/