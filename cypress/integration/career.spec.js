/// <reference types="Cypress" />
/// <reference types="../support" />

describe(`product`, () => {
  it(`can view job details`, () => {
    cy.visit('/');
    cy.findByText('Careers').click();

    cy.findByText('Web Designer').click();

    cy.findByText('Apply').should('be.disabled');
  });
});
