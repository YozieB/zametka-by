import { useEffect } from 'react'
import { Button } from '../Button/index.jsx'
import editIcon from '../../icons/edit.svg'
import { useNotesStore } from '../../store/store.js'
import { Note } from '../Note/index.jsx'

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
        <ul className="flex flex-col md:gap-y-4 gap-y-3">
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
        <div className="flex flex-col h-[100%] justify-center items-center md:gap-y-4 gap-y-3 rounded-[12px]">
          <p className="text-[#99999B] md:text-2xl text-xl font-normal">
            No note added to this board yet
          </p>
          <Button
            onClick={handleOpenCreateNoteModal}
            variant="solid"
            extraClasses="flex items-center gap-x-2"
          >
            <img alt="plus" src={editIcon} />
            Add Note
          </Button>
        </div>
      )}
    </div>
  )
}
