import { Plus } from "lucide-react"


const StartNode = () => {
    return (
        <div >
            <button className="p-4 border rounded-md border-dashed ">
                <Plus size={20} />
            </button>
             <p  className="mt-2 text-[.5rem] ">Add first step...</p>
        </div>
    )
}

export default StartNode
