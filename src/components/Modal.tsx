import { FiPlus, FiSearch } from "react-icons/fi"; // Search Icon
import { MdOutlineEvent, MdAccessTime, MdHttp } from "react-icons/md";
import { AiOutlineForm, AiOutlineArrowRight } from "react-icons/ai";
import { BiPlayCircle } from "react-icons/bi";
import { IoIosChatbubbles } from "react-icons/io";
import { RiFolderOpenLine } from "react-icons/ri";
import { useEffect, useRef, RefObject, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store";
import { toggleModal } from "../redux/reducers/ToogleReducer";
import type { Node } from "@xyflow/react";
import { addNode, addNewEdge, updateNode, setTriggeringNode, setLastCreatedNode } from "../redux/reducers/NodeReducer";
import { v4 as uuid } from "uuid";

const triggers = [
  {
    id: "1",
    data: {
      icon: <BiPlayCircle size={24} className="text-blue-400" />,
      title: "Trigger manually",
      description: "Runs the flow on clicking a button in n8n. Good for getting started quickly",
    }

  },
  {
    id: "2",
    data: {
      icon: <MdOutlineEvent size={24} className="text-blue-400" />,
      title: "On app event",
      description: "Runs the flow when something happens in an app like Telegram, Notion or Airtable",
      action: <AiOutlineArrowRight size={16} />,
    }

  },
  {
    id: "3",
    data: {
      icon: <MdAccessTime size={24} className="text-blue-400" />,
      title: "On a schedule",
      description: "Runs the flow every day, hour, or custom interval",
    }

  },
  {
    id: "4",
    data: {
      icon: <MdHttp size={24} className="text-blue-400" />,
      title: "On webhook call",
      description: "Runs the flow on receiving an HTTP request",
    }

  },
  {
    id: "5",
    data: {
      icon: <AiOutlineForm size={24} className="text-blue-400" />,
      title: "On form submission",
      description: "Generate webforms in n8n and pass their responses to the workflow",
    }

  },
  {
    id: "6",
    data: {
      icon: <AiOutlineForm size={24} className="text-blue-400" />,
      title: "When called by another workflow",
      description: "Runs the flow when called by the Execute Workflow node from a different workflow",
    }

  },
  {
    id: "7",
    data: {
      icon: <IoIosChatbubbles size={24} className="text-blue-400" />,
      title: "On chat message",
      description: "Runs the flow when a user sends a chat message. For use with Al nodes",
    }

  },
  {
    id: "8",
    data: {
      icon: <RiFolderOpenLine size={24} className="text-blue-400" />,
      title: "Other ways..",
      description: "Runs the flow on workflow errors, file changes,etc.",
    }

  }
];
const TriggersList = ({ canvaRef }: { canvaRef: RefObject<HTMLDivElement> }) => {

  const dispatch = useDispatch<AppDispatch>()
  const triggeringNode = useSelector((state: RootState) => state.node.triggeringNode);
  const nodes = useSelector((state: RootState) => state.node.nodes);
  const lastCreatedNode = useSelector((state: RootState) => state.node.lastCreatedNode);


  const findLastNode = () => {
    const lastNode = nodes[nodes.length - 1]
    return lastNode
  }

  const handleNodeSelection = (nodeData: { id: string; data: { icon: JSX.Element; title: string; description: string } }, e: React.MouseEvent<HTMLDListElement>) => {
    e.stopPropagation()
    const newNodeId = uuid();
    const lastNode = findLastNode()

    const newNodePosition = {
      x:  lastNode.position.x + 120 ,
      y: lastNode ? lastNode.position.y : 100,
    }
    const newNode: Node = {
      id: newNodeId,
      data: {
        title: nodeData?.data?.title,
        icon: nodeData?.data?.icon,
        description: nodeData?.data?.description,
        // plusButton: <button onClick={() => dispatch(setTriggeringNode(newNodeId))}>+</button>,
      },
      type: "start",
      position: newNodePosition,
    };
    console.log(" b4 triggering node: ", triggeringNode)
    console.log("b4 lastCreated node", lastCreatedNode)

    if (lastCreatedNode) {
      console.log("lastCreated node", lastCreatedNode)
    
      dispatch(addNode(newNode));
      dispatch(addNewEdge({
        id: uuid(),
        source: lastCreatedNode, 
        target: newNodeId, 
        type: "custom", 
      }));
      dispatch(setLastCreatedNode(newNodeId)); 
    } else  if (triggeringNode) {
      console.log("triggering node: ", triggeringNode)

      const existingNode = nodes.find(node => node.id === triggeringNode)

      if (!existingNode) return

      const replaceNode = {
        id: triggeringNode, // Keep the same ID to replace it
        data: {
          ...existingNode.data,
          title: nodeData?.data?.title,
          icon: nodeData?.data?.icon,
          description: nodeData?.data?.description, 
        },
        type: "start", 
        position: existingNode.position, 
      };

      dispatch(updateNode(replaceNode));
      dispatch(setTriggeringNode(null)); 
      dispatch(setLastCreatedNode(triggeringNode)); 
    } else {
      console.log("no triggering node or last created node")
      dispatch(addNode(newNode));
      if (lastCreatedNode) {
        dispatch(addNewEdge({ id: uuid(), source: lastCreatedNode, target: newNodeId }));
      }
      dispatch(setLastCreatedNode(newNodeId));
    }
    dispatch(toggleModal(false));
  };

  const handleToggle = useCallback(() => {
    dispatch(toggleModal(false))
  }, [dispatch])

  const showModal = useSelector((state: RootState) => state.toggle.showModal)


  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const outsideModalClick = (e: MouseEvent) => {
      e.stopPropagation()
      const targetNode = e.target as unknown as globalThis.Node;
      if (
        showModal &&
        canvaRef.current &&
        canvaRef.current.contains(targetNode) &&
        modalRef.current && !modalRef.current.contains(targetNode)) {
        handleToggle()
      }
    }
    document.addEventListener("mousedown", outsideModalClick)

    return () => {
      document.removeEventListener("mousedown", outsideModalClick)
    }
  }, [showModal, canvaRef])


  // const handleAddNextNode = () => {
  //   if (!currentPosition) return;
  //   dispatch(toggleModal(true));
  //   setCurrentPosition(null);
  // };

  return (
    <div ref={modalRef} className={`w-[35vw] modal overflow-y-scroll transition-right duration-300 pb-[5rem] ${showModal ? "right-0 backdrop-blur-2xl" : "-right-[35vw] "} fixed z-20  h-screen bg-[#414243] text-white py-6`}>
      <h2 className="text-xl font-bold  m-4">What triggers this workflow?</h2>
      <p className="text-sm mx-4 text-gray-400 mb-6">
        A trigger is a step that starts your workflow
      </p>
      <div className="relative border-[.1px] rounded group-focus:border-violet-500  mx-4 mb-6">
        <input
          type="text"
          // value={searchValue}
          placeholder="Search nodes..."
          readOnly
          className="w-full p-3 pl-10 group rounded-lg outline-none text-sm text-white "
        />
        <FiSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
      </div>
      <ul className="">
        {triggers.map((trigger, index) => (
          <li
            onClick={(e) => handleNodeSelection(trigger, e)}
            key={index}
            className="flex items-center gap-4 p-4 cursor-pointer  hover:border-l hover:border-l-gray-400 transition"
          >
            <div>{trigger?.data.icon}</div>
            <div className="flex-1">
              <h3 className="font-medium text-white">{trigger?.data?.title}</h3>
              <p className="text-[.7rem] text-gray-400">{trigger?.data?.description}</p>
            </div>
      
          </li>
        ))}
      </ul>
    
    </div>
  );
};

export default TriggersList;
