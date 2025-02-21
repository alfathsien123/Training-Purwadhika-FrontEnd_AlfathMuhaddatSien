'use client'
import Image from "next/image"
import SubMenu from "../SubMenu"
import authStore from '@/zustand/authStore';

const SideBar = () => {
  
  const {email, name} = authStore((state)=> state)
  return (
    <>
        <div className=" h-screen bg-[#FEFAE0]">
            <Image src="/logo.jpg" width={200} height={200} alt="logo"/>
            <div className="p-[20px] mt-[-30px]">
                <SubMenu />
            </div>
            <div className="p-[20px]">
                <div className="p-[20px] text-[green] bg-[#E3F0AF]">
                    <div className="font-bold">Support</div>
                    <div>support@linkzasia.com</div>
                    <div>{`(+62)811-1509-265`}</div>
                </div>
            </div>
            <div className="p-[20px]">
                Hello, {name}
                <br></br>
                {email}
            </div>
        </div>
    </>
  )
}

export default SideBar