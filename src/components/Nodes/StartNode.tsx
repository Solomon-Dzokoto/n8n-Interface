import { toggleModal } from "../../redux/reducers/ToogleReducer"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/store/store";
import { removeNode, setTriggeringNode } from "../../redux/reducers/NodeReducer";
import { Handle, Position } from "@xyflow/react";
import { useState } from "react";
import { FaTrash } from "react-icons/fa"

const StartNode = ({ data, id }: { data: Record<string, unknown>, id: string }) => {
    const [hovered, setHovered] = useState(false);
    console.log(data)
    const dispatch = useDispatch<AppDispatch>()

    const commotNode = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        dispatch(removeNode(id));
    };

    return (
        <div
        onMouseEnter={(e)=>{
            e.stopPropagation()
            setHovered(true)
        }
        }
        onMouseLeave={(e)=>{
            e.stopPropagation()
            setHovered(false)
        }}
        className="relative">
            <Handle
                type="source"
                position={Position.Right}
                id="source"
                style={{
                    background: 'gray',
                    borderColor: "gray",
                    right: '0'
                }}
            />
            <Handle
                type="target"
                position={Position.Left}
                id="target"
                style={{
                    visibility: "hidden",
                    background: 'gray',
                    borderColor: "gray",
                    right: '0'
                }}
            />
            {
                hovered && id !== "33" && (
                    <button
                    onMouseEnter={(e)=>{
                        console.log()
                        e.stopPropagation()
                        setHovered(true)
                    }
                    }
                    onMouseLeave={(e)=>{
                        e.stopPropagation()
                        setHovered(false)
                    }}
                    className="absolute -top-2  py-1 px-2 left-1/2 -translate-1/2 text-[.7rem]  " onClick={(e) => commotNode(e)} >
                        <FaTrash />
                    </button>
                )
            }

            <button onClick={(e) => {
                e.stopPropagation()
                dispatch(setTriggeringNode(id));
                dispatch(toggleModal(true));
            }} className="p-5 group  cursor-pointer bg-[#2d2d2e]  border rounded-md border-dashed ">
                <span className="group-hover:text-[#ff6f5b] ">
                    {data?.icon as React.ReactNode}
                </span>
            </button>
            <p className="mt-2 text-[.5rem]  ">
                {
                    id === "33" ? " Add first step..." : data?.title?.substring(0,15) as string
                }
               
                </p>
        </div>
    )
}

export default StartNode
