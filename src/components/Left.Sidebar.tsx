import { Home, User, Plus, Cloud, Package,  Gift } from "lucide-react";
import { MdQuestionMark, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { SiGitextensions } from "react-icons/si";
// import useStore from "../zustand/store";
// import {useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";

const LeftSidebar = () => {
   
  const {extend,toggleExtend} = useSelector((state:RootState)=>state.toggle)
  const dispatch = useDispatch()

  // interface State {
  //   extend: boolean;
  //   toggleExtend: () => void;
  // }

  // const selector = useCallback((state: State) => ({
  //   extend: state.extend,
  //   toggleExtend: state.toggleExtend,
  // }), []);

  // const {  extend , toggleExtend } = useStore(selector);

  return (

    <div className={`h-screen ${extend ? "w-16" : "w-64"} bg-[#414243] border-r border-gray-500 text-[#f4f4f4] flex flex-col transition-all duration-300 relative`}>
      
   
      <div className="px-4 py-2 flex items-center justify-between">
        <img className={` ${extend ? "w-[2rem] " : "w-[5rem]"}`} src="/assets/download__1_-removebg-preview (1).png" alt="logo" />
        <button className="border p-1 rounded-md hover:border-orange-600 hover:text-orange-600">
          <Plus size={20} />
        </button>
      </div>

  
      <div className="flex-1 p-4 space-y-4">
        <div className="flex items-center text-gray-400 text-xs gap-2 bg-gray-700 p-2 rounded">
          <Home size={20} />
          <span className={`${extend ? "hidden" : "inline-block"}`}>Overview</span>
        </div>

     
        <div>
          {!extend && <div className="ml-4 text-gray-400 mb-2">Projects</div>}
          <div className="space-y-2">
            <div className="flex items-center text-gray-400 text-xs gap-2 hover:bg-gray-700 p-2 rounded">
              <User size={20} />
              <span className={`${extend ? "hidden" : "inline-block"}`}>Personal</span>
            </div>
            <div className="flex items-center text-xs gap-2 justify-center text-[.8rem] border  hover:bg-gray-700 p-2 rounded cursor-pointer">
              <Plus size={20} />
              <span className={`${extend ? "hidden" : "inline-block"}`}>Add Project</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2 p-4">
        <div className="flex items-center text-gray-400 text-xs gap-2 hover:bg-gray-700 p-2 rounded">
          <Cloud size={20} />
          <span className={`${extend ? "hidden" : "inline-block"}`}>Admin Panel</span>
        </div>
        <div className="flex items-center text-gray-400 text-xs gap-2 hover:bg-gray-700 p-2 rounded">
          <Package size={20} />
          <span className={`${extend ? "hidden" : "inline-block"}`}>Templates</span>
        </div>
        <div className="flex items-center text-gray-400 text-xs gap-2 hover:bg-gray-700 p-2 rounded">
          <SiGitextensions size={20} />
          <span className={`${extend ? "hidden" : "inline-block"}`}>Variables</span>
        </div>
        <div className="flex items-center text-gray-400 text-xs gap-2 hover:bg-gray-700 p-2 rounded">
          <MdQuestionMark size={20} />
          <span className={`${extend ? "hidden" : "inline-block"}`}>Help</span>
        </div>
        <div className="flex items-center text-gray-400 text-xs gap-2 hover:bg-gray-700 p-2 rounded">
          <Gift size={20} />
          <span className={`${extend ? "hidden" : "inline-block"}`}>1 update</span>
        </div>
      </div>

      <div className="border-t border-gray-700 p-4">
        <div className="text-sm rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-white px-2 w-fit py-2">SE</div>
      </div>

      <button
        onClick={()=>dispatch(toggleExtend)}
        className="absolute cursor-pointer top-1/2 -right-4 bg-gray-700 text-white p-1.5 rounded-full transform transition-all hover:text-[#ff6f5b]"
      >
        <MdOutlineKeyboardArrowLeft className={`transition-transform ${extend ? "rotate-180" : ""}`} />
      </button>
    </div>
  );
};

export default LeftSidebar;
