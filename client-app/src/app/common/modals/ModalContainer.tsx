import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Modal } from 'semantic-ui-react'
import { RootStoreContext } from '../../stores/rootStore'

const ModalContainer = () => {
    const rootStore = useContext(RootStoreContext)
    const {modal: {body, open}, closeModal} = rootStore.modalStore
    return (
        <Modal open={open} onClose={closeModal}>
            {body}
        </Modal>
    )
}

export default observer(ModalContainer)
