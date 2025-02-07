import { Background, BackgroundVariant, Panel, MiniMap, ReactFlow } from "@xyflow/react";
import { useReactFlow } from "@xyflow/react";
import '@xyflow/react/dist/style.css'
import { TbZoomIn, TbZoomOut } from "react-icons/tb";
import { LuSquareDashed } from "react-icons/lu";
import { nodes } from "./utils/Flow.config";
import { nodeTypes } from "./utils/Flow.config";


const Canvas = () => {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  return (
    <div className="w-[80VW] text-white bg-[#2d2d2e] h-[80vh]">
      <ReactFlow
        panOnDrag={false}
        panOnScroll
        nodeTypes={nodeTypes}
        nodes={nodes}
        fitView
      >
        <Background color="gray" variant={BackgroundVariant.Dots} gap={10} />
          <MiniMap
            nodeColor={"#ffffff"}
            position="bottom-left"
            nodeStrokeWidth={2}
            style={{
              backgroundColor: "gray", 
              width: 150,
              height: 100,
              bottom:"3rem"
            }}
          />
        <Panel position="bottom-left" >
            <div className="flex gap-4">
            <button
              className="p-2 border rounded bg-gray-800 text-white"
              onClick={() => fitView()}
            >
              <LuSquareDashed />
            </button>
            <button
              className="p-2 border rounded bg-gray-800 text-white"
              onClick={() => zoomIn()}
            >
              <TbZoomIn />
            </button>
            <button
              className="p-2 border rounded bg-gray-800 text-white"
              onClick={() => zoomOut()}
            >
              <TbZoomOut />
            </button>
          </div>
        </Panel>

      </ReactFlow>
    </div>
  )
}

export default Canvas
