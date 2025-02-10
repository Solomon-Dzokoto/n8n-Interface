import { FiSearch } from "react-icons/fi"; // Search Icon
import { MdOutlineEvent, MdAccessTime, MdHttp } from "react-icons/md";
import { AiOutlineForm, AiOutlineArrowRight } from "react-icons/ai";
import { BiPlayCircle } from "react-icons/bi" ;
import { IoIosChatbubbles } from "react-icons/io";
import { RiFolderOpenLine } from "react-icons/ri";
import useStore from "../zustand/store";
import { useEffect,useRef,RefObject } from "react";
const TriggersList = ({canvaRef}:{canvaRef:RefObject<HTMLDivElement>}) => {
  const {showModal,toggleModal} = useStore((state)=>({
    showModal: state.showModal,
    toggleModal: state.toggleModal,
  }))
 

  const modalRef = useRef<HTMLDivElement>(null)
 
  useEffect(()=>{
     const outsideModalClick = (e: MouseEvent) => {
        if( 
          showModal &&
          canvaRef.current && 
          canvaRef.current.contains(e.target as Node) &&
          modalRef.current && !modalRef.current.contains(e.target as Node)) {
            toggleModal(false)
        }
     }
     document.addEventListener("mousedown",outsideModalClick)

     return ()=>{
      document.removeEventListener("mousedown",outsideModalClick)
     }
  },[toggleModal,showModal,canvaRef])

  const triggers = [
    {
      icon: <BiPlayCircle size={24} className="text-blue-400" />,
      title: "Trigger manually",
      description: "Runs the flow on clicking a button in n8n. Good for getting started quickly",
    },
    {
      icon: <MdOutlineEvent size={24} className="text-blue-400" />,
      title: "On app event",
      description: "Runs the flow when something happens in an app like Telegram, Notion or Airtable",
      action: <AiOutlineArrowRight size={16} />,
    },
    {
      icon: <MdAccessTime size={24} className="text-blue-400" />,
      title: "On a schedule",
      description: "Runs the flow every day, hour, or custom interval",
    },
    {
      icon: <MdHttp size={24} className="text-blue-400" />,
      title: "On webhook call",
      description: "Runs the flow on receiving an HTTP request",
    },
    {
      icon: <AiOutlineForm size={24} className="text-blue-400" />,
      title: "On form submission",
      description: "Generate webforms in n8n and pass their responses to the workflow",
    },
    {
      icon: <AiOutlineForm size={24} className="text-blue-400" />,
      title: "When called by another workflow",
      description: "Runs the flow when called by the Execute Workflow node from a different workflow",
    },
    {
      icon: <IoIosChatbubbles size={24} className="text-blue-400" />,
      title: "On chat message",
      description: "Runs the flow when a user sends a chat message. For use with Al nodes",
    },
    {
      icon: <RiFolderOpenLine size={24} className="text-blue-400" />,
      title: "Other ways..",
      description: "Runs the flow on workflow errors, file changes,etc.",
    },
  ];

  return (
    <div ref={modalRef} className={`w-[35vw] modal overflow-y-scroll transition-right duration-300 pb-[5rem] ${showModal ? "right-0 backdrop-blur-2xl" : "-right-[35vw] "} fixed  h-screen bg-[#414243] text-white py-6`}>
      <h2 className="text-xl font-bold  m-4">What triggers this workflow?</h2>
      <p className="text-sm mx-4 text-gray-400 mb-6">
        A trigger is a step that starts your workflow
      </p>
      <div className="relative border-[.1px] rounded group-focus:border-violet-500  mx-4 mb-6">
        <input
          type="text"
          placeholder="Search nodes..."
          className="w-full p-3 pl-10 group rounded-lg outline-none text-sm text-white "
        />
        <FiSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
      </div>
      <ul className="">
        {triggers.map((trigger, index) => (
          <li
            key={index}
            className="flex items-center gap-4 p-4 cursor-pointer  hover:border-l hover:border-l-gray-400 transition"
          >
            <div>{trigger.icon}</div>
            <div className="flex-1">
              <h3 className="font-medium text-white">{trigger.title}</h3>
              <p className="text-[.7rem] text-gray-400">{trigger.description}</p>
            </div>
            {trigger.action && <div>{trigger.action}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TriggersList;
