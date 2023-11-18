import React, { useEffect, useState } from 'react'
import { Index } from '../SideModal/index.jsx'
import createNoteIcon from '../../icons/createNewNote.svg'
import { Options } from '../Options/index.jsx'
import { Button } from '../Button/index.jsx'
import { useNotesStore } from '../../store/store.js'
import useInput from '../../hooks/useInput.jsx'
import attention from '../../icons/attention.svg'

export const CreateNoteModal = ({ handleClose, isVisible, heading }) => {
  const title = useInput('', { isEmpty: true, minLength: 3 })
  const status = useInput('', { isEmpty: true })
  const text = useInput('', { isEmpty: true, minLength: 3 })
  const createNote = useNotesStore(state => state.addNote)
  const isNoteCreationLoading = useNotesStore(state => state.isAddNoteLoading)

  const clearInputsData = () => {
    title.setIsDirty(false)
    text.setIsDirty(false)
    title.setValue('')
    status.setValue('')
    text.setValue('')
  }

  const submitForm = e => {
    e.preventDefault()
    createNote({
      title: title.value,
      status: status.value,
      text: text.value,
    })
    clearInputsData()
  }

  useEffect(() => {
    if (!isVisible) {
      clearInputsData()
    }
  }, [isVisible])

  useEffect(() => {
    !isNoteCreationLoading && handleClose()
  }, [isNoteCreationLoading])

  return (
    <Index
      isVisible={isVisible}
      heading={heading}
      handleClose={handleClose}
    >
      <div className="flex items-center justify-center gap-x-[8px]">
        <img src={createNoteIcon} alt="Create note" />
        <h3 className="font-['Inter'] font-bold text-[18px] text-[#38383B]">
          Create New Note
        </h3>
      </div>
      <form className="flex flex-col gap-y-[24px]" onSubmit={submitForm}>
        <label className="relative">
          {title.isDirty && (title.isEmpty || title.minLengthError) && (
            <div className="text-[12px] text-[#C40808] absolute bottom-[-20px] left-[16px] flex items-center gap-x-[4px]">
              <img src={attention} alt="Error" />
              <p>Minimal length is 3 symbols</p>
            </div>
          )}
          <input
            className={
              'input w-[100%] rounded-[8px] py-[18px] px-[16px] shadow-[inset_0_0_0_1px_#CACACD] focus-visible:outline-[transparent] focus-visible:shadow-[inset_0_0_0_2px_#67A0F0] text-[16px] leading-[20px]' +
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
            onChange={e => title.onChange(e)}
            onBlur={e => title.onBlur(e)}
          />
          <span className="placeholder">Title</span>
        </label>
        <Options
          options={['Critical', 'Normal', 'Checked']}
          currentStatus={status}
          handleStatusChange={e => status.onChange(e)}
          handleStatusBlur={e => status.onBlur(e)}
        />
        <label className="relative">
          <textarea
            className={
              "font-['Inter'] w-[100%] rounded-[8px] py-[8px] px-[12px] shadow-[inset_0_0_0_1px_#CACACD] focus-visible:outline-[transparent] focus-visible:shadow-[inset_0_0_0_2px_#67A0F0] leading-[20px] min-h-[100px] text-[14px]" +
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
            <div className="text-[12px] text-[#C40808] absolute bottom-[-20px] left-[16px] flex items-center gap-x-[4px]">
              <img src={attention} alt="Error" />
              <p>Minimal length is 3 symbols</p>
            </div>
          )}
        </label>
        <div className="flex items-center justify-between gap-x-[12px] mt-[24px]">
          <Button
            extraClasses="w-[100%]"
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
              !status.inputValid ||
              !text.inputValid
            }
            extraClasses="w-[100%]"
            isLoading={isNoteCreationLoading}
            variant="solid"
          >
            Add
          </Button>
        </div>
      </form>
    </Index>
  )
}
