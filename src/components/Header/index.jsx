import React from 'react'
import { useBoardStore, useNotesStore } from '../../store/store.js'
import { Button } from '../Button/index.jsx'
import editIcon from '../../icons/edit.svg'
import headerIcon from '../../icons/headerIcon.svg'
import { useNavigate } from 'react-router-dom'

export const Header = ({ handleOpenCreateNoteModal }) => {
  const notes = useNotesStore(state => state.notes)
  const activeBoard = useBoardStore(state => state.activeBoard)
  const navigate = useNavigate()
  return (
    <header className="py-[24px] px-[24px] rounded-b-[12px] bg-header-gradient flex justify-between items-center">
      <div className="flex gap-x-[12px] items-center">
        <img src={headerIcon} alt="Icon" />
        <div>
          <h1 className="font-bold text-[24px]">{activeBoard.title}</h1>
          <p className="text-[14px] text-[#38383B]">
            {activeBoard.description}
          </p>
        </div>
      </div>
      <div className="flex gap-x-[10px] items-center">
        {notes.length > 0 && (
          <Button
            onClick={handleOpenCreateNoteModal}
            variant="solid"
            extraClasses="flex items-center gap-x-[8px]"
          >
            <img alt="plus" src={editIcon} />
            Add Note
          </Button>
        )}
        <Button
          extraClasses="h-[15px]"
          variant="solid"
          onClick={() => navigate('/profile')}
        >
          Profile
        </Button>
      </div>
    </header>
  )
}
