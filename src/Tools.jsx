import React from 'react'
import { FaPen } from "react-icons/fa6";
import { MdOutlineTextFields } from "react-icons/md";
import { FaSlash } from "react-icons/fa6";
import { RiRectangleLine } from 'react-icons/ri';
import { IoEllipseOutline } from "react-icons/io5";
import { GrSelect } from 'react-icons/gr';
import { GiLaserBurst } from 'react-icons/gi';
import { LuEraser } from 'react-icons/lu';
import { HiCursorClick } from 'react-icons/hi';
function Tools({currentTool, onClick}) {
    const tools=[
        {
            name:"Pen",
            tool:FaPen,
            type:1
        },
        {
            name: "Text",
            tool:MdOutlineTextFields,
            type:2
        },
        {
            name:"Line",
            tool:FaSlash,
            type: 4
        },
        {
            name:"Rectangle",
            tool:RiRectangleLine,
            type:8
        },
        {
            name:"Ellipse",
            tool:IoEllipseOutline,
            type:16
        },
        {
            name:"Select",
            tool:GrSelect,
            type:32
        },
        {
            name:"Eraser",
            tool:LuEraser,
            type:64
        },
        {
            name:"Laser",
            tool:GiLaserBurst,
            type:128
        },
        {
            name:"Click",
            tool:HiCursorClick,
            type:256
        }
    ]
  return (
    <div className='w-[80px] h-[90vh] bg-white rounded-3xl shadow-xl absolute top-5 left-5 flex flex-col items-center py-6 gap-4 z-[100]'>
      {tools.map((tool,index)=>{
        const isSelected=currentTool === tool.type
        return <div className={`p-3 rounded-xl cursor-pointer transition-all duration-200 ease-in-out group shadow-xl shadow-gray-300
            ${isSelected?"bg-blue-100":"hover:bg-gray-100"}
            `} key={index} onClick={()=>onClick(tool)}>
            <tool.tool className={`w-6 h-6 transition-colors duration-200 ${isSelected?"text-blue-600":"text-gray-60 group-hover:text-gray-600"}`} />
        </div>
      })}
    </div>
  )
}

export default Tools
