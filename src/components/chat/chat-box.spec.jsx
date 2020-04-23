import { act, render, waitForElementToBeRemoved } from '@testing-library/react';
import WS from 'jest-websocket-mock';
import React from 'react';
import { ChatBox } from './chat-box';
import { user } from '../../lib/test-util';

describe(`<ChatBox />`, () => {
  afterEach(() => {
    WS.clean();
  });

  it(`can mount and display system message`, async () => {
    const { endpoint, sendSystemMessage } = createMockSocketServer();

    const { getByRole, getByText } = render(
      <ChatBox socketEndpoint={endpoint} />
    );
    await waitForElementToBeRemoved(() => getByRole('progressbar'));
    const systemMessage = 'There are 1 user online.';
    sendSystemMessage(systemMessage);
    expect(getByText(systemMessage)).toBeVisible();
  });

  it(`allows user to send message and receives message`, async () => {
    const { endpoint, server, sendUserMessage } = createMockSocketServer();

    const { getByLabelText, getByRole, getByText } = render(
      <ChatBox socketEndpoint={endpoint} userId={5} />
    );
    await waitForElementToBeRemoved(() => getByRole('progressbar'));
    await server.connected;

    const message = 'Hello world!';
    await user.type(getByLabelText('Chat message'), message);
    user.click(getByLabelText('Send'));

    const result = await server.nextMessage;
    sendUserMessage({
      message: result.message,
      userId: result.userId,
      userName: 'Malcolm Kee',
    });

    expect(getByText(message)).toBeVisible();

    const otherUserMessage = {
      message: 'Welcome!',
      userId: 1000,
      userName: 'Pikachu',
    };

    sendUserMessage(otherUserMessage);

    expect(getByText(otherUserMessage.message)).toBeVisible();
  });

  it(`display error message when fail to connect`, async () => {
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
          userId,
          userName,
          displayedDate: new Date().toLocaleTimeString(),
        });
      });
    },
  };
}
