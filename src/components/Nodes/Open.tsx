import React from "react"
import { toggleModal } from "../../redux/reducers/ToogleReducer"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/store/store"
import { Handle, Position } from "@xyflow/react"

const Open = ({ data }: { data: Record<string, unknown> }) => {
    const dispatch = useDispatch<AppDispatch>()

    const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        dispatch(toggleModal(true))
    }

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <Handle
                type="target"
                position={Position.Left}
                id="target"
                style={{
                    background: '#555',
                    width: 8,
                    height: 8,
                    left: '-4px'
                }}
            />
            <Handle
                type="source"
                position={Position.Right}
                id="source"
                style={{
                    background: '#555',
                    width: 8,
                    height: 8,
                    top: '50%'
                }}
            />
            <button onClick={(e) => toggle(e)} className="p-1 hover:text-[#ff6f5b] cursor-pointer mt-6 border rounded ">
                {data?.icon as React.ReactNode}
            </button>
        </div>
    )
}

export default Open
