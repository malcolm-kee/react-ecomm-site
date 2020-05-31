/// <reference types="Cypress" />

describe(`canary`, () => {
  it(`can visit home page`, () => {
    cy.visit('/');

    cy.findByText('Shopit').should('be.visible');
  });

  it(`can go to login page`, () => {
    cy.visit('/');

    cy.findByText('Login').click();

    cy.findByText('Email').should('be.visible');
  });
});
