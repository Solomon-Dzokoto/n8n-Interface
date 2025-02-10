import { useState } from "react";
import Button from "./ui/Button";
import { IoReload, IoLogoGithub } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import useStore from "../zustand/store";


const TopBar = () => {
    const [isChecked, setIsChecked] = useState<boolean>(false)
    const {extend} = useStore((state)=>({extend:state.extend}));
 
    return (
        <div className={`flex text-white transition-w transition-all ${extend ? "min-w-[95vw]" : "w-full"}  bg-[#414243] border-b border-b-gray-500 justify-between items-center`}>
            <div className="pl-8">
                <input type="text" value="My workflow" />
                <button className=" text-[.6rem] py-2">
                    + Add tag
                </button>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex gap-1 items-center">
                    <p className="text-[.7rem] text-gray-400 ">{isChecked ? "active" : "inactive"}</p>
                    <label htmlFor="check" className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            id="check"
                            checked={isChecked}
                            onChange={()=>setIsChecked(!isChecked)}
                            className="sr-only"
                        />
                        <div className={`w-10 h-4 ${isChecked ? "bg-blue-600" : "bg-gray-800"} transition-colors rounded-full shadow-inner`}></div>
                        <div
                            className={`absolute w-3 h-3 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out ${isChecked ? 'translate-x-6 bg-blue-500' : ''}`}
                        ></div>
                    </label>
                </div>
                <Button className="rounded" variant="secondary">
                    <p className="text-[.9rem] ">Share</p>
                </Button>
                <Button className="rounded">
                    <p className="text-[.9rem] ">save</p>
                </Button>
                <span><IoReload /></span>
                <span><IoIosMore /></span>
                <div className="border-l p-6 border-gray-500 gap-0.5 flex items-center">
                    <span className="p-1  text-[.6rem] flex items-center gap-1 bg-gray-900 px-2">
                        <IoLogoGithub />
                        Star
                    </span>
                    <span className="  p-1 px-2 text-[.6rem] text-gray-200 bg-gray-950 ">
                        58,887
                    </span>
                </div>

            </div>
        </div>
    )
}

export default TopBar
