import { useEffect } from 'react'
import closeImage from '../../icons/closeActions.svg'
import { Button } from '../Button/index.jsx'
import { useBoardStore, useNotesStore } from '../../store/store.js'
export const RemoveModal = ({
  isVisible,
  handleClose,
  heading,
  description,
  variant,
}) => {
  const removeNote = useNotesStore(state => state.deleteNote)
  const removeBoard = useBoardStore(state => state.deleteBoard)
  const noteToRemove = useNotesStore(state => state.noteToRemove)
  const boardToRemove = useBoardStore(state => state.boardToRemove)
  const setDeleteNoteData = useNotesStore(state => state.setNoteToRemove)
  const setDeleteBoardData = useBoardStore(state => state.setBoardToRemove)
  const isDeleteNoteLoading = useNotesStore(state => state.isDeleteNoteLoading)
  const isDeleteBoardLoading = useBoardStore(
    state => state.isDeleteBoardLoading
  )
  const deleteElement = () => {
    if (variant === 'note') {
      removeNote(noteToRemove)
    } else if (variant === 'board') {
      removeBoard(boardToRemove)
    }
  }

  useEffect(() => {
    !isDeleteNoteLoading && handleClose()
    !isDeleteNoteLoading && setDeleteNoteData({})
  }, [isDeleteNoteLoading])

  useEffect(() => {
    !isDeleteBoardLoading && handleClose()
    !isDeleteBoardLoading && setDeleteBoardData({})
  }, [isDeleteBoardLoading])

  return (
    <div
      onMouseDown={handleClose}
      className={
        'transition-opacity fixed left-0 right-0 bottom-0 top-0 z-[10] bg-[rgba(47,47,47,0.78)] backdrop-blur-md flex items-center justify-center' +
        ' ' +
        `${isVisible ? 'opacity-1 visible' : 'opacity-0 invisible'}`
      }
    >
      <div
        className="bg-white rounded-[6px] shadow-lg md:max-w-[445px] max-w-[320px]"
        onMouseDown={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center md:p-6 p-3">
          <p className="font-bold md:text-[18px] text-l text-[#38383B]">{heading}</p>
          <button
            className="flex items-center justify-center"
            onClick={handleClose}
          >
            <img className="md:w-[32px] md:h-[32px] w-[24px] h-[24px]" src={closeImage} alt="" />
          </button>
        </div>
        <p className="md:py-2 py-1 md:px-6 px-3 text-[16px]">{description}</p>
        <div className="flex justify-end md:px-6 px-3 md:py-4 py-3 gap-x-3">
          <Button
            extraClasses="md:h-[40px] h-[35px] md:min-h-[40px] min-h-[35px] flex items-center justify-center md:justify-start w-[100%] md:w-auto"
            variant="outlined"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            isLoading={isDeleteNoteLoading || isDeleteBoardLoading}
            extraClasses="md:h-[40px] h-[35px] md:min-h-[40px] min-h-[35px] flex items-center min-w-[155px] justify-center w-[100%] md:w-auto"
            variant="delete"
            onClick={deleteElement}
            disabled={isDeleteNoteLoading || isDeleteBoardLoading}
          >
            Confirm & Delete
          </Button>
        </div>
      </div>
    </div>
  )
}
