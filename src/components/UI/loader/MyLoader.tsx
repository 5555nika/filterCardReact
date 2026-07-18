import cl from './MyLoader.module.css'

export const MyLoader = () => {
    return (
        <div className={cl['loading-container']}>
            <div className={cl.loading}></div>
        </div>
    )
}