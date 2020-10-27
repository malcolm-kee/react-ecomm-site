import * as faker from 'faker';

describe(`product`, () => {
  it(`can view product details`, () => {
    cy.visit('/');

    cy.findAllByTestId('productBox').first().click();

    cy.wait(1000);
    cy.findByText('Share').click();

    cy.findByTestId('add-qty-btn').click().click();
    cy.findByTestId('reduce-qty-btn').click();
    cy.findByText('Add To Cart').click();

    cy.findByTestId('reduce-qty-btn').click();
    cy.findByText('Add To Cart').click();

    cy.findByText('Cart').click();

    cy.findByLabelText('Increase Quantity').click().click();
    cy.findByLabelText('Reduce Quantity').click();

    cy.findAllByLabelText('Remove', { exact: false }).first().click();
  });

  it(`can checkout cart`, () => {
    cy.visit('/');

    cy.findAllByTestId('productBox').last().click();

    cy.findByTestId('add-qty-btn').click().click();
    cy.findByText('Add To Cart').click();

    cy.findByAltText('Shopit').click();

    cy.findAllByTestId('productBox').eq(3).click();
    cy.findByText('Add To Cart').click();

    cy.findByText('Cart').click();
    cy.findByText('Check Out').click();

    cy.findByLabelText('Card Number').type('5555555555554444');
    cy.findByLabelText('Name').type('Malcolm Kee');
    cy.findByLabelText('Valid Thru').type('1225');
    cy.findByLabelText('CVC').type('123');
    cy.findByText('Pay').click();
    cy.findByText('Back to Home').click();
  });

  it(`focus on content input when user name is default`, () => {
    cy.createUser({
      name: 'Winnie The Pooth',
    }).then((user) => {
      cy.visit('/');
      cy.findByText('Login').click();
      cy.findByLabelText('Email').type(user.email);
      cy.findByLabelText('Password').type(user.password);

      cy.get('form').within((subject) => {
        cy.findByText('LOGIN', {
          container: subject,
          selector: 'button',
        }).click();
      });

      cy.findByText(`You're already login!`).should('be.visible');

      cy.findAllByAltText('Shopit').first().click();

      cy.findAllByTestId('productBox').last().click();
      cy.findByLabelText('Your Name').should('have.value', user.name);

      const review = faker.lorem.sentences(2);
      cy.findByLabelText('Your Review').type(review);
      cy.findByText('Add').click();
      cy.wait(1000);
      cy.findByLabelText('Your Review').should('be.focused');

      cy.findByText(review).should('be.visible');
    });
  });
});
