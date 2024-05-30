"use client";
import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();
  const authModal = useAuthModal();

  const handleLogout = () => {
    // 处理账号注销
  };

  return (
    <div
      className={twMerge(
        `h-fit bg-gradient-to-b from-emerald-800 p-6`,
        className
      )}
    >
      {/* 顶部按钮 */}
      <div className="w-full mb-4 flex items-center justify-between">

        {/* 导航按钮 */}
        <div className="hidden md:flex gap-x-2 items-center">
          {/* 前进按钮 */}
          <button
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
            onClick={() => router.back()}
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          {/* 后退按钮 */}
          <button
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
            onClick={() => router.forward()}
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>

        {/* 移动端视图 */}
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <HiHome className="text-black" size={20} />
          </button>
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <BiSearch className="text-black" size={20} />
          </button>
        </div>

        {/* 账号相关 */}
        <div className="flex justify-between items-center gap-x-4">
          <>
            <div>
              <Button className="bg-transparent text-neutral-300 font-medium"
                onClick={authModal.onOpen}>
                Sign Up
              </Button>
            </div>
            <div>
              <Button className="bg-white"
                onClick={authModal.onOpen}>
                Log In
              </Button>
            </div>

          </>
        </div>

      </div>

      {/* 标题内容 */}
      {children}
    </div>
  );
};

export default Header;
