import {
  act,
  cleanup,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import WS from 'jest-websocket-mock';
import * as React from 'react';
import xhrMock from 'xhr-mock';
import { user } from '../../lib/test-util';
import { ChatBox } from './chat-box';

const globalChatUrl = process.env.REACT_APP_GLOBAL_CHATROOM_URL;

describe(`<ChatBox />`, () => {
  beforeEach(() => xhrMock.setup());

  afterEach(() => {
    WS.clean();
    xhrMock.teardown();
  });

  it(`can mount and display system message`, async () => {
    xhrMock.get(globalChatUrl, {
      status: 200,
      body: JSON.stringify({
        roomType: 'global',
        participants: [],
      }),
    });

    const { endpoint, sendSystemMessage } = createMockSocketServer();

    render(<ChatBox socketEndpoint={endpoint} />);
    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));
    const systemMessage = 'There are 1 user online.';
    sendSystemMessage(systemMessage);
    expect(screen.getByText(systemMessage)).toBeVisible();

    cleanup();
  });

  it(`allows user to send message and receives message`, async () => {
    xhrMock.get(globalChatUrl, {
      status: 200,
      body: JSON.stringify({
        roomType: 'global',
        participants: [],
      }),
    });

    const { endpoint, server, sendUserMessage } = createMockSocketServer();

    render(<ChatBox socketEndpoint={endpoint} userId={5} />);
    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));
    await server.connected;

    const message = 'Hello world!';
    await user.type(screen.getByLabelText('Chat message'), message);
    user.click(screen.getByLabelText('Send'));

    const result = await server.nextMessage;

    sendUserMessage({
      message: result.content,
      userId: result.senderId,
      userName: 'Malcolm Kee',
    });

    expect(screen.getByText(message)).toBeVisible();

    const otherUserMessage = {
      message: 'Welcome!',
      userId: 1000,
      userName: 'Pikachu',
    };

    sendUserMessage(otherUserMessage);

    expect(screen.getByText(otherUserMessage.message)).toBeVisible();

    cleanup();
  });

  it(`display error message when fail to connect`, async () => {
    xhrMock.get(globalChatUrl, {
      status: 200,
      body: JSON.stringify({
        roomType: 'global',
        participants: [],
      }),
    });
    const { server, endpoint } = createMockSocketServer();
    const { getByRole, getByText } = render(
      <ChatBox socketEndpoint={endpoint} userId={5} />
    );
    await waitForElementToBeRemoved(() => getByRole('progressbar'));
    await server.connected;
    act(() => {
      server.error();
      server.close();
    });
    expect(getByText('Fail to connect. Please try again')).toBeVisible();

    cleanup();
  });
});

function createMockSocketServer() {
  const endpoint = 'ws://localhost:1234';
  const server = new WS(endpoint, { jsonProtocol: true });
  return {
    server,
    endpoint,
    sendSystemMessage: (message) => {
      act(() => {
        server.send({
          type: 'System',
          message,
        });
      });
    },
    sendUserMessage: ({ message, userId, userName }) => {
      act(() => {
        server.send({
          type: 'User',
          message,
          data: {
            content: message,
            senderId: userId,
            createdAt: new Date(),
          },
        });
      });
    },
  };
}
