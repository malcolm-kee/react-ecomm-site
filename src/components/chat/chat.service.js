import { xFetchJson } from 'lib/ajax';

const GLOBAL_CHATROOM_URL = process.env.REACT_APP_GLOBAL_CHATROOM_URL;

export const getGlobalChatRoom = () => xFetchJson(GLOBAL_CHATROOM_URL);
