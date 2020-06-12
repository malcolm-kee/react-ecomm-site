import { useQuery } from 'react-query';
import { getGlobalChatRoom } from './chat.service';

export const useGlobalChatRoom = () =>
  useQuery(['globalChat'], getGlobalChatRoom);
