import {
  act,
  cleanup,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import WS from 'jest-websocket-mock';
import * as React from 'react';
import xhrMock, { sequence } from 'xhr-mock';
import { user } from 'lib/test-util';
import { ChatBox } from './chat-box';

const globalChatUrl = process.env.NEXT_PUBLIC_GLOBAL_CHATROOM_URL;

describe(`<ChatBox />`, () => {
  beforeEach(() => {
    xhrMock.setup();
  });

  afterEach(() => {
    WS.clean();
    xhrMock.teardown();
  });

  it(`can mount and display system message`, async () => {
    const mockUser = {
      _id: 'userId1',
      name: 'User One',
      avatar: '',
    };

    xhrMock.get(
      globalChatUrl,
      sequence([
        {
          status: 200,
          body: JSON.stringify({
            roomType: 'global',
            participants: [],
            _id: 'roomId',
          }),
        },
        {
          status: 200,
          body: JSON.stringify({
            roomType: 'global',
            participants: [mockUser],
            _id: 'roomId',
          }),
        },
      ])
    );

    const {
      endpoint,
      sendSystemMessage,
      sendUserMessage,
    } = createMockSocketServer();

    render(<ChatBox socketEndpoint={endpoint} userId="userId" />);
    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));
    const systemMessage = 'There are 1 user online.';
    sendSystemMessage(systemMessage);
    sendUserMessage({
      userId: mockUser._id,
      userName: mockUser.name,
      message: 'Hello there!',
    });
    expect(screen.getByText(systemMessage)).toBeVisible();

    await screen.findByText(mockUser.name);

    cleanup();
  });

  it(`allows user to send message and receives message`, async () => {
    const thisUser = {
      _id: 'thisUserId',
      name: 'Malcolm Kee',
      avatar: '',
    };

    const otherUser = {
      _id: 'otherUserId',
      name: 'Pikachu',
      avatar: '',
    };

    xhrMock.get(globalChatUrl, {
      status: 200,
      body: JSON.stringify({
        roomType: 'global',
        participants: [thisUser, otherUser],
      }),
    });

    const { endpoint, server, sendUserMessage } = createMockSocketServer();

    render(<ChatBox socketEndpoint={endpoint} userId={thisUser._id} />);
    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));
    await server.connected;

    const message = 'Hello world!';
    await user.type(screen.getByLabelText('Chat message'), message);
    user.click(screen.getByLabelText('Send'));

    const result = await server.nextMessage;

    sendUserMessage({
      message: result.content,
      userId: result.senderId,
      userName: thisUser.name,
    });

    expect(screen.getByText(message)).toBeVisible();

    const otherUserMessage = {
      message: 'Welcome!',
      userId: otherUser._id,
      userName: otherUser.name,
    };

    sendUserMessage(otherUserMessage);

    await screen.findByText(otherUser.name);

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
    render(<ChatBox socketEndpoint={endpoint} userId="5" />);
    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));
    await server.connected;
    act(() => {
      server.error();
      server.close();
    });
    expect(screen.getByText('Fail to connect. Please try again')).toBeVisible();

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
    sendUserMessage: ({ message, userId }) => {
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
