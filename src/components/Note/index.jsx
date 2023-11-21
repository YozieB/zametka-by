import React, { useEffect, useState } from 'react'
import TimeAgo from 'timeago-react'
import { Actions } from '../Actions/index.jsx'

export const Note = ({
  note,
  handleOpenEditNoteModal,
  handleOpenRemoveNoteModal,
}) => {
  return (
    <li className="transition ease-in-out rounded-[8px] flex flex-col md:p-3 py-2 px-3 gap-y-2 md:gap-y-3 shadow-[0_0_0_1px_#ECEDF0] hover:shadow-[0_0_0_1px_#CACACD] relative">
      <div className="flex gap-x-1 items-center">
        <p className="md:text-l text-sm">
          <TimeAgo locale="en" datetime={note.$createdAt.toString()} />
        </p>
        <p className="text-[#7E7E80] text-xs">by</p>
        <p className="md:text-l text-sm">{note.ownedBy}</p>
        {note.$updatedAt !== note.$createdAt && (
          <div className="absolute bottom-[12px] text-xs right-[16px] flex items-center gap-x-[4px]">
            <p className="text-[#7E7E80]">
              Last update
            </p>
            <p>
              <TimeAgo locale="en" datetime={note.$updatedAt.toString()} />
            </p>
          </div>
        )}
      </div>
      <div className="flex md:gap-x-2 gap-x-1 items-center">
        <h2 className="md:text-[18px] text-l font-bold">{note.title}</h2>
        <p
          className={
            "rounded-[6px] md:p-2 p-1 text-xs font-['Inter'] font-medium md:h-[20px] h-[18px] flex items-center" +
            ' ' +
            `status-${note.status.toLowerCase()}`
          }
        >
          {note.status[0].toUpperCase() +
            note.status.slice(1, note.status.length)}
        </p>
      </div>
      <p className="md:text-l text-sm">{note.text}</p>
      <Actions
        note={note}
        handleOpenEditNoteModal={handleOpenEditNoteModal}
        handleOpenRemoveNoteModal={handleOpenRemoveNoteModal}
      />
    </li>
  )
}
