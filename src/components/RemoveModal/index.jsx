import React, { useEffect } from 'react'
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
        className="bg-white rounded-[6px] shadow-lg max-w-[445px]"
        onMouseDown={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center pl-[24px] pr-[12px] pt-[12px] pb-[16px]">
          <p className="font-bold text-[18px] text-[#38383B]">{heading}</p>
          <button
            className="flex items-center justify-center"
            onClick={handleClose}
          >
            <img className="w-[32px] h-[32px]" src={closeImage} alt="" />
          </button>
        </div>
        <p className="py-[8px] px-[24px] text-[16px]">{description}</p>
        <div className="flex justify-end px-[24px] py-[16px] gap-x-[12px]">
          <Button
            extraClasses="h-[40px] min-h-[40px] flex items-center"
            variant="outlined"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            isLoading={isDeleteNoteLoading || isDeleteBoardLoading}
            extraClasses="h-[40px] min-h-[40px] flex items-center min-w-[155px]"
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
