import { useRef } from 'react'
import closeIcon from '../../icons/closeSideModal.svg'
import { useOutsideClose } from '../../hooks/useOutsideClose.js'

export const Index = ({ children, isVisible, heading, handleClose }) => {
  const wrapperRef = useRef(null)
  useOutsideClose(wrapperRef, handleClose)
  return (
    <div
      className={
        'h-[100%] min-w-[65%] fixed right-0 top-0 bg-[#fff] shadow-[-4px_0_24px_0_rgba(169,169,169,0.31)] transition-transform duration-[600ms] flex flex-col' +
        ' ' +
        `${isVisible ? 'translate-x-[0%]' : 'translate-x-[100%]'}`
      }
      ref={wrapperRef}
    >
      <div className="p-[12px] pl-[16px] pr-[24px] mb-[24px] flex items-center justify-between">
        <p className="leading-[24px]">{heading}</p>
        <button onClick={handleClose}>
          <img src={closeIcon} alt="close" />
        </button>
      </div>
      <div className="self-center max-w-[420px] w-[100%] flex flex-col gap-y-[24px]">
        {children}
      </div>
    </div>
  )
}
