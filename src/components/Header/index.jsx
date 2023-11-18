import React from 'react'
import { useNotesStore } from '../../store/store.js'
import { Button } from '../Button/index.jsx'
import editIcon from '../../icons/edit.svg'

export const Header = ({ handleOpenCreateNoteModal }) => {
  const notes = useNotesStore(state => state.notes)
  return (
    <header className="py-[24px] px-[12px] rounded-b-[12px] bg-header-gradient flex justify-between items-center">
      Feature name of board
      {notes.length && (
        <Button
          onClick={handleOpenCreateNoteModal}
          variant="solid"
          extraClasses="flex items-center gap-x-[8px]"
        >
          <img alt="plus" src={editIcon} />
          Add Note
        </Button>
      )}
    </header>
  )
}
