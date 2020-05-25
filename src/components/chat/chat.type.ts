export type ChatMessage = {
  content: string;
  senderId: string;
};

export type ChatParticipant = {
  _id: string;
  name: string;
  avatar: string;
};

export type ChatRoom = {
  roomType: 'global' | '1-to-1' | 'group';
  messages: ChatMessage[];
  participantUserIds: string[];
  participants: ChatParticipant[];
  _id: string;
  createdAt: string;
  updatedAt: string;
};
