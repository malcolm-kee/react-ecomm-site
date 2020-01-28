/// <reference types="Cypress" />

describe(`canary`, () => {
  it(`able to load`, () => {
    cy.visit('/');
  });
});
