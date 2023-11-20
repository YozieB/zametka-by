import { useEffect } from 'react'
import { Button } from '../Button/index.jsx'
import editIcon from '../../icons/edit.svg'
import { useNotesStore } from '../../store/store.js'
import { Note } from '../Note/index.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import { getNotes } from '../../api/api.js'

export const Notes = ({
  handleOpenCreateNoteModal,
  handleOpenEditNoteModal,
  handleOpenRemoveNoteModal,
}) => {
  const notes = useNotesStore(state => state.notes)
  const filteredNotes = useNotesStore(state => state.filteredNotes)
  const notesToRender = filteredNotes.length ? filteredNotes : notes

  return (
    <div
      className={
        'rounded-[12px] grow' +
        ' ' +
        `${!notes.length && 'bg-[#FBFAFA]'} h-[100%]`
      }
    >
      {notesToRender.length ? (
        <ul className="flex flex-col gap-y-[16px]">
          {notesToRender.map(el => (
            <Note
              key={el.$id}
              note={el}
              handleOpenEditNoteModal={handleOpenEditNoteModal}
              handleOpenRemoveNoteModal={handleOpenRemoveNoteModal}
            />
          ))}
        </ul>
      ) : (
        <div className="flex flex-col h-[100%] justify-center items-center gap-y-[12px] rounded-[12px] h-[100%]">
          <p className="text-[#99999B] text-[24px] font-normal leading-[32px]">
            No note added to this device yet
          </p>
          <Button
            onClick={handleOpenCreateNoteModal}
            variant="solid"
            extraClasses="flex items-center gap-x-[8px]"
          >
            <img alt="plus" src={editIcon} />
            Add Note
          </Button>
        </div>
      )}
    </div>
  )
}
