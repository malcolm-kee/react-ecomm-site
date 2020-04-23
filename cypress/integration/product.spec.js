/// <reference types="Cypress" />
/// <reference types="../support" />

describe(`product`, () => {
  it(`can view product details`, () => {
    cy.visit('/').get('.product-box').first().click();

    cy.findByText('Share').click();

    cy.findByText('Add To Cart').click();
    cy.findByText('Cart').click();
  });

  it(`focus on content input when user name is default`, () => {
    cy.createUser({
      name: 'Winnie The Pooth',
    }).then((user) => {
      cy.visit('/');
      cy.findByText('Login').click();
      cy.findByLabelText('Email')
        .type(user.email)
        .get('form')
        .within((subject) => {
          cy.findByText('Login', {
            container: subject,
            selector: 'button',
          }).click();
        });

      cy.findByAltText('Shopit', {
        selector: 'a',
      })
        .first()
        .click();

      cy.get('.product-box').last().click();

      cy.findByLabelText('Your Review').type('I love honey{enter}do you?');
      cy.findByText('Add').click();
      cy.findByLabelText('Your Review').should('be.focused');
    });
  });
});
