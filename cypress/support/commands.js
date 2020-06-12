import '@testing-library/cypress/add-commands';
import 'cypress-file-upload';
import faker from 'faker';

Cypress.Commands.add(
  'createUser',
  ({
    name,
    email = faker.internet.email(),
    password = faker.internet.password(8),
    avatar = faker.image.avatar(),
  }) => {
    const user = {
      name,
      email,
      password,
      avatar,
    };

    cy.request({
      url: 'https://ecomm-service.herokuapp.com/register',
      method: 'POST',
      body: user,
    })
      .then(() =>
        cy
          .request({
            url: 'https://ecomm-service.herokuapp.com/login',
            method: 'POST',
            body: {
              username: user.email,
              password: user.password,
            },
          })
          .then((res) => res.body)
      )
      .then((loginDetails) =>
        cy
          .request({
            url: 'https://ecomm-service.herokuapp.com/whoami',
            headers: {
              Authorization: `Bearer ${loginDetails.access_token}`,
            },
          })
          .then((res) => res.body)
      )
      .then((userDetails) => ({
        ...user,
        ...userDetails,
      }));
  }
);

Cypress.Commands.add('connectSocket', ({ url }) => {
  const ws = new WebSocket(url);

  return new Cypress.Promise((fulfill, reject) => {
    ws.onopen = function () {
      fulfill(ws);
    };
    ws.onerror = reject;
  });
});
