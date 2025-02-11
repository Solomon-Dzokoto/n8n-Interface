import { toggleModal } from "../../redux/reducers/ToogleReducer"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/store/store";
import { setTriggeringNode } from "../../redux/reducers/NodeReducer";


const StartNode = ({ data,id }: { data: Record<string, unknown>,id: string }) => {
    console.log(data)
    const dispatch = useDispatch<AppDispatch>()


    return (
        <div >
            <button onClick={(e) => {
                e.stopPropagation()
                dispatch(setTriggeringNode(id)); // Set the triggering node
                dispatch(toggleModal(true));
            }} className="p-4 group cursor-pointer  border rounded-md border-dashed ">
                <span className="group-hover:text-[#ff6f5b] ">
                    {data?.icon as React.ReactNode}
                </span>
            </button>
            <p className="mt-2 text-[.5rem]  ">Add first step...</p>
        </div>
    )
}

export default StartNode
