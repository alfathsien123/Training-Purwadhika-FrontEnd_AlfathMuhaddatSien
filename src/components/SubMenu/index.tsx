'use client'
import { usePathname } from "next/navigation"
import { HiOutlineHome } from "react-icons/hi";
import Link from "next/link";


const listMenu = [
    {href: "/dashboard", name: "Home", icon: <HiOutlineHome className="text-2xl"/>},
    {href: "/dashboard/suppliers-catalogue", name: "Suppliers catalogue", icon: <HiOutlineHome className="text-2xl"/>},
    {href: "/dashboard/order", name: "Order", icon: <HiOutlineHome className="text-2xl"/>},
    {href: "/dashboard/warehouse", name: "Warehouse", icon: <HiOutlineHome className="text-2xl"/>},
    {href: "/dashboard/finance", name: "Finance", icon: <HiOutlineHome className="text-2xl"/>},
    
    {href: "/auth/register", name: "Register", icon: <HiOutlineHome className="text-2xl"/>},
]

function SidebarMenu() {
    const pathName = usePathname()
    // console.log(pathName);
    return (
        <section className="px-3 py-2">
          {/* <h1 className="text-3xl font-bold text-green-500">Logo</h1> */}
    
          <div className="flex flex-col overflow-y-auto h-[30vh] gap-2">
          {
                listMenu.map((menu, index) => {
                    return (   
                        <div key={index} className={`flex items-center gap-2 ${pathName === menu.href? "bg-green-700 text-white" : "text-black"}  p-2 rounded-md`}>
                            {menu.icon}
                            <Link href={menu.href} className="text-xl">{menu.name}</Link>
                        </div>
                    )
                })
            }
          
          </div>
        </section>
      );
    }
    
    export default SidebarMenu;