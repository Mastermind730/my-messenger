import { signOut } from "next-auth/react";
import useConversation from "./useConversation";
import { usePathname } from "next/navigation";
import { useMemo } from "react";


const useRoutes=()=>{
    const pathName=usePathname();
    const {conversationId}=useConversation();

    const routes=useMemo(()=>[{
        label:"Chat",
        href:"/conversations",
        icon:HiChat,
        active:pathName==="/conversation" || !!conversationId
    },

    {
        label:"Users",
        href:"/users",
        icon:HiUsers,
        active:pathName==="/users" 
    },
    {
        label:"LogOut",
        href:"#",
        icon:HiChat,
onclick:()=>signOut();
    },
],[pathName,conversationId]
)
}

