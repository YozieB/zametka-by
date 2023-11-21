import { useEffect, useRef } from 'react'
import closeIcon from '../../icons/closeSideModal.svg'
import { useOutsideClose } from '../../hooks/useOutsideClose.js'
import createNoteIcon from '../../icons/createNewNote.svg'
import editNoteIcon from '../../icons/editNote.svg'
import attention from '../../icons/attention.svg'
import { Options } from '../Options/index.jsx'
import { Button } from '../Button/index.jsx'
import {
  useBoardStore,
  useNotesStore,
  useUserStore,
} from '../../store/store.js'
import useInput from '../../hooks/useInput.js'
import { useParams } from 'react-router-dom'

export const SideModal = ({
  isVisible,
  heading,
  handleClose,
  variant,
  subHeading,
  addButtonText,
}) => {
  const isAddBoardLoading = useBoardStore(state => state.isAddBoardLoading)
  const user = useUserStore(state => state.user)
  const createBoard = useBoardStore(state => state.addBoard)
  const createNote = useNotesStore(state => state.addNote)
  const editNote = useNotesStore(state => state.updateNote)
  const isNoteCreationLoading = useNotesStore(state => state.isAddNoteLoading)
  const isUpdateNoteLoading = useNotesStore(state => state.isUpdateNoteLoading)
  const editNoteData = useNotesStore(state => state.editNoteData)
  const setEditNoteData = useNotesStore(state => state.setEditNoteData)
  const isEditNoteDataEmpty = Object.keys(editNoteData).length === 0
  const title = useInput('', {
    isEmpty: true,
    minLength: 3,
    maxLength: 25,
  })
  const status = useInput('', { isEmpty: true })
  const text = useInput('', { isEmpty: true, minLength: 3 })
  const { boardId } = useParams()

  useEffect(() => {
    if (!isEditNoteDataEmpty) {
      title.setValue(editNoteData.title)
      status.setValue(editNoteData.status)
      text.setValue(editNoteData.text)
    }
  }, [editNoteData])

  const clearInputsData = () => {
    title.setIsDirty(false)
    text.setIsDirty(false)
    title.setValue('')
    status.setValue('')
    text.setValue('')
    setEditNoteData({})
  }

  const submitForm = (e, action) => {
    e.preventDefault()
    if (action === 'create') {
      createNote({
        title: title.value,
        status: status.value,
        text: text.value,
        boards: boardId,
        ownedBy: user.name,
      })
    } else if (action === 'edit') {
      editNote(editNoteData, {
        title: title.value,
        status: status.value,
        text: text.value,
      })
    } else if (action === 'board') {
      createBoard({
        title: title.value,
        description: text.value,
        ownedBy: user.$id,
      })
    }
  }

  useEffect(() => {
    if (isVisible && ['create', 'board'].includes(variant)) {
      clearInputsData()
    }
  }, [isVisible])

  useEffect(() => {
    !isNoteCreationLoading && handleClose()
    // !isNoteCreationLoading && clearInputsData()
  }, [isNoteCreationLoading])

  useEffect(() => {
    !isUpdateNoteLoading && handleClose()
    // !isUpdateNoteLoading && clearInputsData()
  }, [isUpdateNoteLoading])

  useEffect(() => {
    !isAddBoardLoading && handleClose()
    // !isAddBoardLoading && clearInputsData()
  }, [isAddBoardLoading])

  const wrapperRef = useRef(null)
  useOutsideClose(wrapperRef, handleClose)
  return (
    <div
      className={
        'h-[100%] md:min-w-[65%] min-w-[100%] fixed right-0 top-0 bg-[#fff] shadow-[-4px_0_24px_0_rgba(169,169,169,0.31)] transition-transform duration-[600ms] flex flex-col z-[11]' +
        ' ' +
        `${isVisible ? 'translate-x-[0%]' : 'translate-x-[100%]'}`
      }
      ref={wrapperRef}
    >
      <div className="md:pt-4 pt-2 md:pb-4 pb-2 pl-4 md:pr-6 pr-4 md:mb-6 mb-3 flex items-center justify-between">
        <p className="leading-[24px]">{heading}</p>
        <button onClick={handleClose}>
          <img src={closeIcon} alt="close" />
        </button>
      </div>
      <div className="self-center max-w-auto md:max-w-[420px] w-[100%] flex flex-col md:gap-y-6 gap-y-5 pl-4 pr-4 md:pl-0 md:pr-0">
        <div className="flex items-center justify-center gap-x-2">
          <img
            src={variant === 'create' ? createNoteIcon : editNoteIcon}
            alt="Create note"
            className="w-7"
          />
          <h3 className="font-['Inter'] font-bold text-xl text-[#38383B]">
            {subHeading}
          </h3>
        </div>
        <form
          className="flex flex-col md:gap-y-6 gap-y-5"
          onSubmit={e => submitForm(e, variant)}
        >
          <label className="relative">
            {title.isDirty && (title.isEmpty || title.minLengthError) && (
              <div className="md:text-sm text-xs text-[#C40808] absolute md:bottom-[-20px] bottom-[-17px] md:left-[16px] left-[12px] flex items-center gap-x-1">
                <img src={attention} alt="Error" />
                <p>Minimal length is 3 symbols</p>
              </div>
            )}
            <input
              className={
                'input w-[100%] rounded-[8px] md:py-[18px] py-3 md:px-[16px] px-4 shadow-[inset_0_0_0_1px_#CACACD] focus-visible:outline-[transparent] focus-visible:shadow-[inset_0_0_0_2px_#67A0F0] md:text-l text-sm' +
                ' ' +
                `${
                  title.isDirty &&
                  (title.isEmpty || title.minLengthError) &&
                  'shadow-[inset_0_0_0_2px_#C40808] focus-visible:shadow-[inset_0_0_0_2px_#C40808]'
                }`
              }
              placeholder=" "
              value={title.value}
              name="title"
              maxLength="25"
              onChange={e => title.onChange(e)}
              onBlur={e => title.onBlur(e)}
            />
            <span className="placeholder">Title</span>
          </label>
          {variant !== 'board' && (
            <Options
              options={['Critical', 'Normal', 'Checked']}
              currentStatus={status.value}
              handleStatusChange={e => status.onChange(e)}
              handleStatusBlur={e => status.onBlur(e)}
            />
          )}
          <label className="relative">
            <textarea
              className={
                "font-['Inter'] w-[100%] rounded-[8px] md:py-2 py-1 px-3 shadow-[inset_0_0_0_1px_#CACACD] focus-visible:outline-[transparent] focus-visible:shadow-[inset_0_0_0_2px_#67A0F0] min-h-[100px] md:text-l text-sm" +
                ' ' +
                `${
                  text.isDirty &&
                  (text.isEmpty || text.minLengthError) &&
                  'shadow-[inset_0_0_0_2px_#C40808] focus-visible:shadow-[inset_0_0_0_2px_#C40808]'
                }`
              }
              placeholder="Description goes here"
              name="text"
              value={text.value}
              onChange={e => text.onChange(e)}
              onBlur={e => text.onBlur(e)}
            ></textarea>
            {text.isDirty && (text.isEmpty || text.minLengthError) && (
              <div className="md:text-sm text-xs text-[#C40808] absolute md:bottom-[-20px] bottom-[-17px] md:left-[16px] left-[12px] flex items-center gap-x-1">
                <img src={attention} alt="Error" />
                <p>Minimal length is 3 symbols</p>
              </div>
            )}
          </label>
          <div className="flex items-center justify-between gap-x-[12px] md:mt-[24px] mt-0">
            <Button
              extraClasses="w-[100%] h-8 md:h-auto"
              variant="outlined"
              onClick={e => {
                e.preventDefault()
                handleClose()
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={
                isNoteCreationLoading ||
                !title.inputValid ||
                (variant !== 'board' && !status.inputValid) ||
                !text.inputValid ||
                isUpdateNoteLoading ||
                isAddBoardLoading
              }
              extraClasses="w-[100%] h-8 md:h-auto"
              isLoading={
                isNoteCreationLoading ||
                isUpdateNoteLoading ||
                isAddBoardLoading
              }
              variant="solid"
            >
              {addButtonText}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
