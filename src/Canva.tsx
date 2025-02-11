import { Background, BackgroundVariant, Panel, MiniMap, ReactFlow } from "@xyflow/react";
import { useReactFlow } from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import { TbZoomIn, TbZoomOut } from "react-icons/tb";
import { LuSquareDashed } from "react-icons/lu";
import TriggersList from "./components/Modal";
import { useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store/store";
import StartNode from "./components/Nodes/StartNode.tsx"
import { Plus } from "lucide-react"
import { toggleModal } from "./redux/reducers/ToogleReducer.tsx";


const Canvas = () => {
  const canvaRef = useRef<HTMLDivElement>(null);
  const nodeTypes = {
    start: StartNode
  };
  const dispatch = useDispatch<AppDispatch>()

  
  const { nodes, edges} = useSelector((state: RootState) => state.node)
  const { showModal } = useSelector((state: RootState) => state.toggle)
  console.log(showModal)

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    console.log("clicked")
    dispatch (toggleModal(true))
  }

  

  const { zoomIn, zoomOut, fitView } = useReactFlow();

  const handleFitView = useCallback(() => fitView(), [fitView]);
  const handleZoomIn = useCallback(() => zoomIn(), [zoomIn]);
  const handleZoomOut = useCallback(() => zoomOut(), [zoomOut]);

  return (
    <div ref={canvaRef} className="w-full relative text-white bg-[#2d2d2e] h-[calc(100vh-10vh)] flex flex-col">
      <div className={`absolute inset-0  ${showModal ? "bg-blue-900/50 z-10 " : "-z-10"}  `} />

      <ReactFlow
        panOnDrag={false}
        panOnScroll
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
      >
        <Panel position="top-right" style={{right: "1rem"}}>
          <button onClick={(e) => toggle(e)} className={`  border p-2 rounded cursor-pointer`}>
            <Plus />
          </button>
        </Panel >
        <Background color="gray" variant={BackgroundVariant.Dots} gap={10} />
        <MiniMap
          nodeColor={"#ffffff"}
          position="bottom-left"
          nodeStrokeWidth={2}
          style={{
            backgroundColor: "gray",
            width: 150,
            height: 100,
            bottom: "3rem"
          }}
        />
        <Panel position="bottom-left">
          <div  className="flex gap-4">
            <button className="p-2 border rounded bg-gray-800 text-white" onClick={handleFitView}>
              <LuSquareDashed />
            </button>
            <button className="p-2 border rounded bg-gray-800 text-white" onClick={handleZoomIn}>
              <TbZoomIn />
            </button>
            <button className="p-2 border rounded bg-gray-800 text-white" onClick={handleZoomOut}>
              <TbZoomOut />
            </button>
          </div>
        </Panel>
      </ReactFlow>

      <TriggersList canvaRef={canvaRef} />
    </div>
  );
};

export default Canvas;
