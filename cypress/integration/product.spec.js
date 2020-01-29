/// <reference types="Cypress" />
/// <reference types="../support" />

describe(`product`, () => {
  it(`can view product details`, () => {
    cy.visit('/')
      .get('.product-box')
      .first()
      .click()

      .findByText('Share')
      .click()

      .findByText('Add To Cart')
      .click()
      .findByText('Cart')
      .click();
  });

  it(`focus on content input when user name is default`, () => {
    cy.createUser({
      name: 'Winnie The Pooth',
    }).then(user => {
      cy.visit('/')
        .findByText('Login')
        .click()
        .findByLabelText('Email')
        .type(user.email)
        .get('form')
        .within(subject => {
          cy.findByText('Login', {
            container: subject,
            selector: 'button',
          }).click();
        })

        .findByText('Shopit', {
          selector: 'a',
        })
        .first()
        .click()

        .get('.product-box')
        .last()
        .click()

        .findByLabelText('Your Review')
        .type('I love honey{enter}do you?')
        .findByText('Add')
        .click()
        .findByLabelText('Your Review')
        .should('be.focused');
    });
  });
});
