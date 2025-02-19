import SideBar from "@/components/cores/sideBar";

export default function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return(
        <div className="flex flex-row">
          <div className="w-[20vw]">
            <SideBar />
          </div>
          <div className="w-full">
            {children}
          </div> 
        </div>
    )
}