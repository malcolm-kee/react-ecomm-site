import { act, render, waitForElementToBeRemoved } from '@testing-library/react';
import WS from 'jest-websocket-mock';
import React from 'react';
import { ChatBox } from './chat-box';

describe(`<ChatBox />`, () => {
  it(`can mount and display system message`, async () => {
    const server = createMockSocketServer();

    const { getByRole, getByText } = render(
      <ChatBox socketEndpoint="ws://localhost:1234" />
    );
    await waitForElementToBeRemoved(() => getByRole('progressbar'));
    const systemMessage = 'There are 1 user online.';
    server.sendSystemMessage(systemMessage);
    expect(getByText(systemMessage)).toBeVisible();
  });
});

function createMockSocketServer() {
  const server = new WS('ws://localhost:1234', { jsonProtocol: true });
  return {
    server,
    sendSystemMessage: message => {
      act(() => {
        server.send({
          type: 'System',
          message,
        });
      });
    },
  };
}
