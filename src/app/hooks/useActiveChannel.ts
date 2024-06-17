import { useEffect, useState } from "react";
import useActiveList from "./useActiveList";
import { Channel, Members } from "pusher-js";
import { pusherClient } from "../lib/pusher";

const useActiveChannel = () => {
  const { set, add, remove } = useActiveList();
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);

  useEffect(() => {
    let channel = activeChannel;
    if (!channel) {
      channel = pusherClient.subscribe("presence-messenger");
      setActiveChannel(channel);
    }
    channel.bind("pusher:subscription_succeeded", (member: Members) => {
      const initialMembers: string[] = [];
      member.each((member: Record<string, any>) => {
        initialMembers.push(member.id);
      });
      set(initialMembers);
    });
  }, []);
};
export default useActiveChannel;
