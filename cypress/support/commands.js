import '@testing-library/cypress/add-commands';
import 'cypress-file-upload';
import { getRandomEmail } from '../test-helper';

Cypress.Commands.add('createUser', ({ name, email = getRandomEmail() }) => {
  cy.request({
    url: 'https://ecomm-db.herokuapp.com/api/users',
    method: 'POST',
    body: {
      name,
      email,
      joinedDate: Date.now(),
    },
  }).then(response => response.body);
});

Cypress.Commands.add('connectSocket', ({ url }) => {
  const ws = new WebSocket(url);

  return new Cypress.Promise((fulfill, reject) => {
    ws.onopen = function() {
      fulfill(ws);
    };
    ws.onerror = reject;
  });
});

Cypress.Commands.add('initAxe', () => {
  cy.injectAxe();
  cy.configureAxe({
    rules: [
      {
        id: 'region',
        enabled: false,
      },
      {
        id: 'landmark-complementary-is-top-level',
        enabled: false,
      },
      {
        id: 'landmark-unique',
        enabled: false,
      },
    ],
  });
});

Cypress.Commands.add('checkA11yResponsive', () => {
  cy.viewport('macbook-15')
    .wait(500)
    .checkA11y();

  cy.viewport('ipad-2')
    .wait(500)
    .checkA11y();

  cy.viewport('iphone-5')
    .wait(500)
    .checkA11y();
});
