/// <reference types="Cypress" />

import '@testing-library/cypress/add-commands';
import 'cypress-file-upload';
import faker from 'faker';

//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add(
  'createUser',
  ({
    name = faker.name.findName(),
    email = faker.internet.email(),
    password = faker.internet.password(),
    avatar = faker.random.image(),
  } = {}) => {
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
    }).then(() => user);
  }
);
