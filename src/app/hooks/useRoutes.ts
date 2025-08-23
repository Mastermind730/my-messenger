import { signOut } from "next-auth/react";
import useConversation from "./useConversation";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiChatAlt } from "react-icons/hi";
import { HiUsers } from "react-icons/hi2";
import { IoIosLogOut } from "react-icons/io";

const useRoutes = () => {
  const pathName = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(() => [
    {
      label: "Chat",
      href: "/conversations",
      icon: HiChatAlt,
      active: pathName === "/conversations" || !!conversationId,
    },
    {
      label: "Users",
      href: "/users",
      icon: HiUsers,
      active: pathName === "/users",
    },
    {
  label: "LogOut",
  href: "#",
  icon: IoIosLogOut,
  onClick: async () => {
    try {
      await signOut({ redirect: true, callbackUrl: "/" });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  },
},
  ], [pathName, conversationId]);

  return routes; // Return the routes array
};

export default useRoutes;
