import React, { useEffect, useState } from 'react'
import TimeAgo from 'timeago-react'
import { Actions } from '../Actions/index.jsx'

export const Note = ({
  note,
  handleOpenEditNoteModal,
  handleOpenRemoveNoteModal,
}) => {
  return (
    <li className="transition ease-in-out rounded-[8px] flex flex-col p-[12px] gap-y-[12px] shadow-[0_0_0_1px_#ECEDF0] hover:shadow-[0_0_0_1px_#CACACD] relative">
      <div className="flex gap-x-[4px] items-center">
        <p className="text-[16px]">
          <TimeAgo locale="en" datetime={note.$createdAt.toString()} />
        </p>
        <p className="text-[#7E7E80] text-[12px] leading-[16px]">by</p>
        <p className="text-[16px]">{note.ownedBy}</p>
        {note.$updatedAt !== note.$createdAt && (
          <div className="absolute bottom-[12px] right-[16px] flex items-center gap-x-[4px]">
            <p className="text-[#7E7E80] text-[12px] leading-[16px]">
              Last update
            </p>
            <p className="text-[12px]">
              <TimeAgo locale="en" datetime={note.$updatedAt.toString()} />
            </p>
          </div>
        )}
      </div>
      <div className="flex gap-x-[8px] items-center">
        <h2 className="text-[18px] font-bold leading-[24px]">{note.title}</h2>
        <p
          className={
            "rounded-[6px] p-[8px] text-[12px] font-['Inter'] font-medium h-[20px] flex items-center" +
            ' ' +
            `status-${note.status.toLowerCase()}`
          }
        >
          {note.status[0].toUpperCase() +
            note.status.slice(1, note.status.length)}
        </p>
      </div>
      <p className="text-[16px]">{note.text}</p>
      <Actions
        note={note}
        handleOpenEditNoteModal={handleOpenEditNoteModal}
        handleOpenRemoveNoteModal={handleOpenRemoveNoteModal}
      />
    </li>
  )
}
