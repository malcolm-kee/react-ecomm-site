```jsx
import { ChatHistory } from './chat-history';
import { ChatInput } from './chat-input';
import { ChatMessage } from './chat-message';

const ChatToSelf = () => {
  const [msgs, setMsgs] = React.useState([]);

  return (
    <div>
      <ChatHistory id="test-height" height={300}>
        {msgs.map((msg, i) => (
          <ChatMessage
            message={msg.message}
            sendTime={msg.sendTime}
            isMe
            key={i}
          />
        ))}
      </ChatHistory>
      <ChatInput
        onSend={(newMsg) =>
          setMsgs((currentMsg) =>
            currentMsg.concat({
              message: newMsg,
              sendTime: /(^\d{2}:\d{2})/.exec(new Date().toTimeString())[1],
            })
          )
        }
      />
    </div>
  );
};

<ChatToSelf />;
```
