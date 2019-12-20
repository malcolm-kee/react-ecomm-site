```jsx
const ChatInputDemo = () => {
  const [msg, setMsg] = React.useState('');

  return (
    <>
      <ChatInput placeholder="Type something" onSend={setMsg} />
      {msg && <p>Sent msg is {msg}</p>}
    </>
  );
};

<ChatInputDemo />;
```
