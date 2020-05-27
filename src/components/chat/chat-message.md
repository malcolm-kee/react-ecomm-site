```jsx
import { ChatHistory } from './chat-history';
import { ChatMessage } from './chat-message';
import { ChatSystemMessage } from './chat-system-message';

<ChatHistory>
  <ChatSystemMessage>Start of chat</ChatSystemMessage>
  <ChatMessage message="Hi there!" sendTime="2020-05-27T13:57:52.003Z" sender="Malcolm" />
  <ChatMessage
    message="My name is Kee, Malcolm Kee, the son of my father."
    sendTime="2020-05-27T13:57:59.003Z"
    sender="Malcolm"
  />
  <ChatMessage message="😒😒" sendTime="2020-05-27T13:58:02.003Z" isMe />
  <ChatMessage
    message={`Are you kidding me?
Ask me to online to talk.
And you send me this??? 🤬`}
    sendTime="2020-05-27T13:58:07.003Z"
    isMe
  />
  <ChatMessage
    message={`Hi there!
I just bored.
Bye!`}
    sendTime="2020-05-27T14:00:00.003Z"
    sender="Malcolm"
  />
</ChatHistory>;
```
