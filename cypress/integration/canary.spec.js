/// <reference types="Cypress" />

describe(`canary`, () => {
  it(`able to load`, () => {
    cy.visit('/');

    cy.findAllByText('Just Buy It.').should('have.length.greaterThan', 0);
  });

  it(`able to click carousel`, () => {
    cy.visit('/');

    cy.findAllByTestId('carousel-indicator', {
      timeout: 10000,
    })
      .eq(3)
      .click();
  });
});
