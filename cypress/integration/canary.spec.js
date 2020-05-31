/// <reference types="Cypress" />

describe(`canary`, () => {
  it(`can visit home page`, () => {
    cy.visit(`http://localhost:3000`);

    cy.contains('Shopit').should('be.visible');
  });

  it(`can go to login page`, () => {
    cy.visit(`http://localhost:3000`);

    cy.contains('Login').click();

    cy.contains('Email').should('be.visible');
  });
});
