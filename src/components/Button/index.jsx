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
      className={`${style.button} ${style[variant]} ${
        extraClasses && extraClasses
      }`}
    >
      {isLoading ? (
        <Oval
          height={25}
          width={25}
          color="#626268"
          wrapperStyle={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 1,
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
