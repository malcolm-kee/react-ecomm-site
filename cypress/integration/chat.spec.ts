describe(`chat`, () => {
  it(`can launch chat for logged in user`, () => {
    cy.createUser({
      name: 'Malcolm Tee',
    }).then((user) => {
      cy.visit('/help');
      cy.findByText('Chat').click();

      cy.findAllByText('Login').last().click();
      cy.findByLabelText('Email').type(user.email);
      cy.findByLabelText('Password').type(user.password);
      cy.findAllByText('Login').last().click();

      cy.findByLabelText('Chat message', {
        timeout: 6000,
      }).type('Hello there!{enter}');
    });
  });

  it(`can receives message from other user`, () => {
    cy.createUser({
      name: 'Malcolm Kee',
    }).then((user) => {
      cy.createUser({
        name: 'Other People',
      }).then((otherUser) => {
        cy.request({
          url: 'https://ecomm-service.herokuapp.com/chat/room',
        }).then((roomDetails) => {
          cy.connectSocket({
            url: `wss://ecomm-service.herokuapp.com?roomId=${roomDetails.body._id}`,
          }).then((chatSocket) => {
            cy.visit('/help');
            cy.findByText('Chat').click();

            cy.findAllByText('Login').last().click();
            cy.findByLabelText('Email').type(user.email);
            cy.findByLabelText('Password').type(user.password);
            cy.findAllByText('Login').last().click();

            cy.findByLabelText('Chat message', {
              timeout: 6000,
            })
              .type('Hello there!{enter}')

              .then(() => {
                chatSocket.send(
                  JSON.stringify({
                    userId: otherUser.userId,
                    content: 'Hello from the other side',
                  })
                );
                chatSocket.send(
                  JSON.stringify({
                    userId: otherUser.userId,
                    content: 'I must had said this thousand times',
                  })
                );
              });

            cy.findByText('Hello from the other side')
              .should('be.visible')
              .then(() => {
                chatSocket.close();
              });
          });
        });
      });
    });
  });

  it(`allow scroll to bottom when there is too much message`, () => {
    cy.createUser({
      name: 'Malcolm Noisy',
    }).then((user) => {
      cy.visit('/help');
      cy.findByText('Chat').click();

      cy.findAllByText('Login').last().click();
      cy.findByLabelText('Email').type(user.email);
      cy.findByLabelText('Password').type(user.password);
      cy.findAllByText('Login').last().click();

      cy.findByLabelText('Chat message', {
        timeout: 6000,
      })
        .type('Hello there!{enter}')
        .type('A{enter}')
        .type('B{enter}')
        .type('C{enter}')
        .type('D{enter}')
        .type('E{shift}{enter}e{enter}')
        .type('F{enter}')
        .type('G{enter}')
        .type('H{enter}')
        .type('I{enter}')
        .type('J{enter}')
        .type('K{enter}')
        .type('L{enter}')
        .type('E{shift}{enter}e{enter}')
        .type('F{enter}')
        .type('G{enter}')
        .type('H{enter}')
        .type('I{enter}')
        .type('J{enter}')
        .type('K{enter}')
        .type('L{enter}')
        .type('M{enter}');

      cy.findByTestId('chat-history').scrollTo('top');

      cy.findByText('M').should('not.be.visible');

      cy.findByLabelText('Scroll to bottom').click();

      /* not doing this check as it's quite buggy at the moment, 
        refer to https://github.com/cypress-io/cypress/issues/1242 for update */
      // .findByText('M')
      // .should('be.visible');
    });
  });
});
