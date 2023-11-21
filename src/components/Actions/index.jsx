import { useEffect, useRef, useState } from 'react'
import closeImage from '../../icons/closeActions.svg'
import { useOutsideClose } from '../../hooks/useOutsideClose.js'
import { useNotesStore } from '../../store/store.js'
import { Oval } from 'react-loader-spinner'
import { shallow } from 'zustand/shallow'

export const Actions = ({
  note,
  handleOpenEditNoteModal,
  handleOpenRemoveNoteModal,
}) => {
  const wrapperRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  const {
    setEditNoteData,
    setNoteChecked,
    isSetNoteCheckedLoading,
    setNoteToRemove,
  } = useNotesStore(
    ({
      setEditNoteData,
      setNoteChecked,
      isSetNoteCheckedLoading,
      setNoteToRemove,
    }) => ({
      setEditNoteData,
      setNoteChecked,
      isSetNoteCheckedLoading,
      setNoteToRemove,
    }),
    shallow
  )

  const openMenu = () => {
    setIsVisible(true)
  }

  const closeMenu = () => {
    setIsVisible(false)
  }

  const checkNote = () => {
    setNoteChecked(note)
  }

  const editNote = () => {
    handleOpenEditNoteModal()
    setEditNoteData(note)
    closeMenu()
  }

  const removeNote = () => {
    handleOpenRemoveNoteModal()
    setNoteToRemove(note)
    closeMenu()
  }

  useEffect(() => {
    !isSetNoteCheckedLoading && closeMenu()
  }, [isSetNoteCheckedLoading])

  useOutsideClose(wrapperRef, closeMenu)

  return (
    <>
      <div
        onClick={openMenu}
        className={
          'transition-all absolute md:w-8 md:h-8 md:right-4 w-6 h-6 top-2 right-2 flex flex-col items-center justify-center gap-[2.5px] cursor-pointer hover:bg-[#ECEDF0] rounded-[6px] active:bg-[#CACACD]' +
          ' ' +
          `${isVisible && 'pointer-events-none'}`
        }
      >
        <span className="rounded-[50%] bg-[#333] md:w-[4px] w-1 md:h-[4px] h-1 block"></span>
        <span className="rounded-[50%] bg-[#333] md:w-[4px] w-1 md:h-[4px] h-1 block"></span>
        <span className="rounded-[50%] bg-[#333] md:w-[4px] w-1 md:h-[4px] h-1 block"></span>
      </div>
      <div
        className={
          'transition-opacity absolute md:px-3 px-1 pt-0 pb-[4px] bg-[#fff] rounded-[8px] md:w-[324px] w-[240px] shadow-[2px_4px_12px_0_rgba(58,58,58,0.20)] md:top-[54px] top-[45px] right-[12px] flex flex-col md:gap-y-2 gap-y-1 z-10' +
          ' ' +
          `${isVisible ? 'opacity-1 visible' : 'opacity-0 invisible'}`
        }
        ref={wrapperRef}
      >
        <div className="md:px-3 px-2 flex justify-between items-center h-[40px] border-b border-[#F2F2F2]">
          <p className="font-bold text-[16px]">Actions</p>
          <button onClick={closeMenu}>
            <img src={closeImage} alt="" />
          </button>
        </div>
        <button
          onClick={editNote}
          className="md:px-3 px-2 flex items-center h-[30px] text-sm hover:bg-[#ECEDF0] active:bg-[#CACACD] rounded-[6px]"
        >
          Edit Note
        </button>
        {note.status !== 'Checked' && (
          <button
            onClick={checkNote}
            className="md:px-3 px-2 flex items-center h-[30px] text-sm hover:bg-[#ECEDF0] active:bg-[#CACACD] rounded-[6px]"
          >
            {isSetNoteCheckedLoading ? (
              <Oval
                height={25}
                width={25}
                color="#626268"
                wrapperStyle={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="transparent"
                strokeWidth={4}
                strokeWidthSecondary={4}
              />
            ) : (
              'Change status to Checked'
            )}
          </button>
        )}
        <button
          onClick={removeNote}
          className="md:px-3 px-2 flex items-center h-[30px] text-sm text-[#C40808] hover:bg-[#ECEDF0] active:bg-[#CACACD] rounded-[6px]"
        >
          Delete
        </button>
      </div>
    </>
  )
}
