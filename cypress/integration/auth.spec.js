/// <reference types="Cypress" />

import { getRandomEmail } from '../test-helper';

describe(`auth`, () => {
  it(`allow signup and login`, () => {
    const email = getRandomEmail();

    cy.visit('/');

    cy.findByText('Login').click();

    cy.findByText('Signup here').click();

    cy.findByLabelText('Name').type('Malcolm Kee');

    cy.findByLabelText('Email').type(email);

    cy.findAllByText('Signup').last().click();

    cy.findByText(`You're already login!`).should('be.visible');

    cy.findAllByText('Logout').last().click();

    cy.findByText('Login').click();

    cy.findByLabelText('Email').type(email);

    cy.findAllByText('Login').last().click();

    cy.findByText(`You're already login!`).should('be.visible');
  });

  it(`shows error when server error`, () => {
    cy.server();
    cy.route({
      method: 'POST',
      url: '**/api/users',
      status: 503,
      response: 'Network Error',
    });

    cy.visit('/');
    cy.findByText('Login').click();

    cy.findByText('Signup here').click();

    cy.findByLabelText('Name').type('Malcolm Kee');
    cy.findByLabelText('Email').type(getRandomEmail());
    cy.findAllByText('Signup').last().click();

    cy.findByText('Network Error', {
      timeout: 6000,
    }).should('be.visible');
  });
});
