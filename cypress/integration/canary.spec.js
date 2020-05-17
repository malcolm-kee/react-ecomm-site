/// <reference types="Cypress" />

describe(`canary`, () => {
  it(`able to load`, () => {
    cy.visit('/');
  });

  it(`able to click carousel`, () => {
    cy.visit('/');

    cy.findAllByTestId('carousel-indicator', {
      timeout: 6000,
    })
      .eq(3)
      .click();
  });
});
