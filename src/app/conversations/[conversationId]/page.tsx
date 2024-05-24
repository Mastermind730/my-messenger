import getConversationId from "@/app/actions/getConversationById";
import getMesages from "@/app/actions/getMessages";
import EmptyState from "@/app/components/EmptyState";
import Header from "./components/Header";

interface IParams {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationId(params.conversationId);
  const messages = await getMesages(params.conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }
  return <div className="lg:pl-80 h-full">
    <div className="h-full flex flex-col">
<Header conversation={conversation}/>
    </div>
    </div>;
};
export default ConversationId;
