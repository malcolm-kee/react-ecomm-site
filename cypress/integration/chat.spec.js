/// <reference types="Cypress" />
/// <reference types="../support" />

describe(`chat`, () => {
  it(`can launch chat for logged in user`, () => {
    cy.createUser({
      name: 'Malcolm Tee',
    }).then(user => {
      cy.visit('/')
        .findByText('Chat')
        .click()

        .findAllByText('Login')
        .last()
        .click()
        .findByLabelText('Email')
        .type(user.email)
        .findAllByText('Login')
        .last()
        .click()

        .findByLabelText('Chat message')
        .type('Hello there!{enter}');
    });
  });

  it(`can receives message from other user`, () => {
    cy.createUser({
      name: 'Malcolm Kee',
    }).then(user => {
      cy.createUser({
        name: 'Other People',
      }).then(otherUser => {
        cy.connectSocket({
          url: 'wss://ecomm-db.herokuapp.com/chat',
        }).then(chatSocket => {
          cy.visit('/')
            .findByText('Chat')
            .click()

            .findAllByText('Login')
            .last()
            .click()
            .findByLabelText('Email')
            .type(user.email)
            .findAllByText('Login')
            .last()
            .click()

            .findByLabelText('Chat message')
            .type('Hello there!{enter}')

            .then(() => {
              chatSocket.send(
                JSON.stringify({
                  userId: otherUser.id,
                  message: 'Hello from the other side',
                })
              );
              chatSocket.send(
                JSON.stringify({
                  userId: otherUser.id,
                  message: 'I must had said this thousand times',
                })
              );
            })

            .findByText('Hello from the other side')
            .should('be.visible')
            .then(() => {
              chatSocket.close();
            });
        });
      });
    });
  });

  it(`allow scroll to bottom when there is too much message`, () => {
    cy.createUser({
      name: 'Malcolm Noisy',
    }).then(user => {
      cy.visit('/')
        .findByText('Chat')
        .click()

        .findAllByText('Login')
        .last()
        .click()
        .findByLabelText('Email')
        .type(user.email)
        .findAllByText('Login')
        .last()
        .click()

        .findByLabelText('Chat message')
        .type('Hello there!{enter}')
        .type('A{enter}')
        .type('B{enter}')
        .type('C{enter}')
        .type('D{enter}')
        .type('E{enter}')
        .type('F{enter}')
        .type('G{enter}')
        .type('H{enter}')
        .type('I{enter}')
        .type('J{enter}')
        .type('K{enter}')
        .type('L{enter}')
        .type('M{enter}')

        .findByTestId('chat-history')
        .scrollTo('top')

        .findByText('M')
        .should('not.be.visible')

        .findByLabelText('Scroll to bottom')
        .click()

        .findByText('M')
        .should('be.visible');
    });
  });
});
