import { useQuery } from '@tanstack/react-query';
import { getGlobalChatRoom } from './chat.service';

export const useGlobalChatRoom = () =>
  useQuery(['globalChat'], getGlobalChatRoom);
