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
    <header className="md:py-6 py-2 md:px-[24px] px-4 rounded-b-[12px] bg-header-gradient flex flex-col sm:flex-row justify-between items-center">
      <div className="flex gap-x-[12px] sm:items-center w-[100%] sm:w-auto items-start sm:flex-row flex-col sm:mb-0 mb-3">
        <img className="hidden sm:block" src={headerIcon} alt="Icon" />
        <div>
          <h1 className="font-bold md:text-2xl text-l">{activeBoard.title}</h1>
          <p className="md:text-sm text-xs text-[#38383B]">
            {activeBoard.description}
          </p>
        </div>
      </div>
      <div className="flex gap-x-[10px] items-center w-[100%] sm:w-auto">
        {notes.length > 0 && (
          <Button
            onClick={handleOpenCreateNoteModal}
            variant="solid"
            extraClasses="flex items-center justify-center sm:justify-start gap-x-2 w-[100%] sm:w-auto"
          >
            <img alt="plus" src={editIcon} />
            Add Note
          </Button>
        )}
        <Button
          variant="solid"
          extraClasses="w-[100%] sm:w-auto"
          onClick={() => navigate('/profile')}
        >
          Profile
        </Button>
      </div>
    </header>
  )
}
