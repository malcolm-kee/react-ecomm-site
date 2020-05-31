/// <reference types="Cypress" />

import faker from 'faker';

describe(`auth`, () => {
  it(`able to register`, () => {
    cy.visit('/signup');

    cy.findByLabelText('Name').type(faker.name.findName());
    cy.findByLabelText('Email').type(faker.internet.email());
    cy.findByLabelText('Password').type(faker.internet.password());
    cy.findByLabelText('Avatar URL').type(faker.random.image());

    cy.findAllByText('Signup').filter('button').click();
  });
});
