/// <reference types="Cypress" />
/// <reference types="../support" />

describe(`support`, () => {
  it(`can submit complain`, () => {
    cy.visit('/');
    cy.findAllByText('Help').first().click();

    cy.findByText('Complaint').click();

    cy.findByLabelText('I want to make complain about').select('deliver');
    cy.findByText('Next').click();

    cy.findByLabelText('Date of incident')
      .click()
      .get('.datepick-popup')
      .within(() => {
        cy.findByText('2').click();
      });
    cy.findByLabelText('Details about the incident')
      .type('I say hi{enter}Then he say goodbye.')
      .fixture('mk-icon.png')
      .then((fileContent) => {
        cy.findByLabelText('Upload File').attachFile(
          {
            fileContent,
            fileName: 'mk-icon.png',
            mimeType: 'image/png',
          },
          {
            subjectType: 'drag-n-drop',
            force: true,
          }
        );
      });
    cy.findByText('Next').click();

    cy.findByLabelText('Your Full Name').type('Mashi Maro');
    cy.findByLabelText('Your Phone Number').type('12345678');
    cy.findByText('Submit').click();
  });
});
