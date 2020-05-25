/// <reference types="Cypress" />

import * as faker from 'faker';

describe(`auth`, () => {
  it(`allow signup and login`, () => {
    const email = faker.internet.email();
    const password = faker.internet.password(10);

    cy.visit('/');

    cy.findByText('Login').click();

    cy.findByText('Signup here').click();

    cy.findByLabelText('Name').type('Malcolm Kee');

    cy.findByLabelText('Email').type(email);
    cy.findByLabelText('Password').type(password);

    cy.findAllByText('Signup').last().click();

    cy.findByTestId('login-form').should('be.visible');

    cy.findByLabelText('Email').type(email);
    cy.findByLabelText('Password').type(password);

    cy.findAllByText('Login').last().click();

    cy.findByText(`You're already login!`).should('be.visible');

    cy.findAllByText('Logout').last().click();
  });

  it(`shows error when server error`, () => {
    cy.server();
    cy.route({
      method: 'POST',
      url: '**/register',
      status: 503,
      response: 'Network Error',
    });

    cy.visit('/');
    cy.findByText('Login').click();

    cy.findByText('Signup here').click();

    cy.findByLabelText('Name').type('Malcolm Kee');
    cy.findByLabelText('Email').type(faker.internet.email());
    cy.findByLabelText('Password').type(faker.internet.password(10));
    cy.findAllByText('Signup').last().click();

    cy.findByText('Network Error', {
      timeout: 6000,
    }).should('be.visible');
  });
});
