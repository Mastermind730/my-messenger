import getConversationId from "@/app/actions/getConversationById";
import getMesages from "@/app/actions/getMessages";
import EmptyState from "@/app/components/EmptyState";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";

interface IParams {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationId(params.conversationId);
  const messages = await getMesages(params.conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-[100vh]">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }
  return <div className="lg:pl-80 h-[100vh]">
    <div className="h-full flex flex-col">
<Header conversation={conversation}/>
<Body/>
<Form/>
    </div>
    </div>;
};
export default ConversationId;
