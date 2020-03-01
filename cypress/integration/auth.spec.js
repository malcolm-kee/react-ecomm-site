/// <reference types="Cypress" />

import { getRandomEmail } from '../test-helper';

describe(`auth`, () => {
  it(`allow signup and login`, () => {
    const email = getRandomEmail();

    cy.visit('/')
      .findByText('Login')
      .click()

      .findByText('Signup here')
      .click()

      .findByLabelText('Name')
      .type('Malcolm Kee')
      .findByLabelText('Email')
      .type(email)
      .findAllByText('Signup')
      .last()
      .click()

      .findByText(`You're already login!`)
      .should('be.visible')

      .findAllByText('Logout')
      .last()
      .click()

      .findByText('Login')
      .click()

      .findByLabelText('Email')
      .type(email)
      .findAllByText('Login')
      .last()
      .click()

      .findByText(`You're already login!`)
      .should('be.visible');
  });

  it(`shows error when server error`, () => {
    cy.server();
    cy.route({
      method: 'POST',
      url: '**/api/users',
      status: 503,
      response: 'Network Error',
    });

    cy.visit('/')
      .findByText('Login')
      .click()

      .findByText('Signup here')
      .click()

      .findByLabelText('Name')
      .type('Malcolm Kee')
      .findByLabelText('Email')
      .type(getRandomEmail())
      .findAllByText('Signup')
      .last()
      .click()

      .findByText('Network Error', {
        timeout: 6000,
      })
      .should('be.visible');
  });
});
