"use client";

import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";

const Library = () => {
  const onAddClick = () => {
    // 点击“添加列表”按钮时的动作
  }

  return (
    <div className="flex flex-col">

      {/* 标题 */}
      <div className="flex items-center justify-between px-5 pt-4">
        
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist size={26} className="text-neutral-400" />
          <p className="text-neutral-400 font-medium text-md">Your Library</p> 
        </div>

        <AiOutlinePlus size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
          onClick={onAddClick} />
      </div>

      {/* 列表 */}
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        List of songs
      </div>
    </div>
  );
};

export default Library;