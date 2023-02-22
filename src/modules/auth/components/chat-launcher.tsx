import { ChatBox } from 'components/chat/chat-box';
import { IconButton } from 'components/icon-button';
import * as React from 'react';
import { MdChatBubbleOutline, MdClose } from 'react-icons/md';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'type';
import { selectUser } from '../auth.selectors';
import styles from './chat-launcher.module.scss';
import { LoginForm } from './login-form';

const CHAT_SOCKET_URL = import.meta.env.VITE_CHAT_URL as string;

const ChatLauncherView = (props: ConnectedProps<typeof connector>) => {
  const [showChat, setShowChat] = React.useState(false);
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const dismissChat = () => {
    setShowChat(false);
    btnRef.current && btnRef.current.focus();
  };

  return (
    <>
      <IconButton
        className={styles.btn}
        color="info"
        size="large"
        onClick={() => setShowChat(true)}
        ref={btnRef}
      >
        <span className="sr-only">Chat</span>
        <MdChatBubbleOutline aria-hidden className="w-6 h-6" />
      </IconButton>
      {showChat && (
        <div
          className={`rounded-t-md overflow-hidden shadow-md ${styles.chatWrapper}`}
        >
          <div className="flex bg-teal-500 text-gray-100 justify-between items-center py-2 px-4">
            Chat
            <IconButton onClick={dismissChat} aria-label="Close" autoFocus>
              <MdClose className="w-5 h-5" aria-hidden />
            </IconButton>
          </div>
          {props.user ? (
            <ChatBox
              socketEndpoint={CHAT_SOCKET_URL}
              userId={props.user.userId}
            />
          ) : (
            <div className={styles.chatContentWrapper}>
              <LoginForm />
            </div>
          )}
        </div>
      )}
    </>
  );
};

const connector = connect((state: RootState) => ({
  user: selectUser(state),
}));

export const ChatLauncher = connector(ChatLauncherView);
