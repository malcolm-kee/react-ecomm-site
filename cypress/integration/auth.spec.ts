import { faker } from '@faker-js/faker';

describe(`auth`, () => {
  it(`allow signup and login`, () => {
    const email = faker.internet.email();
    const password = faker.internet.password(10);

    cy.visit('/');

    cy.findByText('Login').click();

    cy.findByText('Signup here').click();

    cy.findByLabelText('Name').type(faker.name.findName());

    cy.findByLabelText('Email').type(email);
    cy.findByLabelText('Password').type(password);

    cy.findAllByText('Signup').last().click();

    cy.findByTestId('login-form').should('be.visible');

    cy.findByLabelText('Email').type(email);
    cy.findByLabelText('Password').type(password);

    cy.findAllByText('LOGIN').last().click();

    cy.findByText(`You're already login!`).should('be.visible');

    cy.findAllByText('Logout').last().click();
  });

  it(`shows error response from server`, () => {
    const errorText = 'email must be an email';

    cy.server();
    cy.route({
      method: 'POST',
      url: '**/register',
      status: 400,
      response: {
        statusCode: 400,
        message: [errorText],
        error: 'Bad Request',
      },
    });

    cy.visit('/');
    cy.findByText('Login').click();

    cy.findByText('Signup here').click();

    cy.findByLabelText('Name').type(faker.name.findName());
    cy.findByLabelText('Email').type(faker.internet.email());
    cy.findByLabelText('Password').type(faker.internet.password(10));
    cy.findByLabelText('Avatar URL').type(faker.random.image());
    cy.findAllByText('Signup').last().click();

    cy.findByText(errorText, {
      timeout: 6000,
    }).should('be.visible');
  });

  it(`shows error when network error`, () => {
    const errorText = 'Network Error';

    cy.server();
    cy.route({
      method: 'POST',
      url: '**/register',
      status: 503,
      response: errorText,
    });

    cy.visit('/');
    cy.findByText('Login').click();

    cy.findByText('Signup here').click();

    cy.findByLabelText('Name').type(faker.name.findName());
    cy.findByLabelText('Email').type(faker.internet.email());
    cy.findByLabelText('Password').type(faker.internet.password(10));
    cy.findAllByText('Signup').last().click();

    cy.findByText(errorText, {
      timeout: 6000,
    }).should('be.visible');
  });
});
