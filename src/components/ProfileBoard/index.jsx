import React from 'react'
import { Link } from 'react-router-dom'
import deleteIcon from '../../icons/delete.svg'
import { useBoardStore } from '../../store/store.js'

export const ProfileBoard = ({ board, handleOpenRemoveModal }) => {
  const setBoardToRemove = useBoardStore(state => state.setBoardToRemove)
  const removeBoard = () => {
    handleOpenRemoveModal()
    setBoardToRemove(board)
  }

  return (
    <div className="max-w-sm min-w-[250px] p-4 bg-white border border-gray-200 rounded-lg shadow relative">
      <button className="absolute right-4 w-4" onClick={removeBoard}>
        <img src={deleteIcon} alt="Delete board" />
      </button>
      <h5 className="mb-1 text-xl font-semibold tracking-tight text-gray-900">
        {board.title}
      </h5>
      <p className="mb-2 font-normal text-sm text-gray-500">
        {board.description}
      </p>
      <Link
        className="inline-flex items-center text-blue-600"
        to={`/board/${board.$id}`}
      >
        Go to board
        <svg
          className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
          />
        </svg>
      </Link>
    </div>
  )
}
