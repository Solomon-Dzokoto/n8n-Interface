import { FiPlus, FiSearch } from "react-icons/fi";
import { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store";
import { toggleModal } from "../redux/reducers/ToogleReducer";
import type { Node } from "@xyflow/react";
import { addNode, addNewEdge, updateNode, setTriggeringNode, setLastCreatedNode } from "../redux/reducers/NodeReducer";
import { v4 as uuid } from "uuid";

interface Trigger {
  id: string;
  data: {
    icon: JSX.Element;
    title: string;
    description: string;
  };
}

const ChainableNodesModal = ({ canvaRef }: { canvaRef: RefObject<HTMLDivElement> }) => {
  const dispatch = useDispatch<AppDispatch>();
  const triggeringNode = useSelector((state: RootState) => state.node.triggeringNode);
  const nodes = useSelector((state: RootState) => state.node.nodes);
  const lastCreatedNode = useSelector((state: RootState) => state.node.lastCreatedNode);
  const showModal = useSelector((state: RootState) => state.toggle.showModal);

  const [currentPosition, setCurrentPosition] = useState<{ x: number; y: number } | null>(null);

  const findLastNode = () => {
    return nodes[nodes.length - 1];
  };

  const handleNodeSelection = (trigger: Trigger, e: React.MouseEvent<HTMLDListElement>) => {
    e.stopPropagation();
    const newNodeId = uuid();
    const lastNode = findLastNode();

    const newNodePosition = {
      x: lastNode ? lastNode.position.x + 100 : 100,
      y: lastNode ? lastNode.position.y : 100,
    };

    const newNode: Node = {
      id: newNodeId,
      data: {
        title: trigger.data.title,
        icon: trigger.data.icon,
        description: trigger.data.description,
      },
      type: "start",
      position: newNodePosition,
    };

    if (triggeringNode) {
      const existingNode = nodes.find(node => node.id === triggeringNode);
      if (!existingNode) return;

      const replaceNode = {
        ...existingNode,
        data: {
          ...existingNode.data,
          title: trigger.data.title,
          icon: trigger.data.icon,
          description: trigger.data.description,
        },
      };

      dispatch(updateNode(replaceNode));
      dispatch(setTriggeringNode(null));
      dispatch(setLastCreatedNode(triggeringNode));
    } else if (lastCreatedNode) {
      dispatch(addNode(newNode));
      dispatch(addNewEdge({
        id: uuid(),
        source: lastCreatedNode,
        target: newNodeId,
        type: "smoothstep",
        animated: true,
      }));
      dispatch(setLastCreatedNode(newNodeId));
      setCurrentPosition(newNode.position);
    } else {
      dispatch(addNode(newNode));
      dispatch(setLastCreatedNode(newNodeId));
      setCurrentPosition(newNode.position);
    }

    dispatch(toggleModal(false));
  };

  const handleAddNextNode = () => {
    if (!currentPosition) return;
    dispatch(toggleModal(true));
    setCurrentPosition(null);
  };

  const handleToggle = useCallback(() => {
    dispatch(toggleModal(false));
  }, [dispatch]);

  return (
    <div className={`w-[35vw] modal overflow-y-scroll transition-right duration-300 pb-[5rem] ${showModal ? "right-0 backdrop-blur-2xl" : "-right-[35vw]"} fixed z-20 h-screen bg-[#414243] text-white py-6`}>
      <h2 className="text-xl font-bold m-4">Select Next Node</h2>
      <div className="relative border-[.1px] rounded group-focus:border-violet-500 mx-4 mb-6">
        <input
          type="text"
          placeholder="Search nodes..."
          readOnly
          className="w-full p-3 pl-10 group rounded-lg outline-none text-sm text-white"
        />
        <FiSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
      </div>
      <ul>
        {triggers.map((trigger, index) => (
          <li
            onClick={(e) => handleNodeSelection(trigger, e)}
            key={index}
            className="flex items-center gap-4 p-4 cursor-pointer hover:border-l hover:border-l-gray-400 transition"
          >
            <div>{trigger.data.icon}</div>
            <div className="flex-1">
              <h3 className="font-medium text-white">{trigger.data.title}</h3>
              <p className="text-[.7rem] text-gray-400">{trigger.data.description}</p>
            </div>
          </li>
        ))}
      </ul>
      {currentPosition && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute" style={{ left: currentPosition.x, top: currentPosition.y }}>
              <button
                onClick={handleAddNextNode}
                className="p-2 rounded-full bg-white text-gray-800 hover:bg-gray-100 transition"
              >
                <FiPlus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChainableNodesModal;