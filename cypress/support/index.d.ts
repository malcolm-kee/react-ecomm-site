/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Create a user
     * @example
     * cy.createUser({ name: 'Malcolm Tee' })
     */
    createUser(user: {
      name: string;
      email?: string;
    }): Chainable<{
      name: string;
      email: string;
      password: string;
      avatar: string;
      userId: string;
    }>;

    /**
     * Connect to websocket
     * @example
     * cy.connectSocket({ url: 'wss://ws.endpoint' })
     */
    connectSocket(options: { url: string }): Chainable<WebSocket>;

    initAxe(): Chainable<undefined>;
    checkA11yResponsive(): Chainable<undefined>;
  }
}
