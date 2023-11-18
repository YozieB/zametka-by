import { useState } from 'react'
import { Header } from '../../components/Header/index.jsx'
import { Notes } from '../../components/Notes/index.jsx'
import { CreateNoteModal } from '../../components/CreateNoteModal/index.jsx'
export const Board = () => {
  const [createNoteModalVisible, setCreateNoteModalVisible] = useState(true)

  const openCreateNoteModal = () => {
    setCreateNoteModalVisible(!createNoteModalVisible)
  }

  const closeModals = () => {
    setCreateNoteModalVisible(false)
  }

  return (
    <div className="flex flex-col gap-y-[20px] h-[100%] pl-[24px] pr-[24px] pb-[32px] select-none">
      <Header handleOpenCreateNoteModal={openCreateNoteModal} />
      <Notes handleOpenCreateNoteModal={openCreateNoteModal} />
      <CreateNoteModal
        heading="Add New Note"
        handleClose={closeModals}
        isVisible={createNoteModalVisible}
      />
    </div>
  )
}
