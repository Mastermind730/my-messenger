// import { PrismaClient } from "@prisma/client";
import getCurrentUser from "./getCurrentUser";
import prisma from "@/app/lib/prismadb";

const getConversations = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
        return [];
    }

    try {
        const conversations = await prisma.conversation.findMany({
            orderBy: {
                lastMessageAt: 'desc'
            },
            where: {
                userIds: {
                    has: currentUser.id
                }
            },
            include: {
                users: true,
                messages: {  // Fixed typo: "messgages" -> "messages"
                    include: {
                        sender: true,
                        seen: true
                    }
                }
            }
        });
        return conversations;
    } catch (error: any) {
        console.error("Error fetching conversations:", error);  // Optional: Log the error for debugging purposes
        return [];
    }
}

export default getConversations;
