import { Background, BackgroundVariant, Panel, MiniMap, ReactFlow } from "@xyflow/react";
import { useReactFlow } from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import { TbZoomIn, TbZoomOut } from "react-icons/tb";
import { LuSquareDashed } from "react-icons/lu";
import TriggersList from "./components/Modal";
import { useRef,useMemo, useCallback } from "react";
import useStore from "./zustand/store";
import { nodeTypes } from "./zustand/store";

const Canvas = () => {
  const canvaRef = useRef<HTMLDivElement>(null);
  const { showModal, nodes } = useStore((state) => ({
    showModal: state.showModal,
    nodes: state.nodes
  }));


  const memoizedNode = useMemo(()=> {
   nodes.map(node=> ({
     ...node,
      data: node?.data || {}
   }))
  },[nodes])

  const { zoomIn, zoomOut, fitView } = useReactFlow();

  const handleFitView = useCallback(() => fitView(), [fitView]);
  const handleZoomIn = useCallback(() => zoomIn(), [zoomIn]);
  const handleZoomOut = useCallback(() => zoomOut(), [zoomOut]);

  return (
    <div ref={canvaRef} className="w-full relative text-white bg-[#2d2d2e] h-[calc(100vh-10vh)] flex flex-col">
      {showModal && (<div className="fixed inset-0 bg-black/50 z-10" /> )}

      <ReactFlow
        panOnDrag={false}
        panOnScroll
        nodeTypes={nodeTypes}
        nodes={memoizedNode}
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
            bottom: "3rem"
          }}
        />
        <Panel position="bottom-left">
          <div className="flex gap-4">
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

      <TriggersList canvaRef={canvaRef} onClose={() => useStore.setState({ showModal: false })}/>
    </div>
  );
};

export default Canvas;
