import React from "react"
import { toggleModal } from "../../redux/reducers/ToogleReducer"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/store/store"

const Open = ({data}: {data: Record<string, unknown>}) => {
    const dispatch = useDispatch<AppDispatch>()
    
      const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        dispatch(toggleModal(true))
      }

  return (
    <button onClick={(e)=>toggle(e)} className="p-1 hover:text-[#ff6f5b] cursor-pointer mt-6 border rounded ">
     {data?.icon as React.ReactNode}
    </button>
  )
}

export default Open
