/// <reference types="Cypress" />

import faker from 'faker';

describe(`support`, () => {
  it(`able to register`, () => {
    cy.visit('/help');

    cy.findByText('Complaint').click();
    cy.findByLabelText('I want to make complain about').select('Product');
    cy.findByText('Next').click();

    cy.findByText('Date of incident').click();
    cy.get('.datepick-popup').within(() => {
      cy.findByText('2').click();
    });
    cy.findByLabelText('Details about the incident').type(
      faker.lorem.sentence()
    );
    cy.findByLabelText('Upload File').attachFile('html5.png', {
      subjectType: 'drag-n-drop',
    });
    cy.findByText('Next').click();

    cy.findByLabelText('Your Full Name').type(faker.name.findName());
    cy.findByLabelText('Your Phone Number').type(faker.phone.phoneNumber());
    cy.findByText('Submit').click();
  });

  it(`shows error when upload fails`, () => {
    cy.server();
    cy.route({
      url: /upload$/,
      method: 'POST',
      status: 500,
      response: 'Internal Server Error',
      delay: 200,
    });

    cy.visit('/help');

    cy.findByText('Complaint').click();
    cy.findByLabelText('I want to make complain about').select('Product');
    cy.findByText('Next').click();

    cy.findByLabelText('Upload File').attachFile('html5.png', {
      subjectType: 'drag-n-drop',
    });

    cy.findByText('Failed to Upload').should('be.visible');
  });
});
