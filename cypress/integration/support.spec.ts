describe(`support`, () => {
  it(`can load all support pages`, () => {
    cy.visit('/help');

    cy.findByText('Account').click();

    cy.findByText('If you forget password, just create another one.', {
      exact: false,
    }).should('be.visible');

    cy.findByText('Payment').click();
    cy.findByText("when you can't even pay?", { exact: false }).should(
      'be.visible'
    );

    cy.findByText('Shipping').click();
    cy.findByText('3-5 years', { exact: false }).should('be.visible');

    cy.findByText('Complaint').click();
    cy.findByText('Category').should('be.visible');
  });

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
    cy.findByLabelText('Details about the incident').type(
      'I say hi{enter}Then he say goodbye.'
    );

    cy.findByLabelText('Upload File').attachFile({
      filePath: 'mk-icon.png',
      mimeType: 'image/png',
      subjectType: 'drag-n-drop',
      force: true,
    });
    cy.findByText('Next').click();

    cy.findByLabelText('Your Full Name').type('Mashi Maro');
    cy.findByLabelText('Your Phone Number').type('12345678');
    cy.findByText('Submit').click();

    cy.findByText('Shipping').click();
  });

  it(`cancel while upload`, () => {
    cy.server();

    cy.route({
      url: /upload$/,
      method: 'PUT',
      delay: 2000,
    });

    cy.visit('/');
    cy.findAllByText('Help').first().click();

    cy.findByText('Complaint').click();

    cy.findByLabelText('I want to make complain about').select('deliver');
    cy.findByText('Next').click();

    cy.findByLabelText('Upload File').attachFile({
      filePath: 'mk-icon.png',
      mimeType: 'image/png',
      subjectType: 'drag-n-drop',
      force: true,
    });

    cy.findByLabelText('Remove').click();
  });

  it(`shows error when upload fails`, () => {
    cy.visit('/help');

    cy.server();

    cy.route({
      url: /upload$/,
      method: 'POST',
      status: 500,
      response: 'Internal Server Error',
      delay: 200,
    });

    cy.findByText('Complaint').click();

    cy.findByLabelText('I want to make complain about').select('deliver');
    cy.findByText('Next').click();

    cy.findByLabelText('Upload File').attachFile({
      filePath: 'mk-icon.png',
      mimeType: 'image/png',
      subjectType: 'drag-n-drop',
      force: true,
    });

    cy.findByText('Failed to Upload').should('be.visible');
  });
});
