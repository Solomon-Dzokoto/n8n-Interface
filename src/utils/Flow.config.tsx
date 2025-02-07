import StartNode from "../components/Nodes/StartNode"

export const nodeTypes  = {
    commerce: StartNode
}


interface NodeProps {
    id: string,
    position: {x: number, y: number},
    type: string
}
 export const nodes : NodeProps [] = [
    {
        id:'1',
        position : {x:window.innerWidth/2,y:window.innerHeight/2},
        type:'commerce'
    }
]