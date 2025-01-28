import {useContext} from "react";
import {ChatContext} from "@/context/ChatContext.ts";


export const useChatState = () => {
  return useContext(ChatContext)
}