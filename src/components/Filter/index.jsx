import React, { useEffect, useState } from 'react'
import { useNotesStore } from '../../store/store.js'

export const Filter = () => {
  const options = useNotesStore(state => state.availableOptions)
  const filterNotesByStatus = useNotesStore(state => state.filterNotesByStatus)
  const filteredNotes = useNotesStore(state => state.filteredNotes)
  const notes = useNotesStore(state => state.notes)
  const activeFilter = useNotesStore(state => state.activeFilter)
  const setActiveFilter = useNotesStore(state => state.setActiveFilter)

  // const [activeFilter, setActiveFilter] = useState(notes || filteredNotes)

  return (
    <ul className="flex gap-x-[12px]">
      <li
        onClick={() => {
          filterNotesByStatus('')
          setActiveFilter('')
        }}
        className={
          'py-[4px] px-[16px] shadow-[inset_0_0_0_1px_#626268] rounded-[9999px] font-semibold text-[14px] cursor-pointer' +
          ' ' +
          `${
            activeFilter === ''
              ? 'bg-[#181819] shadow-[inset_0_0_0_1px_#181819] text-[#fff]'
              : 'bg-[#fff] shadow-[inset_0_0_0_1px_#626268] text-[#202023]'
          }`
        }
      >
        All ({notes.length})
      </li>
      {options.map(el => (
        <li
          className={
            'py-[4px] px-[16px] rounded-[9999px] font-semibold text-[14px]' +
            ' ' +
            `${
              notes.filter(elem => elem.status === el).length
                ? 'pointer-events-auto cursor-pointer'
                : 'pointer-events-none opacity-[0.3]'
            } ${
              activeFilter === el
                ? 'bg-[#181819] shadow-[inset_0_0_0_1px_#181819] text-[#fff]'
                : 'bg-[#fff] shadow-[inset_0_0_0_1px_#626268] text-[#202023]'
            }`
          }
          key={el}
          onClick={() => {
            filterNotesByStatus(el)
            setActiveFilter(el)
          }}
        >
          {el}
          {notes.filter(elem => elem.status === el).length
            ? ` (${notes.filter(elem => elem.status === el).length})`
            : ' (0)'}
        </li>
      ))}
    </ul>
  )
}
