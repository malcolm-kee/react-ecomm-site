```jsx
import { ChatHistory } from './chat-history';
import { ChatMessage } from './chat-message';
import { ChatSystemMessage } from './chat-system-message';

<ChatHistory>
  <ChatSystemMessage>Start of chat</ChatSystemMessage>
  <ChatMessage message="Hi there!" sendTime="21:57" sender="Malcolm" />
  <ChatMessage
    message="My name is Kee, Malcolm Kee, the son of my father."
    sendTime="21:57"
    sender="Malcolm"
  />
  <ChatMessage message="😒😒" sendTime="21:58" isMe />
  <ChatMessage
    message={`Are you kidding me?
Ask me to online to talk.
And you send me this??? 🤬`}
    sendTime="21:58"
    isMe
  />
  <ChatMessage
    message={`Hi there!
I just bored.
Bye!`}
    sendTime="22:00"
    sender="Malcolm"
  />
</ChatHistory>;
```
