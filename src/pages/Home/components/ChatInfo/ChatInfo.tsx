import {useChatContext} from "@/hooks/useChatContext.ts";
import {useChatInfoContext} from "@/hooks/useChatInfoContext.ts";
import {Button} from "@/components/UI/Button";
import {ChatPreview} from "@/pages/Home/components/ChatInfo/components/ChatPreview";
import {ChatInfoItem} from "./components/ChatInfoItem";
import classes from "./ChatInfo.module.scss";
import CloseIcon from "@/assets/icons/close.svg?react";



export function ChatInfo() {
  const {activeChat} = useChatContext();
  const {open, toggle} = useChatInfoContext();
  const user = activeChat?.user;
  const title = activeChat?.title || [user?.firstName, user?.lastName].join(" ")
  const username = activeChat?.username || user?.username;


  if (!activeChat || !open) {
    return;
  }


  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h3 className={classes.headerTitle}>
          Информация
        </h3>

        <Button
          icon
          shape="round"
          onClick={() => toggle(false)}
        >
          <CloseIcon className={classes.buttonCloseIcon}/>
        </Button>
      </div>

      <div className={classes.panel}>
        <ChatPreview
          title={title}
          lastOnline={user?.lastOnline}
          isOnline={user?.isOnline}
        />
      </div>
      <div className={classes.panel}>
        <div className={classes.info}>
          {!!username && (
            <ChatInfoItem
              title={"@" + username}
              subtitle="Имя пользователя"
            />
          )}
        </div>
      </div>
    </div>
  );
}