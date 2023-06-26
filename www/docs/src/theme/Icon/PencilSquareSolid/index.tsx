import React from "react"
import { IconProps } from ".."

const IconPencilSquareSolid: React.FC<IconProps> = ({
  iconColorClassName,
  ...props
}) => {
  return (
    <svg
      width={props.width || 20}
      height={props.height || 20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.43278 13.9172L6.69478 10.7622C6.89592 10.2596 7.197 9.80302 7.57978 9.42018L14.4998 2.50218C14.8976 2.10436 15.4372 1.88086 15.9998 1.88086C16.5624 1.88086 17.102 2.10436 17.4998 2.50218C17.8976 2.9 18.1211 3.43957 18.1211 4.00218C18.1211 4.56479 17.8976 5.10435 17.4998 5.50218L10.5798 12.4202C10.1968 12.8032 9.73978 13.1052 9.23678 13.3062L6.08278 14.5682C5.99191 14.6046 5.89237 14.6135 5.7965 14.5938C5.70062 14.5741 5.61263 14.5267 5.54342 14.4575C5.47421 14.3883 5.42684 14.3003 5.40717 14.2045C5.3875 14.1086 5.39641 14.009 5.43278 13.9182V13.9172Z"
        className={
          iconColorClassName ||
          "tw-fill-medusa-icon-subtle dark:tw-fill-medusa-icon-subtle-dark"
        }
      />
      <path
        d="M3.5 5.75C3.5 5.06 4.06 4.5 4.75 4.5H10C10.1989 4.5 10.3897 4.42098 10.5303 4.28033C10.671 4.13968 10.75 3.94891 10.75 3.75C10.75 3.55109 10.671 3.36032 10.5303 3.21967C10.3897 3.07902 10.1989 3 10 3H4.75C4.02065 3 3.32118 3.28973 2.80546 3.80546C2.28973 4.32118 2 5.02065 2 5.75V15.25C2 15.9793 2.28973 16.6788 2.80546 17.1945C3.32118 17.7103 4.02065 18 4.75 18H14.25C14.9793 18 15.6788 17.7103 16.1945 17.1945C16.7103 16.6788 17 15.9793 17 15.25V10C17 9.80109 16.921 9.61032 16.7803 9.46967C16.6397 9.32902 16.4489 9.25 16.25 9.25C16.0511 9.25 15.8603 9.32902 15.7197 9.46967C15.579 9.61032 15.5 9.80109 15.5 10V15.25C15.5 15.94 14.94 16.5 14.25 16.5H4.75C4.06 16.5 3.5 15.94 3.5 15.25V5.75Z"
        className={
          iconColorClassName ||
          "tw-fill-medusa-icon-subtle dark:tw-fill-medusa-icon-subtle-dark"
        }
      />
    </svg>
  )
}

export default IconPencilSquareSolid