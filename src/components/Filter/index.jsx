import { useNotesStore } from '../../store/store.js'

export const Filter = () => {
  const options = useNotesStore(state => state.availableOptions)
  const filterNotesByStatus = useNotesStore(state => state.filterNotesByStatus)
  const notes = useNotesStore(state => state.notes)
  const activeFilter = useNotesStore(state => state.activeFilter)
  const setActiveFilter = useNotesStore(state => state.setActiveFilter)
  return (
    <ul className="flex gap-2 md:gap-3 flex-wrap">
      <li
        onClick={() => {
          filterNotesByStatus('')
          setActiveFilter('')
        }}
        className={
          'whitespace-nowrap py-1 px-4 rounded-[9999px] font-semibold md:text-sm text-xs cursor-pointer' +
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
            'whitespace-nowrap py-1 px-4 rounded-[9999px] font-semibold md:text-sm text-xs' +
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
