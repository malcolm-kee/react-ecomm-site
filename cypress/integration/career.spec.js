/// <reference types="Cypress" />
/// <reference types="../support" />

describe(`product`, () => {
  it(`can view job details`, () => {
    cy.visit('/')
      .findByText('Careers')
      .click()

      .findByText('Web Designer')
      .click()

      .findByText('Apply')
      .should('be.disabled');
  });
});
