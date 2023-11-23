import style from './style.module.scss'
import { Oval } from 'react-loader-spinner'

export const Button = ({
  children,
  variant,
  isLoading,
  extraClasses,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={`md:py-2 py-1 md:px-4 px-2 font-semibold select-none cursor-pointer rounded-[6px] md:text-l text-sm ${style[variant]} ${
        extraClasses && extraClasses
      }`}
    >
      {isLoading ? (
        <Oval
          height={20}
          width={20}
          color="#626268"
          wrapperStyle={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="transparent"
          strokeWidth={4}
          strokeWidthSecondary={4}
        />
      ) : (
        children
      )}
    </button>
  )
}
