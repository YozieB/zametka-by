import React, { useEffect, useRef, useState } from 'react'
import arrow from '../../icons/arrowDown.svg'
import { useOutsideClose } from '../../hooks/useOutsideClose.jsx'

export const Options = ({ options, handleStatusChange, currentStatus }) => {
  const [activeOption, setActiveOption] = useState('')
  const [isOptionsVisible, setIsOptionsVisible] = useState(false)

  const wrapperRef = useRef(null)

  const selectOption = option => {
    setActiveOption(option)
    closeOptions()
  }

  useEffect(() => {
    !currentStatus.value && setActiveOption('')
  }, [currentStatus.value])

  useEffect(() => {
    handleStatusChange({ target: { value: activeOption.toLowerCase() } })
  }, [activeOption])

  const openOptions = () => {
    setIsOptionsVisible(!isOptionsVisible)
  }

  const closeOptions = () => {
    setIsOptionsVisible(false)
  }

  useOutsideClose(wrapperRef, closeOptions)

  return (
    <div className="relative" ref={wrapperRef}>
      <label className="relative">
        <input
          onClick={openOptions}
          value={activeOption}
          placeholder=" "
          className={
            `${activeOption && 'input'}` +
            ' ' +
            'caret-transparent text-[#38383B] w-[100%] rounded-[8px] py-[18px] px-[16px] shadow-[inset_0_0_0_1px_#CACACD] focus-visible:outline-[transparent] text-[16px] leading-[20px] cursor-pointer focus-visible:shadow-[inset_0_0_0_2px_#67A0F0]'
          }
          readOnly
        />
        <span className="placeholder">Status</span>
        <img
          className="absolute right-[16px] top-[0%] cursor-pointer"
          src={arrow}
          alt="Dropdown"
        />
      </label>
      <ul
        className={
          'transition-opacity z-[2] absolute top-[calc(100%+6px)] rounded-[6px] bg-[#fff] shadow-[0_1px_8px_0_rgba(0,0,0,0.08)] w-[100%] p-[8px]' +
          ' ' +
          `${
            isOptionsVisible
              ? 'opacity-[100%] visible'
              : 'opacity-[0%] invisible'
          }`
        }
      >
        {options.map(el => (
          <li
            className="h-[40px] flex items-center w-[100%] select-none cursor-pointer pl-[12px] text-[14px] leading-[16px] hover:bg-[#ECEDF0] rounded-[6px] active:bg-[#CACACD]"
            key={el}
            onClick={() => selectOption(el)}
          >
            {el}
          </li>
        ))}
      </ul>
    </div>
  )
}
