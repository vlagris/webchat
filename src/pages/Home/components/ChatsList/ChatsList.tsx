import clsx from "clsx";
import {ChatsListItem, ChatsListItemSkeleton} from "@/pages/Home/components/ChatsList/components/ChatsListItem";
import {ChatType, UserType} from "@/types";
import {useChatContext} from "@/hooks/useChatContext.ts";
import classes from "./ChatsList.module.scss";


interface ChatsListProps {
  users?: UserType[],
  chats?: ChatType[],
  isSuccess?: boolean,
}

function ChatsList({users, chats, isSuccess}: ChatsListProps) {
  const {currentChat} = useChatContext();


  if (isSuccess && users) {
    return (
      <ul className={classes.root}>
        {users.map(item => (
          <ChatsListItem
            key={item.id}
            user={item}
            active={item.id === currentChat?.id}
          />
        ))}
      </ul>
    );
  }

  if (isSuccess && chats) {
    return (
      <ul className={classes.root}>
        {chats.map(item => (
          <ChatsListItem
            key={item.id}
            chat={item}
            active={item.id === currentChat?.id}
          />
        ))}
      </ul>
    );
  }


  return (
    <ul className={clsx(classes.root, "not-scroll")}>
      {Array(20).fill(0).map((_, i) => (
        <ChatsListItemSkeleton key={i}/>
      ))}
    </ul>
  );
}

export default ChatsList;