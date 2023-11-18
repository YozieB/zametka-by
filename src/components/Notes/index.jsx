import { useEffect } from 'react'
import { Button } from '../Button/index.jsx'
import editIcon from '../../icons/edit.svg'
import TimeAgo from 'timeago-react'
import { useNotesStore } from '../../store/store.js'

export const Notes = ({ handleOpenCreateNoteModal }) => {
  const notes = useNotesStore(state => state.notes)
  const fetchNotes = useNotesStore(state => state.fetchNotes)

  useEffect(() => {
    fetchNotes()
  }, [])

  return (
    <>
      <main
        className={
          'rounded-[12px] grow' + ' ' + `${!notes.length && 'bg-[#FBFAFA]'}`
        }
      >
        {notes.length ? (
          <ul className="flex flex-col gap-y-[16px]">
            {notes.map(el => {
              return (
                <li
                  key={el.$id}
                  className="transition ease-in-out rounded-[8px] flex flex-col p-[12px] gap-y-[12px] shadow-[0_0_0_1px_#ECEDF0] hover:shadow-[0_0_0_1px_#CACACD] active:shadow-[0_0_0_2px_#99999B]"
                >
                  <div className="flex gap-x-[4px] items-center">
                    <p className="text-[#7E7E80] text-[12px] leading-[16px]">
                      @
                    </p>
                    <p className="text-[16px]">
                      <TimeAgo
                        locale="en"
                        datetime={el.$createdAt.toString()}
                      />
                    </p>
                    <p className="text-[#7E7E80] text-[12px] leading-[16px]">
                      by
                    </p>
                    <p className="text-[16px]">Jason Statham</p>
                  </div>
                  <div className="flex gap-x-[8px] items-center">
                    <h2 className="text-[18px] font-bold leading-[24px]">
                      {el.title}
                    </h2>
                    <p
                      className={
                        "rounded-[6px] p-[8px] text-[12px] font-['Inter'] font-medium h-[20px] flex items-center" +
                        ' ' +
                        `status-${el.status}`
                      }
                    >
                      {el.status[0].toUpperCase() +
                        el.status.slice(1, el.status.length)}
                    </p>
                  </div>
                  <p className="text-[16px]">{el.text}</p>
                </li>
              )
            })}
          </ul>
        ) : (
          <div className="flex flex-col h-[100%] justify-center items-center gap-y-[12px] rounded-[12px]">
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
      </main>
    </>
  )
}
