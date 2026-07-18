import type { ReactNode } from 'react'
import cl from './MyModal.module.css'

export type  MyModalProps = {
    children: ReactNode,
    visible: boolean,
    setVisible: (visible: boolean) => void
}
export const MyModal = ({ children, visible, setVisible }: MyModalProps) => {


    return (
        <div className={`${cl.modal} ${visible ? cl.active : ''}`} 
        onClick={() => setVisible(false)}>

            <div className={cl.modalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>

        </div>
    )

}