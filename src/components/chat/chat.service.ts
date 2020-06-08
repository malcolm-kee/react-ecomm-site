import { xFetchJson } from 'lib/ajax';
import { ChatRoom } from './chat.type';

const GLOBAL_CHATROOM_URL = process.env
  .NEXT_PUBLIC_GLOBAL_CHATROOM_URL as string;

export const getGlobalChatRoom = (): Promise<ChatRoom> =>
  xFetchJson(GLOBAL_CHATROOM_URL);
