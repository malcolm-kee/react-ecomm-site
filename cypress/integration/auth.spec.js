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

  it(`shows error when offline`, () => {
    cy.visit('/', {
      onBeforeLoad: function(win) {
        // no proper way to mock fetch now, see https://github.com/cypress-io/cypress/issues/95
        delete win.fetch;
        win.fetch = function() {
          return new Promise((_, reject) => reject(new Error('Network Error')));
        };
      },
    })
      .findByText('Login')
      .click()

      .findByText('Signup here')
      .click()

      .findByLabelText('Name')
      .type('Malcolm Kee')
      .findByLabelText('Email')
      .type('randomEmail@gmail.com')
      .findAllByText('Signup')
      .last()
      .click()

      .findByText('Network Error')
      .should('be.visible');
  });
});
