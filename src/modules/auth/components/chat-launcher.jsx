import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from '../../../components/button';
import { ChatBox } from '../../../components/chat/chat-box';
import { selectUser } from '../auth.selectors';
import styles from './chat-launcher.module.scss';
import { LoginForm } from './login-form';

const CHAT_SOCKET_URL = process.env.REACT_APP_CHAT_URL;

const ChatLauncherView = (props) => {
  const [showChat, setShowChat] = React.useState(false);
  const btnRef = React.useRef(null);
  const dismissChat = () => {
    setShowChat(false);
    btnRef.current && btnRef.current.focus();
  };

  return (
    <>
      <Button
        color="info"
        className={styles.btn}
        onClick={() => setShowChat(true)}
        ref={btnRef}
      >
        Chat
      </Button>
      {showChat && (
        <div className={styles.chatWrapper}>
          <div className="flex bg-teal-500 text-gray-100 justify-between items-center py-1 px-3">
            Chat
            <Button
              onClick={dismissChat}
              aria-label="Close"
              color="info"
              autoFocus
            >
              X
            </Button>
          </div>
          {props.user ? (
            <ChatBox socketEndpoint={CHAT_SOCKET_URL} userId={props.user.id} />
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

const connector = connect((state) => ({
  user: selectUser(state),
}));

export const ChatLauncher = connector(ChatLauncherView);
