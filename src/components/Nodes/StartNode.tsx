import { Plus } from "lucide-react"
import useStore from "../../zustand/store"

const StartNode = () => {
    const {toggleModal}= useStore()
    return (
        <div >
            <button onClick={()=>toggleModal(true)} className="p-4 group cursor-pointer  border rounded-md border-dashed ">
                <span className="group-hover:text-[#ff6f5b] ">
                <Plus size={20} />
                </span>
            </button>
             <p  className="mt-2 text-[.5rem]  ">Add first step...</p>
        </div>
    )
}

export default StartNode
