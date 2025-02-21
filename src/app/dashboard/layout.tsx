import SideBar from "@/components/cores/sideBar";
import AuthProvider from "@/providers/authProvider";
import AuthPage from "@/providers/authPage";

export default function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return(
      <div>
        <AuthProvider>
          <AuthPage>
            <div className="flex flex-row">
              <div className="w-[20vw]">
                <SideBar />
              </div>
              <div className="w-full">
                {children}
              </div> 
            </div>
          </AuthPage>
        </AuthProvider>
      </div>
    )
}