/// <reference types="Cypress" />
/// <reference types="../support" />

describe(`support`, () => {
  it(`can submit complain`, () => {
    cy.visit('/')
      .findAllByText('Help')
      .first()
      .click()

      .findByText('Complaint')
      .click()

      .findByLabelText('I want to make complain about')
      .select('deliver')
      .findByText('Next')
      .click()

      .findByLabelText('Date of incident')
      .click()
      .get('.datepick-popup')
      .within(() => {
        cy.findByText('2').click();
      })
      .findByLabelText('Details about the incident')
      .type('I say hi{enter}Then he say goodbye.')
      .fixture('mk-icon.png')
      .then(fileContent => {
        cy.findByLabelText('Upload File').upload(
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
      })
      .findByText('Next')
      .click()

      .findByLabelText('Your Full Name')
      .type('Mashi Maro')
      .findByLabelText('Your Phone Number')
      .type('12345678')
      .findByText('Submit')
      .click();
  });
});
