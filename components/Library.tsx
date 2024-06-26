"use client";

import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";

interface LibraryProps {
  songs: Song[]
}

const Library: React.FC<LibraryProps> = ({ songs }) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();

  const onPlay = useOnPlay(songs);

  const onAddClick = () => {
    if (!user) {
      authModal.onOpen();
    }

    return uploadModal.onOpen();
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
        {songs.map(item => (
          <MediaItem key={item.id} data={item} onClick={(id) => onPlay(id)} />
        ))}
      </div>
    </div>
  );
};

export default Library;