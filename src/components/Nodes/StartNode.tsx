import { toggleModal } from "../../redux/reducers/ToogleReducer"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/store/store";
import { setTriggeringNode } from "../../redux/reducers/NodeReducer";
import { Handle, Position } from "@xyflow/react";


const StartNode = ({ data, id }: { data: Record<string, unknown>, id: string }) => {
    console.log(data)
    const dispatch = useDispatch<AppDispatch>()


    return (
        <div >
           <Handle
                type="source"
                position={Position.Right}
                id="source"
                style={{
                    background: 'gray',
                    borderColor:"gray",
                    right: '0'
                }}
            />
           <Handle
                type="target"
                position={Position.Left}
                id="target"
                style={{
                    visibility:"hidden",
                    background: 'gray',
                    borderColor:"gray",
                    right: '0'
                }}
            />
            <button onClick={(e) => {
                e.stopPropagation()
                dispatch(setTriggeringNode(id)); // Set the triggering node
                dispatch(toggleModal(true));
            }} className="p-5 group  cursor-pointer bg-[#2d2d2e]  border rounded-md border-dashed ">
                <span className="group-hover:text-[#ff6f5b] ">
                    {data?.icon as React.ReactNode}
                </span>
            </button>
            <p className="mt-2 text-[.5rem]  ">Add first step...</p>
        </div>
    )
}

export default StartNode
