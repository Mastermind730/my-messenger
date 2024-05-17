import Sidebar from "../components/SideBar.tsx/Sidebar"
export default async function UsersLayout({children}:{children:React.ReactNode}){
    return(
        //@ts-expect-error Server component

        <Sidebar>
            <div className="h-[100vh]">
                {children}
            </div>
        </Sidebar>
    )
    
};